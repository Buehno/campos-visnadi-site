import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { hero, firm } from "@/content/site";
import { LiquidMetalLink } from "@/components/ui/liquid-metal-button";
import { PointerParallax } from "@/components/motion/pointer-parallax";
import { HeroVisual } from "./hero-visual";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="surface-dark relative overflow-hidden pt-[var(--header-h)]"
    >
      {/* Faixa de gradiente institucional na base do hero: único uso amplo. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-[image:var(--cv-gradient-accent)] opacity-60" />

      <div className="container-cv grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:min-h-[min(calc(100svh-var(--header-h)),820px)] lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-8">
        <div className="lg:col-span-7">
          <p className="enter eyebrow flex items-center gap-3 text-on-dark-muted" style={i(0)}>
            <span aria-hidden className="h-0.5 w-8 rounded-full bg-[image:var(--cv-gradient-accent)]" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="enter text-display mt-6 max-w-[11ch]" style={i(1)}>
            O Direito pode ser <span className="text-magenta-300">inovador.</span>
          </h1>

          <p className="enter text-lead mt-7 max-w-[34rem] text-on-dark-muted" style={i(2)}>
            {hero.lead}
          </p>

          <div className="enter mt-10 flex flex-wrap items-center gap-4" style={i(3)}>
            <LiquidMetalLink href={hero.primary.href} tint={[0.95, 0.72, 0.86, 1]}>
              {hero.primary.label}
              <ArrowRight aria-hidden className="btn-arrow size-4" />
            </LiquidMetalLink>
            <a href={hero.secondary.href} className="btn btn-ghost-dark">
              {hero.secondary.label}
            </a>
          </div>

          <dl className="enter mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-on-dark-muted" style={i(4)}>
            <div className="flex gap-2">
              <dt className="sr-only">Sede</dt>
              <dd>
                Sede em {firm.address.city}/{firm.address.state}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="sr-only">Registro de marca</dt>
              <dd>
                Marca registrada no {firm.trademark.office} · processo {firm.trademark.process}
              </dd>
            </div>
          </dl>
        </div>

        <PointerParallax className="relative mx-auto aspect-[520/560] w-full max-w-[300px] sm:max-w-[380px] lg:col-span-5 lg:max-w-none">
          <HeroVisual />
        </PointerParallax>
      </div>
    </section>
  );
}
