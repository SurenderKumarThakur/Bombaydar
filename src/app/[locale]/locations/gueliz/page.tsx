import type { Metadata } from "next";
import GuelizClient from "./GuelizClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? "Bombay Marrakech Guéliz : Restaurant Indien Emblématique en Ville Nouvelle"
    : "Bombay Marrakech Gueliz: Flagship Indian Restaurant in Ville Nouvelle";
  const description = isFr
    ? "Adresse d'origine Bombay depuis 2004. Salon Art Déco, biryani en pot d'argile, grillades tandoor. Ouvert Mar-Dim 12h-23h. Réservez une table dans le restaurant indien phare de Marrakech."
    : "Original Bombay location since 2004. Art Deco lounge, clay-pot biryani, tandoor grills. Open Tue-Sun 12-23h. Book a table at Marrakech's premier Indian restaurant.";

  return {
    title,
    description,
    openGraph: {
      title,
      description: isFr
        ? "Adresse d'origine Bombay depuis 2004. Salon Art Déco, biryani en pot d'argile, grillades tandoor. Ouvert Mar-Dim 12h-23h."
        : "Original Bombay location since 2004. Art Deco lounge, clay-pot biryani, tandoor grills. Open Tue-Sun 12-23h.",
      url: `https://www.bombaymaroc.com/${locale}/locations/gueliz`,
      siteName: "Bombay Restaurant",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/web/hero_royal_lounge.jpg",
          width: 1200,
          height: 630,
          alt: isFr
            ? "Bombay Marrakech Guéliz - Intérieur du salon Art Déco avec sièges élégants"
            : "Bombay Marrakech Gueliz - Art Deco lounge interior with elegant seating",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFr ? "Bombay Marrakech Guéliz : Restaurant Indien Emblématique" : "Bombay Marrakech Gueliz: Flagship Indian Restaurant",
      description: isFr
        ? "Salon Art Déco, biryani en pot d'argile, grillades tandoor depuis 2004."
        : "Art Deco lounge, clay-pot biryani, tandoor grills since 2004.",
      images: ["/images/web/hero_royal_lounge.jpg"],
    },
    alternates: {
      canonical: `https://www.bombaymaroc.com/${locale}/locations/gueliz`,
      languages: {
        en: "https://www.bombaymaroc.com/en/locations/gueliz",
        fr: "https://www.bombaymaroc.com/fr/locations/gueliz",
        "x-default": "https://www.bombaymaroc.com/en/locations/gueliz",
      },
    },
  };
}

export default function GuelizPage() {
  return <GuelizClient />;
}
