"use client";

import { motion, useReducedMotion } from "framer-motion";

type HeroCivicIllustrationProps = {
  className?: string;
};

export default function HeroCivicIllustration({ className = "" }: HeroCivicIllustrationProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={["w-full max-w-[380px] select-none", className].join(" ")}>
      <motion.svg
        viewBox="0 0 380 480"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-label="Person reading CitySmart on their phone"
        role="img"
      >
        <motion.g
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {/* ── Atmosphere circle ── */}
          <ellipse cx="192" cy="300" rx="148" ry="152" fill="#EDE8E0" />

          {/* ── Ground shadow ── */}
          <ellipse cx="192" cy="448" rx="44" ry="8" fill="#C8C0B4" opacity="0.35" />

          {/* All character parts in local coords relative to translate(192, 448) */}
          <g transform="translate(192, 448)">

            {/* ── SHOES ── */}
            <rect x="-30" y="-18" width="23" height="12" rx="6" fill="#1E2D40" />
            <rect x="7" y="-18" width="23" height="12" rx="6" fill="#1E2D40" />

            {/* ── PANTS / LEGS ── */}
            <rect x="-28" y="-82" width="19" height="66" rx="9" fill="#2D4A6A" />
            <rect x="9" y="-82" width="19" height="66" rx="9" fill="#2D4A6A" />

            {/* ── LEFT ARM (behind body, holding coffee) ── */}
            <path
              d="M -24,-152 C -30,-148 -46,-130 -52,-102 C -56,-92 -57,-84 -53,-80 C -48,-77 -42,-82 -40,-94 C -38,-108 -28,-128 -22,-148 Z"
              fill="#F2A57E"
            />

            {/* ── COFFEE CUP ── */}
            {/* Cup body */}
            <rect x="-64" y="-106" width="17" height="20" rx="3" fill="#C4856A" />
            {/* Cup rim/lid */}
            <rect x="-66" y="-108" width="21" height="5" rx="2.5" fill="#A06848" />
            {/* Handle */}
            <path
              d="M -47,-103 C -40,-103 -38,-100 -38,-97 C -38,-94 -40,-91 -47,-91"
              stroke="#A06848" strokeWidth="2.5" fill="none" strokeLinecap="round"
            />
            {/* Steam wisps */}
            <path
              d="M -58,-110 C -56,-116 -60,-121 -58,-128"
              stroke="#C4856A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55"
            />
            <path
              d="M -52,-112 C -50,-118 -54,-123 -52,-130"
              stroke="#C4856A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55"
            />

            {/* ── SHIRT / TORSO ── */}
            <path
              d="M -26,-82 C -30,-78 -32,-90 -32,-115 C -32,-140 -28,-158 -20,-163 L -8,-165 C -4,-165 4,-165 8,-165 L 20,-163 C 28,-158 32,-140 32,-115 C 32,-90 30,-78 26,-82 Z"
              fill="#4A6E8E"
            />

            {/* ── RIGHT ARM (in front, holding phone up) ── */}
            <path
              d="M 22,-155 C 30,-150 50,-154 68,-162 C 76,-166 80,-170 77,-176 C 73,-182 66,-180 60,-174 C 52,-165 34,-160 20,-158 Z"
              fill="#F2A57E"
            />

            {/* ── PHONE ── */}
            {/* Frame */}
            <rect x="68" y="-198" width="28" height="48" rx="6" fill="#1E2D40" />
            {/* Screen */}
            <rect x="71" y="-195" width="22" height="38" rx="3" fill="#F8F6F2" />
            {/* Terracotta accent bar */}
            <rect x="71" y="-195" width="22" height="4" rx="1" fill="#EA580C" />
            {/* CITYSMART micro-label */}
            <text
              x="82" y="-187"
              textAnchor="middle"
              fontSize="4.5"
              fontWeight="700"
              fill="#8A95A3"
              letterSpacing="0.12em"
              fontFamily="var(--font-geist-sans), Arial, sans-serif"
            >CITY</text>
            {/* Skeleton rows */}
            <rect x="73" y="-183" width="16" height="3" rx="1.5" fill="#0F1C2E" />
            <rect x="73" y="-177" width="12" height="3" rx="1.5" fill="#D1D5DB" />
            <rect x="73" y="-171" width="14" height="3" rx="1.5" fill="#D1D5DB" />
            <rect x="73" y="-165" width="10" height="3" rx="1.5" fill="#D1D5DB" />

            {/* ── NECK ── */}
            <rect x="-8" y="-176" width="16" height="14" rx="5" fill="#F2A57E" />

            {/* ── EARS ── */}
            <ellipse cx="-50" cy="-210" rx="8" ry="10" fill="#F2A57E" />
            <ellipse cx="-50" cy="-210" rx="5" ry="6" fill="#E8946A" />
            <ellipse cx="50" cy="-210" rx="8" ry="10" fill="#F2A57E" />
            <ellipse cx="50" cy="-210" rx="5" ry="6" fill="#E8946A" />

            {/* ── HEAD ── */}
            <circle cx="0" cy="-207" r="50" fill="#F2A57E" />

            {/* ── HAIR ── */}
            <path
              d="M -36,-217 C -50,-226 -54,-250 -46,-263 C -36,-276 -18,-280 0,-280 C 18,-280 36,-276 46,-263 C 54,-250 50,-226 36,-217 C 26,-212 16,-210 10,-209 C 4,-208 -4,-208 -10,-209 C -16,-210 -26,-212 -36,-217 Z"
              fill="#3D2314"
            />
            {/* Side hair tendril */}
            <path
              d="M -38,-218 C -46,-212 -48,-202 -44,-194"
              stroke="#3D2314" strokeWidth="7" fill="none" strokeLinecap="round"
            />

            {/* ── FACE ── */}
            {/* Eyebrows */}
            <path d="M -24,-222 Q -16,-227 -8,-223" stroke="#3D2314" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <path d="M 8,-223 Q 16,-227 24,-222" stroke="#3D2314" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="-16" cy="-212" r="5" fill="#1E2D40" />
            <circle cx="-14" cy="-214" r="1.5" fill="white" />
            <circle cx="16" cy="-212" r="5" fill="#1E2D40" />
            <circle cx="18" cy="-214" r="1.5" fill="white" />
            {/* Nose */}
            <circle cx="0" cy="-202" r="3" fill="#E8946A" />
            {/* Mouth */}
            <path d="M -10,-192 Q 0,-188 10,-192" stroke="#3D2314" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Cheeks */}
            <ellipse cx="-26" cy="-198" rx="9" ry="5" fill="#EA580C" opacity="0.14" />
            <ellipse cx="26" cy="-198" rx="9" ry="5" fill="#EA580C" opacity="0.14" />
          </g>

          {/* ── LABEL ── */}
          <text
            x="192" y="470"
            textAnchor="middle"
            fontSize="10"
            fill="#8A95A3"
            letterSpacing="0.05em"
            fontFamily="var(--font-geist-sans), Arial, sans-serif"
          >San Francisco · Mar 6</text>
        </motion.g>
      </motion.svg>
    </div>
  );
}
