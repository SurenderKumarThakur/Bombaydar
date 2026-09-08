'use client';

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

const chefSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: 'https://www.bombaymaroc.com/chef',
  mainEntity: {
    '@type': 'Person',
    name: 'Chef Surender Kumar Thakur',
    jobTitle: 'Owner & Head Chef',
    image: 'https://www.bombaymaroc.com/images/web/chef_surender_solo_portrait.jpg',
    worksFor: {
      '@type': 'Organization',
      name: 'Bombay Restaurant',
      url: 'https://www.bombaymaroc.com',
    },
    knowsAbout: ['North Indian Cuisine', 'Punjabi Cuisine', 'Tandoor Cooking', 'Clay-Pot Biryani', 'Mughlai Cuisine'],
    description:
      'Chef Surender Kumar Thakur began his journey in 1998 with the Oberoi Group at Trident Udaipur and Oberoi Udaivilas, then defined his craft at Bombay Dreams in Hong Kong before bringing authentic clay-oven tandoor cooking to Morocco in 2004.',
  },
};

const timeline = [
  ["1998", "The Oberoi Years", "Begins his journey with the prestigious Oberoi group at Trident Udaipur and the legendary Oberoi Udaivilas — mastering the discipline and precision of luxury Indian hospitality."],
  ["2002", "Hong Kong", "A defining tenure at Bombay Dreams, Hong Kong — refining Mughlai techniques and serving India's royal recipes to an international clientele."],
  ["2004", "Morocco", "Arrives in Marrakech and introduces traditional clay-oven tandoor cooking and authentic home-style Punjabi cuisine to the kingdom for the very first time."],
  ["2010s", "Expansion", "From one venue to three: the Art Deco Gueliz flagship, a rooftop above the Medina near Jemaa el-Fnaa, and a modern dining room in Casablanca's Maârif."],
  ["Today", "The Living Tradition", "Still at the tandoor every service. The sealed clay-pot biryani is still slow-cooked exactly as it was in Punjab generations ago."],
];

interface ChefClientProps {
  locale: 'en' | 'fr';
}

export default function ChefClient({ locale }: ChefClientProps) {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || locale;
  const locationsHref = `/${currentLocale}/locations`;
  const isFr = currentLocale === 'fr';

  return (
    <div className="location-page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chefSchema) }}
      />

      <section className="relative pt-32 pb-10 bg-black/40">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: isFr ? "Notre Chef" : "Our Chef", url: `/${currentLocale}/chef` }]} />
          <span className="text-xs uppercase tracking-widest text-gold font-bold block mt-6 mb-2">{isFr ? "L'Homme Derrière le Feu" : "The Man Behind The Fire"}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Chef Surender Kumar Thakur</h1>
          <p className="text-lg text-sand max-w-2xl font-sans font-light">
            {isFr
              ? "Propriétaire & Chef · Formé à l'Oberoi · Apporte la cuisine nord-indienne authentique au Maroc depuis 2004."
              : "Owner & Head Chef · Oberoi-trained · Bringing authentic North Indian cuisine to Morocco since 2004."}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 section-reveal" aria-label="Chef portrait and introduction">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <figure className="story-image-wrapper glass-panel rounded-2xl overflow-hidden relative min-h-[420px] w-full reveal-on-scroll left">
            <Image
              src="/images/web/chef_surender_solo_portrait.jpg"
              alt="Portrait of Chef Surender Kumar Thakur, owner and head chef of Bombay Restaurant Morocco"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <figcaption className="sr-only">Chef Surender Kumar Thakur, Owner & Head Chef</figcaption>
          </figure>

          <div className="story-content reveal-on-scroll right">
            <h2 className="font-serif text-3xl font-bold text-white mb-4">&ldquo;Deepen, Don&rsquo;t Dilute&rdquo;</h2>
            <div className="w-16 h-0.5 bg-gold mb-6" />
            <p className="text-base text-sand leading-relaxed mb-4">
              For over two decades, Chef Surender has refused to compromise on spices, ingredients, or methods.
              While others adapted their recipes for convenience, he kept the clay pots, the charcoal tandoors,
              and the slow overnight cooking that defines true Punjabi home-style food.
            </p>
            <p className="text-base text-sand leading-relaxed mb-4">
              His signature clay-pot chicken biryani is still layered, sealed, and slow-cooked in individual
              clay handis — opened only at your table, releasing saffron steam exactly as it would have in Punjab.
            </p>
            <div className="story-chef-sign">
              <span className="chef-name gold-text">Chef Surender Kumar Thakur</span>
              <span className="chef-title">Owner & Head Chef, Bombay Restaurant Morocco</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black/30 section-reveal" aria-labelledby="journey-title">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="journey-title" className="font-serif text-3xl font-bold text-white mb-10 text-center">The Journey</h2>
          <ol className="relative border-l-2 border-gold/30 space-y-10 ml-4">
            {timeline.map(([year, title, desc]) => (
              <li key={year} className="ml-8 relative">
                <span className="absolute -left-[42px] top-1 w-5 h-5 rounded-full bg-gold border-4 border-black" aria-hidden="true" />
                <span className="text-xs uppercase tracking-widest text-gold font-bold">{year}</span>
                <h3 className="font-serif text-xl font-bold text-white mb-2 mt-1">{title}</h3>
                <p className="text-sm text-sand leading-relaxed">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 section-reveal text-center" aria-label="Dine with the chef">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Taste the Journey Yourself</h2>
          <p className="text-base text-sand mb-8">
            Dine at any of our three locations and experience two decades of mastery in every dish.
          </p>
          <Link href={locationsHref} className="btn-primary">Find Your Table</Link>
        </div>
      </section>
    </div>
  );
}