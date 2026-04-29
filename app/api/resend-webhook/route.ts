import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { supabaseAdmin } from "@/src/lib/supabase-admin";

// Resend contact.unsubscribed event shape
interface ResendContactEvent {
  type: string;
  data: {
    audience_id: string;
    contact: {
      id: string;
      email: string;
      unsubscribed: boolean;
    };
  };
}

export async function POST(request: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    console.error("RESEND_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await request.text();
  const svixHeaders = {
    "svix-id": request.headers.get("svix-id") ?? "",
    "svix-timestamp": request.headers.get("svix-timestamp") ?? "",
    "svix-signature": request.headers.get("svix-signature") ?? "",
  };

  let event: ResendContactEvent;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(body, svixHeaders) as ResendContactEvent;
  } catch (err) {
    console.warn("Resend webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "contact.unsubscribed") {
    const email = event.data?.contact?.email?.trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Missing email in event" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("subscribers")
      .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
      .eq("email", email)
      .eq("status", "active");

    if (error) {
      console.error("Supabase update failed for unsubscribe webhook", { email, error });
      return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }

    console.log("Unsubscribed via Resend webhook", { email });
  }

  return NextResponse.json({ received: true });
}
