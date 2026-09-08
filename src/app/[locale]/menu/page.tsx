import type { Metadata } from "next";
import MenuSection from "@/components/MenuSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generateMenuSchema } from "@/lib/schema";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? "Menu : Cuisine Nord-Indienne à Marrakech & Casablanca — Tandoor, Currys, Biryani"
    : "Menu: North Indian Food in Marrakech & Casablanca — Tandoor, Curries, Biryani";
  const description = isFr
    ? "Menu complet de Bombay Restaurant Maroc. Biryani en pot d'argile, poulet au beurre, grillades tandoor, naan frais & spécialités indo-chinoises. Prix pour Marrakech (Guéliz & Médina) et Casablanca."
    : "Full menu of Bombay Restaurant Morocco. Clay-pot biryani, butter chicken, tandoor grills, fresh naan & Indo-Chinese favorites. View prices for Marrakech (Gueliz & Medina) and Casablanca.";

  return {
    title,
    description,
    openGraph: {
      title: isFr ? "Menu Bombay Restaurant — Cuisine Nord-Indienne à Marrakech & Casablanca" : "Bombay Restaurant Menu — North Indian Cuisine in Marrakech & Casablanca",
      description: isFr
        ? "Biryani en pot d'argile, poulet au beurre, grillades tandoor, naan frais & plus. Menu complet avec prix."
        : "Clay-pot biryani, butter chicken, tandoor grills, fresh naan & more. Full menu with prices.",
      url: `https://www.bombaymaroc.com/${locale}/menu`,
      siteName: "Bombay Restaurant",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/web/food_butter_chicken_thali.jpg",
          width: 1200,
          height: 630,
          alt: isFr ? "Thali de poulet au beurre chez Bombay Restaurant Maroc" : "Butter chicken thali at Bombay Restaurant Morocco",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFr ? "Menu Bombay Restaurant — Cuisine Indienne au Maroc" : "Bombay Restaurant Menu — Indian Food in Morocco",
      description: isFr
        ? "Biryani en pot d'argile, grillades tandoor, currys & naan. Menu complet avec prix."
        : "Clay-pot biryani, tandoor grills, curries & naan. Full menu with prices.",
      images: ["/images/web/food_butter_chicken_thali.jpg"],
    },
    alternates: {
      canonical: `https://www.bombaymaroc.com/${locale}/menu`,
      languages: {
        en: "https://www.bombaymaroc.com/en/menu",
        fr: "https://www.bombaymaroc.com/fr/menu",
        "x-default": "https://www.bombaymaroc.com/en/menu",
      },
    },
  };
}

export default async function MenuPage({ params }: PageProps) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  return (
    <div className="location-page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateMenuSchema('marrakech')) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateMenuSchema('casablanca')) }}
      />

      <section className="relative pt-32 pb-10 bg-black/40" aria-label="Page header">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: isFr ? "Menu" : "Menu", url: "/menu" }]} />
          <span className="text-xs uppercase tracking-widest text-gold font-bold block mt-6 mb-2">{isFr ? "Dînez Avec Nous" : "Dine With Us"}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
            {isFr ? "Le Menu Bombay" : "The Bombay Menu"}
          </h1>
          <p className="text-lg text-sand max-w-2xl font-sans font-light">
            {isFr
              ? "Cuisine nord-indienne & pendjabi authentique et maison, cuite au feu d'argile depuis 2004. Sélectionnez une adresse pour voir les prix locaux."
              : "Authentic home-style North Indian & Punjabi cuisine, cooked over clay fire since 2004. Select a branch to see location pricing."}
          </p>
        </div>
      </section>

      <section className="py-12" id="menu" aria-label="Full menu">
        <div className="container mx-auto px-4">
          <MenuSection defaultBranch="gueliz" />
        </div>
      </section>
    </div>
  );
}
