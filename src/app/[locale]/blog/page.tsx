import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { posts } from "@/lib/posts";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? "Journal — Cuisine Indienne, Tandoor & Histoires Culinaires du Maroc"
    : "Journal — Indian Food, Tandoor & Culinary Stories from Morocco";
  const description = isFr
    ? "Histoires des cuisines Bombay Restaurant : la science du tandoor, les traditions du biryani en pot d'argile, et l'art derrière la cuisine nord-indienne authentique à Marrakech & Casablanca."
    : "Stories from the Bombay Restaurant kitchens: tandoor science, clay-pot biryani traditions, and the craft behind authentic North Indian food in Marrakech & Casablanca.";

  return {
    title,
    description,
    openGraph: {
      title: isFr ? "Journal Bombay Restaurant" : "Bombay Restaurant Journal",
      description: isFr
        ? "Science du tandoor, traditions du pot d'argile & histoires culinaires du Maroc."
        : "Tandoor science, clay-pot traditions & culinary stories from Morocco.",
      url: `https://www.bombaymaroc.com/${locale}/blog`,
      siteName: "Bombay Restaurant",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://www.bombaymaroc.com/${locale}/blog`,
      languages: {
        en: "https://www.bombaymaroc.com/en/blog",
        fr: "https://www.bombaymaroc.com/fr/blog",
        "x-default": "https://www.bombaymaroc.com/en/blog",
      },
    },
  };
}

export default async function BlogIndex({ params }: PageProps) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  return (
    <div className="location-page-wrapper">
      <section className="relative pt-32 pb-10 bg-black/40">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: isFr ? "Journal" : "Journal", url: "/blog" }]} />
          <span className="text-xs uppercase tracking-widest text-gold font-bold block mt-6 mb-2">{isFr ? "De Nos Cuisines" : "From Our Kitchens"}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">{isFr ? "Le Journal Bombay" : "The Bombay Journal"}</h1>
          <p className="text-lg text-sand max-w-2xl font-sans font-light">
            {isFr
              ? "Savoir-faire, tradition et histoires de deux décennies de cuisine nord-indienne au Maroc."
              : "Craft, tradition, and stories from two decades of North Indian cooking in Morocco."}
          </p>
          {isFr && (
            <p className="text-xs text-sand/60 mt-3 max-w-2xl font-sans italic">
              Les articles ci-dessous sont actuellement disponibles en anglais uniquement.
            </p>
          )}
        </div>
      </section>

      <section className="pb-20" aria-label="Articles list">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 stagger-reveal">
          {posts.map((post) => (
            <article key={post.slug} className="glass-panel rounded-2xl overflow-hidden group flex flex-col">
              <Link href={`/${locale}/blog/${post.slug}`} className="relative aspect-[16/9] overflow-hidden block">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <span className="text-xs uppercase tracking-widest text-gold font-bold">
                  {new Date(post.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.readMinutes} min {isFr ? 'de lecture' : 'read'}
                </span>
                <h2 className="font-serif text-2xl font-bold text-white group-hover:text-gold transition-colors">
                  <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-sm text-sand leading-relaxed flex-1">{post.description}</p>
                <Link href={`/${locale}/blog/${post.slug}`} className="text-gold font-bold text-sm uppercase tracking-wider hover:underline self-start">
                  {isFr ? "Lire l'Article →" : "Read Article →"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
