"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { Hero } from "@/components/hero";
import { TheDifference } from "@/components/the-difference";
import { WhatIsInside } from "@/components/what-is-inside";
import { ShopSection } from "@/components/shop";
import { JoinUsSection } from "@/components/join-us";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CartProvider } from "@/context/CartProvider";

export default function Home() {
  return (
    <CartProvider>
      <main className="relative w-full bg-background text-foreground min-h-screen antialiased">
        <CustomCursor />
        <Navigation />
        <Hero />
        <TheDifference />
        <WhatIsInside />
        <ShopSection />
        <JoinUsSection />
        <Footer />
        <ScrollToTop />
      </main>
    </CartProvider>
  );
}
