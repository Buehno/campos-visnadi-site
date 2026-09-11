"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { firm } from "@/content/site";
import type { FounderPhoto } from "@/lib/founder-photo";
import { hasFinePointer, prefersReducedMotion } from "@/components/motion/presets";
import { Wordmark } from "./wordmark";
import simbolo from "../../../public/brand/cv-simbolo.png";

const MAX_TILT = 6; // graus

/**
 * Cartão do fundador: foto recortada "em relevo" saindo do topo do cartão,
 * camadas em profundidade (translateZ) e inclinação sutil ao ponteiro.
 * Sem JS ou em touch/reduced motion, o cartão é estático.
 */
export function FounderCard({ photo }: { photo: FounderPhoto | null }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !hasFinePointer() || prefersReducedMotion()) return;
    const scope = stage.closest("section") ?? stage;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        stage.style.setProperty("--ry", `${x * MAX_TILT}deg`);
        stage.style.setProperty("--rx", `${-y * MAX_TILT}deg`);
        stage.style.setProperty("--gx", `${50 + x * 30}%`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      stage.style.setProperty("--ry", "0deg");
      stage.style.setProperty("--rx", "0deg");
      stage.style.setProperty("--gx", "50%");
    };
    scope.addEventListener("pointermove", onMove as EventListener);
    scope.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      scope.removeEventListener("pointermove", onMove as EventListener);
      scope.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <figure className="fc enter-card mx-auto w-full max-w-[25rem]">
      <div ref={stageRef} className="fc-stage">
        <div className="fc-bg" aria-hidden="true">
          <span className="fc-ring" />
          <Image src={simbolo} alt="" width={220} height={220} className="fc-watermark" />
        </div>

        {photo ? (
          <Image
            src={photo.src}
            alt={`${firm.founder.name}, fundador e sócio-titular da ${firm.fullName}`}
            width={photo.width}
            height={photo.height}
            priority
            sizes="(min-width: 1024px) 400px, 80vw"
            className="fc-photo"
          />
        ) : (
          <div className="fc-photo-fallback" aria-hidden="true">
            <Image src={simbolo} alt="" width={180} height={180} priority />
          </div>
        )}

        <figcaption className="fc-plate">
          <span className="block font-display text-[1.75rem] font-bold leading-none text-on-dark">
            {firm.founder.name}
          </span>
          <span className="mt-2 block text-sm text-on-dark-muted">
            {firm.founder.role} · {firm.founder.registration}
          </span>
          <span className="mt-4 flex items-center justify-between gap-3 border-t border-[rgb(248_246_243/0.14)] pt-4">
            <Wordmark className="h-3.5 w-auto text-on-dark" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-magenta-300">
              {firm.descriptor}
            </span>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
