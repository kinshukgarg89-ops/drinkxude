"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { motion, useScroll, useTransform } from "framer-motion";

const stories = [
  {
    id: "ambition",
    eyebrow: "01 / Ambition",
    title: "Energy for everyday ambition.",
    description:
      "Whether you're building, creating, or pushing through the afternoon slump, Xude delivers clean focus without the synthetic rush.",
    image: ASSETS.difference.stories[0].image,
    alt: ASSETS.difference.stories[0].alt,
  },
  {
    id: "fruit",
    eyebrow: "02 / Fruit First",
    title: "Inspired by fruit, not chemicals.",
    description:
      "Familiar flavours crafted for modern performance. We started with real fruit inspiration and built an energy drink around it.",
    image: ASSETS.difference.stories[1].image,
    alt: ASSETS.difference.stories[1].alt,
  },
  {
    id: "craft",
    eyebrow: "03 / Craft",
    title: "Crafted differently.",
    description:
      "A thoughtful approach to clean energy. Plant-based caffeine, zero sugar, and ingredients chosen with intention.",
    image: ASSETS.difference.stories[2].image,
    alt: ASSETS.difference.stories[2].alt,
  },
];

export function TheDifference() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Tracks scroll progress strictly within the 300vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. The Math for "Revealing from Behind"
  // Card 1 (Top Layer): Slides up and out of frame during the first half of the scroll
  const card1Y = useTransform(scrollYProgress, [0, 0.5], ["0%", "-120%"]);
  const card1Opacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]); // Fades out as it leaves

  // Card 2 (Middle Layer): Stays put, then slides up and out during the second half
  const card2Y = useTransform(scrollYProgress, [0.5, 1], ["0%", "-120%"]);
  const card2Opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  // Card 3 (Bottom Layer): Needs no transform, it just sits at the back.

  return (
    <div id="difference-section" className="w-full bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="pt-16 md:pt-20 pb-8 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tight">
              Why we&apos;re different.
            </h2>
            <p className="text-lg text-muted font-medium md:text-right">
              Three principles that guide every can we make.
            </p>
          </div>
        </div>
      </div>

      <section ref={containerRef} className="relative h-[300vh] w-full bg-background">
        {/* 1. THE TRACK: 300vh forces a long scroll distance. The user is trapped scrolling this height. */}
        
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-10"> 
          {/* 2. THE PINNED VIEW: This locks to the screen while the user scrolls down the 300vh track. */}
          
          <div className="relative w-full max-w-5xl h-[700px] md:h-[500px]"> 
            {/* 3. THE STAGE: Cards go here. */}

            {/* Card 3 (Bottom Layer) - Doesn't move */}
            <div className="absolute inset-0 z-10">
              <div className="bg-[#FAFAFA] border border-black/10 shadow-xl rounded-2xl p-3 md:p-4 w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-hidden">
                <div className="relative h-full min-h-[300px] md:min-h-0 overflow-hidden rounded-xl bg-[#f5f5f5] border border-black/5">
                  <Image src={stories[2].image} alt={stories[2].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="flex flex-col justify-center py-2 md:py-4">
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted mb-2 md:mb-3 block">
                    {stories[2].eyebrow}
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black tracking-tight leading-[1.05] mb-3 md:mb-4">
                    {stories[2].title}
                  </h3>
                  <p className="text-sm md:text-base text-muted font-medium leading-relaxed max-w-md">
                    {stories[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 (Middle Layer) */}
            <motion.div 
              className="absolute inset-0 z-20 shadow-2xl rounded-2xl bg-background"
              style={{ y: card2Y, opacity: card2Opacity }}
            >
              <div className="bg-[#FAFAFA] border border-black/10 shadow-xl rounded-2xl p-3 md:p-4 w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-hidden">
                <div className="relative h-full min-h-[300px] md:min-h-0 overflow-hidden rounded-xl bg-[#f5f5f5] border border-black/5">
                  <Image src={stories[1].image} alt={stories[1].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="flex flex-col justify-center py-2 md:py-4">
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted mb-2 md:mb-3 block">
                    {stories[1].eyebrow}
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black tracking-tight leading-[1.05] mb-3 md:mb-4">
                    {stories[1].title}
                  </h3>
                  <p className="text-sm md:text-base text-muted font-medium leading-relaxed max-w-md">
                    {stories[1].description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 1 (Top Layer) */}
            <motion.div 
              className="absolute inset-0 z-30 shadow-2xl rounded-2xl bg-background"
              style={{ y: card1Y, opacity: card1Opacity }}
            >
              <div className="bg-[#FAFAFA] border border-black/10 shadow-xl rounded-2xl p-3 md:p-4 w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-hidden">
                <div className="relative h-full min-h-[300px] md:min-h-0 overflow-hidden rounded-xl bg-[#f5f5f5] border border-black/5">
                  <Image src={stories[0].image} alt={stories[0].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="flex flex-col justify-center py-2 md:py-4">
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted mb-2 md:mb-3 block">
                    {stories[0].eyebrow}
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black tracking-tight leading-[1.05] mb-3 md:mb-4">
                    {stories[0].title}
                  </h3>
                  <p className="text-sm md:text-base text-muted font-medium leading-relaxed max-w-md">
                    {stories[0].description}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
