"use client";

import Link from "next/link";

type TopItem = {
  status: "PASSED" | "FIRST READING";
  title: string;
  body: string;
  outcome: string;
};

const topItems: TopItem[] = [
  {
    status: "PASSED",
    title: "Treasure Island affordable housing and transit grant approved",
    body: "The Board approved a $45.1 million state award for Treasure Island, combining a $30 million loan for a 100% affordable family housing project and $15.1 million for transportation, streetscape, and pedestrian improvements.",
    outcome: "Adopted unanimously (11-0).",
  },
  {
    status: "PASSED",
    title: "Port funds approved for dry dock removal and safety",
    body: "The Board approved $18.5 million from the Port's Harbor Fund balance for stabilizing and disposing of dry docks, along with other shipyard safety and improvement work to reduce safety risks.",
    outcome: "Finally passed unanimously (11-0).",
  },
  {
    status: "PASSED",
    title: "SFMTA parking management contracts expanded at Port sites",
    body: "The Board approved amendments increasing the maximum value of two long-term contracts for private management of Port-controlled parking facilities, authorizing up to $408 million through 2032.",
    outcome: "Both resolutions adopted unanimously (11-0).",
  },
  {
    status: "FIRST READING",
    title: "New Fire Code adopted with updated fees and rules",
    body: "The Board advanced a complete replacement of San Francisco's Fire Code, adopting the 2025 California Fire Code and parts of the 2024 International Fire Code with local amendments.",
    outcome: "Passed on first reading unanimously (11-0).",
  },
  {
    status: "FIRST READING",
    title: "Funding approved for expanded street conditions staffing",
    body: "The Board approved $4.0 million for the Department of Emergency Management to expand staffing focused on street conditions, plus $150,000 for Human Rights Commission community initiatives.",
    outcome: "Passed on first reading unanimously (11-0).",
  },
];

const moreActions = [
  "Rules changed to streamline Shared Spaces outdoor permits - Passed on first reading unanimously (11-0).",
  "Historic buildings allowed broader reuse under zoning changes - Passed on first reading unanimously (11-0).",
  "Fisherman's Wharf entertainment zone created across waterfront streets - Finally passed unanimously (11-0).",
  "Fire Department appointment authority shifted from Fire Commission - Finally passed unanimously (11-0).",
  "Outdoor tsunami warning system restoration urged in split vote - Adopted 10-1 (Mandelman no).",
];

const watchlist = [
  "Final vote pending: $4.0 million for expanded street conditions staffing at the Department of Emergency Management and $150,000 for Human Rights Commission community initiatives.",
  "Final vote pending: Planning Code changes to allow broader adaptive reuse of historic buildings citywide.",
  "Final vote pending: Shared Spaces Program overhaul removing several outreach, notice, and application requirements.",
  "Final vote pending: Adoption of a new San Francisco Fire Code based on updated state and international model codes.",
  "Introduced and referred: Department of Public Health contract amendment with San Francisco AIDS Foundation, up to $23.83 million through June 2030.",
  "Introduced and referred: Department of Public Health contract amendment with Rafiki Coalition for Health and Wellness, up to $20.08 million through June 2030.",
  "Introduced and referred: Lease amendment for Human Services Agency offices at 3119/3125/3127 Mission Street through September 2030.",
  "Introduced and referred: Lease amendment for Human Services Agency offices at 3120 Mission Street through September 2030.",
  "Introduced and referred: Animal Care and Control acceptance of a $100,000.25 gift from the Whilt Living Trust.",
  "Extended review timeline: Planning Commission granted a 270-day extension for proposed formula retail policy changes (File No. 250816).",
];

