"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";

// Sign up at formspree.io, create a form pointed at your email, then replace this ID
const FORMSPREE_ID = "mpqebyrj";

type ContactType = "individual" | "org";

export default function ContactPage() {
  const [contactType, setContactType] = useState<ContactType>("individual");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full h-10 border border-[#E2E5EA] bg-white px-3 text-sm text-[#0F1C2E] placeholder-[#8A95A3] outline-none focus:border-[#0F1C2E] transition";
  const selectClass =
    "w-full h-10 border border-[#E2E5EA] bg-white px-3 text-sm text-[#0F1C2E] outline-none focus:border-[#0F1C2E] transition";
  const labelClass =
    "block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8A95A3] mb-2";

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F6F2] text-[#0F1C2E]">

      {/* Header */}
      <header className="bg-[#0F1C2E]">
        <div className="relative mx-auto flex max-w-[1320px] items-center justify-center px-6 py-5 md:px-10">
          <Link
            href="/"
            className="text-[1.9rem] font-normal tracking-tight text-white [font-family:var(--font-serif)]"
          >
            CitySmart
          </Link>
          <div className="absolute left-6 md:left-10">
            <Link
              href="/about"
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              About
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

      <main className="flex-1 mx-auto w-full max-w-[1240px] px-5 sm:px-6 md:px-20 lg:px-24">

        {/* Hero */}
        <section className="border-b border-[#E2E5EA] py-10 md:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#EA580C] mb-3">Contact</p>
          <h1 className="text-[clamp(2.4rem,4vw,4rem)] font-normal leading-[1.05] tracking-tight [font-family:var(--font-serif)] mb-4">
            Get in touch with CitySmart
          </h1>
          <p className="text-[1.05rem] leading-[1.65] text-[#4A5568] max-w-[540px]">
            Whether you represent a neighborhood association, a civic institution, or just want to share a tip — we&apos;d like to hear from you.
          </p>
        </section>

        {/* Reason cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-[#E2E5EA] divide-y sm:divide-y-0 sm:divide-x divide-[#E2E5EA]">
          <div className="py-8 sm:pr-8">
            <div className="w-9 h-9 rounded-[4px] bg-[#FEF3EA] flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#EA580C] mb-2">Organizations</p>
            <h3 className="[font-family:var(--font-serif)] text-[1.1rem] text-[#0F1C2E] mb-2 font-normal leading-snug">Partner with us</h3>
            <p className="text-sm text-[#4A5568] leading-relaxed">
              Neighborhood associations, civic groups, and advocacy orgs — let&apos;s explore how we can work together to make government easier to follow.
            </p>
          </div>
          <div className="py-8 sm:px-8">
            <div className="w-9 h-9 rounded-[4px] bg-[#E8F5E9] flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M4 10h4"/><path d="M14 10h6"/><path d="M14 14h6"/><path d="M14 18h6"/><path d="M4 14h4"/><path d="M4 18h4"/>
              </svg>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#16a34a] mb-2">Media</p>
            <h3 className="[font-family:var(--font-serif)] text-[1.1rem] text-[#0F1C2E] mb-2 font-normal leading-snug">Press &amp; media</h3>
            <p className="text-sm text-[#4A5568] leading-relaxed">
              Writing about civic media or government transparency? Reach out for comment, background, or data on SF city government coverage.
            </p>
          </div>
          <div className="py-8 sm:pl-8">
            <div className="w-9 h-9 rounded-[4px] bg-[#EFF6FF] flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#2563eb] mb-2">Readers</p>
            <h3 className="[font-family:var(--font-serif)] text-[1.1rem] text-[#0F1C2E] mb-2 font-normal leading-snug">Tips &amp; feedback</h3>
            <p className="text-sm text-[#4A5568] leading-relaxed">
              Spot an error, have a story tip, or want to suggest more coverage? Reader input shapes what we cover every week.
            </p>
          </div>
        </div>

        {/* Form + sidebar */}
        <div className="py-12 md:py-16 md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-16">

          {/* Form */}
          <div>
            <h2 className="[font-family:var(--font-serif)] text-[1.5rem] font-normal text-[#0F1C2E] mb-6">
              Send us a message
            </h2>

            {submitted ? (
              <div className="border border-[#E2E5EA] bg-white p-8">
                <p className="[font-family:var(--font-serif)] text-[1.3rem] text-[#0F1C2E] mb-2">Message sent</p>
                <p className="text-sm text-[#4A5568] leading-relaxed">
                  Thanks for reaching out. We typically respond within 1–2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                {/* Type toggle */}
                <div className="mb-5">
                  <p className={labelClass}>I am...</p>
                  <div className="flex border border-[#E2E5EA] bg-white">
                    <button
                      type="button"
                      onClick={() => setContactType("individual")}
                      className={`flex-1 py-2.5 px-4 text-sm transition ${
                        contactType === "individual"
                          ? "bg-[#EA580C] text-white font-medium"
                          : "text-[#0F1C2E] hover:bg-[#F8F6F2]"
                      }`}
                    >
                      An individual
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactType("org")}
                      className={`flex-1 py-2.5 px-4 text-sm border-l border-[#E2E5EA] transition ${
                        contactType === "org"
                          ? "bg-[#EA580C] text-white font-medium"
                          : "text-[#0F1C2E] hover:bg-[#F8F6F2]"
                      }`}
                    >
                      An organization
                    </button>
                  </div>
                  <input type="hidden" name="contact_type" value={contactType} />
                </div>

                {contactType === "individual" ? (
                  <>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className={labelClass}>Name</label>
                        <input name="name" type="text" placeholder="Your name" required className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Email</label>
                        <input name="email" type="email" placeholder="you@example.com" required className={inputClass} />
                      </div>
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
                      <div>
                        <label className={labelClass}>Organization</label>
                        <input name="organization" type="text" placeholder="Org name" required className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Your name</label>
                        <input name="name" type="text" placeholder="Contact person" required className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className={labelClass}>Email</label>
                        <input name="email" type="email" placeholder="contact@yourorg.org" required className={inputClass} />
                      </div>
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
                  <textarea
                    name="message"
                    required
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    className="w-full border border-[#E2E5EA] bg-white px-3 py-3 text-sm text-[#0F1C2E] placeholder-[#8A95A3] leading-relaxed outline-none focus:border-[#0F1C2E] resize-y transition"
                  />
                </div>

                {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-[#EA580C] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#C2410C] disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send message →"}
                </button>
                <p className="mt-3 text-xs text-[#8A95A3]">We typically respond within 1–2 business days.</p>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="mt-10 md:mt-0">
            <div className="border-t-2 border-[#EA580C] pt-5">
              <h3 className="[font-family:var(--font-serif)] text-[1.05rem] font-normal text-[#0F1C2E] mb-3">
                About CitySmart
              </h3>
              <p className="text-sm text-[#4A5568] leading-relaxed">
                CitySmart is an independent, reader-supported publication covering the San Francisco Board of Supervisors — translating city government into plain English, every week.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E5EA] bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-8 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-normal text-[#0F1C2E] [font-family:var(--font-serif)]">CitySmart</p>
              <p className="mt-0.5 text-sm text-[#8A95A3]">City government, made readable.</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#8A95A3]">
              <Link href="/sample" className="transition hover:text-[#0F1C2E]">Sample issue</Link>
              <span className="text-[#D1D5DB]">·</span>
              <Link href="/about" className="transition hover:text-[#0F1C2E]">About</Link>
              <span className="text-[#D1D5DB]">·</span>
              <span>© 2026 CitySmart</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
