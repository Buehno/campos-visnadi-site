import { identity, office } from "@/content/site";

export function Office() {
  return (
    <section id="escritorio" aria-labelledby="escritorio-title" className="section-y">
      <div className="container-cv">
        <p className="eyebrow flex items-center gap-3 text-magenta-600" data-reveal>
          <span aria-hidden className="h-0.5 w-8 rounded-full bg-[image:var(--cv-gradient-accent)]" />
          {office.eyebrow}
        </p>
        <h2 id="escritorio-title" className="sr-only">
          Escritório — filosofia, missão, visão e valores
        </h2>

        {/* Composição tipográfica: filosofia do escritório. */}
        <figure className="relative mt-10 max-w-5xl" data-reveal>
          <span aria-hidden className="font-display absolute -left-1 -top-10 select-none text-[9rem] font-bold leading-none text-roxo-100 sm:text-[12rem]">
            “
          </span>
          <blockquote className="font-display relative space-y-4 text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] font-semibold leading-[1.06] text-roxo-900">
            {office.philosophy.map((line, i) => (
              <p key={line} className={i === office.philosophy.length - 1 ? "text-magenta-600" : undefined}>
                {line}
              </p>
            ))}
          </blockquote>
          <figcaption className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-muted-ink">
            Filosofia do escritório
          </figcaption>
        </figure>

        {/* Missão, visão e valores */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:mt-24 lg:grid-cols-12" data-reveal>
          <div className="relative bg-roxo-900 p-7 text-on-dark sm:p-9 lg:col-span-4">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[image:var(--cv-gradient-accent)]" />
            <h3 className="eyebrow text-magenta-300">Missão</h3>
            <p className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.1]">{identity.mission}</p>
          </div>
          <div className="bg-surface p-7 sm:p-9 lg:col-span-4">
            <h3 className="eyebrow text-magenta-600">Visão</h3>
            <p className="mt-4 text-lead text-roxo-900">{identity.vision}</p>
          </div>
          <div className="bg-surface p-7 sm:p-9 lg:col-span-4">
            <h3 className="eyebrow text-magenta-600">Valores</h3>
            <ul className="mt-4 divide-y divide-line">
              {identity.values.map((v) => (
                <li key={v.name} className="flex flex-wrap items-baseline gap-x-2 py-2.5 first:pt-0 last:pb-0">
                  <span className="font-semibold text-roxo-900">{v.name}</span>
                  <span className="text-[0.9375rem] text-muted-ink">— {v.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
