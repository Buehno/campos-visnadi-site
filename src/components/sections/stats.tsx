import { stats } from "@/content/site";
import { StatsBento } from "@/components/ui/stats-bento";
import { SectionHeading } from "./section-heading";

export function Stats() {
  return (
    <section id="numeros" aria-labelledby="numeros-title" className="section-y border-b border-line">
      <div className="container-cv">
        <SectionHeading id="numeros-title" eyebrow={stats.eyebrow} title={stats.title} />
        <div className="mt-12 lg:mt-14" data-reveal>
          <StatsBento primary={stats.primary} secondary={stats.secondary} since={stats.since} coffee={stats.coffee} />
        </div>
      </div>
    </section>
  );
}
