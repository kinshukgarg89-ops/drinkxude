"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Sun, Zap, Activity, Shield, Flame, Feather } from "lucide-react";
import { ASSETS } from "@/lib/assets";

const leftIngredients = [
  {
    icon: Leaf,
    title: "Plant-Based Caffeine",
    description: "Caffeine from multiple plant sources, green tea and coffee bean extract for smooth, sustained focus.",
  },
  {
    icon: Zap,
    title: "Vitamin B12",
    description: "Known for blood formation, B12 helps in energy release from foods.",
  },
  {
    icon: Activity,
    title: "Vitamin B",
    description: "B-Vitamins help regulate cell health as well as metabolism. They also help support your adrenal glands to help you recover from fatigue.",
  },
  {
    icon: Shield,
    title: "Magnesium",
    description: "Known to boost energy production and helps to beat fatigue.",
  },
];

const rightIngredients = [
  {
    icon: Sun,
    title: "Vitamin D",
    description: "It is known for helping body to absorb calcium which is a key component for bones. It is also known for reducing fatigue.",
  },
  {
    icon: Flame,
    title: "Garcinia Cambogia",
    description: "Xude uses smart blend of green tea and garcinia made from tropical fruit known as Malabar Tamarind, which contains antioxidants like hydroxycitric acid (HCA) which boosts metabolism and support fat burn.",
  },
  {
    icon: Feather,
    title: "Calories",
    description: "We keep it simple and transparent — no sugar, just non-caloric sweeteners, making our drink only 2 calories.",
  },
];

export function WhatIsInside() {
  return (
    <section id="inside-section" className="relative w-full bg-foreground text-background py-24 md:py-32 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-background/50 mb-4 block">
            What&apos;s Inside
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Crafted with intention.
            <br />
            <span className="text-background/40">No compromises.</span>
          </h2>
        </motion.div>

        {/* Video + Text list in 3 columns for Desktop */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-4 lg:gap-6 justify-start order-2 lg:order-1">
            {leftIngredients.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group p-5 md:p-6 bg-background/5 border border-background/10 hover:bg-background/10 transition-colors duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                    <div className="flex items-center gap-3 md:gap-0">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-background/70 md:group-hover:scale-110 md:group-hover:text-background transition-all duration-300 shrink-0 md:mt-0.5" />
                      <h3 className="text-lg font-heading font-bold tracking-tight md:hidden">
                        {item.title}
                      </h3>
                    </div>
                    <div>
                      <h3 className="hidden md:block text-xl font-heading font-bold tracking-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-sm text-background/60 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Middle Video */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="flex-[1.2] xl:flex-[1.5] order-1 lg:order-2 relative w-full aspect-[9/16] md:aspect-square lg:aspect-auto"
          >
            <div className="absolute inset-0 bg-background/10 border border-background/10 overflow-hidden shadow-2xl">
              {/* Mobile Video */}
              <video
                src={ASSETS.inside.videoMobile}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover md:hidden"
              />
              {/* Desktop Video */}
              <video
                src={ASSETS.inside.videoDesktop}
                autoPlay
                muted
                loop
                playsInline
                className="hidden md:block w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-4 lg:gap-6 justify-start order-3 lg:order-3">
            {rightIngredients.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group p-5 md:p-6 bg-background/5 border border-background/10 hover:bg-background/10 transition-colors duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                    <div className="flex items-center gap-3 md:gap-0">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-background/70 md:group-hover:scale-110 md:group-hover:text-background transition-all duration-300 shrink-0 md:mt-0.5" />
                      <h3 className="text-lg font-heading font-bold tracking-tight md:hidden">
                        {item.title}
                      </h3>
                    </div>
                    <div>
                      <h3 className="hidden md:block text-xl font-heading font-bold tracking-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-sm text-background/60 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 lg:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {["Zero sugar", "No artificial colors", "No taurine", "No emulsifiers"].map((tag) => (
            <div
              key={tag}
              className="group flex items-center justify-center text-center py-5 md:py-6 px-4 bg-background/5 border border-background/10 text-sm md:text-base font-bold tracking-widest uppercase text-background/80 hover:bg-background/10 hover:text-background transition-all duration-300 cursor-default leading-tight"
            >
              {tag}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
