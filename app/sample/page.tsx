"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BoltIcon, CheckCircleIcon, FolderIcon, EyeIcon, BuildingOffice2Icon } from "@heroicons/react/24/solid";

type SectionId = "summary" | "top-items" | "more-actions" | "watchlist";

type Explainer = {
  id: SectionId;
  label: string;
  title: string;
  body: string[];
};

const explainers: Explainer[] = [
  {
    id: "summary",
    label: "01 Summary",
    title: "Get the full week in one paragraph",
    body: [
      "This opening section gives you the fastest possible understanding of what decisions were made at City Hall this week.",
    ],
  },
  {
    id: "top-items",
    label: "02 Top items",
    title: "Read about the most important decisions",
    body: [
      "Top items isolate the most important legislative and policy actions that happened this week.",
      "You can quickly see what passed, what changed, and what has direct impact to the city you are living in.",
    ],
  },
  {
    id: "more-actions",
    label: "03 More actions",
    title: "Get into the weeds",
    body: [
      "This section tracks other meaningful approvals, procedural actions, and committee developments.",
      "These updates often shape implementation and follow-up debates even when they are not the lead story.",
    ],
  },
  {
    id: "watchlist",
    label: "04 Watchlist",
    title: "See what's coming up",
    body: [
      "Watchlist flags issues likely to evolve, come back for another vote, or require ongoing public attention, helping you stay ahead of upcoming policy shifts.",
    ],
  },
];

function SectionLabel({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#FFF7ED]">
        <Icon className="h-4 w-4 text-[#EA580C]" />
      </div>
      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#0F1C2E]">{label}</h3>
    </div>
  );
}

