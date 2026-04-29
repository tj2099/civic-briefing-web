"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


export default function SamplePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [city, setCity] = useState("San Francisco");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState(false);
  function handleLoad() {
    const iframe = iframeRef.current;
    if (iframe?.contentDocument?.body) {
      iframe.style.height = iframe.contentDocument.body.scrollHeight + "px";
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

      const cityLookup = await supabase.from("cities").select("id").eq("name", city).maybeSingle();
      const cityId = cityLookup.data?.id ?? city.toLowerCase().replace(/\s+/g, "-");

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, cityId }),
      });
      const data = await res.json();

      setSubmitError(!data.ok && data.status !== "duplicate");
      setSubmitMessage(data.message);
      if (data.ok) setEmail("");
    } catch (err) {
      console.error("signup submit exception", err);
      setSubmitError(true);
      setSubmitMessage("Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F6F2] text-[#0F1C2E]">

      {/* Dark masthead */}
      <header className="bg-[#0F1C2E]">
        <div className="relative mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 md:px-10">
          <Link
            href="/"
            className="text-sm font-medium text-white/60 transition hover:text-white"
          >
            ← Home
          </Link>
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-[1.9rem] font-normal tracking-tight text-white [font-family:var(--font-serif)]"
          >
            CitySmart
          </Link>
          <div className="w-16" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-6 md:py-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A95A3]">
            Sample issue
          </p>
          <h1 className="mt-2 text-4xl font-normal tracking-tight [font-family:var(--font-serif)] md:mt-3 md:text-5xl">
            <span className="md:hidden">This is CitySmart</span>
            <span className="hidden md:inline">This is what CitySmart looks like</span>
          </h1>
          <p className="mt-2 text-lg leading-relaxed text-[#4A5568] md:hidden md:mt-4">
            Every week you get briefed on what your city council actually did — no jargon, no agenda, just decisions that affect you.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[#4A5568] hidden md:block">
            Every week you get a readable briefing on what your city council actually did — no jargon, no agenda, just decisions that affect your city.
          </p>
        </div>

        {/* Newsletter iframe — auto-sized to full content height */}
        <div className="mt-5 md:mt-10 overflow-hidden rounded-2xl border border-[#E2E5EA] shadow-xl shadow-[#0F1C2E]/8">
          <iframe
            ref={iframeRef}
            src="/newsletter-sample.html"
            title="CitySmart sample newsletter"
            onLoad={handleLoad}
            scrolling="no"
            className="block w-full"
            style={{ border: "none", minHeight: 600 }}
            sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
          />
        </div>

        {/* Subscribe CTA block */}
        <div ref={ctaRef} id="subscribe" className="mt-12 rounded-2xl bg-[#0F1C2E] px-8 py-10 text-center md:px-12 md:py-12">
          <h2 className="text-2xl font-normal tracking-tight text-white [font-family:var(--font-serif)] md:text-3xl">
            Get CitySmart every week
          </h2>
          <p className="mt-2.5 text-base leading-relaxed text-white/60">
            Free. Weekly. Unsubscribe any time.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-7 max-w-md">
            {/* Mobile layout */}
            <div className="flex flex-col gap-2.5 md:hidden">
              <label className="sr-only" htmlFor="cta-city-m">City</label>
              <select
                id="cta-city-m"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/8 px-4 py-3 text-sm text-white outline-none focus:border-white/45"
              >
                <option>San Francisco</option>
                <option disabled>Coming soon...</option>
              </select>
              <label className="sr-only" htmlFor="cta-email-m">Email</label>
              <input
                id="cta-email-m"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full rounded-lg border border-white/20 bg-white/8 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/45"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#EA580C] py-3 text-sm font-semibold text-white transition hover:bg-[#C2410C]"
              >
                {isSubmitting ? "..." : "Subscribe →"}
              </button>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:flex gap-2.5">
              <label className="sr-only" htmlFor="cta-city-d">City</label>
              <select
                id="cta-city-d"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-lg border border-white/20 bg-white/8 px-4 py-3 text-sm text-white outline-none focus:border-white/45"
              >
                <option>San Francisco</option>
                <option disabled>Coming soon...</option>
              </select>
              <label className="sr-only" htmlFor="cta-email-d">Email</label>
              <input
                id="cta-email-d"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-lg border border-white/20 bg-white/8 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/45"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-[#EA580C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C2410C] whitespace-nowrap"
              >
                {isSubmitting ? "..." : "Subscribe →"}
              </button>
            </div>
          </form>

          {submitMessage && (
            <p className={`mt-3 text-sm ${submitError ? "text-red-400" : "text-green-400"}`}>
              {submitMessage}
            </p>
          )}

          <p className="mt-3.5 text-xs text-white/35">
            Read by people who actually follow city hall.
          </p>
        </div>
      </main>

      <footer className="border-t border-[#E2E5EA] bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-8 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-normal text-[#0F1C2E] [font-family:var(--font-serif)]">CitySmart</p>
              <p className="mt-0.5 text-sm text-[#8A95A3]">Local government, made readable.</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#8A95A3]">
              <Link href="/" className="transition hover:text-[#0F1C2E]">
                Subscribe
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
