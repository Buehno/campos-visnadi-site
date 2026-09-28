import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";
import { firm } from "@/content/site";
import { siteUrl, isIndexable } from "@/lib/site-config";
import { IntroCurtain } from "@/components/layout/intro-curtain";
import "./globals.css";

// Display condensado ecoa o wordmark oficial (sans condensada em caixa alta).
const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

// Corpo humanista, legível em texto corrido.
const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const title = `${firm.fullName} · Advocacia empresarial em Jundiaí/SP`;
const description =
  "Soluções jurídicas para empresas: compliance e prevenção de fraudes, contratos, ações judiciais e processo civil, registro de marca, direito digital e proteção de dados. Jundiaí/SP.";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title,
  description,
  applicationName: firm.fullName,
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: firm.fullName,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1a0a24",
};

// Marca a abertura como vista na sessão antes da primeira pintura.
const introScript = `try{var k='cv-intro';if(sessionStorage.getItem(k))document.documentElement.classList.add('intro-seen');else sessionStorage.setItem(k,'1')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <IntroCurtain />
        <a
          href="#conteudo"
          className="btn btn-primary fixed left-4 top-3 z-[100] -translate-y-24 focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
