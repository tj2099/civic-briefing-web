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

      <main className="mx-auto grid w-full max-w-[1320px] gap-12 px-6 pb-16 pt-14 md:grid-cols-[45%_55%] md:gap-24 md:px-10 md:pb-24 md:pt-24">
        <section className="max-w-[620px] md:pt-14">
          <h1 className="max-w-[600px] text-[clamp(3.5rem,5vw,5.5rem)] font-semibold leading-[0.98] tracking-tight text-[#1A2A44] [font-family:Georgia,'Times_New_Roman',serif]">
            City news, but only what matters.
          </h1>

          <p className="mt-8 max-w-[480px] text-[1.03rem] leading-[1.55] text-[#23344F] md:text-[1.06rem]">
            CitySmart sends a civic digest to your inbox each week with clear, concise updates from local government.
            Stay informed without reading hours of agendas and meeting transcripts.
          </p>

          <form className="mt-8 max-w-[520px]" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="EMAIL"
                required
                className="h-14 flex-1 border border-[#313745] bg-[#ECEBE9] px-4 text-sm font-semibold tracking-[0.1em] text-[#1A2A44] outline-none placeholder:text-[#858D99] focus:border-[#1A2A44]"
              />
              <button
                type="submit"
                className="h-14 border border-[#1D2430] bg-[#1D2430] px-8 text-sm font-semibold tracking-[0.06em] text-[#F2B705] transition hover:bg-[#161D28] sm:whitespace-nowrap"
              >
                GET WEEKLY BRIEFINGS
              </button>
            </div>

            <div className="mt-3">
              <label className="sr-only" htmlFor="city">
                City
              </label>
              <select
                id="city"
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

          <div className="mt-8 max-w-[520px] border-t border-[#BCC2CD] pt-6">
            <Link
              href="/sample"
              className="inline-flex items-center gap-3 text-[1.4rem] font-medium tracking-tight text-[#1A2A44] transition hover:text-[#0B2545] md:text-[1.65rem]"
            >
              <span>Read last week’s newsletter</span>
              <span className="text-[#F2B705]">→</span>
            </Link>
          </div>
        </section>

        <section className="flex justify-center md:justify-end md:pt-10">
          <div className="w-full max-w-[560px] rounded-[52px] border-[3px] border-[#F2B705] bg-[#ECEBE9] p-4 md:max-w-[560px] md:p-5">
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
        </section>
      </main>
    </div>
  );
}
