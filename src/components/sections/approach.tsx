import { approach } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function Approach() {
  return (
    <section id="abordagem" aria-labelledby="abordagem-title" className="surface-dark section-y relative overflow-hidden">
      {/* Diagonal do "V": assinatura gráfica, discreta. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 hidden h-full w-px origin-top rotate-[28deg] bg-[image:linear-gradient(180deg,transparent,#c0247e_40%,#e07b2e_70%,transparent)] opacity-50 lg:block"
      />
      <div className="container-cv grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading id="abordagem-title" tone="dark" eyebrow={approach.eyebrow} title={approach.title} intro={approach.intro} />
        </div>

        <ol className="relative lg:col-span-6 lg:col-start-7">
          {/* Linha de progressão */}
          <span
            aria-hidden
            className="absolute bottom-6 left-[1.4375rem] top-6 w-px bg-[image:linear-gradient(180deg,#e27bb5,#e07b2e_70%,rgb(248_246_243/0.12))]"
          />
          {approach.steps.map((step, idx) => (
            <li key={step.title} data-reveal className="relative grid grid-cols-[3rem_1fr] gap-x-5 pb-10 last:pb-0 sm:gap-x-7">
              <span
                aria-hidden
                className="font-display relative z-10 flex size-12 items-center justify-center rounded-full border border-[rgb(248_246_243/0.28)] bg-roxo-900 text-xl font-semibold text-on-dark"
              >
                {idx + 1}
              </span>
              <div className="pt-2">
                <h3 className="text-h3">
                  <span className="sr-only">Etapa {idx + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[46ch] text-on-dark-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
