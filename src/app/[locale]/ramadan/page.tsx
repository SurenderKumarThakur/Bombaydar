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
    ? "Iftar & Dîner Ramadan — Spécialités Indiennes à Marrakech & Casablanca"
    : "Iftar & Ramadan Dining — Indian Specials in Marrakech & Casablanca";
  const description = isFr
    ? "Rompez le jeûne avec un iftar indien authentique chez Bombay Restaurant. La harira rencontre le tandoori : samosas, pakoras, biryani en pot d'argile et lassi sucré dans nos adresses de Marrakech Guéliz, Médina Rooftop et Casablanca."
    : "Break your fast with authentic Indian iftar at Bombay Restaurant. Harira meets tandoori: samosas, pakoras, clay-pot biryani and sweet lassi at our Marrakech Gueliz, Medina Rooftop and Casablanca locations.";

  return {
    title,
    description,
    openGraph: {
      title: isFr ? "Iftar Indien & Spécialités Ramadan au Maroc" : "Indian Iftar & Ramadan Specials in Morocco",
      description: isFr
        ? "Samosas, pakoras, biryani en pot d'argile & lassi sucré pour votre table de Ramadan."
        : "Samosas, pakoras, clay-pot biryani & sweet lassi for your Ramadan table.",
      url: `https://www.bombaymaroc.com/${locale}/ramadan`,
      siteName: "Bombay Restaurant",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/web/ambiance_candlelit_room.jpg",
          width: 1200,
          height: 630,
          alt: isFr
            ? "Salle à manger aux chandelles prête pour l'iftar chez Bombay Restaurant Maroc"
            : "Candlelit iftar dining room at Bombay Restaurant Morocco during Ramadan",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFr ? "Iftar Indien & Spécialités Ramadan au Maroc" : "Indian Iftar & Ramadan Specials in Morocco",
      description: isFr ? "Iftar indien authentique à Marrakech & Casablanca." : "Authentic Indian iftar in Marrakech & Casablanca.",
      images: ["/images/web/ambiance_candlelit_room.jpg"],
    },
    alternates: {
      canonical: `https://www.bombaymaroc.com/${locale}/ramadan`,
      languages: {
        en: "https://www.bombaymaroc.com/en/ramadan",
        fr: "https://www.bombaymaroc.com/fr/ramadan",
        "x-default": "https://www.bombaymaroc.com/en/ramadan",
      },
    },
  };
}

const WA_RAMADAN_URL =
  "https://wa.me/212613727362?text=Hello%20Bombay%20Restaurant!%20I%20would%20like%20to%20reserve%20a%20table%20for%20iftar.";

const starters = { EN: ["Vegetable Samosa (2 pcs)", "Chicken Samosa (2 pcs)", "Vegetable Pakora", "Shrimp Cigars"], FR: ["Samosa aux Légumes (2 pcs)", "Samosa au Poulet (2 pcs)", "Pakora aux Légumes", "Cigares aux Crevettes"] };
const mains = { EN: ["Clay-Pot Chicken Biryani", "Famous Butter Chicken", "Royal Dal Makhani", "Tandoori Mixed Platter"], FR: ["Biryani de Poulet en Pot d'Argile", "Célèbre Poulet au Beurre", "Dal Makhani Royal", "Plateau Mixte Tandoori"] };
const desserts = { EN: ["Sweet Rose Lassi", "Hot Gulab Jamun", "Mughlai Shahi Tukda", "Mango Kulfi"], FR: ["Lassi Sucré à la Rose", "Gulab Jamun Chaud", "Shahi Tukda Moghlai", "Kulfi à la Mangue"] };

export default async function RamadanPage({ params }: PageProps) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const lang: 'EN' | 'FR' = isFr ? 'FR' : 'EN';

  return (
    <div className="location-page-wrapper">
      <section
        className="relative h-[55vh] min-h-[420px] w-full overflow-hidden flex items-center justify-center"
        aria-label="Ramadan banner"
      >
        <Image
          src="/images/web/ambiance_candlelit_room.jpg"
          alt={isFr ? "Salle à manger aux chandelles prête pour l'iftar chez Bombay Restaurant" : "Candlelit dining room ready for iftar at Bombay Restaurant"}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gold/20 text-gold border border-gold/40 mb-4 inline-block">
            Ramadan Kareem • رمضان كريم
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-3">
            {isFr ? "L'Iftar à la Manière Bombay" : "Iftar, the Bombay Way"}
          </h1>
          <p className="text-lg md:text-xl text-sand max-w-2xl mx-auto font-sans font-light">
            {isFr
              ? "Là où la tradition marocaine rencontre la chaleur d'une cuisine pendjabi."
              : "Where Moroccan tradition meets the warmth of a Punjabi kitchen."}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 section-reveal" aria-labelledby="iftar-title">
        <Breadcrumbs items={[{ name: isFr ? "Ramadan" : "Ramadan", url: "/ramadan" }]} />
        <div className="max-w-3xl mx-auto text-center mb-12 mt-6">
          <h2 id="iftar-title" className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            {isFr ? "Rompez le Jeûne avec Feu & Safran" : "Break Your Fast With Fire & Saffron"}
          </h2>
          <p className="text-base text-sand leading-relaxed">
            {isFr
              ? "Chaque soir pendant le Ramadan, nos cuisines préparent une sélection iftar spéciale en plus de notre menu complet — parfait pour les familles qui se réunissent après le Maghrib. Réservez une table aux chandelles dans l'une de nos trois adresses."
              : "Every evening during Ramadan, our kitchens prepare a special iftar selection alongside our full menu — perfect for families gathering after Maghrib. Reserve a candlelit table at any of our three locations."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto stagger-reveal">
          <article className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
            <h3 className="font-serif text-lg font-bold text-gold mb-3">
              <Image src="/images/menu_pdf/vegetable-samosa.jpg" alt="" width={24} height={24} className="mr-1" /> {isFr ? "Pour Commencer" : "To Start"}
            </h3>
            <ul className="text-sm text-sand space-y-2">
              {starters[lang].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
            <h3 className="font-serif text-lg font-bold text-gold mb-3">
              <Image src="/images/menu_pdf/chicken-biryani.jpg" alt="" width={24} height={24} className="mr-1" /> {isFr ? "À Partager" : "To Share"}
            </h3>
            <ul className="text-sm text-sand space-y-2">
              {mains[lang].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
            <h3 className="font-serif text-lg font-bold text-gold mb-3">
              <Image src="/images/menu_pdf/gulab-jamun.jpg" alt="" width={24} height={24} className="mr-1" /> {isFr ? "Pour Finir" : "To Finish"}
            </h3>
            <ul className="text-sm text-sand space-y-2">
              {desserts[lang].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-black/30 section-reveal" aria-label="Ramadan reservation">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            {isFr ? "Réservez Votre Table Iftar" : "Reserve Your Iftar Table"}
          </h2>
          <p className="text-base text-sand mb-8">
            {isFr
              ? "Les tables se remplissent vite après le Maghrib — surtout sur notre rooftop de la Médina. Réservez tôt via WhatsApp ou téléphone. Tables familiales et de groupe bienvenues."
              : "Tables fill quickly after Maghrib — especially on our Medina rooftop. Book early via WhatsApp or phone. Group and family tables welcome."}
          </p>
          <a href={WA_RAMADAN_URL} target="_blank" rel="noopener noreferrer" className="btn-primary pulse-glow">
            {isFr ? "Réserver via WhatsApp — +212 613-727362" : "Reserve via WhatsApp — +212 613-727362"}
          </a>
        </div>
      </section>
    </div>
  );
}
