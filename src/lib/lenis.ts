import Lenis from "lenis";

export type LenisInstance = InstanceType<typeof Lenis>;

export function getLenis(): LenisInstance | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as { lenis?: LenisInstance }).lenis ?? null;
}
