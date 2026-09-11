import { FileSignature, Braces, ShieldCheck, type LucideIcon } from "lucide-react";
import { practice } from "@/content/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const icons: Record<string, LucideIcon> = {
  contratos: FileSignature,
  pi: Braces,
  compliance: ShieldCheck,
};

export function PracticeAreas() {
  const [main, ...rest] = practice.areas;
  return (
    <section id="atuacao" aria-labelledby="atuacao-title" className="section-y border-t border-line bg-surface">
      <div className="container-cv">
        <SectionHeading id="atuacao-title" eyebrow={practice.eyebrow} title={practice.title} intro={practice.intro} />

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
          <AreaPanel area={main} featured className="lg:col-span-7 lg:row-span-2" />
          {rest.map((area) => (
            <AreaPanel key={area.id} area={area} className="lg:col-span-5" />
          ))}
        </div>
      </div>
    </section>
  );
}

function AreaPanel({
  area,
  featured = false,
  className,
}: {
  area: (typeof practice.areas)[number];
  featured?: boolean;
  className?: string;
}) {
  const Icon = icons[area.id];
  return (
    <article
      data-reveal
      aria-labelledby={`area-${area.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-paper p-7 shadow-[var(--shadow-rest)] transition-[transform,box-shadow,border-color] duration-200 ease-brand hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-lift)] sm:p-9",
        featured && "lg:p-12",
        className,
      )}
    >
      {featured && <span aria-hidden className="rule-gradient absolute inset-x-0 top-0 rounded-none" />}
      <span
        aria-hidden
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-full border border-line bg-surface text-roxo-700",
          featured && "size-14",
        )}
      >
        <Icon className={cn("size-5", featured && "size-6")} strokeWidth={1.75} />
      </span>

      <h3
        id={`area-${area.id}`}
        className={cn(
          "font-display mt-8 font-bold leading-[1.02] text-roxo-900",
          featured ? "text-[clamp(2rem,1.4rem+2.4vw,3.25rem)]" : "text-[1.875rem]",
        )}
      >
        {area.title}
      </h3>
      <p className={cn("mt-4 max-w-[46ch] text-muted-ink", featured && "text-lead")}>{area.body}</p>

      {featured ? (
        <ul className="mt-10 border-t border-line lg:mt-auto" aria-label={`Temas em ${area.title}`}>
          {area.topics.map((t) => (
            <li
              key={t}
              className="flex items-center justify-between gap-4 border-b border-line py-4 text-[1.0625rem] font-semibold text-roxo-900"
            >
              {t}
              <span aria-hidden className="h-0.5 w-6 rounded-full bg-[image:var(--cv-gradient-accent)]" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-7 flex flex-wrap gap-2" aria-label={`Temas em ${area.title}`}>
          {area.topics.map((t) => (
            <li key={t} className="rounded-full bg-roxo-100 px-3.5 py-1.5 text-sm font-semibold text-roxo-700">
              {t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
