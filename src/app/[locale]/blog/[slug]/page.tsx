import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { posts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const isFr = locale === 'fr';
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.bombaymaroc.com/${locale}/blog/${post.slug}`,
      siteName: "Bombay Restaurant",
      locale: isFr ? "fr_FR" : "en_US",
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    alternates: {
      canonical: `https://www.bombaymaroc.com/${locale}/blog/${post.slug}`,
      languages: {
        en: `https://www.bombaymaroc.com/en/blog/${post.slug}`,
        fr: `https://www.bombaymaroc.com/fr/blog/${post.slug}`,
        "x-default": `https://www.bombaymaroc.com/en/blog/${post.slug}`,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const isFr = locale === 'fr';
  const localePrefix = isFr ? '/fr' : '/en';

  return (
    <div className="location-page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: `https://www.bombaymaroc.com${post.image}`,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              '@type': 'Person',
              name: 'Chef Surender Kumar Thakur',
              jobTitle: 'Owner & Head Chef',
              worksFor: { '@type': 'Organization', name: 'Bombay Restaurant', url: 'https://www.bombaymaroc.com' },
            },
            publisher: {
              '@type': 'Organization',
              name: 'Bombay Restaurant Morocco',
              url: 'https://www.bombaymaroc.com',
            },
            mainEntityOfPage: `https://www.bombaymaroc.com/${locale}/blog/${post.slug}`,
          }),
        }}
      />

      <section className="relative pt-32 pb-10 bg-black/40">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs items={[{ name: isFr ? "Journal" : "Journal", url: `${localePrefix}/blog` }, { name: post.title.slice(0, 40) + "…", url: `${localePrefix}/blog/${post.slug}` }]} />
          <span className="text-xs uppercase tracking-widest text-gold font-bold block mt-6 mb-2">
            {new Date(post.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.readMinutes} min {isFr ? 'de lecture' : 'read'}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">{post.title}</h1>
        </div>
      </section>

      <article className="container mx-auto px-4 max-w-3xl pb-20">
        <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 glass-panel">
          <Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </figure>

        <div className="space-y-5">
          {post.body.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="font-serif text-2xl font-bold text-white pt-4">{block.text}</h2>
              );
            }
            if (block.type === 'ul') {
              return (
                <ul key={i} className="list-disc pl-6 space-y-2 text-base text-sand leading-relaxed">
                  {block.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-base text-sand leading-relaxed">{block.text}</p>
            );
          })}
        </div>

        <div className="mt-12 p-8 glass-panel rounded-2xl text-center reveal-on-scroll up">
          <h2 className="font-serif text-xl font-bold text-white mb-2">{isFr ? "Une petite faim après tout ça ?" : "Hungry after all that?"}</h2>
          <p className="text-sm text-sand mb-5">{isFr ? "Goûtez-y dans l'une de nos trois adresses à Marrakech & Casablanca." : "Taste it at any of our three locations in Marrakech & Casablanca."}</p>
          <Link href={`${localePrefix}/locations`} className="btn-primary">{isFr ? "Trouver Votre Table" : "Find Your Table"}</Link>
        </div>
      </article>
    </div>
  );
}
