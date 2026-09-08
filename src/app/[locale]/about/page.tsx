import type { Metadata } from "next";
import AboutClient from "./AboutClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? "Chef Surender Kumar Thakur : 20+ Ans de Cuisine Indienne Authentique au Maroc"
    : "Chef Surender Kumar Thakur: 20+ Years of Authentic Indian Cuisine in Morocco";
  const description = isFr
    ? "De l'Oberoi Udaivilas à Marrakech. Le parcours culinaire du Chef Surender Kumar Thakur, traditions au pot d'argile & traiteur pour mariages partout au Maroc."
    : "From Oberoi Udaivilas to Marrakech. Chef Surender Kumar Thakur's culinary journey, clay-pot traditions & catering for weddings across Morocco.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.bombaymaroc.com/${locale}/about`,
      siteName: "Bombay Restaurant",
      locale: isFr ? "fr_FR" : "en_US",
      type: "article",
      publishedTime: "2004-01-01",
      authors: ["Chef Surender Kumar Thakur"],
      images: [
        {
          url: "/images/web/chef_surender_solo_portrait.jpg",
          width: 1200,
          height: 630,
          alt: isFr
            ? "Chef Surender Kumar Thakur - Propriétaire & Chef de Bombay Restaurant"
            : "Chef Surender Kumar Thakur - Owner & Head Chef of Bombay Restaurant",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: isFr
        ? "De l'Oberoi Udaivilas à Marrakech. Le parcours du Chef Surender & ses traditions au pot d'argile."
        : "From Oberoi Udaivilas to Marrakech. Chef Surender's culinary journey & clay-pot traditions.",
      images: ["/images/web/chef_surender_solo_portrait.jpg"],
    },
    alternates: {
      canonical: `https://www.bombaymaroc.com/${locale}/about`,
      languages: {
        en: "https://www.bombaymaroc.com/en/about",
        fr: "https://www.bombaymaroc.com/fr/about",
        "x-default": "https://www.bombaymaroc.com/en/about",
      },
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
