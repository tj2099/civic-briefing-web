"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FORMSPREE_ID = "mpqebyrj";

export default function Home() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("San Francisco");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [submitError, setSubmitError] = useState(false);

  const [contactType, setContactType] = useState<"individual" | "org">("individual");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState("");

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

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactError("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setContactSubmitted(true);
      } else {
        setContactError("Something went wrong. Please try again.");
      }
    } catch {
      setContactError("Something went wrong. Please try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  const inputClass = "w-full h-10 border border-[#E2E5EA] bg-white px-3 text-sm text-[#0F1C2E] placeholder-[#8A95A3] outline-none focus:border-[#0F1C2E] transition";
  const selectClass = "w-full h-10 border border-[#E2E5EA] bg-white px-3 text-sm text-[#0F1C2E] outline-none focus:border-[#0F1C2E] transition";
  const labelClass = "block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8A95A3] mb-2";

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
          <div className="absolute left-6 md:left-10 flex items-center gap-5">
            <Link
              href="/about"
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hidden md:block text-sm font-medium text-white/70 transition hover:text-white"
            >
              Contact
            </Link>
          </div>
          <div className="absolute right-6 md:right-10">
            <Link
              href="/sample"
              className="text-sm font-medium text-[#EA580C] transition hover:text-[#C2410C]"
            >
              <span className="md:hidden">Sample →</span>
              <span className="hidden md:inline whitespace-nowrap">Sample newsletter →</span>
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
              CitySmart sends a{" "}
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#EA580C",
                  textDecorationThickness: "2px",
                  textUnderlineOffset: "3px",
                }}
              >
                weekly briefing
              </span>{" "}
              to your inbox every Friday covering what your city council or board of supervisors decided — and why it matters. Join your neighbors and see what your government is up to.
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
              <span>Every Friday</span>
              <span className="text-[#D1D5DB]">·</span>
              <span>Unsubscribe anytime</span>
            </div>

            <div className="mt-8 max-w-[540px] border-t border-[#E2E5EA] pt-6">
              <Link
                href="/sample"
                className="inline-flex items-center gap-3 text-[1.3rem] font-normal tracking-tight text-[#0F1C2E] transition hover:text-[#EA580C] [font-family:var(--font-serif)] md:text-[1.45rem]"
              >
                <span>Read a sample newsletter</span>
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

      {/* Contact section */}
      <section className="border-t border-[#E2E5EA]">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6 md:px-20 lg:px-24 py-12 md:py-16">
          <div className="md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-16">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#EA580C] mb-3">Contact</p>
              <h2 className="[font-family:var(--font-serif)] text-[clamp(1.8rem,3vw,2.8rem)] font-normal leading-[1.05] tracking-tight mb-6">Get in touch</h2>

              {contactSubmitted ? (
                <div className="border border-[#E2E5EA] bg-white p-6">
                  <p className="[font-family:var(--font-serif)] text-[1.2rem] text-[#0F1C2E] mb-2">Message sent</p>
                  <p className="text-sm text-[#4A5568]">Thanks — we typically respond within 1–2 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-5">
                    <p className={labelClass}>I am...</p>
                    <div className="flex border border-[#E2E5EA] bg-white">
                      <button type="button" onClick={() => setContactType("individual")}
                        className={`flex-1 py-2.5 px-4 text-sm transition ${contactType === "individual" ? "bg-[#EA580C] text-white font-medium" : "text-[#0F1C2E] hover:bg-[#F8F6F2]"}`}>
                        An individual
                      </button>
                      <button type="button" onClick={() => setContactType("org")}
                        className={`flex-1 py-2.5 px-4 text-sm border-l border-[#E2E5EA] transition ${contactType === "org" ? "bg-[#EA580C] text-white font-medium" : "text-[#0F1C2E] hover:bg-[#F8F6F2]"}`}>
                        An organization
                      </button>
                    </div>
                    <input type="hidden" name="contact_type" value={contactType} />
                  </div>

                  {contactType === "individual" ? (
                    <>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div><label className={labelClass}>Name</label><input name="name" type="text" placeholder="Your name" required className={inputClass} /></div>
                        <div><label className={labelClass}>Email</label><input name="email" type="email" placeholder="you@example.com" required className={inputClass} /></div>
                      </div>
                      <div className="mb-3">
                        <label className={labelClass}>Topic</label>
                        <select name="topic" className={selectClass}>
                          <option value="">Select a topic...</option>
                          <option>Story tip or correction</option>
                          <option>Feedback on coverage</option>
                          <option>Newsletter question</option>
                          <option>Something else</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div><label className={labelClass}>Organization</label><input name="organization" type="text" placeholder="Org name" required className={inputClass} /></div>
                        <div><label className={labelClass}>Your name</label><input name="name" type="text" placeholder="Contact person" required className={inputClass} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div><label className={labelClass}>Email</label><input name="email" type="email" placeholder="contact@yourorg.org" required className={inputClass} /></div>
                        <div>
                          <label className={labelClass}>Type of org</label>
                          <select name="org_type" className={selectClass}>
                            <option value="">Select...</option>
                            <option>Neighborhood association</option>
                            <option>Nonprofit / advocacy group</option>
                            <option>City agency</option>
                            <option>Business or chamber</option>
                            <option>Media / journalism</option>
                            <option>Academic or research</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className={labelClass}>What you&apos;re interested in</label>
                        <select name="interest" className={selectClass}>
                          <option value="">Select...</option>
                          <option>Content partnership</option>
                          <option>Sponsorship / underwriting</option>
                          <option>Data or research collaboration</option>
                          <option>Event co-hosting</option>
                          <option>Media or press inquiry</option>
                          <option>Something else</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="mb-5">
                    <label className={labelClass}>Message</label>
                    <textarea name="message" required placeholder="Tell us what's on your mind..." rows={4}
                      className="w-full border border-[#E2E5EA] bg-white px-3 py-3 text-sm text-[#0F1C2E] placeholder-[#8A95A3] leading-relaxed outline-none focus:border-[#0F1C2E] resize-y transition" />
                  </div>

                  {contactError && <p className="mb-4 text-sm text-red-600">{contactError}</p>}

                  <button type="submit" disabled={contactSubmitting}
                    className="inline-flex items-center gap-2 bg-[#EA580C] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#C2410C] disabled:opacity-60">
                    {contactSubmitting ? "Sending..." : "Send message →"}
                  </button>
                  <p className="mt-3 text-xs text-[#8A95A3]">We typically respond within 1–2 business days.</p>
                </form>
              )}
            </div>

            <div className="mt-10 md:mt-0">
              <div className="border-t-2 border-[#EA580C] pt-5">
                <h3 className="[font-family:var(--font-serif)] text-[1.05rem] font-normal text-[#0F1C2E] mb-3">About CitySmart</h3>
                <p className="text-sm text-[#4A5568] leading-relaxed">CitySmart is an independent, reader-supported publication covering the San Francisco Board of Supervisors — translating city government into plain English, every week.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

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
              <Link href="/contact" className="transition hover:text-[#0F1C2E]">
                Contact
              </Link>
              <span className="text-[#D1D5DB]">·</span>
              <a
                href="https://twitter.com/CitySmartSF"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="@CitySmartSF on X (Twitter)"
                className="flex items-center gap-1.5 transition hover:text-[#0F1C2E]"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @CitySmartSF
              </a>
              <span className="text-[#D1D5DB]">·</span>
              <span>© 2026 CitySmart</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
