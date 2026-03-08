"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("San Francisco");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ email, city });
  };

  return (
    <div className="min-h-screen bg-[#ECEBE9] text-[#1A2A44]">
      <div className="h-[2px] w-full bg-[#F2B705]" />

      <header className="border-b border-[#C9CDD4]">
        <div className="mx-auto max-w-[1320px] px-6 py-8 text-center md:px-10 md:py-9">
          <p className="text-5xl font-semibold tracking-tight text-[#1E222C] [font-family:Georgia,'Times_New_Roman',serif] md:text-[4.2rem]">
            CitySmart
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1240px] px-8 md:px-20 lg:px-24">
        <section className="pb-14 pt-12 md:hidden">
          <div className="max-w-[390px]">
            <h1 className="text-[clamp(3rem,11vw,4.35rem)] font-semibold leading-[0.98] tracking-tight [font-family:Georgia,'Times_New_Roman',serif]">
              City news, but only what matters.
            </h1>

            <p className="mt-6 max-w-[360px] text-[1rem] leading-[1.55] text-[#23344F]">
              CitySmart sends a civic digest to your inbox each week with clear, concise updates from local
              government.
            </p>

            <form className="mt-7 max-w-[360px]" onSubmit={handleSubmit}>
              <div className="flex gap-2">
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
                  className="h-12 min-w-0 flex-1 border border-[#313745] bg-[#ECEBE9] px-3 text-sm font-semibold tracking-[0.09em] text-[#1A2A44] outline-none placeholder:text-[#858D99] focus:border-[#1A2A44]"
                />
                <button
                  type="submit"
                  className="h-12 border border-[#1D2430] bg-[#1D2430] px-4 text-xs font-semibold tracking-[0.05em] text-[#F2B705] transition hover:bg-[#161D28]"
                >
                  GET THE BRIEFING
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
                  className="h-10 w-full border border-[#C2C8D2] bg-[#ECEBE9] px-3 text-sm text-[#1A2A44] outline-none focus:border-[#1A2A44]"
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

            <p className="mt-4 max-w-[360px] text-xs leading-relaxed text-[#5B6472]">
              By subscribing you agree to our privacy policy and terms of use.
            </p>

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
              City news, but only what matters.
            </h1>

            <p className="mt-7 max-w-[480px] text-[1.06rem] leading-[1.55] text-[#23344F]">
              CitySmart sends a civic digest to your inbox each week with clear, concise updates from local government.
              Stay informed without reading hours of agendas and meeting transcripts.
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
                  className="h-14 border border-[#1D2430] bg-[#1D2430] px-8 text-sm font-semibold tracking-[0.06em] text-[#F2B705] transition hover:bg-[#161D28] whitespace-nowrap"
                >
                  GET WEEKLY BRIEFINGS
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
            <div className="w-full max-w-[235px] rounded-[52px] border-[3px] border-[#F2B705] bg-[#ECEBE9] p-4 md:max-w-[235px] lg:max-w-[250px] md:p-5">
              <div className="rounded-[38px] border border-[#CDD3DC] bg-[#F2F3F2] p-4 md:p-5">
                <div className="flex items-center justify-between text-[#C4C8CF]">
                  <span className="text-[2.45rem] leading-none">‹</span>
                  <span className="text-[2.3rem] leading-none">···</span>
                </div>

                <div className="mt-4 flex items-center gap-3 px-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2B705] text-sm font-bold text-white">
                    C
                  </div>
                  <div className="space-y-2">
                    <div className="h-2.5 w-24 rounded-full bg-[#D8DCE2]" />
                    <div className="h-2.5 w-16 rounded-full bg-[#E4E7EC]" />
                  </div>
                </div>

                <article className="mt-6 overflow-hidden rounded-[18px] border border-[#CDD3DC] bg-[#F8F8F8]">
                  <div className="h-1.5 w-full bg-[#F2B705]" />
                  <div className="border-b border-[#D6DCE6] px-6 py-7 text-center">
                    <p className="text-2xl font-semibold text-[#1A2A44] [font-family:Georgia,'Times_New_Roman',serif] md:text-3xl">
                      CitySmart
                    </p>
                    <h2 className="mt-1 text-5xl font-semibold leading-[0.98] text-[#1A2A44] [font-family:Georgia,'Times_New_Roman',serif] md:text-[4rem]">
                      Weekly Edition
                    </h2>
                  </div>
                  <div className="px-6 py-6">
                    <div className="mx-auto flex h-60 w-full max-w-[280px] items-center justify-center rounded-xl border border-[#D7DEE8] bg-white text-8xl">
                      🏛️
                    </div>
                    <p className="mt-6 text-[1.05rem] leading-[1.45] text-[#3E495F]">
                      Important city decisions do not need to be buried in PDFs. CitySmart highlights policy votes,
                      budget moves, and neighborhood impacts in one clean weekly briefing.
                    </p>
                    <div className="mt-6 h-[6px] w-full bg-[#F2B705]" />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
