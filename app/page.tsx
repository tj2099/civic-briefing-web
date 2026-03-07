"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type City = {
  id: string | number;
  name: string;
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCities = async () => {
      setIsLoadingCities(true);

      const { data, error } = await supabase
        .from("cities")
        .select("id,name")
        .eq("is_active", true)
        .order("name", { ascending: true });

      if (!isMounted) return;

      if (error || !data) {
        setCities([]);
        setErrorMessage("Unable to load cities right now. Please try again.");
        setIsLoadingCities(false);
        return;
      }

      setCities(data);
      setIsLoadingCities(false);
    };

    void loadCities();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const normalizedEmail = email.trim().toLowerCase();
    const selectedCity = cities.find((item) => String(item.id) === city);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!normalizedEmail) {
      setErrorMessage("Email is required.");
      return;
    }

    if (!emailRegex.test(normalizedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!city || !selectedCity) {
      setErrorMessage("City is required.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("subscribers").insert({
      email: normalizedEmail,
      city_id: selectedCity.id,
      status: "active",
    });

    if (error) {
      const isDuplicate =
        error.code === "23505" ||
        /duplicate/i.test(error.message) ||
        /already subscribed/i.test(error.message);

      setErrorMessage(
        isDuplicate
          ? "You are already subscribed for that city."
          : "Something went wrong. Please try again.",
      );
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage(`Thanks — you're signed up for ${selectedCity.name} briefings.`);
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F6F3EE] text-[#0B2545]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-16 h-64 w-64 rounded-full bg-[#F2B705]/10 blur-3xl" />
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#1D4ED8]/8 blur-3xl" />
      </div>

      <header className="mx-auto w-full max-w-5xl px-6 pt-6">
        <div className="rounded-full bg-white/90 px-5 py-3 shadow-sm ring-1 ring-[#D7DEE8]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-base font-semibold tracking-tight text-[#0B2545]">CitySmart</span>
            <nav aria-label="Primary" className="flex items-center gap-5 text-sm text-[#5B6472]">
              <a className="transition-colors hover:text-[#0B2545]" href="#">
                About
              </a>
              <a className="transition-colors hover:text-[#0B2545]" href="#">
                Cities
              </a>
              <a className="transition-colors hover:text-[#0B2545]" href="#">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
        <section className="rounded-3xl bg-white/90 p-8 shadow-xl shadow-[#0B2545]/5 ring-1 ring-[#D7DEE8] md:p-12">
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#0B2545] md:text-6xl">
            Understand what your city government is actually doing.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5B6472] md:text-xl">
            CitySmart turns long city agendas and meetings into sharp weekly briefings you can read in minutes.
          </p>

          <form
            className="mt-10 grid gap-3 rounded-2xl bg-[#F9FBFF] p-3 ring-1 ring-[#D7DEE8] md:grid-cols-[1fr_220px_auto] md:p-4"
            onSubmit={handleSubmit}
          >
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="h-12 w-full rounded-xl border-0 bg-white px-4 text-sm text-[#0B2545] shadow-sm outline-none ring-1 ring-[#D7DEE8] transition placeholder:text-[#5B6472]/70 focus:ring-2 focus:ring-[#1D4ED8]"
            />

            <label className="sr-only" htmlFor="city">
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
              disabled={isLoadingCities || isSubmitting}
              className="h-12 w-full rounded-xl border-0 bg-white px-4 text-sm text-[#0B2545] shadow-sm outline-none ring-1 ring-[#D7DEE8] transition focus:ring-2 focus:ring-[#1D4ED8]"
            >
              <option value="">{isLoadingCities ? "Loading cities..." : "Select city"}</option>
              {cities.map((cityOption) => (
                <option key={cityOption.id} value={String(cityOption.id)}>
                  {cityOption.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={isSubmitting || isLoadingCities}
              className="h-12 rounded-xl bg-[#0B2545] px-6 text-sm font-semibold text-white transition hover:bg-[#12325B] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {(errorMessage || successMessage) && (
            <p
              className={`mt-4 text-sm ${errorMessage ? "text-[#B42318]" : "text-[#16794C]"}`}
              aria-live="polite"
            >
              {errorMessage || successMessage}
            </p>
          )}

          <p
            className="mt-12 mb-6 text-center text-lg font-semibold tracking-tight text-[#0B2545]"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            See a sample newsletter below
          </p>

          <div
            className="mt-5 flex justify-center"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            <article className="w-full max-w-[680px] overflow-hidden rounded-[18px] bg-white shadow-lg shadow-[#0B2545]/5 ring-1 ring-[#D7DEE8]">
              <div className="h-2 w-full bg-[#F2B705]" />

              <div className="px-5 py-7 md:px-8">
                <header>
                  <p className="text-center text-sm font-bold uppercase tracking-[0.22em] text-[#5B6472] leading-relaxed">
                    San Francisco - Board of Supervisors
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-[#F2B705] to-[#E9A800] text-xl shadow-sm ring-1 ring-[#D7DEE8]">
                      🌉
                    </div>
                    <div>
                      <h2 className="text-5xl font-semibold leading-[1.05] tracking-tight text-[#0B2545] md:text-6xl">
                        SF BOS Weekly
                      </h2>
                      <p className="mt-2 text-sm text-[#5B6472] leading-relaxed md:text-[16px]">
                        Friday, March 06, 2026
                      </p>
                    </div>
                  </div>
                </header>

                <div className="mt-7 border-t border-[#D7DEE8] pt-6">
                  <section className="rounded-2xl border border-[#D7DEE8] bg-white p-5 md:p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F9FBFF] text-base ring-1 ring-[#D7DEE8]">
                        ⚡
                      </div>
                      <h3 className="text-[30px] font-bold uppercase tracking-[0.12em] text-[#0B2545] md:text-[34px]">
                        What happened this week?
                      </h3>
                    </div>

                    <div className="mt-5 rounded-[14px] border border-[#D7DEE8] bg-[#FBFAF7] p-5">
                      <p className="text-sm text-[#5B6472] leading-relaxed">
                        The Board approved major funding and policy moves spanning affordable housing on Treasure Island, Port safety work, and large parking-management contracts tied to waterfront facilities. Several citywide regulatory changes including a full Fire Code update and streamlined Shared Spaces rules advanced on first reading and will return for final votes. The Board also backed restoring outdoor tsunami warning infrastructure, passing the measure on a 10-1 vote.
                      </p>
                    </div>
                  </section>
                </div>

                <section className="mt-5 rounded-2xl border border-[#D7DEE8] bg-white p-5 md:p-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B2545]">Top items</h3>

                  <div className="mt-4 space-y-3">
                    <article className="rounded-xl border border-[#D7DEE8] bg-[#FBFAF7] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-base font-semibold leading-snug text-[#0B2545]">
                          Treasure Island affordable housing and transit grant package
                        </h4>
                        <span className="shrink-0 rounded-full bg-[#E7F6EC] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#16794C]">
                          Passed
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">
                        Supervisors approved financing and grant alignment to accelerate affordable units and improve transit access to the island.
                      </p>
                    </article>

                    <article className="rounded-xl border border-[#D7DEE8] bg-white p-4">
                      <h4 className="text-base font-semibold leading-snug text-[#0B2545]">
                        Port safety updates and dry dock removal planning
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">
                        A safety-focused port package advanced with procurement guidance for dry dock removal and hazard mitigation timelines.
                      </p>
                    </article>

                    <article className="rounded-xl border border-[#D7DEE8] bg-white p-4">
                      <h4 className="text-base font-semibold leading-snug text-[#0B2545]">
                        SFMTA parking management contracts near waterfront facilities
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">
                        Contract authorizations moved forward with additional oversight language on performance and enforcement metrics.
                      </p>
                    </article>

                    <article className="rounded-xl border border-[#D7DEE8] bg-white p-4">
                      <h4 className="text-base font-semibold leading-snug text-[#0B2545]">
                        Fire Code update and tsunami warning infrastructure restoration
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">
                        A full code modernization package advanced on first reading while restoration of coastal warning systems was adopted 10-1.
                      </p>
                    </article>
                  </div>
                </section>

                <section className="mt-5 rounded-2xl border border-[#D7DEE8] bg-white p-5 md:p-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B2545]">More actions</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5B6472]">
                    <li>Shared Spaces streamlining legislation advanced to next reading with technical amendments.</li>
                    <li>Controller reporting cadence was tightened for major infrastructure expenditures.</li>
                    <li>Budget &amp; Finance committee scheduled follow-up hearings on implementation deadlines.</li>
                  </ul>
                </section>

                <section className="mt-5 rounded-2xl border border-[#D7DEE8] bg-[#F9FBFF] p-5 md:p-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B2545]">Watchlist</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5B6472]">
                    <li>Final vote timing for Fire Code updates and related enforcement rules.</li>
                    <li>Port implementation milestones and contractor selection transparency.</li>
                    <li>Treasury and grant disbursement pacing for Treasure Island housing delivery.</li>
                  </ul>
                </section>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-5xl px-6 pb-10 text-sm text-[#5B6472]">
        <div className="rounded-2xl bg-white/90 px-5 py-4 ring-1 ring-[#D7DEE8]">
          <p className="font-semibold text-[#0B2545]">CitySmart</p>
          <p className="mt-1">contact@citysmart.com</p>
          <p className="mt-1">© {new Date().getFullYear()} CitySmart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
