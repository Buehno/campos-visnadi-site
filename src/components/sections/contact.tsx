import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { channels, contact, firm } from "@/content/site";
import { isContactConfigured } from "@/lib/contact/provider";
import { ContactForm } from "./contact-form";
import { SectionHeading } from "./section-heading";

export function Contact() {
  const demo = !isContactConfigured();
  const { address } = firm;
  return (
    <section id="contato" aria-labelledby="contato-title" className="section-y relative z-10 border-t border-line bg-paper">
      <div className="container-cv grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading id="contato-title" eyebrow={contact.eyebrow} title={contact.title} intro={contact.body} />

          <div className="mt-8" data-reveal>
            <a
              href={channels.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle aria-hidden className="size-5" />
              Conversar pelo WhatsApp
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>

          <ul className="mt-10 space-y-5 border-t border-line pt-8 text-[0.9375rem]" data-reveal>
            <li className="flex gap-3">
              <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-magenta-600" />
              <a href={`mailto:${channels.email}`} className="font-semibold text-roxo-900 underline decoration-line-strong underline-offset-4 hover:decoration-magenta-500">
                {channels.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-magenta-600" />
              <a href={channels.phoneHref} className="font-semibold text-roxo-900 underline decoration-line-strong underline-offset-4 hover:decoration-magenta-500">
                {channels.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-magenta-600" />
              <address className="not-italic leading-relaxed text-muted-ink">
                {address.street}
                <br />
                {address.neighborhood} · {address.city}/{address.state} · CEP {address.postalCode}
              </address>
            </li>
          </ul>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Redes sociais" data-reveal>
            {channels.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm font-semibold text-roxo-900 transition-colors hover:border-roxo-900"
                >
                  {s.label}
                  <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 flex gap-3 text-sm text-muted-ink" data-reveal>
            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-magenta-500" />
            {contact.note}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <ContactForm demo={demo} />
        </div>
      </div>
    </section>
  );
}
