"use client";

import { motion, useReducedMotion } from "framer-motion";

type VoteItem = {
  category: string;
  categoryColor: string;
  title: string;
  detail: string;
  outcome: string;
  outcomeStyle: string;
};

const voteItems: VoteItem[] = [
  {
    category: "Housing",
    categoryColor: "bg-[#DCFCE7] text-[#166534]",
    title: "Treasure Island affordable housing package",
    detail: "$42M in financing approved",
    outcome: "Passed",
    outcomeStyle: "bg-[#DCFCE7] text-[#166534]",
  },
  {
    category: "Budget",
    categoryColor: "bg-[#EEF2FF] text-[#4338CA]",
    title: "Port safety upgrades and dry dock removal",
    detail: "$18.5M allocated",
    outcome: "Approved 11–0",
    outcomeStyle: "bg-[#EEF2FF] text-[#4338CA]",
  },
  {
    category: "Safety",
    categoryColor: "bg-[#FEF3C7] text-[#92400E]",
    title: "Outdoor tsunami warning system restored",
    detail: "Infrastructure measure",
    outcome: "Passed 10–1",
    outcomeStyle: "bg-[#FEF3C7] text-[#92400E]",
  },
];

type HeroNewsletterAnimationProps = {
  className?: string;
};

function EmojiLabel({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#FFF7ED] text-sm">
        {emoji}
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A95A3]">{label}</p>
    </div>
  );
}

export default function HeroNewsletterAnimation({ className = "" }: HeroNewsletterAnimationProps) {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.35 },
    },
  };

  const itemVariants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
  };

  return (
    <div className={["w-full max-w-[420px] rotate-[1.5deg]", className].join(" ")}>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        className="overflow-hidden rounded-[20px] border border-[#E2E5EA] bg-white shadow-[0_24px_64px_rgba(15,28,46,0.14)]"
      >
        {/* Terracotta accent bar */}
        <div className="h-[5px] w-full bg-[#EA580C]" />

        {/* Header */}
        <div className="border-b border-[#F0F2F5] bg-[#FAFAF8] px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A95A3]">
            This week in city hall
          </p>
          <div className="mt-1.5 flex items-baseline justify-between gap-2">
            <h3 className="text-[1.55rem] font-normal leading-tight text-[#0F1C2E] [font-family:var(--font-serif)]">
              CitySmart Weekly
            </h3>
            <span className="shrink-0 text-xs text-[#8A95A3]">Tue, Mar 18</span>
          </div>
        </div>

        {/* Summary */}
        <div className="border-b border-[#F0F2F5] px-5 py-4">
          <EmojiLabel emoji="📋" label="Summary" />
          <p className="mt-3 text-[13px] leading-[1.6] text-[#4A5568]">
            The board approved major housing and safety measures this week, including a $42M Treasure
            Island package and restored tsunami warning infrastructure on a 10–1 vote.
          </p>
        </div>

        {/* Vote items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-5"
        >
          <div className="py-3">
            <EmojiLabel emoji="✅" label="Top items" />
          </div>

          <div className="divide-y divide-[#F0F2F5]">
            {voteItems.map((item) => (
              <motion.div key={item.title} variants={itemVariants} className="py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span
                      className={[
                        "mb-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        item.categoryColor,
                      ].join(" ")}
                    >
                      {item.category}
                    </span>
                    <p className="text-[13px] font-medium leading-snug text-[#0F1C2E]">{item.title}</p>
                    <p className="mt-0.5 text-[11px] text-[#8A95A3]">{item.detail}</p>
                  </div>
                  <span
                    className={[
                      "mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap",
                      item.outcomeStyle,
                    ].join(" ")}
                  >
                    {item.outcome}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#F0F2F5] bg-[#FAFAF8] px-5 py-3">
          <p className="text-[11px] text-[#8A95A3]">
            <span className="font-semibold text-[#0F1C2E]">+4 more items</span> this week
          </p>
          <p className="text-[11px] font-semibold text-[#EA580C]">Read full briefing →</p>
        </div>
      </motion.div>
    </div>
  );
}
