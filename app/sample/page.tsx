"use client";

import Link from "next/link";
import { useRef } from "react";

export default function SamplePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handleLoad() {
    const iframe = iframeRef.current;
    if (iframe?.contentDocument?.body) {
      iframe.style.height = iframe.contentDocument.body.scrollHeight + "px";
    }
  }

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

        {/* Mobile subscribe CTA */}
        <div className="mt-8 md:hidden">
          <Link
            href="/"
            className="block w-full bg-[#EA580C] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#C2410C]"
          >
            Subscribe free →
          </Link>
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
