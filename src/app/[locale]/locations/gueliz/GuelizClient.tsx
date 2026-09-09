'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MenuSection from '@/components/MenuSection';
import BookingWidget from '@/components/BookingWidget';
import SchemaScript from '@/components/SchemaScript';
import Breadcrumbs from '@/components/Breadcrumbs';
import { guelizSchema, guelizFaq, generateMenuSchema } from '@/lib/schema';

export default function GuelizClient() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'fr' ? 'fr' : 'en';
  const [lang, setLang] = useState<'EN' | 'FR'>(locale === 'fr' ? 'FR' : 'EN');
  const [slideIndex, setSlideIndex] = useState(0);

  const heroSlides = [
    { src: '/images/web/hero_royal_lounge.jpg', alt: 'Bombay Marrakech Gueliz - Elegant Art Deco lounge with warm ambient lighting and plush velvet seating' },
    { src: '/images/web/ambiance_candlelit_room.jpg', alt: 'Intimate candlelit dining room at Bombay Marrakech with brass lanterns and dark teakwood paneling' },
    { src: '/images/web/food_tandoori_chicken_platter.jpg', alt: 'Tandoori chicken platter - clay-oven grilled chicken tikka with charred edges served on sizzling platter' },
    { src: '/images/web/chef_tandoor_cooking.jpg', alt: 'Chef preparing authentic naan bread in traditional clay tandoor oven at Bombay Restaurant' },
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
    title: { EN: "Bombay Marrakech Gueliz", FR: "Bombay Marrakech Guéliz" },
    subtitle: { EN: "Our original flagship restaurant in modern Marrakech.", FR: "Notre restaurant historique dans le Marrakech moderne." },
    tagline: {
      EN: "Nestled in Marrakech's chic Ville Nouvelle, Bombay Gueliz pays homage to the 1920s Art Deco dining saloons of Bombay's Fort district. Here, dark teakwood paneling, brass lanterns, and plush velvet seating create an intimate sanctuary for refined North Indian culinary craftsmanship.",
      FR: "Niché dans le quartier chic de la Ville Nouvelle à Marrakech, Bombay Guéliz rend hommage aux salons Art Déco des années 1920 du quartier du Fort de Bombay. Des boiseries sombres, lanternes en laiton et sièges en velours créent un sanctuaire intime."
    },
    hoursTitle: { EN: "Opening Hours", FR: "Horaires d'Ouverture" },
    contactTitle: { EN: "Contact & Address", FR: "Contact & Adresse" },
    badge: { EN: "Marrakech Flagship • Since 2004", FR: "Fleuron de Marrakech • Depuis 2004" },
    breadcrumbLocations: { EN: "Locations", FR: "Nos Adresses" },
    breadcrumbSelf: { EN: "Marrakech Gueliz", FR: "Marrakech Guéliz" },
    hoursRow1Label: { EN: "Tuesday - Sunday:", FR: "Mardi - Dimanche :" },
    hoursRow2Label: { EN: "Monday:", FR: "Lundi :" },
    addressLabel: { EN: "Address:", FR: "Adresse :" },
    phoneLabel: { EN: "Phone:", FR: "Téléphone :" },
    directions: { EN: "Get Directions →", FR: "Itinéraire →" },
    paymentTitle: { EN: "Payment Info", FR: "Modes de Paiement" },
    paymentDesc: { EN: "Marrakech Gueliz branch accepts Cash payments (MAD, EUR, USD).", FR: "Notre adresse de Guéliz accepte les paiements en espèces (MAD, EUR, USD)." },
    narrativeTitle: { EN: "The Art Deco Lounge of Gueliz", FR: "Le Salon Art Déco de Guéliz" },
    dineWithUs: { EN: "Dine With Us", FR: "Dînez Avec Nous" },
    menuTitle: { EN: "The Marrakech Menu", FR: "Le Menu Marrakech" },
  };

  return (
    <div className="location-page-wrapper">
      <SchemaScript schema={guelizSchema} />
      <SchemaScript schema={guelizFaq} />
      <SchemaScript schema={generateMenuSchema('marrakech')} />

      {/* Header Banner Carousel */}
      <section className="relative h-[65vh] min-h-[480px] w-full overflow-hidden flex items-center justify-center" aria-label="Bombay Marrakech Gueliz photo carousel">
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
        <Breadcrumbs items={[{ name: copy.breadcrumbLocations[lang], url: `/${locale}/locations` }, { name: copy.breadcrumbSelf[lang], url: `/${locale}/locations/gueliz` }]} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mt-6">
          <article className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md reveal-on-scroll up">
            <h3 className="font-serif text-xl font-bold text-gold mb-3">{copy.hoursTitle[lang]}</h3>
            <ul className="text-sm text-sand space-y-2">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>{copy.hoursRow1Label[lang]}</span>
                <span className="font-bold text-white">12:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>{copy.hoursRow2Label[lang]}</span>
                <span className="font-bold text-white">18:00 - 23:00</span>
              </li>
            </ul>
          </article>

          <article className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md reveal-on-scroll up delay-1">
            <h3 className="font-serif text-xl font-bold text-gold mb-3">{copy.contactTitle[lang]}</h3>
            <ul className="text-sm text-sand space-y-2">
              <li>
                <strong className="text-white block">{copy.addressLabel[lang]}</strong>
                <span>7, Rue Ibn Zaidoun, Gueliz, Marrakech 40000</span>
              </li>
              <li className="pt-2">
                <strong className="text-white block">{copy.phoneLabel[lang]}</strong>
                <a href="tel:+212****7362" className="text-gold font-bold hover:underline">+212 613-727362</a>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bombay+Restaurant+7+Rue+Ibn+Zaidoun+Gueliz+Marrakech"
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
          <MenuSection defaultBranch="gueliz" />
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
