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
  const cityNameInput =
    typeof payload === "object" && payload !== null && "cityName" in payload
      ? (payload as { cityName?: unknown }).cityName
      : undefined;

  const email = typeof emailInput === "string" ? emailInput.trim().toLowerCase() : "";
  const cityId =
    typeof cityIdInput === "string" || typeof cityIdInput === "number" ? cityIdInput : "";
  const cityName = typeof cityNameInput === "string" ? cityNameInput.trim() : "";

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

  if (cityId === "" && cityName === "") {
    return NextResponse.json<SignupResponse>(
      { ok: false, status: "error", message: "City is required." },
      { status: 400 },
    );
  }

  // Look up by id if provided, otherwise by name. Both branches require is_active=true.
  let cityQuery = supabaseAdmin
    .from("cities")
    .select("id,name")
    .eq("is_active", true);

  if (cityId !== "") {
    cityQuery = cityQuery.eq("id", cityId);
  } else {
    cityQuery = cityQuery.ilike("name", cityName);
  }

  const { data: city, error: cityError } = await cityQuery.maybeSingle();

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
      // Check if they previously unsubscribed — if so, reactivate them.
      const { data: existing } = await supabaseAdmin
        .from("subscribers")
        .select("id,status")
        .eq("email", email)
        .maybeSingle();

      if (existing?.status === "unsubscribed") {
        const { error: reactivateError } = await supabaseAdmin
          .from("subscribers")
          .update({ status: "active", unsubscribed_at: null })
          .eq("id", existing.id);

        if (reactivateError) {
          return NextResponse.json<SignupResponse>(
            { ok: false, status: "error", message: "Unable to process signup right now." },
            { status: 500 },
          );
        }

        return NextResponse.json<SignupResponse>({
          ok: true,
          status: "success",
          message: `Welcome back — you're re-subscribed to ${city.name} briefings.`,
        });
      }

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
