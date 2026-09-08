import type { Metadata } from "next";
import CasablancaClient from "./CasablancaClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? "Bombay Casablanca Maârif : Restaurant Indien Moderne avec Fruits de Mer & Cocktails"
    : "Bombay Casablanca Maârif: Modern Indian Restaurant with Seafood & Cocktails";
  const description = isFr
    ? "L'élégance côtière atlantique rencontre la gastronomie indienne. Currys de fruits de mer, grillades tandoor, paiement par carte accepté. Ouvert tous les jours 12h-23h30. Réservez votre table à Casablanca."
    : "Atlantic coastal elegance meets Indian gastronomy. Seafood curries, tandoor grills, card payments accepted. Open daily 12-23:30. Book your table in Casablanca.";

  return {
    title,
    description,
    openGraph: {
      title,
      description: isFr
        ? "L'élégance côtière atlantique rencontre la gastronomie indienne. Currys de fruits de mer, grillades tandoor, paiement par carte accepté. Ouvert tous les jours 12h-23h30."
        : "Atlantic coastal elegance meets Indian gastronomy. Seafood curries, tandoor grills, card payments accepted. Open daily 12-23:30.",
      url: `https://www.bombaymaroc.com/${locale}/locations/casablanca`,
      siteName: "Bombay Restaurant",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/web/hero_casablanca_interior.jpg",
          width: 1200,
          height: 630,
          alt: isFr
            ? "Bombay Casablanca Maârif - Salle à manger moderne avec gril tandoor ouvert"
            : "Bombay Casablanca Maârif - Modern dining room with open tandoor grill",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFr ? "Bombay Casablanca Maârif : Restaurant Indien Moderne" : "Bombay Casablanca Maârif: Modern Indian Restaurant",
      description: isFr
        ? "Currys de fruits de mer, grillades tandoor, boissons artisanales. Paiement par carte accepté."
        : "Seafood curries, tandoor grills, handcrafted mocktails. Card payments accepted.",
      images: ["/images/web/hero_casablanca_interior.jpg"],
    },
    alternates: {
      canonical: `https://www.bombaymaroc.com/${locale}/locations/casablanca`,
      languages: {
        en: "https://www.bombaymaroc.com/en/locations/casablanca",
        fr: "https://www.bombaymaroc.com/fr/locations/casablanca",
        "x-default": "https://www.bombaymaroc.com/en/locations/casablanca",
      },
    },
  };
}

export default function CasablancaPage() {
  return <CasablancaClient />;
}
