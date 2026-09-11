/** Presets de movimento centralizados (GSAP). Valores em segundos. */
export const motion = {
  ease: "power3.out",
  reveal: { y: 20, duration: 0.45, stagger: 0.07 },
  pointer: { max: 6, duration: 0.6 },
  magnetic: { max: 6, duration: 0.35 },
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
