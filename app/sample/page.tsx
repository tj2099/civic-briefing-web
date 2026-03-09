"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
        ? "border-[#F2B705] shadow-[0_0_0_2px_rgba(242,183,5,0.2),0_10px_24px_rgba(11,37,69,0.09)]"
        : "border-[#D7DEE8]",
    ].join(" ");

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0B2545]">
      <div className="h-1 w-full bg-[#F2B705]" />

      <header className="border-b border-[#C9CDD4] bg-white">
        <div className="relative mx-auto max-w-[1320px] px-6 py-5 text-center md:px-10 md:py-6">
          <Link
            href="/"
            className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-medium tracking-wide text-[#5B6472] transition hover:text-[#0B2545] md:left-10"
          >
            ← Back to home
          </Link>
          <p className="text-4xl font-semibold tracking-tight text-[#1E222C] [font-family:Georgia,'Times_New_Roman',serif] md:text-[1.9rem]">
            CitySmart
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-10 md:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5B6472]">Newsletter walkthrough</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight [font-family:Georgia,'Times_New_Roman',serif] md:text-6xl">
            CitySmart, explained
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#5B6472]">
            See CitySmart turns a full week of San Francisco Board of Supervisors activity into a weekly briefing. As
            you scroll, each explainer maps to the matching section in the newsletter.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,680px)] md:items-start">
          <section className="order-1 space-y-8 md:space-y-12">
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
                    "rounded-2xl border bg-white/70 p-6 transition-all duration-300 md:min-h-[62vh] md:p-8",
                    active ? "border-[#F2B705] shadow-lg shadow-[#0B2545]/8" : "border-[#D7DEE8]",
                  ].join(" ")}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className={[
                      "h-px w-10 transition-colors",
                      active ? "bg-[#F2B705]" : "bg-[#D7DEE8]",
                    ].join(" ")} />
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5B6472]">{item.label}</p>
                  </div>
                  <h2 className="text-2xl font-semibold leading-tight tracking-tight [font-family:Georgia,'Times_New_Roman',serif] md:text-3xl">
                    {item.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-[#5B6472]">
                    {item.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          <section className="order-2 md:sticky md:top-6">
            <article className="w-full overflow-hidden rounded-[18px] border border-[#D7DEE8] bg-white shadow-xl shadow-[#0B2545]/6">
              <div className="h-2 w-full bg-[#F2B705]" />

              <div className="px-5 py-7 md:px-8">
                <header>
                  <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-[#5B6472]">
                    San Francisco - Board of Supervisors
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-[#F2B705] to-[#E9A800] text-xl shadow-sm ring-1 ring-[#D7DEE8]">
                      🌉
                    </div>
                    <div>
                      <h2 className="text-5xl font-semibold leading-[1.05] tracking-tight text-[#0B2545] [font-family:Georgia,'Times_New_Roman',serif] md:text-6xl">
                        SF BOS Weekly
                      </h2>
                      <p className="mt-2 text-sm text-[#5B6472] md:text-[16px]">Friday, March 06, 2026</p>
                    </div>
                  </div>
                </header>

                <div className="mt-7 space-y-5 border-t border-[#D7DEE8] pt-6">
                  <section id="summary" className={newsletterSectionClass("summary")}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FBFF] text-base ring-1 ring-[#D7DEE8]">
                        ⚡
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#0B2545]">
                        What happened this week?
                      </h3>
                    </div>
                    <div className="mt-4 rounded-[14px] border border-[#D7DEE8] bg-[#FBFAF7] p-4">
                      <p className="text-sm leading-relaxed text-[#5B6472]">
                        The Board approved major funding and policy moves spanning affordable housing on Treasure
                        Island, Port safety work, and large parking-management contracts tied to waterfront facilities.
                        Several citywide regulatory changes, including a full Fire Code update and streamlined Shared
                        Spaces rules, advanced on first reading and will return for final votes. The Board also backed
                        restoring outdoor tsunami warning infrastructure, passing the measure on a 10-1 vote.
                      </p>
                    </div>
                  </section>

                  <section id="top-items" className={newsletterSectionClass("top-items")}>
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#0B2545]">Top items</h3>
                    <div className="mt-4 space-y-3">
                      <article className="rounded-xl border border-[#D7DEE8] bg-[#FBFAF7] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-sm font-semibold leading-snug text-[#0B2545]">
                            Treasure Island affordable housing and transit grant package
                          </h4>
                          <span className="shrink-0 rounded-full bg-[#E7F6EC] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#16794C]">
                            Passed
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">
                          Supervisors approved financing and grant alignment to accelerate affordable units and improve
                          transit access to the island.
                        </p>
                      </article>
                      <article className="rounded-xl border border-[#D7DEE8] bg-white p-4">
                        <h4 className="text-sm font-semibold leading-snug text-[#0B2545]">
                          Port safety updates and dry dock removal planning
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">
                          A safety-focused package advanced with procurement guidance for dry dock removal and hazard
                          mitigation timelines.
                        </p>
                      </article>
                      <article className="rounded-xl border border-[#D7DEE8] bg-white p-4">
                        <h4 className="text-sm font-semibold leading-snug text-[#0B2545]">
                          SFMTA parking management contracts near waterfront facilities
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">
                          Contract authorizations moved forward with additional oversight language on performance and
                          enforcement metrics.
                        </p>
                      </article>
                    </div>
                  </section>

                  <section id="more-actions" className={newsletterSectionClass("more-actions")}>
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#0B2545]">More actions</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5B6472]">
                      <li>Shared Spaces streamlining legislation advanced to next reading with technical amendments.</li>
                      <li>Controller reporting cadence was tightened for major infrastructure expenditures.</li>
                      <li>Budget and Finance scheduled follow-up hearings on implementation deadlines.</li>
                    </ul>
                  </section>

                  <section id="watchlist" className={newsletterSectionClass("watchlist")}>
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#0B2545]">Watchlist</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5B6472]">
                      <li>Final vote timing for Fire Code updates and related enforcement rules.</li>
                      <li>Port implementation milestones and contractor selection transparency.</li>
                      <li>Treasury and grant disbursement pacing for Treasure Island housing delivery.</li>
                    </ul>
                  </section>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
