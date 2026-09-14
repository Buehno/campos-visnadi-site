"use client";

/**
 * Stats Bento — grade de indicadores.
 * Base: componente "stats-bento" fornecido pelo cliente (21st.dev). Adaptado:
 *  - dados reais via props (sem gráfico de crescimento nem nota G2 fictícios);
 *  - tokens da marca; padrão diagonal no ângulo do "V" oficial;
 *  - contagem animada ao entrar na viewport (uma vez), sem JS o número final
 *    já está no HTML; desligada em prefers-reduced-motion;
 *  - semântica: <dl> com rótulo + valor, números legíveis por leitor de tela.
 */

import { useEffect, useRef, useState } from "react";
import { Building2, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

type Stat = { value: number; prefix?: string; label: string; body?: string };

type Props = {
  primary: Stat;
  secondary: Stat;
  since: { value: number; label: string };
  coffee: { label: string; body?: string };
  className?: string;
};

function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Só anima o que ainda não está visível; o que já está na tela fica fixo.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(to * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setValue(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("pt-BR")}
    </span>
  );
}

export function StatsBento({ primary, secondary, since, coffee, className }: Props) {
  return (
    <dl className={cn("grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2 lg:gap-5", className)}>
      {/* Indicador principal */}
      <div className="relative flex min-h-80 flex-col justify-between overflow-hidden rounded-3xl bg-roxo-900 p-8 text-on-dark sm:p-10 md:col-span-3 md:row-span-2">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(62deg,rgb(248_246_243/0.5)_0px_1px,transparent_1px_12px)] opacity-20 [mask-image:radial-gradient(ellipse_80%_60%_at_100%_0%,#000_60%,transparent_100%)]"
        />
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[image:var(--cv-gradient-accent)]" />
        <div className="relative">
          <dt className="inline-block rounded-full bg-[rgb(248_246_243/0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-on-dark-muted">
            {primary.label}
          </dt>
          <dd className="mt-6 font-display font-bold leading-[0.9] tracking-tight">
            <span className="block text-2xl text-magenta-300">{primary.prefix}</span>{" "}
            <span className="block text-[clamp(5rem,3rem+8vw,9rem)]">
              <CountUp to={primary.value} />
            </span>
          </dd>
        </div>
        {primary.body && <p className="relative mt-8 max-w-xs text-on-dark-muted">{primary.body}</p>}
      </div>

      {/* Indicador secundário */}
      <div className="flex items-center justify-between gap-6 rounded-3xl border border-line bg-roxo-100 p-7 sm:p-8 md:col-span-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-ink">{secondary.label}</dt>
          <dd className="mt-2 font-display text-[clamp(3rem,2.2rem+2.5vw,4.5rem)] font-bold leading-none text-roxo-900">
            <span className="align-top text-xl text-magenta-600">{secondary.prefix}</span>{" "}
            <CountUp to={secondary.value} />
          </dd>
          {secondary.body && <p className="mt-3 max-w-sm text-sm text-muted-ink">{secondary.body}</p>}
        </div>
        <span aria-hidden className="hidden size-16 shrink-0 items-center justify-center rounded-full bg-surface text-roxo-700 shadow-[var(--shadow-rest)] sm:inline-flex">
          <Building2 className="size-7" strokeWidth={1.5} />
        </span>
      </div>

      {/* Desde */}
      <div className="flex flex-col justify-center rounded-3xl border border-line bg-surface p-6 text-center md:col-span-1">
        <dt className="order-2 mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-ink">{since.label}</dt>
        <dd className="order-1 font-display text-4xl font-bold text-roxo-900">{since.value}</dd>
      </div>

      {/* Cafés */}
      <div className="flex items-center gap-4 rounded-3xl bg-roxo-100 p-6 md:col-span-2">
        <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface text-roxo-700 shadow-[var(--shadow-rest)]">
          <Coffee className="size-5" strokeWidth={1.75} />
        </span>
        <div>
          <dd className="text-5xl font-semibold leading-[0.8] text-magenta-600">
            <span aria-hidden>∞</span>
            <span className="sr-only">Infinitos</span>
          </dd>
          <dt className="mt-1 text-sm font-semibold text-roxo-900">{coffee.label}</dt>
          {coffee.body && <p className="mt-0.5 text-xs text-muted-ink">{coffee.body}</p>}
        </div>
      </div>
    </dl>
  );
}

export default StatsBento;
