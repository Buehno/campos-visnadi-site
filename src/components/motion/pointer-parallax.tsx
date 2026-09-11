"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { hasFinePointer, motion, prefersReducedMotion } from "./presets";

/**
 * Resposta ao ponteiro limitada a ~6px por camada. Desligada em touch e em
 * reduced motion. Camadas são os filhos com [data-depth].
 */
export function PointerParallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !hasFinePointer() || prefersReducedMotion()) return;
    let cleanup = () => {};
    let cancelled = false;

    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const layers = Array.from(root.querySelectorAll<SVGElement>("[data-depth]")).map((el) => {
        const depth = Number(el.dataset.depth) || 1;
        return {
          depth,
          x: gsap.quickTo(el, "x", { duration: motion.pointer.duration, ease: motion.ease }),
          y: gsap.quickTo(el, "y", { duration: motion.pointer.duration, ease: motion.ease }),
        };
      });
      const maxDepth = Math.max(...layers.map((l) => l.depth));
      const scope = root.closest("section") ?? root;

      const onMove = (e: PointerEvent) => {
        const r = scope.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
        for (const l of layers) {
          const k = (l.depth / maxDepth) * motion.pointer.max;
          l.x(nx * k);
          l.y(ny * k);
        }
      };
      const onLeave = () => layers.forEach((l) => (l.x(0), l.y(0)));
      scope.addEventListener("pointermove", onMove as EventListener);
      scope.addEventListener("pointerleave", onLeave);
      cleanup = () => {
        scope.removeEventListener("pointermove", onMove as EventListener);
        scope.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
