import { context } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function Context() {
  return (
    <section aria-labelledby="contexto-title" className="section-y">
      <div className="container-cv grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)]">
            <SectionHeading id="contexto-title" eyebrow={context.eyebrow} title={context.title} intro={context.intro} />
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {context.items.map((item, idx) => (
            <li
              key={item.title}
              data-reveal
              className="grid grid-cols-[3.25rem_1fr] gap-x-4 border-t border-line py-9 last:border-b sm:grid-cols-[4.5rem_1fr]"
            >
              <span aria-hidden className="font-display text-[2.5rem] font-semibold leading-none text-magenta-600 sm:text-5xl">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h3 text-roxo-900">{item.title}</h3>
                <p className="mt-3 max-w-[60ch] text-muted-ink">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
