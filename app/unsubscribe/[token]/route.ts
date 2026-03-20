import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabase-admin";

function htmlPage(title: string, message: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 0; padding: 32px; background: #f6f3ee; color: #0b2545; }
      main { max-width: 640px; margin: 40px auto; background: white; border: 1px solid #d7dee8; border-radius: 16px; padding: 28px; }
      h1 { margin-top: 0; font-size: 24px; }
      p { line-height: 1.5; color: #5b6472; }
    </style>
  </head>
  <body>
    <main>
      <h1>${title}</h1>
      <p>${message}</p>
    </main>
  </body>
</html>`;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;

  if (!token) {
    return new NextResponse(htmlPage("Invalid link", "This unsubscribe link is not valid."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const { data: subscriber, error: subscriberError } = await supabaseAdmin
    .from("subscribers")
    .select("id,unsubscribed_at,status")
    .eq("unsubscribe_token", token)
    .maybeSingle();

  if (subscriberError) {
    return new NextResponse(
      htmlPage("Try again later", "We could not process this unsubscribe request right now."),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  if (!subscriber) {
    return new NextResponse(
      htmlPage("Invalid link", "This unsubscribe link is not valid or has expired."),
      { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  if (subscriber.unsubscribed_at || subscriber.status === "unsubscribed") {
    return new NextResponse(
      htmlPage("Already unsubscribed", "You have already been unsubscribed from Civic Briefing."),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  const { error: updateError } = await supabaseAdmin
    .from("subscribers")
    .update({
      status: "unsubscribed",
      unsubscribed_at: new Date().toISOString(),
    })
    .eq("id", subscriber.id);

  if (updateError) {
    return new NextResponse(
      htmlPage("Try again later", "We could not process this unsubscribe request right now."),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  return new NextResponse(
    htmlPage("Unsubscribed", "You have been unsubscribed from Civic Briefing emails."),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
