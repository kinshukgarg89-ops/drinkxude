"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const flavours = [
  {
    id: "lemon-mint",
    name: "Lemon Mint",
    tagline: "Crisp. Refreshing. Sharp.",
    description: "A bright citrus hit balanced with cool mint for instant refreshment.",
    color: "#D4F46C",
    hoverText: "dark",
    canGradient: ["#D4F46C", "#a8d648"],
  },
  {
    id: "mango-passion",
    name: "Mango Passion",
    tagline: "Tropical. Smooth. Vibrant.",
    description: "Sun-ripe mango meets exotic passion fruit for a bold escape.",
    color: "#FFB800",
    hoverText: "dark",
    canGradient: ["#FFB800", "#e69b00"],
  },
];

function CanVisual({ gradient }: { gradient: string[] }) {
  return (
    <svg viewBox="0 0 120 260" className="w-full h-full drop-shadow-2xl">
      <defs>
        <linearGradient id={`canGrad-${gradient[0].replace("#", "")}`} x1="0" y1="0" x2="120" y2="260">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="60%" stopColor={gradient[1]} />
          <stop offset="100%" stopColor={gradient[0]} />
        </linearGradient>
        <linearGradient id={`metal-${gradient[0].replace("#", "")}`} x1="0" y1="0" x2="120" y2="0">
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="50%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
      </defs>
      <path
        d="M20 30 C20 15 35 8 60 8 C85 8 100 15 100 30 L100 230 C100 245 85 252 60 252 C35 252 20 245 20 230 Z"
        fill={`url(#canGrad-${gradient[0].replace("#", "")})`}
      />
      <path
        d="M20 30 C20 42 35 50 60 50 C85 50 100 42 100 30 C100 18 85 10 60 10 C35 10 20 18 20 30 Z"
        fill={`url(#metal-${gradient[0].replace("#", "")})`}
      />
      <path
        d="M20 230 C20 242 35 250 60 250 C85 250 100 242 100 230 C100 218 85 210 60 210 C35 210 20 218 20 230 Z"
        fill={`url(#metal-${gradient[0].replace("#", "")})`}
      />
      <rect x="28" y="55" width="64" height="150" rx="2" fill="rgba(0,0,0,0.06)" />
      <text
        x="60"
        y="140"
        textAnchor="middle"
        fill="rgba(0,0,0,0.8)"
        fontSize="14"
        fontWeight="900"
        fontFamily="var(--font-dm-sans), sans-serif"
        letterSpacing="1"
      >
        XUDE
      </text>
    </svg>
  );
}

function FlavorCard({ flavour, idx, isDesktop }: { flavour: (typeof flavours)[0]; idx: number; isDesktop?: boolean }) {
  const isLightHover = flavour.hoverText === "light";
  const textHover = isLightHover ? "group-hover:text-white" : "group-hover:text-black";
  const mutedHover = isLightHover ? "group-hover:text-white/70" : "group-hover:text-black/60";

  return (
    <motion.div
      initial={{ opacity: 0, y: isDesktop ? 60 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * (isDesktop ? 0.15 : 0.1) }}
      className="group"
    >
      <motion.div
        whileHover={{ backgroundColor: flavour.color, y: isDesktop ? -6 : 0 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.35 }}
        className={`relative h-[520px] md:h-[600px] border border-black/10 p-5 md:p-8 flex flex-col justify-between overflow-hidden transition-colors duration-500 bg-[#fafafa] shadow-sm hover:shadow-xl ${
          isDesktop ? "" : ""
        }`}
      >
        <div className="flex justify-between items-start">
          <span className={`text-xs font-bold tracking-widest uppercase text-muted transition-colors duration-500 ${mutedHover}`}>
            0{idx + 1}
          </span>
          <ArrowRight
            className={`w-5 h-5 text-foreground/40 transition-colors duration-500 ${
              isLightHover ? "group-hover:text-white/70" : "group-hover:text-black/50"
            }`}
          />
        </div>
        <motion.div
          className="absolute top-[42%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-48 md:w-40 md:h-80"
          whileHover={{ scale: 1.08, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <CanVisual gradient={flavour.canGradient} />
        </motion.div>
        <div>
          <h3 className={`text-3xl md:text-4xl font-heading font-black tracking-tight mb-1 md:mb-2 transition-colors duration-500 ${textHover}`}>
            {flavour.name}
          </h3>
          <p className={`text-sm md:text-base font-semibold text-muted mb-3 md:mb-4 transition-colors duration-500 ${mutedHover}`}>
            {flavour.tagline}
          </p>
          <p className={`text-sm md:text-base text-muted leading-relaxed transition-colors duration-500 ${mutedHover}`}>
            {flavour.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FlavoursSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const canY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="flavours-section"
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-muted mb-4 block">
              The Lineup
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05]">
              Featured Flavours.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-muted font-medium max-w-sm"
          >
            Find your momentum. Two bold flavours, each designed to stand out.
          </motion.p>
        </div>
      </div>

      {/* Mobile: Horizontal scroll with peek */}
      <div className="md:hidden pl-4 pr-0">
        <div className="flex gap-4 snap-scroll pb-6">
          {flavours.map((flavour, idx) => (
            <div key={flavour.id} className="snap-start shrink-0 w-[72vw] first:ml-0">
              <FlavorCard flavour={flavour} idx={idx} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div style={{ y: canY }} className="grid grid-cols-2 gap-4">
          {flavours.map((flavour, idx) => (
            <FlavorCard key={flavour.id} flavour={flavour} idx={idx} isDesktop />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