export default function SamplePage() {
  const [activeSection, setActiveSection] = useState<SectionId>("summary");
  const refs = useRef<Record<SectionId, HTMLElement | null>>({
    summary: null,
    "top-items": null,
    "more-actions": null,
    watchlist: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;

        const id = visible[0].target.getAttribute("data-section-id") as SectionId | null;
        if (id) setActiveSection(id);
      },
      {
        rootMargin: "-32% 0px -42% 0px",
        threshold: [0.25, 0.45, 0.65, 0.85],
      },
    );

    const elements = Object.values(refs.current).filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const newsletterSectionClass = (id: SectionId) =>
    [
      "rounded-2xl border bg-white p-5 transition-all duration-300 md:p-6",
      activeSection === id
        ? "border-[#EA580C] shadow-[0_0_0_2px_rgba(234,88,12,0.15),0_10px_24px_rgba(15,28,46,0.09)]"
        : "border-[#E2E5EA]",
    ].join(" ");

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F6F2] text-[#0F1C2E]">

      {/* Dark masthead — matches home page */}
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

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 md:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A95A3]">
            Newsletter walkthrough
          </p>
          <h1 className="mt-3 text-4xl font-normal tracking-tight [font-family:var(--font-serif)] md:text-6xl">
            CitySmart, explained
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#4A5568]">
            See how CitySmart turns a full week of city council activity into a weekly briefing,
            using San Francisco as an example.
            <span className="hidden md:inline">
              {" "}
              As you scroll, each explainer maps to the matching section in the newsletter.
            </span>
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,680px)] md:items-start">

          {/* Left — explainer cards */}
          <section className="order-1 hidden space-y-6 md:block md:space-y-7">
            {explainers.map((item) => {
              const active = activeSection === item.id;
              return (
                <div
                  key={item.id}
                  data-section-id={item.id}
                  ref={(el) => {
                    refs.current[item.id] = el;
                  }}
                  className={[
                    "rounded-2xl border bg-white p-6 transition-all duration-300 md:p-7",
                    active ? "border-[#EA580C] shadow-lg shadow-[#0F1C2E]/8" : "border-[#E2E5EA]",
                  ].join(" ")}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className={["h-[3px] w-8 rounded-full transition-colors", active ? "bg-[#EA580C]" : "bg-[#E2E5EA]"].join(" ")} />
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A95A3]">{item.label}</p>
                  </div>
                  <h2 className="text-2xl font-normal leading-tight tracking-tight [font-family:var(--font-serif)] md:text-3xl">
                    {item.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-[#4A5568]">
                    {item.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Right — sticky newsletter preview */}
          <section className="order-2 md:sticky md:top-6">
            <article className="w-full overflow-hidden rounded-[18px] border border-[#E2E5EA] bg-white shadow-xl shadow-[#0F1C2E]/6">
              {/* Terracotta accent bar */}
              <div className="h-[5px] w-full bg-[#EA580C]" />

              <div className="px-5 py-7 md:px-8">
                <header>
                  <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-[#8A95A3]">
                    San Francisco — Board of Supervisors
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="hidden h-12 w-12 items-center justify-center rounded-md bg-[#0F1C2E] md:flex">
                      <BuildingOffice2Icon className="h-6 w-6 text-[#EA580C]" />
                    </div>
                    <div>
                      <h2 className="text-5xl font-normal leading-[1.05] tracking-tight text-[#0F1C2E] [font-family:var(--font-serif)] md:text-6xl">
                        CitySmart Weekly
                      </h2>
                      <p className="mt-2 text-sm text-[#8A95A3] md:text-[16px]">Friday, March 06, 2026</p>
                    </div>
                  </div>
                </header>

                <div className="mt-7 space-y-5 border-t border-[#E2E5EA] pt-6">

                  <section id="summary" className={newsletterSectionClass("summary")}>
                    <SectionLabel label="What happened this week?" icon={BoltIcon} />
                    <div className="mt-4 rounded-[14px] border border-[#E2E5EA] bg-[#FAFAF8] p-4">
                      <p className="text-sm leading-relaxed text-[#4A5568]">
                        The Board approved major funding and policy moves spanning affordable housing on Treasure
                        Island, Port safety work, and large parking-management contracts tied to waterfront facilities.
                        Several citywide regulatory changes, including a full Fire Code update and streamlined Shared
                        Spaces rules, advanced on first reading and will return for final votes. The Board also backed
                        restoring outdoor tsunami warning infrastructure, passing the measure on a 10-1 vote.
                      </p>
                    </div>
                  </section>

                  <section id="top-items" className={newsletterSectionClass("top-items")}>
                    <SectionLabel label="Top items" icon={CheckCircleIcon} />
                    <div className="mt-4 space-y-3">
                      <article className="rounded-xl border border-[#E2E5EA] bg-[#FAFAF8] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-sm font-semibold leading-snug text-[#0F1C2E]">
                            Treasure Island affordable housing and transit grant package
                          </h4>
                          <span className="shrink-0 rounded-full bg-[#FFF7ED] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#EA580C]">
                            Passed
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[#4A5568]">
                          Supervisors approved financing and grant alignment to accelerate affordable units and improve
                          transit access to the island.
                        </p>
                        <div className="mt-3 overflow-hidden rounded-lg border border-[#E2E5EA] bg-white">
                          <svg
                            viewBox="0 0 600 280"
                            className="block h-auto w-full"
                            role="img"
                            aria-label="Map preview of Treasure Island, San Francisco"
                          >
                            <rect x="0" y="0" width="600" height="280" fill="#D9E7FA" />
                            <path
                              d="M0 0 C120 40, 170 95, 215 132 C252 162, 245 204, 210 280 L0 280 Z"
                              fill="#C6D8B7"
                            />
                            <path
                              d="M600 0 C520 36, 470 86, 438 128 C402 172, 415 222, 448 280 L600 280 Z"
                              fill="#C6D8B7"
                            />
                            <ellipse cx="322" cy="154" rx="54" ry="24" fill="#D0DFBF" />
                            <path d="M118 188 L318 160 L482 132" stroke="#AAB8D0" strokeWidth="10" strokeLinecap="round" />
                            <path d="M158 214 L320 176 L446 150" stroke="#BBC7DA" strokeWidth="7" strokeLinecap="round" />
                            <g transform="translate(322 154)">
                              <circle cx="0" cy="0" r="13" fill="#0F1C2E" />
                              <path d="M-8.2 4.1 V-1.5 L0 -8.1 L8.2 -1.5 V4.1 Z" fill="#EA580C" />
                              <rect x="-2.8" y="0.1" width="5.6" height="4" rx="0.7" fill="#0F1C2E" />
                            </g>
                            <text x="341" y="159" fontSize="14" fontWeight="700" fill="#0F1C2E">
                              Treasure Island
                            </text>
                            <text x="48" y="56" fontSize="12" fontWeight="600" fill="#4A5568">
                              San Francisco
                            </text>
                            <text x="492" y="62" fontSize="12" fontWeight="600" fill="#4A5568">
                              Oakland
                            </text>
                          </svg>
                        </div>
                        <p className="mt-2 text-xs text-[#8A95A3]">Treasure Island, San Francisco</p>
                      </article>
                      <article className="rounded-xl border border-[#E2E5EA] bg-white p-4">
                        <h4 className="text-sm font-semibold leading-snug text-[#0F1C2E]">
                          Port safety updates and dry dock removal planning
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-[#4A5568]">
                          A safety-focused package advanced with procurement guidance for dry dock removal and hazard
                          mitigation timelines.
                        </p>
                      </article>
                      <article className="rounded-xl border border-[#E2E5EA] bg-white p-4">
                        <h4 className="text-sm font-semibold leading-snug text-[#0F1C2E]">
                          SFMTA parking management contracts near waterfront facilities
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-[#4A5568]">
                          Contract authorizations moved forward with additional oversight language on performance and
                          enforcement metrics.
                        </p>
                      </article>
                    </div>
                  </section>

                  <section id="more-actions" className={newsletterSectionClass("more-actions")}>
                    <SectionLabel label="More actions" icon={FolderIcon} />
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#4A5568]">
                      <li>Shared Spaces streamlining legislation advanced to next reading with technical amendments.</li>
                      <li>Controller reporting cadence was tightened for major infrastructure expenditures.</li>
                      <li>Budget and Finance scheduled follow-up hearings on implementation deadlines.</li>
                    </ul>
                  </section>

                  <section id="watchlist" className={newsletterSectionClass("watchlist")}>
                    <SectionLabel label="Watchlist" icon={EyeIcon} />
                    <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#4A5568]">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F1C2E]">
                          Public safety and emergency response
                        </p>
                        <ul className="mt-1 space-y-1">
                          <li>Final vote timing for Fire Code updates and related enforcement rules.</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F1C2E]">
                          Housing and infrastructure delivery
                        </p>
                        <ul className="mt-1 space-y-1">
                          <li>Port implementation milestones and contractor selection transparency.</li>
                          <li>Treasury and grant disbursement pacing for Treasure Island housing delivery.</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                </div>
              </div>
            </article>
          </section>

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
