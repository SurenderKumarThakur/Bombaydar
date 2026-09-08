import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PageProps {
  params: Promise<{ locale: string }>;
}

function getCateringSchema(locale: string) {
  const isFr = locale === 'fr';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isFr ? 'Traiteur Indien & Événements Privés par Bombay Restaurant' : 'Indian Catering & Private Events by Bombay Restaurant',
    serviceType: 'Catering',
    provider: {
      '@type': 'Restaurant',
      name: 'Bombay Restaurant',
      telephone: '+212****7362',
      url: 'https://www.bombaymaroc.com',
    },
    areaServed: [
      { '@type': 'City', name: 'Marrakech' },
      { '@type': 'City', name: 'Casablanca' },
      { '@type': 'Country', name: 'Morocco' },
    ],
    description: isFr
      ? 'Traiteur indien authentique pour mariages, événements d\'entreprise et réceptions privées partout au Maroc. Stations tandoor en direct et service de biryani en pot d\'argile.'
      : 'Authentic North Indian catering for weddings, corporate events, and private functions across Morocco. Live tandoor stations and clay-pot biryani service.',
    url: `https://www.bombaymaroc.com/${locale}/catering`,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? "Traiteur Indien & Événements Privés à Marrakech & Casablanca — Mariages, Réceptions"
    : "Indian Catering & Private Events in Marrakech & Casablanca — Weddings, Functions";
  const description = isFr
    ? "Traiteur indien authentique partout au Maroc. Mariages, événements d'entreprise & réceptions privées avec tandoor en direct, biryani en pot d'argile et service complet par le Chef Surender Kumar Thakur. Devis via WhatsApp."
    : "Authentic Indian catering across Morocco. Weddings, corporate events & private parties with live tandoor, clay-pot biryani and full service by Chef Surender Kumar Thakur. Get a quote via WhatsApp.";

  return {
    title,
    description,
    openGraph: {
      title: isFr ? "Traiteur Indien au Maroc — Mariages & Événements Privés" : "Indian Catering in Morocco — Weddings & Private Events",
      description: isFr
        ? "Tandoor en direct, biryani en pot d'argile et traiteur indien complet pour mariages et événements partout au Maroc."
        : "Live tandoor, clay-pot biryani and full-service Indian catering for weddings and events across Morocco.",
      url: `https://www.bombaymaroc.com/${locale}/catering`,
      siteName: "Bombay Restaurant",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/web/ambiance_luxury_table.jpg",
          width: 1200,
          height: 630,
          alt: isFr
            ? "Table de traiteur indien élégante chez Bombay Restaurant Maroc"
            : "Elegant Indian catering table setting at Bombay Restaurant Morocco",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFr ? "Traiteur Indien au Maroc — Mariages & Événements" : "Indian Catering in Morocco — Weddings & Events",
      description: isFr
        ? "Tandoor en direct & biryani en pot d'argile pour mariages et événements."
        : "Live tandoor & clay-pot biryani catering for weddings and events.",
      images: ["/images/web/ambiance_luxury_table.jpg"],
    },
    alternates: {
      canonical: `https://www.bombaymaroc.com/${locale}/catering`,
      languages: {
        en: "https://www.bombaymaroc.com/en/catering",
        fr: "https://www.bombaymaroc.com/fr/catering",
        "x-default": "https://www.bombaymaroc.com/en/catering",
      },
    },
  };
}

const WA_CATERING_URL =
  "https://wa.me/212613727362?text=Hello%20Bombay%20Restaurant!%20I%20would%20like%20a%20catering%20quote%20for%20my%20event.";

const services = [
  {
    icon: "/images/menu_pdf/chicken-tikka-tandoori.jpg",
    title: { EN: "Weddings", FR: "Mariages" },
    desc: {
      EN: "From intimate ceremonies to grand celebrations of 500+ guests. Live tandoor stations, clay-pot biryani service, and traditional presentation that becomes the talk of the wedding.",
      FR: "Des cérémonies intimes aux grandes célébrations de plus de 500 invités. Stations tandoor en direct, service de biryani en pot d'argile et présentation traditionnelle."
    },
  },
  {
    icon: "/images/menu_pdf/butter-chicken.jpg",
    title: { EN: "Corporate Events", FR: "Événements d'Entreprise" },
    desc: {
      EN: "Impress clients and teams with refined Indian catering for conferences, launches, and office parties. Buffet or plated service, tailored to your venue in Marrakech or Casablanca.",
      FR: "Impressionnez vos clients et équipes avec un traiteur indien raffiné pour conférences, lancements et réceptions. Buffet ou service à l'assiette."
    },
  },
  {
    icon: "/images/menu_pdf/gulab-jamun.jpg",
    title: { EN: "Private Functions", FR: "Réceptions Privées" },
    desc: {
      EN: "Birthdays, anniversaries, family gatherings — large or small. We bring Chef Surender's signature flavors directly to your home, riad, or rented venue.",
      FR: "Anniversaires, mariages, réunions de famille — grandes ou petites. Nous apportons les saveurs signature du Chef Surender chez vous."
    },
  },
];

