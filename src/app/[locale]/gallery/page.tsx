import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? "Galerie Photo — Cuisine Indienne, Tandoor & Intérieurs au Maroc"
    : "Photo Gallery — Indian Food, Tandoor & Restaurant Interiors in Morocco";
  const description = isFr
    ? "Découvrez Bombay Restaurant Maroc : biryani en pot d'argile, plateaux tandoori, thali de poulet au beurre, naan frais du tandoor, notre salon Art Déco à Guéliz et le rooftop de la Médina au coucher du soleil."
    : "Browse Bombay Restaurant Morocco: clay-pot biryani, tandoori platters, butter chicken thali, naan fresh from the tandoor, our Art Deco Gueliz lounge, and the Medina rooftop at sunset.";

  return {
    title,
    description,
    openGraph: {
      title: isFr ? "Galerie Photo Bombay Restaurant" : "Bombay Restaurant Photo Gallery",
      description: isFr
        ? "Biryani en pot d'argile, grillades tandoor & vues sur le toit. Découvrez nos plats et restaurants."
        : "Clay-pot biryani, tandoor grills & rooftop views. See our food and restaurants.",
      url: `https://www.bombaymaroc.com/${locale}/gallery`,
      siteName: "Bombay Restaurant",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/web/food_clay_pot_biryani.jpg",
          width: 1200,
          height: 630,
          alt: isFr
            ? "Biryani de poulet signature en pot d'argile chez Bombay Restaurant Marrakech"
            : "Signature clay-pot chicken biryani at Bombay Restaurant Marrakech",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFr ? "Galerie Photo Bombay Restaurant" : "Bombay Restaurant Photo Gallery",
      description: isFr
        ? "Cuisine indienne, tandoor & intérieurs de restaurant au Maroc."
        : "Indian food, tandoor & restaurant interiors in Morocco.",
      images: ["/images/web/food_clay_pot_biryani.jpg"],
    },
    alternates: {
      canonical: `https://www.bombaymaroc.com/${locale}/gallery`,
      languages: {
        en: "https://www.bombaymaroc.com/en/gallery",
        fr: "https://www.bombaymaroc.com/fr/gallery",
        "x-default": "https://www.bombaymaroc.com/en/gallery",
      },
    },
  };
}

const galleryItems = [
  { src: "/images/web/food_clay_pot_biryani.jpg", alt: "Signature clay-pot chicken biryani slow-cooked in sealed clay handi with saffron basmati rice", caption: { EN: "Clay-Pot Chicken Biryani", FR: "Biryani de Poulet en Pot d'Argile" } },
  { src: "/images/web/food_butter_chicken_thali.jpg", alt: "Butter chicken thali with creamy tomato curry, cheese naan and basmati rice", caption: { EN: "Butter Chicken Thali", FR: "Thali Poulet au Beurre" } },
  { src: "/images/web/food_tandoori_chicken_platter.jpg", alt: "Tandoori chicken tikka platter grilled over charcoal in clay tandoor oven", caption: { EN: "Tandoori Chicken Platter", FR: "Plateau de Poulet Tandoori" } },
  { src: "/images/web/food_tandoori_kebabs.jpg", alt: "Assorted seekh kebabs and malai kebabs on sizzling platter from the tandoor", caption: { EN: "Tandoori Kebab Selection", FR: "Sélection de Kebabs Tandoori" } },
  { src: "/images/web/food_dal_makhani_curry.jpg", alt: "Royal dal makhani - black lentils slow-cooked overnight with butter and cream", caption: { EN: "Dal Makhani", FR: "Dal Makhani" } },
  { src: "/images/web/food_samosa_platter.jpg", alt: "Crispy vegetable samosas with tamarind chutney - classic Indian starter", caption: { EN: "Samosa Platter", FR: "Plateau de Samosas" } },
  { src: "/images/web/food_naan_bread.jpg", alt: "Fresh garlic butter naan bread brushed with cilantro straight from the tandoor", caption: { EN: "Fresh Tandoori Naan", FR: "Naan Tandoori Frais" } },
  { src: "/images/web/food_gulab_jamun.jpg", alt: "Warm gulab jamun dumplings soaked in cardamom rose syrup with pistachios", caption: { EN: "Gulab Jamun", FR: "Gulab Jamun" } },
  { src: "/images/web/hero_royal_lounge.jpg", alt: "Art Deco lounge interior of Bombay Marrakech Gueliz with velvet seating and brass lanterns", caption: { EN: "Gueliz Lounge", FR: "Salon Guéliz" } },
  { src: "/images/web/hero_medina_rooftop.jpg", alt: "Medina rooftop terrace at sunset overlooking Koutoubia Mosque in Marrakech", caption: { EN: "Medina Rooftop", FR: "Rooftop Médina" } },
  { src: "/images/web/hero_casablanca_interior.jpg", alt: "Modern dining room of Bombay Casablanca with open tandoor grill and gold accents", caption: { EN: "Casablanca Dining Room", FR: "Salle à Manger Casablanca" } },
  { src: "/images/web/ambiance_candlelit_room.jpg", alt: "Intimate candlelit dining room with dark teakwood paneling and warm lighting", caption: { EN: "Candlelit Ambiance", FR: "Ambiance aux Chandelles" } },
  { src: "/images/web/chef_tandoor_cooking.jpg", alt: "Chef preparing authentic naan bread inside traditional clay tandoor oven", caption: { EN: "The Living Tandoor", FR: "Le Tandoor Vivant" } },
  { src: "/images/web/chef_kitchen_prep.jpg", alt: "Kitchen team preparing fresh Indian ingredients at Bombay Restaurant", caption: { EN: "Kitchen Craft", FR: "L'Art de la Cuisine" } },
];

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const lang: 'EN' | 'FR' = isFr ? 'FR' : 'EN';

  return (
    <div className="location-page-wrapper">
      <section className="relative pt-32 pb-10 bg-black/40">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: isFr ? "Galerie" : "Gallery", url: "/gallery" }]} />
          <span className="text-xs uppercase tracking-widest text-gold font-bold block mt-6 mb-2">{isFr ? "Notre Univers" : "Our World"}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
            {isFr ? "Cuisine, Feu & Ambiance" : "Food, Fire & Atmosphere"}
          </h1>
          <p className="text-lg text-sand max-w-2xl font-sans font-light mb-10">
            {isFr
              ? "Un aperçu de Bombay Restaurant — les plats, le tandoor, et les salles où naissent les souvenirs."
              : "A look inside Bombay Restaurant — the dishes, the tandoor, and the rooms where memories are made."}
          </p>
        </div>
      </section>

      <section className="pb-20" aria-label="Photo gallery">
        <div className="container mx-auto px-4">
          <div className="gallery-grid stagger-reveal">
            {galleryItems.map((item) => (
              <figure key={item.src} className="gallery-item glass-panel rounded-xl overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm text-sand">{item.caption[lang]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
