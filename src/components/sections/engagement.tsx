import { ArrowRight } from "lucide-react";
import { engagement } from "@/content/site";

export function Engagement() {
  return (
    <section aria-labelledby="formas-title" className="pb-18 sm:pb-24 lg:pb-32">
      <div className="container-cv">
        <div
          data-reveal
          className="relative grid gap-8 overflow-hidden rounded-2xl bg-roxo-100 p-8 sm:p-12 lg:grid-cols-12 lg:items-end lg:gap-8 lg:p-16"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-24 h-[140%] w-3 rotate-[28deg] rounded-full bg-[image:var(--cv-gradient-accent)] opacity-80"
          />
          <div className="lg:col-span-8">
            <p className="eyebrow text-magenta-600">{engagement.eyebrow}</p>
            <h2 id="formas-title" className="text-h2 mt-5 text-roxo-900">
              {engagement.title}
            </h2>
            <p className="text-lead mt-6 max-w-[40rem] text-muted-ink">{engagement.body}</p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <a href={engagement.cta.href} className="btn btn-primary">
              {engagement.cta.label}
              <ArrowRight aria-hidden className="btn-arrow size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
