"use client";

import { useEffect } from "react";
import { onFirstInteraction } from "@/lib/interaction";
import { motion, prefersReducedMotion } from "./presets";

/**
 * Revela blocos [data-reveal] uma única vez ao entrar na viewport.
 * GSAP só é carregado após a primeira interação (fora da janela de carga) e
 * só oculta o que ainda está abaixo da dobra naquele momento: sem JS, sem
 * interação ou com reduced motion, todo o conteúdo permanece visível.
 */
export function RevealRoot() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const stop = onFirstInteraction(() =>
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          const vh = window.innerHeight;
          const targets = gsap.utils
            .toArray<HTMLElement>("[data-reveal]")
            .filter((el) => el.getBoundingClientRect().top > vh * 0.92);
          if (!targets.length) return;
          gsap.set(targets, { autoAlpha: 0, y: motion.reveal.y });
          ScrollTrigger.batch(targets, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: motion.reveal.duration,
                ease: motion.ease,
                stagger: motion.reveal.stagger,
                overwrite: true,
                clearProps: "transform,visibility",
              }),
          });
          // Âncoras, busca do navegador e teclado: revela o que receber foco.
          const onFocus = (e: FocusEvent) => {
            const el = (e.target as HTMLElement).closest<HTMLElement>("[data-reveal]");
            if (el) gsap.set(el, { autoAlpha: 1, y: 0 });
          };
          document.addEventListener("focusin", onFocus);
          return () => document.removeEventListener("focusin", onFocus);
        });
      }),
    );

    return () => {
      cancelled = true;
      stop();
      ctx?.revert();
    };
  }, []);

  return null;
}
