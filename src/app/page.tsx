import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";
import { Context } from "@/components/sections/context";
import { PracticeAreas } from "@/components/sections/practice-areas";
import { Journey } from "@/components/sections/journey";
import { Approach } from "@/components/sections/approach";
import { Office } from "@/components/sections/office";
import { Engagement } from "@/components/sections/engagement";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { RevealRoot } from "@/components/motion/reveal-root";
import { JsonLd } from "@/components/seo/json-ld";

export default function Home() {
  return (
    <>
      <SiteHeader />
      {/* Conteúdo acima do rodapé em cortina: fundo opaco e z-index próprio. */}
      <main id="conteudo" tabIndex={-1} className="relative z-10 bg-paper outline-none">
        <Hero />
        <Context />
        <PracticeAreas />
        <Journey />
        <Approach />
        <Office />
        <Engagement />
        <Faq />
        <Contact />
      </main>
      <CinematicFooter />
      <RevealRoot />
      <JsonLd />
    </>
  );
}
