import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabase-admin";
import { Resend } from "resend";

async function removeFromResendAudience(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) return;

  try {
    const resend = new Resend(apiKey);
    await resend.contacts.update({ audienceId, email, unsubscribed: true });
  } catch (err) {
    // Non-fatal — Supabase is the source of truth; log and continue.
    console.warn("Failed to mark contact unsubscribed in Resend", { email, err });
  }
}

type PageState = "success" | "already" | "invalid" | "error";

function htmlPage(state: PageState): string {
  const content: Record<PageState, { icon: string; heading: string; body: string }> = {
    success: {
      icon: "✓",
      heading: "You're unsubscribed.",
      body: "You've been removed from the CitySmart mailing list. You won't receive any more emails from us.",
    },
    already: {
      icon: "✓",
      heading: "Already unsubscribed.",
      body: "This address was already removed from our list.",
    },
    invalid: {
      icon: "✕",
      heading: "Link not valid.",
      body: "This unsubscribe link is invalid or has expired. Reply to any CitySmart email and we'll remove you manually.",
    },
    error: {
      icon: "!",
      heading: "Something went wrong.",
      body: "We couldn't process this request right now. Please try again in a few minutes.",
    },
  };

  const { icon, heading, body } = content[state];
  const isError = state === "invalid" || state === "error";
  const iconBg = isError ? "#fff0f0" : "#dcfce7";
  const iconColor = isError ? "#dc2626" : "#15803d";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${heading} — CitySmart</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Geist:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f2f0eb; color: #1a1a2e; min-height: 100vh; display: flex; flex-direction: column; }
    .topbar { background: #1a1a2e; padding: 12px 24px; }
    .topbar a { font-family: 'DM Serif Display', Georgia, serif; font-size: 18px; color: #fff; text-decoration: none; letter-spacing: -0.01em; }
    main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 48px 20px; }
    .card { background: #fff; border: 1px solid #ddd; max-width: 480px; width: 100%; padding: 36px 32px; text-align: center; }
    .icon { width: 52px; height: 52px; border-radius: 50%; background: ${iconBg}; color: ${iconColor}; font-size: 20px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; }
    h1 { font-family: 'DM Serif Display', Georgia, serif; font-size: 26px; color: #1a1a2e; margin-bottom: 12px; line-height: 1.2; }
    p { font-size: 15px; line-height: 1.6; color: #4a5568; margin-bottom: 28px; }
    .btn { display: inline-block; background: #1a1a2e; color: #fff; font-size: 14px; font-weight: 500; padding: 10px 22px; text-decoration: none; border-radius: 4px; }
    .site-footer { text-align: center; padding: 20px; font-size: 12px; color: #8a95a3; }
  </style>
</head>
<body>
  <div class="topbar"><a href="https://citysmartnews.com">CitySmart</a></div>
  <main>
    <div class="card">
      <div class="icon">${icon}</div>
      <h1>${heading}</h1>
      <p>${body}</p>
      <a class="btn" href="https://citysmartnews.com">Back to CitySmart</a>
    </div>
  </main>
  <div class="site-footer">CitySmart &mdash; Local government, made readable.</div>
</body>
</html>`;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  if (!token) return respond("invalid");

  const { data: subscriber, error: lookupError } = await supabaseAdmin
    .from("subscribers")
    .select("id,email,unsubscribed_at,status")
    .eq("unsubscribe_token", token)
    .maybeSingle();

  if (lookupError) return respond("error");
  if (!subscriber) return respond("invalid");
  if (subscriber.unsubscribed_at || subscriber.status === "unsubscribed") return respond("already");

  const { error: updateError } = await supabaseAdmin
    .from("subscribers")
    .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
    .eq("id", subscriber.id);

  if (updateError) return respond("error");

  // Best-effort: mirror the unsubscribe to Resend so they don't receive future broadcasts.
  await removeFromResendAudience(subscriber.email);

  return respond("success");
}

function respond(state: PageState): NextResponse {
  const status = state === "invalid" ? 404 : state === "error" ? 500 : 200;
  return new NextResponse(htmlPage(state), {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
