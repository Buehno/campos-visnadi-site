import { contact, firm } from "@/content/site";
import { isContactConfigured } from "@/lib/contact/provider";
import { ContactForm } from "./contact-form";
import { SectionHeading } from "./section-heading";

export function Contact() {
  const demo = !isContactConfigured();
  return (
    <section id="contato" aria-labelledby="contato-title" className="section-y relative z-10 border-t border-line bg-paper">
      <div className="container-cv grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading id="contato-title" eyebrow={contact.eyebrow} title={contact.title} intro={contact.body} />
          <div className="mt-10 space-y-6 border-t border-line pt-8 text-muted-ink" data-reveal>
            <p className="flex gap-3 text-[0.9375rem]">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-magenta-500" />
              {contact.note}
            </p>
            <address className="not-italic text-[0.9375rem] leading-relaxed">
              <span className="eyebrow block text-magenta-600">Sede</span>
              <span className="mt-2 block">
                {firm.address.street} · {firm.address.city}/{firm.address.state} · CEP {firm.address.postalCode}
              </span>
            </address>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <ContactForm demo={demo} />
        </div>
      </div>
    </section>
  );
}
