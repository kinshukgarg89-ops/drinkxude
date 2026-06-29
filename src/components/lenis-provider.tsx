"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.2,
    });

    const win = window as unknown as { lenis?: Lenis };
    win.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete win.lenis;
    };
  }, []);

  return <>{children}</>;
}
