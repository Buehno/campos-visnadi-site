import { firm, journey } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function Journey() {
  return (
    <section id="trajetoria" aria-labelledby="trajetoria-title" className="section-y">
      <div className="container-cv grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)]">
            <SectionHeading id="trajetoria-title" eyebrow={journey.eyebrow} title={journey.title} intro={journey.intro} />
            <div className="mt-8 border-t border-line pt-8" data-reveal>
              <p className="font-display text-[2rem] font-bold leading-none text-roxo-900">{firm.founder.name}</p>
              <p className="mt-2 text-muted-ink">{firm.founder.role}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Destaques profissionais">
                {journey.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-roxo-100 px-3.5 py-1.5 text-sm font-semibold text-roxo-700">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ol className="relative lg:col-span-6 lg:col-start-7" aria-label="Marcos da trajetória jurídica">
          <span
            aria-hidden
            className="absolute bottom-3 left-[7px] top-3 w-0.5 rounded-full bg-[image:linear-gradient(180deg,#c0247e,#e07b2e_70%,var(--cv-line))]"
          />
          {journey.milestones.map((m) => (
            <li key={m.title} data-reveal className="relative pb-12 pl-10 last:pb-0">
              <span aria-hidden className="absolute left-0 top-1.5 size-4 rounded-full border-[3px] border-paper bg-magenta-500 shadow-[0_0_0_1px_var(--cv-line-strong)]" />
              <p className="font-display text-xl font-semibold text-magenta-600">{m.period}</p>
              <h3 className="type-h3 mt-1 text-roxo-900">{m.title}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.1em] text-muted-ink">{m.place}</p>
              <p className="mt-3 max-w-[52ch] text-muted-ink">{m.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
