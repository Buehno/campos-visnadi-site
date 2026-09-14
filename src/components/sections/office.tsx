import { firm, office } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function Office() {
  const { address, founder } = firm;
  return (
    <section id="escritorio" aria-labelledby="escritorio-title" className="section-y">
      <div className="container-cv">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionHeading id="escritorio-title" eyebrow={office.eyebrow} title={office.title} />
            <div className="mt-6 max-w-[38rem] space-y-4 text-muted-ink" data-reveal>
              {office.body.map((p) => (
                <p key={p} className="text-lead">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Composição tipográfica: filosofia do escritório, no lugar de retrato. */}
          <figure className="relative lg:col-span-6" data-reveal>
            <span aria-hidden className="font-display absolute -left-1 -top-8 select-none text-[9rem] font-bold leading-none text-roxo-100 sm:text-[12rem]">
              “
            </span>
            <blockquote className="font-display relative text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] font-semibold leading-[1.04] text-roxo-900">
              O direito deve ser acessível, certeiro e justo. Ele deve{" "}
              <span className="text-magenta-600">ajudar, não constranger.</span>
            </blockquote>
            <figcaption className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-muted-ink">
              Filosofia do escritório
            </figcaption>
          </figure>
        </div>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:mt-24" data-reveal>
          <Fact term="Fundador e sócio-titular">
            <strong className="font-semibold text-roxo-900">{founder.name}</strong>
            <br />
            {founder.registration}
          </Fact>
          <Fact term="Sede">
            {address.street}
            <br />
            {address.neighborhood} · {address.city}/{address.state}
            <br />
            CEP {address.postalCode}
          </Fact>
          <Fact term="Valores">{firm.values.join(" · ")}</Fact>
        </dl>
      </div>
    </section>
  );
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface p-6 sm:p-7">
      <dt className="eyebrow text-magenta-600">{term}</dt>
      <dd className="mt-3 text-[0.9375rem] leading-relaxed text-muted-ink">{children}</dd>
    </div>
  );
}
