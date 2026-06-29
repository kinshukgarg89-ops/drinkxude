"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ASSETS } from "@/lib/assets";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src={ASSETS.logo}
      alt="Xude Energy"
      fill
      priority={priority}
      className={cn("object-contain", className)}
    />
  );
}
