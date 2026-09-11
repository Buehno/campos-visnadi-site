import { faq } from "@/content/site";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "./section-heading";

export function Faq() {
  return (
    <section id="perguntas" aria-labelledby="perguntas-title" className="section-y border-t border-line bg-surface">
      <div className="container-cv grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionHeading id="perguntas-title" eyebrow={faq.eyebrow} title={faq.title} />
        </div>
        <div className="lg:col-span-7 lg:col-start-6" data-reveal>
          <Accordion items={faq.items.map((i) => ({ question: i.q, answer: i.a }))} />
        </div>
      </div>
    </section>
  );
}
