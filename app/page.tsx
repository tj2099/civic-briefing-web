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
      <div className="h-[3px] w-full bg-[#F2B705]" />

      <header className="border-b border-[#C9CDD4]">
        <div className="mx-auto max-w-7xl px-6 py-7 text-center md:py-8">
          <p className="text-5xl font-semibold tracking-tight text-[#1E222C] [font-family:Georgia,'Times_New_Roman',serif] md:text-6xl">
            CitySmart
          </p>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl gap-14 px-6 py-14 md:grid-cols-[minmax(0,560px)_minmax(0,520px)] md:justify-between md:items-center md:gap-20 md:py-20">
        <section className="max-w-[560px] md:pt-8">
          <h1 className="text-[3.35rem] font-semibold leading-[0.99] tracking-tight text-[#1A2A44] [font-family:Georgia,'Times_New_Roman',serif] md:text-[5.2rem]">
            City news, but only what matters.
          </h1>

          <p className="mt-8 max-w-[520px] text-[1.05rem] leading-[1.5] text-[#23344F] md:text-[1.05rem]">
            CitySmart sends a civic digest to your inbox each week with clear, concise updates from local government.
            Stay informed without reading hours of agendas and meeting transcripts.
          </p>

          <form className="mt-9 max-w-[520px]" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 sm:flex-row">
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
                className="h-14 border border-[#1D2430] bg-[#1D2430] px-8 text-sm font-semibold tracking-[0.06em] text-[#F2B705] transition hover:bg-[#161D28]"
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
              className="inline-flex items-center gap-3 text-2xl font-medium tracking-tight text-[#1A2A44] transition hover:text-[#0B2545]"
            >
              <span>Read last week’s newsletter</span>
              <span className="text-[#F2B705]">→</span>
            </Link>
          </div>
        </section>

        <section className="flex justify-center md:justify-end md:py-4">
          <div className="w-full max-w-[560px] rounded-[58px] border-[4px] border-[#F2B705] bg-[#ECEBE9] p-5 md:max-w-[540px] md:p-7">
            <div className="rounded-[40px] border border-[#CDD3DC] bg-[#F2F3F2] p-5 md:p-6">
              <div className="flex items-center justify-between text-[#C4C8CF]">
                <span className="text-[2.75rem] leading-none">‹</span>
                <span className="text-[2.5rem] leading-none">···</span>
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
                <div className="h-[5px] w-full bg-[#F2B705]" />
                <div className="border-b border-[#D6DCE6] px-6 py-7 text-center">
                  <p className="text-2xl font-semibold text-[#1A2A44] [font-family:Georgia,'Times_New_Roman',serif] md:text-3xl">
                    CitySmart
                  </p>
                  <h2 className="mt-1 text-5xl font-semibold leading-[0.98] text-[#1A2A44] [font-family:Georgia,'Times_New_Roman',serif] md:text-[4.2rem]">
                    Weekly Edition
                  </h2>
                </div>
                <div className="px-6 py-6">
                  <div className="mx-auto flex h-56 w-full max-w-[260px] items-center justify-center rounded-xl border border-[#D7DEE8] bg-white text-8xl">
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
