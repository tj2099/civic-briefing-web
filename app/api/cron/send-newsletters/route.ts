import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabase-admin";
import { sendIssueInBatches } from "@/src/lib/newsletter-mailer";
import { ALLOWED_CITY_NAMES, AVAILABLE_CITIES } from "@/src/lib/cities";

const CRON_SECRET = process.env.CRON_SECRET;

if (!CRON_SECRET) {
  throw new Error("Missing CRON_SECRET");
}

// Vercel cron schedules are UTC. This project uses Tuesday 18:00 UTC in vercel.json,
// which matches 10:00 AM Pacific during PST and shifts to 11:00 AM during PDT.

type IssueRow = {
  id: number;
  city_id: number;
  subject: string;
  slug: string;
  html: string;
  text: string;
  send_date: string;
  status: string;
};

type SubscriberRow = {
  id: number;
  email: string;
  unsubscribe_token: string;
};

function isAuthorized(request: NextRequest) {
  const bearer = request.headers.get("authorization");
  const xCronSecret = request.headers.get("x-cron-secret");

  if (bearer === `Bearer ${CRON_SECRET}`) return true;
  if (xCronSecret === CRON_SECRET) return true;
  return false;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const nowIso = new Date().toISOString();
  const baseUrl = request.nextUrl.origin;
  const { data: allowedCities, error: allowedCitiesError } = await supabaseAdmin
    .from("cities")
    .select("id,name")
    .in("name", [...AVAILABLE_CITIES])
    .eq("is_active", true);

  if (allowedCitiesError) {
    return NextResponse.json(
      { ok: false, error: "Failed to load allowed cities", details: allowedCitiesError.message },
      { status: 500 },
    );
  }

  const allowedCityIds = (allowedCities ?? [])
    .filter((city) => ALLOWED_CITY_NAMES.includes(String(city.name || "").toLowerCase()))
    .map((city) => city.id as number);

  if (allowedCityIds.length === 0) {
    return NextResponse.json({
      ok: true,
      now: nowIso,
      totalDueIssues: 0,
      processedIssues: 0,
      issues: [],
      timezoneNote:
        "Vercel cron uses UTC. Schedule is configured for Tuesday 18:00 UTC (10:00 AM Pacific Standard Time), which is 11:00 AM during Pacific Daylight Time.",
    });
  }

  const { data: dueIssues, error: dueIssuesError } = await supabaseAdmin
    .from("newsletter_issues")
    .select("id,city_id,subject,slug,html,text,send_date,status")
    .eq("status", "queued")
    .in("city_id", allowedCityIds)
    .lte("send_date", nowIso)
    .order("send_date", { ascending: true })
    .limit(50);

  if (dueIssuesError) {
    return NextResponse.json(
      { ok: false, error: "Failed to load due issues", details: dueIssuesError.message },
      { status: 500 },
    );
  }

  const issueSummaries: Array<{
    issueId: number;
    cityId: number;
    status: "sent" | "failed" | "skipped";
    totalSubscribers: number;
    attempted: number;
    sent: number;
    failed: number;
    skippedExistingDelivery: number;
    error?: string;
  }> = [];

  for (const issue of (dueIssues ?? []) as IssueRow[]) {
    const { data: claimedIssue, error: claimError } = await supabaseAdmin
      .from("newsletter_issues")
      .update({ status: "sending" })
      .eq("id", issue.id)
      .eq("status", "queued")
      .select("id,city_id,subject,slug,html,text,send_date,status")
      .maybeSingle();

    if (claimError) {
      issueSummaries.push({
        issueId: issue.id,
        cityId: issue.city_id,
        status: "failed",
        totalSubscribers: 0,
        attempted: 0,
        sent: 0,
        failed: 0,
        skippedExistingDelivery: 0,
        error: `Failed to claim issue: ${claimError.message}`,
      });
      continue;
    }

    if (!claimedIssue) {
      issueSummaries.push({
        issueId: issue.id,
        cityId: issue.city_id,
        status: "skipped",
        totalSubscribers: 0,
        attempted: 0,
        sent: 0,
        failed: 0,
        skippedExistingDelivery: 0,
      });
      continue;
    }

    const { data: subscribers, error: subscribersError } = await supabaseAdmin
      .from("subscribers")
      .select("id,email,unsubscribe_token")
      .eq("city_id", claimedIssue.city_id)
      .eq("status", "active")
      .is("unsubscribed_at", null);

    if (subscribersError) {
      await supabaseAdmin
        .from("newsletter_issues")
        .update({ status: "failed" })
        .eq("id", claimedIssue.id);

      issueSummaries.push({
        issueId: claimedIssue.id,
        cityId: claimedIssue.city_id,
        status: "failed",
        totalSubscribers: 0,
        attempted: 0,
        sent: 0,
        failed: 0,
        skippedExistingDelivery: 0,
        error: `Failed to load subscribers: ${subscribersError.message}`,
      });
      continue;
    }

    const subscribersList = (subscribers ?? []) as SubscriberRow[];

    if (subscribersList.length === 0) {
      await supabaseAdmin
        .from("newsletter_issues")
        .update({ status: "sent" })
        .eq("id", claimedIssue.id);

      issueSummaries.push({
        issueId: claimedIssue.id,
        cityId: claimedIssue.city_id,
        status: "sent",
        totalSubscribers: 0,
        attempted: 0,
        sent: 0,
        failed: 0,
        skippedExistingDelivery: 0,
      });
      continue;
    }

    const subscriberIds = subscribersList.map((subscriber) => subscriber.id);
    const { data: existingDeliveries, error: existingDeliveriesError } = await supabaseAdmin
      .from("newsletter_deliveries")
      .select("subscriber_id")
      .eq("issue_id", claimedIssue.id)
      .in("subscriber_id", subscriberIds);

    if (existingDeliveriesError) {
      await supabaseAdmin
        .from("newsletter_issues")
        .update({ status: "failed" })
        .eq("id", claimedIssue.id);

      issueSummaries.push({
        issueId: claimedIssue.id,
        cityId: claimedIssue.city_id,
        status: "failed",
        totalSubscribers: subscribersList.length,
        attempted: 0,
        sent: 0,
        failed: 0,
        skippedExistingDelivery: 0,
        error: `Failed delivery lookup: ${existingDeliveriesError.message}`,
      });
      continue;
    }

    const alreadyDelivered = new Set((existingDeliveries ?? []).map((row) => row.subscriber_id as number));
    const subscribersToSend = subscribersList.filter((subscriber) => !alreadyDelivered.has(subscriber.id));

    const attempts = await sendIssueInBatches({
      issue: claimedIssue,
      subscribers: subscribersToSend,
      appBaseUrl: baseUrl,
    });

    const deliveryRows = attempts.map((attempt) => ({
      issue_id: claimedIssue.id,
      subscriber_id: attempt.subscriberId,
      provider: "resend",
      provider_message_id: attempt.providerMessageId,
      status: attempt.status,
      sent_at: attempt.status === "sent" ? new Date().toISOString() : null,
      error: attempt.error,
    }));

    if (deliveryRows.length > 0) {
      const { error: insertDeliveriesError } = await supabaseAdmin
        .from("newsletter_deliveries")
        .upsert(deliveryRows, { onConflict: "issue_id,subscriber_id", ignoreDuplicates: true });

      if (insertDeliveriesError) {
        await supabaseAdmin
          .from("newsletter_issues")
          .update({ status: "failed" })
          .eq("id", claimedIssue.id);

        issueSummaries.push({
          issueId: claimedIssue.id,
          cityId: claimedIssue.city_id,
          status: "failed",
          totalSubscribers: subscribersList.length,
          attempted: attempts.length,
          sent: attempts.filter((attempt) => attempt.status === "sent").length,
          failed: attempts.filter((attempt) => attempt.status === "failed").length,
          skippedExistingDelivery: alreadyDelivered.size,
          error: `Failed delivery insert: ${insertDeliveriesError.message}`,
        });
        continue;
      }
    }

    const sentCount = attempts.filter((attempt) => attempt.status === "sent").length;
    const failedCount = attempts.filter((attempt) => attempt.status === "failed").length;
    const finalStatus = failedCount > 0 ? "failed" : "sent";

    await supabaseAdmin
      .from("newsletter_issues")
      .update({ status: finalStatus })
      .eq("id", claimedIssue.id);

    issueSummaries.push({
      issueId: claimedIssue.id,
      cityId: claimedIssue.city_id,
      status: finalStatus,
      totalSubscribers: subscribersList.length,
      attempted: attempts.length,
      sent: sentCount,
      failed: failedCount,
      skippedExistingDelivery: alreadyDelivered.size,
    });
  }

  return NextResponse.json({
    ok: true,
    now: nowIso,
    totalDueIssues: (dueIssues ?? []).length,
    processedIssues: issueSummaries.length,
    issues: issueSummaries,
    timezoneNote:
      "Vercel cron uses UTC. Schedule is configured for Tuesday 18:00 UTC (10:00 AM Pacific Standard Time), which is 11:00 AM during Pacific Daylight Time.",
  });
}
