import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — CitySmart",
  description:
    "CitySmart is a free weekly newsletter making San Francisco city government readable. Learn about who's behind it and why it exists.",
};

export default function AboutPage() {
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
          <div className="absolute left-6 md:left-10">
            <Link
              href="/"
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              <span className="md:hidden">← Home</span>
              <span className="hidden md:inline">About</span>
            </Link>
          </div>
          <div className="absolute right-6 md:right-10">
            <Link
              href="/sample"
              className="text-sm font-medium text-[#EA580C] transition hover:text-[#C2410C]"
            >
              <span className="md:hidden">Sample →</span>
              <span className="hidden md:inline whitespace-nowrap">Last week&apos;s newsletter →</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-[1240px] px-5 sm:px-6 md:px-20 lg:px-24">
        <section className="py-10 md:py-14 md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-14 md:items-start">

          {/* Left — text */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#EA580C]">About</p>
            <h1 className="mt-3 text-[clamp(2.4rem,4vw,4rem)] font-normal leading-[1.05] tracking-tight [font-family:var(--font-serif)]">
              Who is CitySmart?
            </h1>

            <div className="mt-5 space-y-4 text-[1.05rem] leading-[1.7] text-[#4A5568]">
              <p>
                Hi, I&apos;m Tommy, the creator of CitySmart and a San Francisco
                politics nerd. I started CitySmart because I was curious about
                what the Board of Supervisors actually does every week and
                didn&apos;t have time to read the meeting minutes and committee
                transcripts to find out.
              </p>
              <p>
                Every Wednesday, CitySmart does that for you. You&apos;ll learn
                about all sorts of interesting things, from how much the City
                spends on dry dock renovations to what goes into creating an
                entertainment district. It&apos;s free, independent, and built on
                the belief that government works best when people know what
                it&apos;s up to.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-[#E2E5EA] pt-7">
              <Link
                href="/"
                className="inline-block bg-[#EA580C] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#C2410C]"
              >
                Subscribe free →
              </Link>
              <Link
                href="/sample"
                className="text-[1.1rem] font-normal tracking-tight text-[#0F1C2E] transition hover:text-[#EA580C] [font-family:var(--font-serif)]"
              >
                Read a sample issue →
              </Link>
            </div>
          </div>

          {/* Right — portrait */}
          <div className="mt-8 md:mt-0 md:block">
            <div className="overflow-hidden rounded-[4px] shadow-[0_8px_32px_rgba(15,28,46,0.12)]">
              <Image
                src="/about-portrait-v2.png"
                alt="Tommy standing in Dolores Park with the San Francisco skyline behind him"
                width={720}
                height={780}
                className="w-full object-cover object-top"
                priority
              />
            </div>
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
              <Link href="/about" className="transition hover:text-[#0F1C2E]">
                About
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
