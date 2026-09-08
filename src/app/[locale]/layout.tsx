import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { organizationSchema } from "@/lib/schema";
import ScrollAnimationInitializer from "@/components/ScrollAnimationInitializer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StickyBookingBar from "@/components/StickyBookingBar";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const metadata: Metadata = {
    metadataBase: new URL("https://www.bombaymaroc.com"),
    title: {
      default: isFr
        ? "Bombay Restaurant : Cuisine Authentique Nord-Indienne & Pendjabi au Maroc"
        : "Bombay Restaurant: Authentic North Indian & Punjabi Cuisine in Morocco",
      template: isFr ? "%s | Bombay Restaurant Maroc" : "%s | Bombay Restaurant Morocco",
    },
    description: isFr
      ? "Découvrez l'héritage de 20 ans du Chef Surender Kumar Thakur. Biryani en pot d'argile, grillades tandoor & terrasses sur le toit à Marrakech (Guéliz & Médina) et Casablanca. Réservez votre table."
      : "Experience Chef Surender Kumar Thakur's 20-year legacy. Clay-pot biryani, tandoor grills & rooftop dining in Marrakech (Gueliz & Medina) and Casablanca. Book your table.",
    keywords: isFr
      ? [
          "restaurant indien Marrakech",
          "restaurant indien Casablanca",
          "restaurant halal Maroc",
          "Chef Surender Kumar Thakur",
          "Bombay Marrakech",
          "Bombay Médina",
          "Bombay Casablanca",
          "biryani pot argile Maroc",
          "tandoor Marrakech",
          "cuisine nord-indienne Maroc",
        ]
      : [
          "Indian restaurant Marrakech",
          "restaurant indien Marrakech",
          "Medina rooftop dining",
          "Indian restaurant Casablanca",
          "halal Indian food Morocco",
          "Chef Surender Kumar Thakur",
          "Bombay Marrakech",
          "Bombay Medina",
          "Bombay Casablanca",
          "clay pot biryani Morocco",
          "tandoor grill Marrakech",
          "North Indian cuisine Morocco",
        ],
    authors: [{ name: "Chef Surender Kumar Thakur" }],
    creator: "Bombay Restaurant",
    publisher: "Bombay Restaurant",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: isFr
        ? "Bombay Restaurant : Cuisine Authentique Nord-Indienne & Pendjabi au Maroc"
        : "Bombay Restaurant: Authentic North Indian & Punjabi Cuisine in Morocco",
      description: isFr
        ? "L'héritage de 20 ans du Chef Surender Kumar Thakur. Biryani en pot d'argile, grillades tandoor & terrasses sur le toit à Marrakech & Casablanca."
        : "Experience Chef Surender Kumar Thakur's 20-year legacy. Clay-pot biryani, tandoor grills & rooftop dining in Marrakech & Casablanca.",
      url: `https://www.bombaymaroc.com/${locale}`,
      siteName: "Bombay Restaurant",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/web/hero_royal_lounge.jpg",
          width: 1200,
          height: 630,
          alt: isFr ? "Bombay Restaurant Marrakech - Cuisine indienne authentique" : "Bombay Restaurant Marrakech - Authentic North Indian dining",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFr
        ? "Bombay Restaurant : Cuisine Indienne Authentique au Maroc"
        : "Bombay Restaurant: Authentic North Indian Cuisine in Morocco",
      description: isFr
        ? "L'héritage de 20 ans du Chef Surender. Biryani en pot d'argile, grillades tandoor & terrasses sur le toit."
        : "Chef Surender's 20-year legacy. Clay-pot biryani, tandoor grills & rooftop dining.",
      images: ["/images/web/hero_royal_lounge.jpg"],
      creator: "@bombay_marrakech",
    },
    alternates: {
      canonical: `https://www.bombaymaroc.com/${locale}`,
      languages: {
        en: "https://www.bombaymaroc.com/en",
        fr: "https://www.bombaymaroc.com/fr",
        "x-default": "https://www.bombaymaroc.com/en",
      },
    },
  };

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Blocking (not next/script) so the saved theme applies before first paint - avoids a flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}`,
          }}
        />
        {/* Marks JS availability ASAP: scroll-reveal CSS only hides content when html.js is present, so a failed hydration can never leave blank sections. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');`,
          }}
        />
      </head>
      <body>
        <div className="scroll-progress-bar" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <StickyBookingBar />
        <Analytics />
        <ScrollAnimationInitializer />
      </body>
    </html>
  );
}