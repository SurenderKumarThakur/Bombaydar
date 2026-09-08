import type { Metadata } from "next";
import MedinaClient from "./MedinaClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? "Médina Rooftop Marrakech : Dîner Indien sur Rooftop Près de Jemaa el-Fnaa"
    : "Medina Rooftop Marrakech: Rooftop Indian Dining Near Jemaa el-Fnaa";
  const description = isFr
    ? "Dînez sous les étoiles avec vue sur la Koutoubia. Cuisine nord-indienne & moghlai authentique. Ouvert tous les jours 12h30-23h30. Réservez au meilleur restaurant rooftop de Marrakech."
    : "Dine under stars with Koutoubia views. Authentic North Indian & Mughlai cuisine. Open daily 12:30-23:30. Reserve now at Marrakech's best rooftop restaurant.";

  return {
    title,
    description,
    openGraph: {
      title,
      description: isFr
        ? "Dînez sous les étoiles avec vue sur la Koutoubia. Cuisine nord-indienne & moghlai authentique. Ouvert tous les jours 12h30-23h30."
        : "Dine under stars with Koutoubia views. Authentic North Indian & Mughlai cuisine. Open daily 12:30-23:30.",
      url: `https://www.bombaymaroc.com/${locale}/locations/medina`,
      siteName: "Bombay Restaurant",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/web/hero_medina_rooftop.jpg",
          width: 1200,
          height: 630,
          alt: isFr
            ? "Médina Rooftop Marrakech - Terrasse avec vue panoramique sur la Koutoubia"
            : "Medina Rooftop Marrakech - Rooftop terrace with panoramic Koutoubia views",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFr ? "Médina Rooftop Marrakech : Dîner Indien sur Rooftop" : "Medina Rooftop Marrakech: Rooftop Indian Dining",
      description: isFr
        ? "Vue sur la Koutoubia, cuisine moghlai, biryani en pot d'argile sous les étoiles."
        : "Koutoubia views, Mughlai cuisine, clay-pot biryani under the stars.",
      images: ["/images/web/hero_medina_rooftop.jpg"],
    },
    alternates: {
      canonical: `https://www.bombaymaroc.com/${locale}/locations/medina`,
      languages: {
        en: "https://www.bombaymaroc.com/en/locations/medina",
        fr: "https://www.bombaymaroc.com/fr/locations/medina",
        "x-default": "https://www.bombaymaroc.com/en/locations/medina",
      },
    },
  };
}

export default function MedinaPage() {
  return <MedinaClient />;
}
