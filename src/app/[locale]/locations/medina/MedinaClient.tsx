'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MenuSection from '@/components/MenuSection';
import BookingWidget from '@/components/BookingWidget';
import SchemaScript from '@/components/SchemaScript';
import Breadcrumbs from '@/components/Breadcrumbs';
import { medinaSchema, medinaFaq, generateMenuSchema } from '@/lib/schema';

export default function MedinaClient() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'fr' ? 'fr' : 'en';
  const [lang, setLang] = useState<'EN' | 'FR'>(locale === 'fr' ? 'FR' : 'EN');
  const [slideIndex, setSlideIndex] = useState(0);

  const heroSlides = [
    { src: '/images/web/hero_medina_rooftop.jpg', alt: 'Medina Rooftop Marrakech - Stunning rooftop terrace with panoramic views of Koutoubia Mosque and Atlas Mountains at sunset' },
    { src: '/images/web/food_clay_pot_biryani.jpg', alt: 'Signature clay-pot chicken biryani - slow-cooked in traditional sealed clay handi with saffron rice and aromatic spices' },
    { src: '/images/web/ambiance_luxury_table.jpg', alt: 'Luxury rooftop table setting with gold cutlery, candlelight, and premium Indian cuisine under the stars' },
    { src: '/images/web/chef_surender_solo_portrait.jpg', alt: 'Chef Surender Kumar Thakur - Master chef behind Bombay Restaurant\'s authentic Mughlai cuisine' },
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
    title: { EN: "Medina Rooftop", FR: "Médina Rooftop" },
    subtitle: { EN: "Dine under the Marrakech stars overlooking historic sights.", FR: "Dînez sous les étoiles de Marrakech surplombant les monuments." },
    tagline: {
      EN: "Suspended above the bustling souks near Jemaa el-Fnaa, our Rooftop offers breathtaking sunset views of the Koutoubia Mosque and Atlas Mountains. Combining authentic Moroccan riad architecture with royal Mughlai clay-pot cooking, dining under the starlit Marrakech sky is an unforgettable experience.",
      FR: "Suspendu au-dessus des souks animés près de Jemaa el-Fnaa, notre Rooftop offre une vue panoramique spectaculaire sur la Koutoubia et l'Atlas. Alliant l'architecture d'un riad marocain à la cuisine royale en pot d'argile, dîner sous les étoiles est une expérience inoubliable."
    },
    hoursTitle: { EN: "Opening Hours", FR: "Horaires d'Ouverture" },
    contactTitle: { EN: "Contact & Address", FR: "Contact & Adresse" },
    badge: { EN: "Medina Rooftop • Near Jemaa el-Fnaa", FR: "Médina Rooftop • Près de Jemaa el-Fnaa" },
    breadcrumbLocations: { EN: "Locations", FR: "Nos Adresses" },
    breadcrumbSelf: { EN: "Medina Rooftop", FR: "Médina Rooftop" },
    hoursRowLabel: { EN: "Daily Sunset & Dinner:", FR: "Coucher du Soleil & Dîner :" },
    addressLabel: { EN: "Address:", FR: "Adresse :" },
    phoneLabel: { EN: "Central Phone:", FR: "Téléphone Central :" },
    directions: { EN: "Get Directions →", FR: "Itinéraire →" },
    paymentTitle: { EN: "Payment Info", FR: "Modes de Paiement" },
    paymentDesc: { EN: "Marrakech Medina branch accepts Cash payments (MAD, EUR, USD).", FR: "Notre adresse de la Médina accepte les paiements en espèces (MAD, EUR, USD)." },
    narrativeTitle: { EN: "Royal Mughlai Above the Red City", FR: "Cuisine Moghlai Royale au-Dessus de la Ville Rouge" },
    menuBadge: { EN: "Medina Rooftop Specialties", FR: "Spécialités du Médina Rooftop" },
    menuTitle: { EN: "The Medina Menu", FR: "Le Menu Médina" },
  };

  return (
    <div className="location-page-wrapper">
      <SchemaScript schema={medinaSchema} />
      <SchemaScript schema={medinaFaq} />
      <SchemaScript schema={generateMenuSchema('marrakech')} />
      
      {/* Header Banner Carousel */}
      <section className="relative h-[65vh] min-h-[480px] w-full overflow-hidden flex items-center justify-center" aria-label="Medina Rooftop Marrakech photo carousel">
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
        <Breadcrumbs items={[{ name: copy.breadcrumbLocations[lang], url: `/${locale}/locations` }, { name: copy.breadcrumbSelf[lang], url: `/${locale}/locations/medina` }]} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mt-6">
          <article className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md reveal-on-scroll up">
            <h3 className="font-serif text-xl font-bold text-gold mb-3">{copy.hoursTitle[lang]}</h3>
            <ul className="text-sm text-sand space-y-2">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>{copy.hoursRowLabel[lang]}</span>
                <span className="font-bold text-white">12:30 - 23:30</span>
              </li>
            </ul>
          </article>

          <article className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md reveal-on-scroll up delay-1">
            <h3 className="font-serif text-xl font-bold text-gold mb-3">{copy.contactTitle[lang]}</h3>
            <ul className="text-sm text-sand space-y-2">
              <li>
                <strong className="text-white block">{copy.addressLabel[lang]}</strong>
                <span>Derb Dabachi, Marrakech Medina (Near Jemaa el-Fnaa)</span>
              </li>
              <li className="pt-2">
                <strong className="text-white block">{copy.phoneLabel[lang]}</strong>
                <a href="tel:+212****7362" className="text-gold font-bold hover:underline">+212 613-727362</a>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bombay+Restaurant+Derb+Dabachi+Medina+Marrakech"
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
            <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-2">{copy.menuBadge[lang]}</span>
            <h2 id="menu-title" className="font-serif text-3xl md:text-4xl font-bold text-white">{copy.menuTitle[lang]}</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <MenuSection defaultBranch="medina" />
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
