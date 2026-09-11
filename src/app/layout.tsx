import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";
import { firm } from "@/content/site";
import { siteUrl, isIndexable } from "@/lib/site-config";
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

const title = `${firm.fullName} · Direito para empresas de tecnologia`;
const description =
  "Assessoria jurídica com clareza e visão estratégica para empresas de tecnologia: contratos e negociações, propriedade intelectual e tecnologia, consultoria e compliance. Jundiaí/SP.";

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
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1a0a24",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
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