export default function SamplePage() {
  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0B2545]">
      <div className="h-1 w-full bg-[#F2B705]" />

      <header className="border-b border-[#D7DEE8] bg-white/70">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm font-medium tracking-wide text-[#5B6472] transition hover:text-[#0B2545]"
          >
            ← Back to home
          </Link>
          <p className="text-xl font-semibold tracking-tight [font-family:Georgia,'Times_New_Roman',serif]">
            CitySmart
          </p>
          <div className="w-[92px]" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
        <article className="overflow-hidden rounded-[18px] border border-[#D7DEE8] bg-white shadow-xl shadow-[#0B2545]/5">
          <div className="h-2 w-full bg-[#F2B705]" />

          <div className="px-5 py-7 md:px-8">
            <header className="rounded-xl border border-[#D7DEE8] bg-white p-5 md:p-6">
              <div className="flex items-center gap-4">
                <img
                  src="https://tj2099.github.io/sf-bos-newsletter-assets/sf-bos-logo.png"
                  alt="SF BOS"
                  width={64}
                  height={64}
                  className="h-14 w-14 rounded-full border border-[#D7DEE8] object-cover md:h-16 md:w-16"
                />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5B6472]">
                    San Francisco - Board of Supervisors
                  </p>
                  <h1 className="mt-2 text-4xl font-black leading-[1.08] tracking-tight text-[#0B2545] [font-family:Georgia,'Times_New_Roman',serif] md:text-5xl">
                    SF BOS Weekly
                  </h1>
                  <p className="mt-2 text-base text-[#5B6472]">Friday, March 06, 2026</p>
                </div>
              </div>
            </header>

            <section className="mt-5 rounded-2xl border border-[#D7DEE8] bg-white p-5 md:p-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://tj2099.github.io/sf-bos-newsletter-assets/icon-lightning.png"
                  alt=""
                  width={34}
                  height={34}
                  className="h-8 w-8 rounded-md border border-[#D7DEE8]"
                />
                <h2 className="text-sm font-black uppercase tracking-[0.14em] text-[#0B2545] md:text-base">
                  What happened this week?
                </h2>
              </div>

              <p className="mt-4 rounded-[14px] border border-[#D7DEE8] bg-[#FBFAF7] p-4 text-base leading-[1.8] text-[#0B2545] md:text-[1.08rem]">
                The Board approved major funding and policy moves spanning affordable housing on Treasure Island, Port
                safety work, and large parking-management contracts tied to waterfront facilities. Several citywide
                regulatory changes, including a full Fire Code update and streamlined Shared Spaces rules, advanced on
                first reading and will return for final votes. The Board also backed restoring outdoor tsunami warning
                infrastructure, passing the measure on a 10-1 vote.
              </p>

              <p className="mt-3 text-sm text-[#5B6472]">
                <a
                  href="https://sfbos.org/meeting/minutes/2026/bag030326_minutes"
                  className="font-medium text-[#1D4ED8] underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the source minutes
                </a>
              </p>
            </section>

            <section className="mt-5 overflow-hidden rounded-2xl border border-[#D7DEE8] bg-white">
              <div className="border-b border-[#D7DEE8] bg-[#F9FBFF] px-5 py-4 md:px-6">
                <div className="flex items-center gap-3">
                  <img
                    src="https://tj2099.github.io/sf-bos-newsletter-assets/icon-check.png"
                    alt=""
                    width={34}
                    height={34}
                    className="h-8 w-8 rounded-md border border-[#D7DEE8]"
                  />
                  <h2 className="text-sm font-black uppercase tracking-[0.14em] text-[#0B2545] md:text-base">
                    Top items
                  </h2>
                </div>
              </div>

              <div>
                {topItems.map((item, index) => (
                  <article
                    key={item.title}
                    className={[
                      "px-5 py-5 md:px-6",
                      index !== 0 ? "border-t border-[#D7DEE8]" : "",
                    ].join(" ")}
                  >
                    <div className="mb-3">
                      <span
                        className={[
                          "inline-block rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.04em]",
                          item.status === "PASSED"
                            ? "border-black/10 bg-[#E7F6EC] text-[#16794C]"
                            : "border-black/10 bg-[#FFF7E0] text-[#8A5A00]",
                        ].join(" ")}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-black leading-tight text-[#0B2545]">{item.title}</h3>
                    <p className="mt-2 text-[1.02rem] leading-relaxed text-[#0B2545]">{item.body}</p>
                    <p className="mt-2 text-sm text-[#5B6472]">{item.outcome}</p>

                    {index === 1 && (
                      <div className="mt-4 rounded-xl border border-[#D7DEE8] bg-[#FBFBF8] p-4">
                        <p className="text-xs font-black uppercase tracking-[0.08em] text-[#0B2545]">Budget scale context</p>
                        <p className="mt-2 text-3xl font-black leading-none text-[#0B2545]">$18,500,000</p>
                        <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">
                          Compared with FY2026-27 Port proposed budget: $2,193,782,318.
                        </p>
                        <p className="mt-2 text-xs text-[#5B6472]">
                          <a
                            href="https://www.sf.gov/documents/41137/FY2026__FY2027_-_MAYORS_PROPOSED_INTERIM_AAO_-_6.1.25.pdf"
                            className="text-[#1D4ED8] underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Mayor's Interim Budget and Appropriation Ordinance (p. 17)
                          </a>
                        </p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-5 rounded-2xl border border-[#D7DEE8] bg-white p-5 md:p-6">
              <h2 className="text-sm font-black uppercase tracking-[0.14em] text-[#0B2545] md:text-base">More actions</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5B6472]">
                {moreActions.map((action) => (
                  <li key={action}>- {action}</li>
                ))}
              </ul>
            </section>

            <section className="mt-5 rounded-2xl border border-[#D7DEE8] bg-[#F9FBFF] p-5 md:p-6">
              <h2 className="text-sm font-black uppercase tracking-[0.14em] text-[#0B2545] md:text-base">Watchlist</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5B6472]">
                {watchlist.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </section>

            <section className="mt-5 rounded-2xl border border-[#D7DEE8] bg-white p-5 md:p-6">
              <h2 className="text-sm font-black uppercase tracking-[0.14em] text-[#0B2545] md:text-base">Sources</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5B6472]">
                <li>
                  Tue, Mar 03, 2026: {" "}
                  <a
                    href="https://sfbos.org/meeting/minutes/2026/bag030326_minutes"
                    className="text-[#1D4ED8] underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://sfbos.org/meeting/minutes/2026/bag030326_minutes
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
