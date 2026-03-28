"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { AVAILABLE_CITIES } from "@/src/lib/cities";

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
          setSubmitMessage("You're already subscribed to this city.");
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
    <div className="flex min-h-screen flex-col bg-[#F8F6F2] text-[#0F1C2E]">

      {/* Dark masthead */}
      <header className="bg-[#0F1C2E]">
        <div className="relative mx-auto flex max-w-[1320px] items-center justify-center px-6 py-5 md:px-10">
          <Link
            href="/"
            className="text-[1.9rem] font-normal tracking-tight text-white [font-family:var(--font-serif)]"
          >
            CitySmart
          </Link>
          <div className="absolute right-6 md:right-10">
            <Link
              href="/sample"
              className="text-sm font-medium text-[#EA580C] transition hover:text-[#C2410C]"
            >
              <span className="hidden md:inline whitespace-nowrap">Last week&apos;s newsletter →</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1240px] flex-1 px-5 sm:px-6 md:px-20 lg:px-24">
        <section className="py-10 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:items-start md:gap-12 md:py-14 lg:gap-16">

          {/* Left column */}
          <div className="max-w-[480px] md:max-w-none">
            <h1 className="text-[clamp(2.8rem,6vw,5.2rem)] font-normal leading-[1.0] tracking-tight [font-family:var(--font-serif)]">
              <span className="block">Your city council,</span>
              <span className="block">made readable.</span>
            </h1>

            <p className="mt-6 max-w-[440px] text-[1.05rem] leading-[1.65] text-[#4A5568]">
              We read city council and board of supervisors meeting minutes so you don&apos;t have to. Every Tuesday, get briefed on what your city government decided and why it matters.
            </p>

            {/* Form */}
            <form className="mt-8 max-w-[540px]" onSubmit={handleSubmit}>
              {/* Mobile layout */}
              <div className="flex flex-col gap-3 md:hidden">
                <div>
                  <label className="sr-only" htmlFor="city-m">City</label>
                  <select
                    id="city-m"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className="h-12 w-full border border-[#D1D5DB] bg-white px-3 text-sm text-[#0F1C2E] outline-none focus:border-[#EA580C]"
                  >
                    <option>San Francisco</option>
                    <option disabled>Coming soon...</option>
                  </select>
                </div>
                <div className="flex h-14">
                  <label className="sr-only" htmlFor="email-m">Email</label>
                  <input
                    id="email-m"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="YOUR EMAIL"
                    required
                    className="h-full flex-1 border border-r-0 border-[#D1D5DB] bg-white px-4 text-sm font-medium tracking-[0.04em] text-[#0F1C2E] outline-none placeholder:text-[#8A95A3] focus:border-[#EA580C]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-full shrink-0 bg-[#EA580C] px-5 text-sm font-semibold text-white transition hover:bg-[#C2410C]"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Desktop layout — joined 3-column */}
              <div className="hidden md:flex h-[3.75rem] gap-2 shadow-sm">
                <label className="sr-only" htmlFor="city-d">City</label>
                <select
                  id="city-d"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="h-full w-[160px] shrink-0 border border-[#D1D5DB] bg-white px-4 text-sm text-[#0F1C2E] outline-none focus:border-[#EA580C]"
                >
                  <option>San Francisco</option>
                  <option disabled>Coming soon...</option>
                </select>
                <label className="sr-only" htmlFor="email-d">Email</label>
                <input
                  id="email-d"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="YOUR EMAIL"
                  required
                  className="h-full flex-1 border border-[#D1D5DB] bg-white px-4 text-sm font-medium tracking-[0.04em] text-[#0F1C2E] outline-none placeholder:text-[#8A95A3] focus:border-[#EA580C]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-full shrink-0 bg-[#EA580C] px-8 text-sm font-semibold text-white transition hover:bg-[#C2410C] whitespace-nowrap"
                >
                  {isSubmitting ? "..." : "Subscribe →"}
                </button>
              </div>
            </form>

            {submitMessage ? (
              <p className={`mt-3 max-w-[540px] text-sm ${submitError ? "text-red-600" : "text-green-700"}`}>
                {submitMessage}
              </p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8A95A3]">
              <span>Free</span>
              <span className="text-[#D1D5DB]">·</span>
              <span>Every Tuesday</span>
              <span className="text-[#D1D5DB]">·</span>
              <span>Unsubscribe anytime</span>
            </div>

            <div className="mt-8 max-w-[540px] border-t border-[#E2E5EA] pt-6">
              <Link
                href="/sample"
                className="inline-flex items-center gap-3 text-[1.3rem] font-normal tracking-tight text-[#0F1C2E] transition hover:text-[#EA580C] [font-family:var(--font-serif)] md:text-[1.45rem]"
              >
                <span>Read last week&apos;s newsletter</span>
                <span className="text-[#EA580C]">→</span>
              </Link>
            </div>
          </div>

          {/* Right column — desktop only */}
          <div className="hidden md:block md:-mr-16 lg:-mr-24 md:-ml-12">
            <Image
              src="/hero-sf-6.png"
              alt="Person walking through San Francisco reading CitySmart on their phone"
              width={1376}
              height={768}
              className="w-full"
              style={{
                mixBlendMode: "multiply",
                maskImage: "linear-gradient(to right, transparent 0%, black 14%, black 80%, transparent 100%), linear-gradient(to bottom, black 72%, transparent 100%), linear-gradient(to top, black 93%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 14%, black 80%, transparent 100%), linear-gradient(to bottom, black 72%, transparent 100%), linear-gradient(to top, black 93%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in, source-in",
              }}
              priority
            />
          </div>

        </section>
      </main>

      <footer className="border-t border-[#E2E5EA] bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-8 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-normal text-[#0F1C2E] [font-family:var(--font-serif)]">CitySmart</p>
              <p className="mt-0.5 text-sm text-[#8A95A3]">City government, made readable.</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#8A95A3]">
              <Link href="/sample" className="transition hover:text-[#0F1C2E]">
                Sample issue
              </Link>
              <span className="text-[#D1D5DB]">·</span>
              <span>© 2026 CitySmart</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
