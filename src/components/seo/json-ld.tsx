import { channels, firm } from "@/content/site";
import { siteUrl } from "@/lib/site-config";

/**
 * Dados estruturados apenas com fatos verificados (sem avaliações, preços
 * ou área de atendimento não confirmada). `url` só com domínio confirmado.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: firm.fullName,
    legalName: firm.legalName,
    taxID: firm.cnpj,
    slogan: firm.tagline,
    ...(siteUrl ? { url: siteUrl } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: firm.address.street,
      addressLocality: firm.address.city,
      addressRegion: firm.address.state,
      postalCode: firm.address.postalCode,
      addressCountry: "BR",
    },
    telephone: channels.phoneDisplay.replace(/\s/g, ""),
    email: channels.email,
    sameAs: channels.social.map((s) => s.href),
    founder: { "@type": "Person", name: firm.founder.name, sameAs: [channels.founderLinkedin] },
    knowsAbout: [
      "Compliance empresarial",
      "Prevenção de fraudes",
      "Contratos e negociações",
      "Processo civil",
      "Registro de marca",
      "Propriedade intelectual",
      "Direito digital",
      "Proteção de dados",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
