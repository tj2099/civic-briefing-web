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
      <div className="h-1 w-full bg-[#F2B705]" />

      <header className="border-b border-[#C9CDD4] py-6">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-5xl font-semibold tracking-tight text-[#202229] [font-family:Georgia,'Times_New_Roman',serif]">
            CitySmart
          </p>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        <section className="max-w-[640px]">
          <h1 className="text-5xl font-semibold leading-[1.06] tracking-tight text-[#1A2A44] md:text-[4.25rem] [font-family:Georgia,'Times_New_Roman',serif]">
            City news, but only what matters.
          </h1>

          <p className="mt-8 max-w-[640px] text-xl leading-relaxed text-[#23344F] md:text-[1.1rem]">
            CitySmart sends a civic digest to your inbox each week with clear, concise updates from local government.
            Stay informed without reading hours of agendas and meeting transcripts.
          </p>

          <form className="mt-10" onSubmit={handleSubmit}>
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
                className="h-14 flex-1 border border-[#2C3440] bg-[#ECEBE9] px-4 text-sm font-semibold tracking-[0.12em] text-[#1A2A44] outline-none placeholder:text-[#7C8491] focus:border-[#1A2A44]"
              />
              <button
                type="submit"
                className="h-14 border border-[#1D2430] bg-[#1D2430] px-8 text-sm font-semibold tracking-[0.08em] text-[#F2B705] transition hover:bg-[#121722]"
              >
                SUBSCRIBE
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
                className="h-12 w-full max-w-[540px] border border-[#2C3440] bg-[#ECEBE9] px-3 text-sm font-medium text-[#1A2A44] outline-none focus:border-[#1A2A44]"
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

          <div className="mt-10 max-w-[540px] border-t border-[#B9C0CB] pt-7">
            <Link
              href="/sample"
              className="inline-flex items-center gap-3 text-xl font-medium tracking-tight text-[#1A2A44] transition hover:text-[#0B2545]"
            >
              <span>Read last week’s newsletter</span>
              <span className="text-[#F2B705]">→</span>
            </Link>
          </div>
        </section>

        <section className="flex justify-center md:justify-end">
          <div className="w-full max-w-[520px] rounded-[44px] border-4 border-[#F2B705] bg-[#ECEBE9] p-6">
            <div className="rounded-[30px] border border-[#D7DEE8] bg-[#F6F6F5] p-5">
              <div className="flex items-center justify-between text-[#C4C7CE]">
                <span className="text-4xl leading-none">‹</span>
                <span className="text-4xl leading-none">···</span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2B705] text-sm font-bold text-white">
                  C
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-20 rounded-full bg-[#E4E7EC]" />
                  <div className="h-2 w-12 rounded-full bg-[#ECEEF2]" />
                </div>
              </div>

              <article className="mt-5 overflow-hidden rounded-2xl border border-[#D7DEE8] bg-white">
                <div className="h-1 w-full bg-[#F2B705]" />
                <div className="p-6 text-center">
                  <p className="text-2xl font-semibold text-[#1A2A44] [font-family:Georgia,'Times_New_Roman',serif]">
                    CitySmart
                  </p>
                  <h2 className="mt-1 text-5xl font-semibold leading-tight text-[#1A2A44] [font-family:Georgia,'Times_New_Roman',serif]">
                    Weekly Edition
                  </h2>
                </div>
                <div className="border-t border-[#D7DEE8] p-6">
                  <div className="mx-auto flex h-52 w-full max-w-[240px] items-center justify-center rounded-xl border border-[#D7DEE8] bg-[#FBFAF7] text-7xl">
                    🗞️
                  </div>
                  <p className="mt-6 text-lg leading-relaxed text-[#3A475E]">
                    Important city decisions do not need to be buried in PDFs. CitySmart highlights policy votes,
                    budget moves, and neighborhood impacts in one clean weekly briefing.
                  </p>
                  <div className="mt-6 h-2 w-full bg-[#F2B705]" />
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
