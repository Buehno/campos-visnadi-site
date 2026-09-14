"use client";

/**
 * Motion Footer — "curtain reveal" com GSAP ScrollTrigger.
 * Base: https://21st.dev/community/components/easemize/motion-footer/default
 * (Hossain Jahed, publicado em 30/03/2026; licença não informada na página —
 * ver docs/component-sources.md). Adaptado à marca Campos Visnadi:
 *  - conteúdo real do escritório (sem textos/links da demonstração);
 *  - removidos marquee, aurora em loop, grid de fundo, batimento e blur
 *    (loops contínuos e glassmorphism conflitam com o briefing);
 *  - pills magnéticas com deslocamento máximo de 6px, só com ponteiro fino;
 *  - cortina e scrub apenas com viewport ≥ 768×700 e sem reduced motion;
 *    em telas pequenas/zoom o rodapé volta ao fluxo normal (reflow).
 *  - fonte e cores via tokens do projeto (sem @import externo).
 */

import * as React from "react";
import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/brand/wordmark";
import { channels, contactCta, firm, nav } from "@/content/site";
import { hasFinePointer, motion, prefersReducedMotion } from "@/components/motion/presets";
import { onFirstInteraction } from "@/lib/interaction";

const CURTAIN_QUERY =
  "(min-width: 768px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";

const STYLES = `
.cv-curtain { position: relative; }
.cv-footer { position: relative; }
@media ${CURTAIN_QUERY} {
  .cv-curtain { height: 100svh; clip-path: polygon(0% 0, 100% 0%, 100% 100%, 0 100%); }
  .cv-footer { position: fixed; inset: auto 0 0 0; height: 100svh; }
}
.cv-pill {
  background: rgb(248 246 243 / 0.06);
  border: 1px solid rgb(248 246 243 / 0.16);
  transition: background-color 200ms var(--ease-out), border-color 200ms var(--ease-out), color 200ms var(--ease-out);
}
.cv-pill:hover { background: rgb(248 246 243 / 0.12); border-color: rgb(248 246 243 / 0.4); color: var(--cv-on-dark); }
.cv-giant {
  font-family: var(--font-display), "Arial Narrow", sans-serif;
  font-weight: 700;
  font-size: 27vw;
  line-height: 0.78;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgb(248 246 243 / 0.12);
  background: linear-gradient(180deg, rgb(192 36 126 / 0.28) 0%, transparent 62%);
  -webkit-background-clip: text;
  background-clip: text;
}
`;

// -------------------------------------------------------------------------
// Magnetic primitive (amplitude contida)
// -------------------------------------------------------------------------
type MagneticProps = React.HTMLAttributes<HTMLElement> & {
  as?: "a" | "button";
  href?: string;
  type?: "button" | "submit";
};

const Magnetic = React.forwardRef<HTMLElement, MagneticProps>(function Magnetic(
  { as = "a", className, children, ...props },
  forwardedRef,
) {
  const localRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = localRef.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    let cleanup = () => {};
    let cancelled = false;
    // GSAP só é carregado quando o ponteiro chega ao elemento.
    const onFirstEnter = () => import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const max = motion.magnetic.max;
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
        gsap.to(el, { x: x * max, y: y * max, duration: motion.magnetic.duration, ease: motion.ease });
      };
      const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: motion.ease });
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanup = () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        gsap.set(el, { clearProps: "transform" });
      };
    });
    el.addEventListener("pointerenter", onFirstEnter, { once: true });
    return () => {
      cancelled = true;
      el.removeEventListener("pointerenter", onFirstEnter);
      cleanup();
    };
  }, []);

  const Comp = as as React.ElementType;
  return (
    <Comp
      ref={(node: HTMLElement | null) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
});

// -------------------------------------------------------------------------
// Footer
// -------------------------------------------------------------------------
export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let mm: { revert: () => void } | undefined;
    let cancelled = false;

    const stop = onFirstInteraction(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const m = gsap.matchMedia();
      mm = m;
      m.add(CURTAIN_QUERY, () => {
        gsap.fromTo(
          giantRef.current,
          { yPercent: 18, scale: 0.9, autoAlpha: 0.2 },
          {
            yPercent: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: { trigger: wrapper, start: "top 85%", end: "bottom bottom", scrub: 1 },
          },
        );
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: wrapper, start: "top 60%", end: "top 10%", scrub: 1 },
          },
        );
      });
    }));

    return () => {
      cancelled = true;
      stop();
      mm?.revert();
    };
  }, []);

  const scrollToTop = () => {
    const smooth = !prefersReducedMotion();
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    document.getElementById("conteudo")?.focus({ preventScroll: true });
  };

  const year = new Date().getFullYear();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div ref={wrapperRef} className="cv-curtain w-full">
        <footer
          aria-labelledby="rodape-title"
          className="cv-footer surface-dark flex w-full flex-col justify-between overflow-hidden"
        >
          <div
            ref={giantRef}
            aria-hidden
            className="cv-giant pointer-events-none absolute -bottom-[3vw] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
          >
            VISNADI
          </div>

          <div className="container-cv relative z-10 flex flex-1 flex-col justify-center pb-10 pt-20 md:pt-[calc(var(--header-h)+32px)]">
            <div ref={headingRef}>
              <Wordmark className="h-5 w-auto text-on-dark sm:h-6" />
              <p className="eyebrow mt-3 text-on-dark-muted">{firm.descriptor}</p>
              <h2 id="rodape-title" className="text-display mt-10 max-w-[12ch] text-[clamp(2.75rem,1.4rem+5vw,6rem)]">
                {firm.tagline}
              </h2>
            </div>

            <div ref={linksRef} className="mt-10 flex flex-col gap-6 md:mt-12">
              <div className="flex flex-wrap gap-3">
                <Magnetic as="a" href={contactCta.href} className="btn btn-light">
                  {contactCta.label}
                </Magnetic>
              </div>
              <nav aria-label="Rodapé">
                <ul className="flex flex-wrap gap-2 sm:gap-3">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Magnetic
                        as="a"
                        href={item.href}
                        className="cv-pill inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold text-on-dark-muted"
                      >
                        {item.label}
                      </Magnetic>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="container-cv relative z-20 flex flex-col gap-6 border-t border-[rgb(248_246_243/0.12)] py-8 text-sm text-on-dark-muted md:flex-row md:items-end md:justify-between">
            <div className="space-y-1.5">
              <p>
                © {year} {firm.legalName} · CNPJ {firm.cnpj}
              </p>
              <address className="not-italic">
                {firm.address.street} · {firm.address.neighborhood} · {firm.address.city}/{firm.address.state} · CEP{" "}
                {firm.address.postalCode}
              </address>
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                <a href={`mailto:${channels.email}`} className="underline-offset-4 hover:text-on-dark hover:underline">
                  {channels.email}
                </a>
                <a href={channels.phoneHref} className="underline-offset-4 hover:text-on-dark hover:underline">
                  {channels.phoneDisplay}
                </a>
                {channels.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:text-on-dark hover:underline"
                  >
                    {s.label}
                  </a>
                ))}
              </p>
              <p>
                Marca registrada no {firm.trademark.office} · processo nº {firm.trademark.process}
              </p>
            </div>
            <Magnetic
              as="button"
              type="button"
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              className={cn("cv-pill inline-flex size-12 shrink-0 items-center justify-center self-start rounded-full text-on-dark md:self-auto")}
            >
              <ArrowUp aria-hidden className="size-5" />
            </Magnetic>
          </div>
        </footer>
      </div>
    </>
  );
}
