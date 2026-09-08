import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChefClient from "./ChefClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? "Chef Surender Kumar Thakur — 20+ Ans de Cuisine Indienne Authentique au Maroc"
    : "Chef Surender Kumar Thakur — 20+ Years of Authentic Indian Cuisine in Morocco";
  const description = isFr
    ? "De l'Oberoi Udaivilas à Bombay Dreams Hong Kong jusqu'à Marrakech. Rencontrez le chef maître derrière la cuisine nord-indienne la plus authentique du Maroc — tandoor, biryani en pot d'argile & traditions moghlai depuis 2004."
    : "From Oberoi Udaivilas to Bombay Dreams Hong Kong to Marrakech. Meet the master chef behind Morocco's most authentic North Indian cuisine — tandoor, clay-pot biryani & Mughlai traditions since 2004.";

  return {
    title,
    description,
    openGraph: {
      title: isFr ? "Chef Surender Kumar Thakur — Maître de la Cuisine Nord-Indienne au Maroc" : "Chef Surender Kumar Thakur — Master of North Indian Cuisine in Morocco",
      description: isFr
        ? "Formé à l'Oberoi, éprouvé à Hong Kong, pionnier au Maroc depuis 2004. Rencontrez le chef."
        : "Oberoi-trained, Hong Kong-tested, Moroccan pioneer since 2004. Meet the chef.",
      url: `https://www.bombaymaroc.com/${locale}/chef`,
      siteName: "Bombay Restaurant",
      locale: isFr ? "fr_FR" : "en_US",
      type: "profile",
      images: [
        {
          url: "/images/web/chef_surender_solo_portrait.jpg",
          width: 1200,
          height: 630,
          alt: isFr
            ? "Chef Surender Kumar Thakur, propriétaire et chef de Bombay Restaurant Maroc"
            : "Chef Surender Kumar Thakur, owner and head chef of Bombay Restaurant Morocco",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFr ? "Chef Surender Kumar Thakur — Bombay Restaurant Maroc" : "Chef Surender Kumar Thakur — Bombay Restaurant Morocco",
      description: isFr
        ? "20+ ans de cuisine nord-indienne authentique au Maroc."
        : "20+ years of authentic North Indian cuisine in Morocco.",
      images: ["/images/web/chef_surender_solo_portrait.jpg"],
    },
    alternates: {
      canonical: `https://www.bombaymaroc.com/${locale}/chef`,
      languages: {
        en: "https://www.bombaymaroc.com/en/chef",
        fr: "https://www.bombaymaroc.com/fr/chef",
        "x-default": "https://www.bombaymaroc.com/en/chef",
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!['en', 'fr'].includes(locale)) {
    notFound();
  }

  return <ChefClient locale={locale as 'en' | 'fr'} />;
}
