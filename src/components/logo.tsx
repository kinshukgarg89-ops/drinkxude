"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src="/assets/Xude_Final_Logo.svg"
      alt="Xude Energy"
      fill
      priority={priority}
      className={cn("object-contain", className)}
    />
  );
}
