"use client";

import { motion, useReducedMotion } from "framer-motion";

type HeroNewsletterAnimationProps = {
  compact?: boolean;
  className?: string;
};

type PopCard = {
  id: string;
  label: string;
  headline: string;
  detail: string;
  x: number;
  y: number;
  rotate: number;
  mobile: boolean;
};

const desktopCards: PopCard[] = [
  {
    id: "budget",
    label: "Budget Watch",
    headline: "$18.5M Port safety",
    detail: "Dry dock removal funding passed",
    x: -168,
    y: 150,
    rotate: -4,
    mobile: true,
  },
  {
    id: "insight",
    label: "Why It Matters",
    headline: "Faster local accountability",
    detail: "Track policy impact week-to-week",
    x: 190,
    y: 146,
    rotate: 5,
    mobile: false,
  },
  {
    id: "vote",
    label: "Key Vote",
    headline: "Tsunami system restored",
    detail: "Adopted 10-1",
    x: 4,
    y: 208,
    rotate: 0,
    mobile: true,
  },
];

export default function HeroNewsletterAnimation({
  compact = false,
  className = "",
}: HeroNewsletterAnimationProps) {
  const reduceMotion = useReducedMotion();

  const cards = compact ? desktopCards.filter((card) => card.mobile).slice(0, 3) : desktopCards;

  return (
    <div
      className={[
        "relative mx-auto w-full",
        compact ? "max-w-[360px] h-[340px]" : "max-w-[560px] h-[620px]",
        className,
      ].join(" ")}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        className={[
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] border border-[#D7DEE8] bg-[#FBFBFA] shadow-[0_18px_40px_rgba(11,37,69,0.12)]",
          compact ? "w-[262px]" : "w-[380px]",
        ].join(" ")}
      >
        <div className="h-[6px] w-full bg-[#F2B705]" />
        <div className="border-b border-[#D7DEE8] px-5 py-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5B6472]">This Week at City Hall</p>
          <h3 className="mt-2 text-[1.9rem] font-semibold leading-[1.02] text-[#0B2545] [font-family:Georgia,'Times_New_Roman',serif]">
            CitySmart Weekly
          </h3>
          <p className="mt-1 text-xs text-[#5B6472]">Friday Issue</p>
        </div>

        <div className="space-y-3 px-5 py-4">
          <div className="rounded-xl border border-[#D7DEE8] bg-white p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5B6472]">Summary</p>
            <p className="mt-1 text-sm leading-relaxed text-[#0B2545]">
              Major votes, budget actions, and implementation updates in one quick read.
            </p>
          </div>

          <div className="rounded-xl border border-[#D7DEE8] bg-[#F9FBFF] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5B6472]">Top items</p>
            <div className="mt-2 space-y-1.5">
              <div className="h-2 w-[82%] rounded-full bg-[#DDE4EE]" />
              <div className="h-2 w-[68%] rounded-full bg-[#E6EBF3]" />
              <div className="h-2 w-[76%] rounded-full bg-[#E6EBF3]" />
            </div>
          </div>
        </div>
      </motion.div>

      {cards.map((card, index) => {
        const stagger = 0.22 + index * 0.1;
        const floatDelay = 1 + index * 0.2;

        return (
          <motion.div
            key={card.id}
            initial={
              reduceMotion
                ? { opacity: 1, x: card.x, y: card.y, rotate: card.rotate, scale: 1 }
                : { opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.92 }
            }
            animate={
              reduceMotion
                ? { opacity: 1, x: card.x, y: card.y, rotate: card.rotate, scale: 1 }
                : { opacity: 1, x: card.x, y: card.y, rotate: card.rotate, scale: 1 }
            }
            transition={{ duration: 0.5, delay: stagger, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute left-1/2 top-1/2"
          >
            <motion.div
              animate={
                reduceMotion
                  ? { y: 0 }
                  : {
                      y: [0, -5, 0],
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: floatDelay,
                    }
              }
              className={[
                "-translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#D7DEE8] bg-white px-3 py-2.5 shadow-[0_10px_24px_rgba(11,37,69,0.10)]",
                compact ? "w-[176px]" : "w-[196px]",
              ].join(" ")}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5B6472]">{card.label}</p>
              <p className="mt-1 text-sm font-semibold leading-tight text-[#0B2545]">{card.headline}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#5B6472]">{card.detail}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
