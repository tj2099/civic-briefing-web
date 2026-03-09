"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import HeroNewsletterAnimation from "./components/HeroNewsletterAnimation";
import { supabase } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Home() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("San Francisco");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("signup submit fired", { email, city });
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError(false);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail || normalizedEmail.length > 254 || !EMAIL_REGEX.test(normalizedEmail)) {
        setSubmitError(true);
        setSubmitMessage("Please enter a valid email address.");
        return;
      }

      const fallbackCityId = city.toLowerCase().replace(/\s+/g, "-");
      let cityId: string | number = fallbackCityId;

      // Try to resolve a canonical city id first; fall back to slug if lookup is unavailable.
      const cityLookup = await supabase.from("cities").select("id").eq("name", city).maybeSingle();
      if (cityLookup.error) {
        console.warn("city lookup failed, using fallback city_id", cityLookup.error);
      } else if (cityLookup.data?.id !== undefined && cityLookup.data?.id !== null) {
        cityId = cityLookup.data.id;
      }

      const { error } = await supabase.from("subscribers").insert({
        email: normalizedEmail,
        city_id: cityId,
        status: "active",
      });

      if (error) {
        const isDuplicate =
          error.code === "23505" || /duplicate key value/i.test(error.message || "");
        if (isDuplicate) {
          console.warn("signup duplicate", error);
          setSubmitError(false);
          setSubmitMessage("You’re already subscribed to this city");
          return;
        }
        console.error("signup insert failed", error);
        setSubmitError(true);
        setSubmitMessage(error.message || "Signup failed. Check console for details.");
        return;
      }

      console.log("signup insert succeeded", { email: normalizedEmail, city_id: cityId });
      setSubmitError(false);
      setSubmitMessage("Thanks — you're on the list.");
      setEmail("");
    } catch (err) {
      console.error("signup submit exception", err);
      setSubmitError(true);
      setSubmitMessage("Signup failed. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ECEBE9] text-[#1A2A44]">
      <div className="h-[2px] w-full bg-[#F2B705]" />

      <header className="border-b border-[#C9CDD4] bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-5 text-center md:px-10 md:py-6">
          <p className="text-4xl font-semibold tracking-tight text-[#1E222C] [font-family:Georgia,'Times_New_Roman',serif] md:text-[1.9rem]">
            CitySmart
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1240px] px-5 sm:px-6 md:px-20 lg:px-24">
        <section className="pb-14 pt-12 md:hidden">
          <div className="mx-auto max-w-[460px]">
            <h1 className="text-[clamp(2.6rem,9.2vw,3.8rem)] font-semibold leading-[0.98] tracking-tight [font-family:Georgia,'Times_New_Roman',serif]">
              <span className="block whitespace-nowrap">From City Hall,</span>
              <span className="block whitespace-nowrap">to your inbox</span>
            </h1>

            <p className="mt-6 max-w-[360px] text-[1rem] leading-[1.55] text-[#23344F]">
              CitySmart sends a list of the biggest decisions made by your city counicil to your inbox each week. Stay
              informed without reading hours of agendas and meeting transcripts.
            </p>

            <form className="mt-7 max-w-[360px]" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="sr-only" htmlFor="email-mobile">
                  Email
                </label>
                <input
                  id="email-mobile"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="EMAIL"
                  required
                  className="h-14 min-w-0 flex-1 appearance-none border border-[#313745] bg-[#ECEBE9] px-3 text-sm font-semibold tracking-[0.09em] text-[#1A2A44] outline-none placeholder:text-[#858D99] focus:border-[#1A2A44]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-[3.25rem] appearance-none border border-[#1D2430] bg-[#1D2430] px-4 text-[11px] font-semibold tracking-[0.04em] text-[#F2B705] transition hover:bg-[#161D28] sm:whitespace-nowrap"
                >
                  {isSubmitting ? "SUBMITTING..." : "GET BRIEFINGS"}
                </button>
              </div>

              <div className="mt-2">
                <label className="sr-only" htmlFor="city-mobile">
                  City
                </label>
                <select
                  id="city-mobile"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="h-[3.25rem] w-full appearance-none border border-[#C2C8D2] bg-[#ECEBE9] px-3 text-sm text-[#1A2A44] outline-none focus:border-[#1A2A44]"
                >
                  <option>San Francisco</option>
                  <option>Seattle</option>
                  <option>Los Angeles</option>
                  <option>New York</option>
                  <option>Chicago</option>
                  <option>Washington DC</option>
                </select>
              </div>
            </form>
            {submitMessage ? (
              <p className={`mt-3 max-w-[360px] text-sm ${submitError ? "text-[#B42318]" : "text-[#16794C]"}`}>
                {submitMessage}
              </p>
            ) : null}

            <div className="mt-8 max-w-[360px] border-t border-[#BCC2CD] pt-5">
              <Link
                href="/sample"
                className="inline-flex items-center gap-3 text-xl font-medium tracking-tight text-[#1A2A44] transition hover:text-[#0B2545]"
              >
                <span>See last week’s briefing</span>
                <span className="text-[#F2B705]">→</span>
              </Link>
            </div>

          </div>
        </section>

        <section className="hidden md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16 lg:gap-20 md:pb-20 md:pt-16">
          <div className="max-w-[600px]">
            <h1 className="max-w-[580px] text-[clamp(3.75rem,5vw,5.35rem)] font-semibold leading-[0.97] tracking-tight [font-family:Georgia,'Times_New_Roman',serif]">
              <span className="block whitespace-nowrap">From City Hall,</span>
              <span className="block whitespace-nowrap">to your inbox</span>
            </h1>

            <p className="mt-7 max-w-[480px] text-[1.06rem] leading-[1.55] text-[#23344F]">
              CitySmart sends a list of the biggest decisions made by your city counicil to your inbox each week. Stay
              informed without reading hours of agendas and meeting transcripts.
            </p>

            <form className="mt-7 max-w-[500px]" onSubmit={handleSubmit}>
              <div className="flex items-stretch gap-3">
                <label className="sr-only" htmlFor="email-desktop">
                  Email
                </label>
                <input
                  id="email-desktop"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="EMAIL"
                  required
                  className="h-14 flex-1 border border-[#313745] bg-[#ECEBE9] px-4 text-sm font-semibold tracking-[0.1em] text-[#1A2A44] outline-none placeholder:text-[#858D99] focus:border-[#1A2A44]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 border border-[#1D2430] bg-[#1D2430] px-8 text-sm font-semibold tracking-[0.06em] text-[#F2B705] transition hover:bg-[#161D28] whitespace-nowrap"
                >
                  {isSubmitting ? "SUBMITTING..." : "GET BRIEFINGS"}
                </button>
              </div>

              <div className="mt-3">
                <label className="sr-only" htmlFor="city-desktop">
                  City
                </label>
                <select
                  id="city-desktop"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="h-11 w-full border border-[#C2C8D2] bg-[#ECEBE9] px-3 text-sm text-[#1A2A44] outline-none focus:border-[#1A2A44]"
                >
                  <option>San Francisco</option>
                  <option>Seattle</option>
                  <option>Los Angeles</option>
                  <option>New York</option>
                  <option>Chicago</option>
                  <option>Washington DC</option>
                </select>
              </div>
            </form>
            {submitMessage ? (
              <p className={`mt-3 max-w-[500px] text-sm ${submitError ? "text-[#B42318]" : "text-[#16794C]"}`}>
                {submitMessage}
              </p>
            ) : null}

            <div className="mt-7 max-w-[500px] border-t border-[#BCC2CD] pt-6">
              <Link
                href="/sample"
                className="inline-flex items-center gap-3 text-[1.4rem] font-medium tracking-tight text-[#1A2A44] transition hover:text-[#0B2545] md:text-[1.65rem]"
              >
                <span>Read last week’s newsletter</span>
                <span className="text-[#F2B705]">→</span>
              </Link>
            </div>
          </div>

          <div className="flex justify-start">
            <HeroNewsletterAnimation className="md:-mt-[132px] md:ml-2" />
          </div>
        </section>
      </main>
    </div>
  );
}
