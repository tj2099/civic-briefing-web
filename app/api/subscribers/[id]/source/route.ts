import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabase-admin";

type SourceResponse = {
  ok: boolean;
  message: string;
};

const ALLOWED_SOURCES = new Set([
  "neighborhood_org",
  "forwarded",
  "search",
  "other",
  "no_answer",
]);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json<SourceResponse>(
      { ok: false, message: "Missing subscriber id." },
      { status: 400 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<SourceResponse>(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const sourceInput =
    typeof payload === "object" && payload !== null && "source" in payload
      ? (payload as { source?: unknown }).source
      : undefined;
  const orgInput =
    typeof payload === "object" && payload !== null && "sourceOrg" in payload
      ? (payload as { sourceOrg?: unknown }).sourceOrg
      : undefined;

  const source = typeof sourceInput === "string" ? sourceInput.trim() : "";
  const sourceOrg = typeof orgInput === "string" ? orgInput.trim().slice(0, 120) : "";

  if (!ALLOWED_SOURCES.has(source)) {
    return NextResponse.json<SourceResponse>(
      { ok: false, message: "Invalid source value." },
      { status: 400 },
    );
  }

  // Dismissal (no_answer) leaves source_answered_at null — that null is what
  // distinguishes "prompt shown but dismissed" from "prompt actually answered".
  const answeredAt = source === "no_answer" ? null : new Date().toISOString();

  const { error } = await supabaseAdmin
    .from("subscribers")
    .update({
      source,
      source_org: source === "neighborhood_org" && sourceOrg ? sourceOrg : null,
      source_answered_at: answeredAt,
    })
    .eq("id", id);

  if (error) {
    console.log(`[subscribers/source] update error id=${id} message=${error.message}`);
    return NextResponse.json<SourceResponse>(
      { ok: false, message: "Unable to save right now." },
      { status: 500 },
    );
  }

  return NextResponse.json<SourceResponse>({ ok: true, message: "Saved." });
}
