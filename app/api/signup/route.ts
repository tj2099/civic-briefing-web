import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabase-admin";
import { isAllowedCityName } from "@/src/lib/cities";

type SignupResponse = {
  ok: boolean;
  status: "success" | "duplicate" | "error";
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<SignupResponse>(
      { ok: false, status: "error", message: "Invalid request body." },
      { status: 400 },
    );
  }

  const emailInput =
    typeof payload === "object" && payload !== null && "email" in payload
      ? (payload as { email?: unknown }).email
      : undefined;
  const cityIdInput =
    typeof payload === "object" && payload !== null && "cityId" in payload
      ? (payload as { cityId?: unknown }).cityId
      : undefined;

  const email = typeof emailInput === "string" ? emailInput.trim().toLowerCase() : "";
  const cityId =
    typeof cityIdInput === "string" || typeof cityIdInput === "number" ? cityIdInput : "";

  if (!email) {
    return NextResponse.json<SignupResponse>(
      { ok: false, status: "error", message: "Email is required." },
      { status: 400 },
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json<SignupResponse>(
      { ok: false, status: "error", message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (cityId === "") {
    return NextResponse.json<SignupResponse>(
      { ok: false, status: "error", message: "City is required." },
      { status: 400 },
    );
  }

  const { data: city, error: cityError } = await supabaseAdmin
    .from("cities")
    .select("id,name")
    .eq("id", cityId)
    .eq("is_active", true)
    .maybeSingle();

  if (cityError) {
    return NextResponse.json<SignupResponse>(
      { ok: false, status: "error", message: "Unable to validate city right now." },
      { status: 500 },
    );
  }

  if (!city) {
    return NextResponse.json<SignupResponse>(
      { ok: false, status: "error", message: "Please select a valid city." },
      { status: 400 },
    );
  }

  if (!isAllowedCityName(String(city.name || ""))) {
    return NextResponse.json<SignupResponse>(
      { ok: false, status: "error", message: "This city is not available for signups right now." },
      { status: 400 },
    );
  }

  const { error: insertError } = await supabaseAdmin.from("subscribers").insert({
    email,
    city_id: city.id,
    status: "active",
  });

  if (insertError) {
    const isDuplicate = insertError.code === "23505";

    if (isDuplicate) {
      return NextResponse.json<SignupResponse>({
        ok: true,
        status: "duplicate",
        message: "You are already subscribed for that city.",
      });
    }

    return NextResponse.json<SignupResponse>(
      { ok: false, status: "error", message: "Unable to process signup right now." },
      { status: 500 },
    );
  }

  return NextResponse.json<SignupResponse>({
    ok: true,
    status: "success",
    message: `Thanks - you're signed up for ${city.name} briefings.`,
  });
}
