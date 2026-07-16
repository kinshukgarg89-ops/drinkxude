"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/CartProvider";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <CartProvider>
      <main className="relative w-full bg-background text-foreground min-h-screen antialiased pt-20">
        {/* alwaysSticky ensures the navbar starts and stays with a white background and dark text */}
        <Navigation alwaysSticky />
        
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 px-6 lg:px-12 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
              Energy Drink Customed <br />
              <span className="text-gradient-hook">For You.</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted font-medium max-w-2xl mx-auto leading-relaxed">
              We created XUDE for those who want smooth, plant-based energy without the traditional energy drink experience. Zero sugar. Pure fruit flavor.
            </p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[var(--lemon-mint)] blur-[120px]" />
            <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[var(--mango-passion)] blur-[120px]" />
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-6 lg:px-12 bg-[var(--shop-accent)]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Our Story</h2>
              <p className="text-lg text-muted leading-relaxed">
                Traditional energy drinks have been dominated by artificial flavors, high sugar, and synthetic ingredients that leave you feeling jittery and prone to a massive crash. We knew there had to be a better way.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                XUDE was born out of a desire to create a clean, plant-based alternative. By harnessing natural caffeine sources and perfecting a smooth, refreshing fruit flavor, we&apos;ve developed an energy drink that you can feel good about drinking every single day.
              </p>
            </div>
            
            {/* Replaced dummy box with a real existing asset from the project */}
            <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center bg-[#f5f5f5] border border-black/5">
              <Image 
                src="/assets/pst1.png" 
                alt="XUDE Energy Drink" 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 50vw" 
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-6 lg:px-12 bg-background">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">The XUDE Difference</h2>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[var(--shop-accent)] space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-[var(--lemon-mint)] flex items-center justify-center text-3xl mb-6 shadow-sm">🌱</div>
              <h3 className="text-2xl font-bold uppercase">Plant-Based</h3>
              <p className="text-muted text-lg">Natural caffeine extracted from green tea and yerba mate for a smooth, sustained lift without the jitters.</p>
            </div>
            <div className="p-8 rounded-3xl bg-[var(--shop-accent)] space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-[var(--mango-passion)] flex items-center justify-center text-3xl mb-6 shadow-sm">🚫</div>
              <h3 className="text-2xl font-bold uppercase">Zero Sugar</h3>
              <p className="text-muted text-lg">No sugar crashes. We use natural sweeteners to keep the taste perfect and the calories low.</p>
            </div>
            <div className="p-8 rounded-3xl bg-[var(--shop-accent)] space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-neutral-900 text-[var(--lemon-mint)] flex items-center justify-center text-3xl mb-6 shadow-sm">✨</div>
              <h3 className="text-2xl font-bold uppercase">Real Flavor</h3>
              <p className="text-muted text-lg">Crafted with authentic fruit flavors. A refreshing taste profile that is smooth and perfectly balanced.</p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </CartProvider>
  );
}
