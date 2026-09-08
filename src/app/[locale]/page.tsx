import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeClient from "./HomeClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!['en', 'fr'].includes(locale)) {
    return {};
  }

  const isFr = locale === 'fr';

  return {
    title: isFr
      ? "Bombay Restaurant : Cuisine Authentique Nord-Indienne & Pendjabi au Maroc"
      : "Bombay Restaurant: Authentic North Indian & Punjabi Cuisine in Morocco",
    description: isFr
      ? "Découvrez l'héritage de 20 ans du Chef Surender Kumar Thakur. Biryani en pot d'argile, grillades tandoor & terrasses sur le toit à Marrakech (Guéliz & Médina) et Casablanca. Réservez votre table."
      : "Experience Chef Surender Kumar Thakur's 20-year legacy. Clay-pot biryani, tandoor grills & rooftop dining in Marrakech (Gueliz & Medina) and Casablanca. Book your table.",
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
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!['en', 'fr'].includes(locale)) {
    notFound();
  }

  return <HomeClient locale={locale as 'en' | 'fr'} />;
}