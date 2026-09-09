'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MenuSection from '@/components/MenuSection';
import BookingWidget from '@/components/BookingWidget';
import SchemaScript from '@/components/SchemaScript';
import Breadcrumbs from '@/components/Breadcrumbs';
import { casablancaSchema, casablancaFaq, generateMenuSchema } from '@/lib/schema';

export default function CasablancaClient() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'fr' ? 'fr' : 'en';
  const [lang, setLang] = useState<'EN' | 'FR'>(locale === 'fr' ? 'FR' : 'EN');
  const [slideIndex, setSlideIndex] = useState(0);

  const heroSlides = [
    { src: '/images/web/hero_casablanca_interior.jpg', alt: 'Bombay Casablanca Maârif - Modern dining room with open tandoor grill, gold accents, and contemporary coastal elegance' },
    { src: '/images/web/food_butter_chicken_thali.jpg', alt: 'Butter chicken thali - complete meal with creamy tomato butter chicken, cheese naan, basmati rice, and traditional accompaniments' },
    { src: '/images/web/ambiance_candlelit_room.jpg', alt: 'Intimate candlelit dining area at Bombay Casablanca with modern lighting and elegant table settings' },
    { src: '/images/web/food_tandoori_kebabs.jpg', alt: 'Tandoori kebabs platter - assorted clay-oven grilled seekh kebabs, malai kebabs, and chicken tikka on sizzling platter' },
  ];

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'EN' | 'FR'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('langChange', handleLangChange);
    
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => {
      window.removeEventListener('langChange', handleLangChange);
      clearInterval(interval);
    };
  }, [heroSlides.length]);

  const copy = {
    title: { EN: "Bombay Casablanca", FR: "Bombay Casablanca" },
    subtitle: { EN: "A refined Indian dining escape in Casablanca.", FR: "Une évasion gastronomique indienne à Casablanca." },
    tagline: {
      EN: "Located along Boulevard Ghandi in Maârif, Bombay Casablanca bridges Atlantic coastal elegance with contemporary Indian gastronomy. Designed as a modern lounge with gold accents and open tandoor grills, it brings fresh ocean seafood curries, sizzlers, and handcrafted mocktails to Morocco's capital of style.",
      FR: "Situé le long du Boulevard Ghandi à Maârif, Bombay Casablanca associe l'élégance côtière de l'Atlantique à la gastronomie indienne contemporaine. Conçu comme un salon moderne avec grils tandoor ouverts, il propose des currys de fruits de mer et des boissons artisanales."
    },
    hoursTitle: { EN: "Opening Hours", FR: "Horaires d'Ouverture" },
    contactTitle: { EN: "Contact & Address", FR: "Contact & Adresse" },
    badge: { EN: "Bombay Casablanca • Maârif", FR: "Bombay Casablanca • Maârif" },
    breadcrumbLocations: { EN: "Locations", FR: "Nos Adresses" },
    breadcrumbSelf: { EN: "Casablanca", FR: "Casablanca" },
    hoursRowLabel: { EN: "Open Daily:", FR: "Ouvert Tous les Jours :" },
    addressLabel: { EN: "Address:", FR: "Adresse :" },
    phoneLabel: { EN: "Phone:", FR: "Téléphone :" },
    directions: { EN: "Get Directions →", FR: "Itinéraire →" },
    paymentTitle: { EN: "Payment Info", FR: "Modes de Paiement" },
    paymentDesc: { EN: "Cards and Cash (MAD, EUR, USD) are accepted at our Casablanca branch.", FR: "Cartes et espèces (MAD, EUR, USD) acceptées dans notre adresse de Casablanca." },
    narrativeTitle: { EN: "Atlantic Coastal Elegance", FR: "Élégance Côtière Atlantique" },
    dineWithUs: { EN: "Dine With Us", FR: "Dînez Avec Nous" },
    menuTitle: { EN: "The Casablanca Menu", FR: "Le Menu Casablanca" },
  };

  return (
    <div className="location-page-wrapper">
      <SchemaScript schema={casablancaSchema} />
      <SchemaScript schema={casablancaFaq} />
      <SchemaScript schema={generateMenuSchema('casablanca')} />
      
      {/* Header Banner Carousel */}
      <section className="relative h-[65vh] min-h-[480px] w-full overflow-hidden flex items-center justify-center" aria-label="Bombay Casablanca photo carousel">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === slideIndex ? 'opacity-100 z-10 scale-105' : 'opacity-0 z-0 scale-100'} transition-transform duration-[7000ms]`}
            role="img"
            aria-label={slide.alt}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={idx === 0}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/60 z-20" />
        <div className="relative z-30 container mx-auto px-4 text-center text-white reveal-on-scroll up">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gold/20 text-gold border border-gold/40 mb-4 inline-block reveal-on-scroll left delay-1">
            {copy.badge[lang]}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-3 reveal-on-scroll right delay-2">
            {copy.title[lang]}
          </h1>
          <p className="text-lg md:text-xl text-sand max-w-2xl mx-auto font-sans font-light reveal-on-scroll up delay-3">
            {copy.subtitle[lang]}
          </p>
        </div>
      </section>

      {/* Details section */}
      <section className="location-info-section container mx-auto px-4 py-16 section-reveal" aria-labelledby="details-title">
        <Breadcrumbs items={[{ name: copy.breadcrumbLocations[lang], url: `/${locale}/locations` }, { name: copy.breadcrumbSelf[lang], url: `/${locale}/locations/casablanca` }]} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mt-6">
          <article className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md reveal-on-scroll up">
            <h3 className="font-serif text-xl font-bold text-gold mb-3">{copy.hoursTitle[lang]}</h3>
            <ul className="text-sm text-sand space-y-2">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>{copy.hoursRowLabel[lang]}</span>
                <span className="font-bold text-white">12:00 - 23:30</span>
              </li>
            </ul>
          </article>

          <article className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md reveal-on-scroll up delay-1">
            <h3 className="font-serif text-xl font-bold text-gold mb-3">{copy.contactTitle[lang]}</h3>
            <ul className="text-sm text-sand space-y-2">
              <li>
                <strong className="text-white block">{copy.addressLabel[lang]}</strong>
                <span>Boulevard Ghandi, Maârif, Casablanca</span>
              </li>
              <li className="pt-2">
                <strong className="text-white block">{copy.phoneLabel[lang]}</strong>
                <a href="tel:+212****7362" className="text-gold font-bold hover:underline">+212 613-727362</a>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bombay+Restaurant+Boulevard+Ghandi+Maarif+Casablanca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs"
                >
                  {copy.directions[lang]}
                </a>
              </li>
            </ul>
          </article>

          <article className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md reveal-on-scroll up delay-2">
            <h3 className="font-serif text-xl font-bold text-gold mb-3">{copy.paymentTitle[lang]}</h3>
            <p className="text-sm text-sand leading-relaxed">
              {copy.paymentDesc[lang]}
            </p>
          </article>
        </div>

        {/* Narrative */}
        <article className="bg-black/50 p-8 md:p-12 rounded-3xl border border-gold/20 mb-16 backdrop-blur-md max-w-4xl mx-auto text-center reveal-on-scroll up">
          <h2 className="font-serif text-3xl font-bold text-gold mb-4">{copy.narrativeTitle[lang]}</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-base text-sand leading-relaxed font-sans font-light">
            {copy.tagline[lang]}
          </p>
        </article>
      </section>

      {/* Menu Section */}
      <section className="py-12 bg-black/30 section-reveal" id="menu" aria-labelledby="menu-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 reveal-on-scroll up">
            <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-2">{copy.dineWithUs[lang]}</span>
            <h2 id="menu-title" className="font-serif text-3xl md:text-4xl font-bold text-white">{copy.menuTitle[lang]}</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <MenuSection defaultBranch="casablanca" />
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 section-reveal" id="booking-anchor" aria-labelledby="booking-title">
        <div className="container mx-auto px-4 reveal-on-scroll up">
          <BookingWidget />
        </div>
      </section>
    </div>
  );
}