const differenceItems = [
  {
    icon: "tandoori-roti.jpg",
    title: { EN: "Live Tandoor Station", FR: "Station Tandoor en Direct" },
    desc: {
      EN: "Our chefs grill fresh naan and kebabs on-site — the aroma alone is an experience.",
      FR: "Nos chefs grillent naans et kebabs frais sur place — l'arôme seul est une expérience.",
    },
  },
  {
    icon: "chicken-biryani.jpg",
    title: { EN: "Clay-Pot Biryani Service", FR: "Service de Biryani en Pot d'Argile" },
    desc: {
      EN: "Our famous sealed clay-pot biryani, opened at your table for maximum drama.",
      FR: "Notre célèbre biryani scellé en pot d'argile, ouvert à votre table pour un maximum d'effet.",
    },
  },
  {
    icon: "chef-tikka-masala.jpg",
    title: { EN: "20+ Years of Mastery", FR: "20+ Ans de Maîtrise" },
    desc: {
      EN: "The same team behind our three restaurants, led by Chef Surender Kumar Thakur.",
      FR: "La même équipe derrière nos trois restaurants, dirigée par le Chef Surender Kumar Thakur.",
    },
  },
  {
    icon: "garden-fresh-salad.jpg",
    title: { EN: "Full Dietary Coverage", FR: "Couverture Diététique Complète" },
    desc: {
      EN: "Extensive vegetarian, vegan, and halal-certified options for every guest.",
      FR: "De nombreuses options végétariennes, véganes et certifiées halal pour chaque invité.",
    },
  },
];

export default async function CateringPage({ params }: PageProps) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const lang: 'EN' | 'FR' = isFr ? 'FR' : 'EN';

  return (
    <div className="location-page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getCateringSchema(locale)) }}
      />

      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden flex items-center justify-center" aria-label="Catering banner">
        <Image
          src="/images/web/ambiance_luxury_table.jpg"
          alt={isFr ? "Installation de traiteur indien de luxe avec couverts dorés et tables aux chandelles" : "Luxury Indian catering setup with gold cutlery and candlelit tables"}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/65 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gold/20 text-gold border border-gold/40 mb-4 inline-block">
            {isFr ? "Depuis 2004 • Partout au Maroc" : "Since 2004 • All of Morocco"}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-3">
            {isFr ? "Traiteur & Événements Privés" : "Catering & Private Events"}
          </h1>
          <p className="text-lg md:text-xl text-sand max-w-2xl mx-auto font-sans font-light">
            {isFr
              ? "Les saveurs nord-indiennes signature du Chef Surender, apportées directement à votre lieu de réception."
              : "Chef Surender's signature North Indian flavors, brought directly to your venue."}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 section-reveal" aria-labelledby="services-title">
        <Breadcrumbs items={[{ name: isFr ? "Traiteur" : "Catering", url: "/catering" }]} />
        <div className="text-center mb-12 mt-6 reveal-on-scroll up">
          <h2 id="services-title" className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
            {isFr ? "Nous Assurons Chaque Occasion" : "We Cater Every Occasion"}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-reveal">
          {services.map((s) => (
            <article key={s.title.EN} className="bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-md text-center hover:border-gold/40 transition-colors">
              <Image src={s.icon} alt="" width={64} height={64} className="object-cover mb-4" />
              <h3 className="font-serif text-xl font-bold text-gold mb-3">{s.title[lang]}</h3>
              <p className="text-sm text-sand leading-relaxed">{s.desc[lang]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 bg-black/30 section-reveal" aria-labelledby="why-title">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="why-title" className="font-serif text-3xl font-bold text-white mb-8 text-center">
            {isFr ? "La Différence Bombay Traiteur" : "The Bombay Catering Difference"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differenceItems.map((d) => (
              <div key={d.icon} className="flex gap-4 bg-black/40 p-6 rounded-xl border border-white/10">
                <Image src={"/images/menu_pdf/" + d.icon} alt="" width={32} height={32} className="object-cover mr-1" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-gold mb-1">{d.title[lang]}</h3>
                  <p className="text-sm text-sand leading-relaxed">{d.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 section-reveal" aria-labelledby="quote-title">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 id="quote-title" className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            {isFr ? "Obtenez Votre Devis Personnalisé" : "Get Your Custom Quote"}
          </h2>
          <p className="text-base text-sand mb-8">
            {isFr
              ? "Indiquez-nous votre date, le nombre d'invités et le lieu — nous répondons en quelques heures avec un menu et un tarif personnalisés. Nous servons Marrakech, Casablanca et tout le Maroc."
              : "Tell us your date, guest count, and venue — we respond within hours with a tailored menu and pricing. Serving Marrakech, Casablanca, and all of Morocco."}
          </p>
          <a href={WA_CATERING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary pulse-glow">
            {isFr ? "Demander via WhatsApp — +212 613-727362" : "Inquire via WhatsApp — +212 613-727362"}
          </a>
        </div>
      </section>
    </div>
  );
}
