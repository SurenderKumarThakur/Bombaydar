'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import BookingWidget from '@/components/BookingWidget';
import SchemaScript from '@/components/SchemaScript';
import { aboutSchema, faqSchema } from '@/lib/schema';

function CountUpStat({ value, suffix = '', en, fr, lang }: { value: number; suffix?: string; en: string; fr: string; lang: 'EN' | 'FR' }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const duration = 1600;
      const start = performance.now();
      setDisplay(0);
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="reveal-on-scroll up">
      <div className="font-serif text-4xl md:text-5xl font-bold gold-text">{display}{suffix}</div>
      <div className="text-xs md:text-sm uppercase tracking-widest text-sand mt-2">{lang === 'EN' ? en : fr}</div>
    </div>
  );
}

export default function AboutClient() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'fr' ? 'fr' : 'en';
  const [lang, setLang] = useState<'EN' | 'FR'>(locale === 'fr' ? 'FR' : 'EN');

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'EN' | 'FR'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const copy = {
    title: { EN: "The Brand Story", FR: "Notre Histoire" },
    subtitle: { 
      EN: "Steadfast culinary heritage by Chef Surender Kumar Thakur.", 
      FR: "L'héritage culinaire du Chef Surender Kumar Thakur." 
    },
    label: { EN: "Deepen, Don't Dilute", FR: "Approfondir, Ne Pas Diluer" },
    
    p1: {
      EN: "Bombay Restaurant is not just a collection of restaurants; it is the culinary chronicle of Chef Surender Kumar Thakur. Born in the mountainous terrains of Himachal Pradesh, India, Chef Surender's career was forged in the strict discipline of luxury hotels. In 1998, he joined the Oberoi Group's pre-opening teams, working at the legendary Trident Udaipur and the ultra-luxury Oberoi Udaivilas. Here, he mastered the fine art of royal North Indian kitchen management.",
      FR: "Bombay Restaurant n'est pas seulement une chaîne de restaurants; c'est la chronique culinaire du Chef Surender Kumar Thakur. Né dans la région montagneuse de l'Himachal Pradesh, en Inde, la carrière du Chef Surender s'est forgée dans la discipline rigoureuse de l'hôtellerie de luxe. En 1998, il intègre les équipes d'ouverture du Groupe Oberoi, travaillant au mythique Trident Udaipur et au prestigieux Oberoi Udaivilas."
    },
    p2: {
      EN: "Seeking global exposure, Chef Surender moved to Hong Kong in 2001, serving as senior chef at the highly acclaimed 'Bombay Dreams.' This period expanded his palate, blending traditional techniques with international standards of presentation and guest hospitality.",
      FR: "Désireux de s'ouvrir sur l'international, le Chef Surender s'installe à Hong Kong en 2001 pour rejoindre les cuisines du célèbre restaurant 'Bombay Dreams'. Cette période enrichit son savoir-faire, alliant techniques ancestrales aux exigences de la gastronomie internationale."
    },
    p3: {
      EN: "In 2004, Chef Surender embarked on a bold venture: relocating to Morocco to introduce Indian cuisine for the very first time in the Kingdom. Opening Salam Bombay (later known as Bombay Restaurant) in Marrakech, he introduced Moroccan diners to the clay-pot tandoor oven, aromatic basmati rice, and complex garam masalas.",
      FR: "En 2004, le Chef Surender se lance un défi audacieux : s'installer au Maroc pour y introduire la cuisine indienne pour la toute première fois dans le Royaume. En ouvrant le Salam Bombay (plus tard renommé Bombay Restaurant) à Marrakech, il fait découvrir aux palais marocains le tandoor en terre cuite."
    },
    p4: {
      EN: "For over 20 years, Chef Surender has remained dedicated to serving Marrakech. Today, the group operates three interconnected destinations under the Bombay Restaurant banner: the flagship modern Marrakech lounge, the high-atmosphere Medina Rooftop terrace overlooking the ancient sky, and a refined Casablanca outlet. Despite competitor copycats, Chef Surender continues to manage every kitchen directly, ensuring that every curry retains its true, complex depth.",
      FR: "Depuis plus de 20 ans, le Chef Surender reste dévoué à Marrakech. Aujourd'hui, le groupe exploite trois adresses sous l'enseigne Bombay Restaurant : le restaurant moderne de Marrakech, le toit-terrasse de la Médina, et notre adresse de Casablanca. Malgré les tentatives de copie, le Chef Surender gère toujours chaque cuisine pour préserver l'authenticité de nos saveurs."
    },

    philosophyTitle: { EN: "Our Culinary Philosophy", FR: "Notre Philosophie Culinaire" },
    phil1Title: { EN: "Tandoor Integrity", FR: "Intégrité du Tandoor" },
    phil1Desc: { 
      EN: "We use traditional clay tandoors heated to extreme temperatures. This seals in charcoal smoke and moisture, giving our naans and seekh kebabs their distinct charred finish.", 
      FR: "Nous utilisons des fours tandoors traditionnels en argile. Cela emprisonne la fumée de charbon et l'humidité, donnant à nos pains naans et kebabs leur texture grillée unique." 
    },
    phil2Title: { EN: "The Clay-Pot Biryani", FR: "La Biryani en Pot d'Argile" },
    phil2Desc: { 
      EN: "Our signature chicken and lamb biryanis are layered with par-boiled basmati rice, saffron, and raw meats, sealed under a whole wheat dough layer, and slow-baked in individual clay handis.", 
      FR: "Nos biryanis de poulet et d'agneau sont préparés avec du riz basmati, du safran et des viandes marinées, scellés sous une pâte de blé, et cuits à l'étouffée dans des pots d'argile individuels." 
    },
    phil3Title: { EN: "Indo-Chinese Fusion", FR: "La Fusion Indo-Chinoise" },
    phil3Desc: { 
      EN: "Celebrating the historic culinary exchange in Kolkata, our menu features signature Indo-Chinese dishes like crispy Chilli Chicken and Tangy Lollipop Chicken.", 
      FR: "Célébrant l'échange culinaire de Calcutta, notre menu propose des classiques indo-chinois comme le poulet croustillant au piment et le poulet lollipop acidulé." 
    },
    
    cateringTitle: { EN: "Catering & Private Functions", FR: "Service Traiteur & Réceptions" },
    cateringText: {
      EN: "We do catering business for weddings, large or small functions. From formal corporate events to grand wedding banquets, our culinary team delivers a bespoke experience that will delight your guests. We tailor every menu to fit your needs, bringing the authentic taste of India to your venue.",
      FR: "Nous proposons un service traiteur pour les mariages, ainsi que pour les grandes et petites réceptions. Des événements d'entreprise aux grands banquets de mariage, notre équipe culinaire offre une expérience sur mesure qui ravira vos invités."
    },
    cateringCTA: { EN: "Inquire About Catering", FR: "Nous Contacter pour un Traiteur" },

    faqTitle: { EN: "Frequently Asked Questions", FR: "Questions Fréquentes" },
    faqs: [
      {
        q: { EN: "Is Bombay Restaurant halal?", FR: "Le restaurant est-il halal ?" },
        a: {
          EN: "Yes, all meat served at Bombay Restaurant is halal certified. We source our ingredients from trusted halal suppliers.",
          FR: "Oui, toute la viande servie chez Bombay Restaurant est certifiée halal. Nous nous approvisionnons auprès de fournisseurs halal de confiance."
        }
      },
      {
        q: { EN: "Do you have vegetarian and vegan options?", FR: "Proposez-vous des options végétariennes et véganes ?" },
        a: {
          EN: "Yes, our menu features extensive vegetarian options including paneer dishes, dal, vegetable curries, and vegan options like vegetable samosa, pakora, and salads. Look for the vegetarian (leaf) and vegan (seedling) icons on our menu.",
          FR: "Oui, notre menu propose de nombreuses options végétariennes (paneer, dal, currys de légumes) et véganes (samosa, pakora, salades). Repérez les icônes végétarien et végane sur notre menu."
        }
      },
      {
        q: { EN: "Is parking available at the restaurants?", FR: "Le stationnement est-il disponible ?" },
        a: {
          EN: "Bombay Marrakech Gueliz has street parking nearby. Medina Rooftop is in the pedestrian Medina area - we recommend taxi or walking from nearby parking. Bombay Casablanca Maârif has parking available in the area.",
          FR: "Bombay Marrakech Gueliz dispose de stationnement dans la rue à proximité. Medina Rooftop est dans la zone piétonne de la Médina - taxi ou marche recommandés. Bombay Casablanca Maârif dispose de stationnement à proximité."
        }
      },
      {
        q: { EN: "What is the dress code?", FR: "Quel est le code vestimentaire ?" },
        a: {
          EN: "Smart casual. We welcome guests in comfortable but presentable attire. No beachwear or sportswear at our fine dining locations.",
          FR: "Tenue décontractée chic. Nous accueillons nos clients dans une tenue confortable mais présentable. Pas de tenue de plage ou de sport dans nos établissements."
        }
      },
      {
        q: { EN: "Do you accept reservations?", FR: "Acceptez-vous les réservations ?" },
        a: {
          EN: "Yes, we highly recommend reservations especially for dinner and weekends. Book online via our website or call +212 613-727362.",
          FR: "Oui, nous recommandons vivement de réserver, surtout pour le dîner et les week-ends. Réservez en ligne ou appelez le +212 613-727362."
        }
      },
      {
        q: { EN: "Do you offer catering for weddings and events?", FR: "Proposez-vous un service traiteur pour mariages et événements ?" },
        a: {
          EN: "Yes, we provide catering services for weddings, corporate events, and private functions across Morocco. Contact us via WhatsApp at +212 613-727362 for a custom quote.",
          FR: "Oui, nous proposons un service traiteur pour mariages, événements d'entreprise et réceptions privées partout au Maroc. Contactez-nous sur WhatsApp au +212 613-727362 pour un devis."
        }
      },
      {
        q: { EN: "What payment methods do you accept?", FR: "Quels moyens de paiement acceptez-vous ?" },
        a: {
          EN: "Marrakech locations (Gueliz & Medina): Cash only (MAD, EUR, USD). Casablanca location: Cash and card payments accepted.",
          FR: "Marrakech (Gueliz et Medina) : espèces uniquement (MAD, EUR, USD). Casablanca : espèces et carte acceptées."
        }
      }
    ]
  };

  return (
    <div className="about-page-wrapper">
      <SchemaScript schema={aboutSchema} />
      <SchemaScript schema={faqSchema} />
      
      {/* Hero Banner */}
      <section className="about-hero" style={{ backgroundImage: `url('/images/web/hero_royal_lounge.jpg')` }} aria-label="Chef Surender Kumar Thakur brand story hero">
        <div className="hero-overlay" />
        <div className="container about-hero-content reveal-on-scroll up">
          <span className="location-badge">{copy.label[lang]}</span>
          <h1 className="font-serif about-title reveal-on-scroll left delay-1">{copy.title[lang]}</h1>
          <p className="about-subtitle reveal-on-scroll right delay-2">{copy.subtitle[lang]}</p>
        </div>
      </section>

      {/* Heritage Details */}
      <section className="about-history-section container section-reveal" aria-labelledby="heritage-title">
        <div className="about-grid">
          <div className="about-content-paragraphs reveal-on-scroll left">
            <h2 id="heritage-title" className="font-serif">{lang === 'EN' ? 'From Udaipur to Marrakech' : 'De Udaipur à Marrakech'}</h2>
            <div className="section-divider" />
            <p className="about-p reveal-on-scroll up delay-1">{copy.p1[lang]}</p>
            <p className="about-p reveal-on-scroll up delay-2">{copy.p2[lang]}</p>
            <p className="about-p reveal-on-scroll up delay-3">{copy.p3[lang]}</p>
            <p className="about-p reveal-on-scroll up delay-4">{copy.p4[lang]}</p>
          </div>
          
          <div className="about-image-column reveal-on-scroll right">
            <figure className="about-img-frame glass-panel">
              <Image
                src="/images/clay_pot_biryani_hd.png"
                alt="Signature clay-pot slow-cooked chicken biryani - layered with saffron basmati rice, marinated chicken, and sealed with wheat dough for dum cooking"
                width={500}
                height={350}
                className="about-side-img"
                style={{ objectPosition: 'center 78%' }}
              />
              <figcaption className="img-caption">{lang === 'EN' ? 'Our signature clay-pot slow-cooked Biryani, prepared using traditional dum cooking method.' : 'Notre biryani signature en pot d\'argile, cuit selon la méthode traditionnelle dum.'}</figcaption>
            </figure>
            <figure className="about-img-frame glass-panel">
              <Image
                src="/images/web/chef_surender_solo_portrait.jpg"
                alt="Chef Surender Kumar Thakur - Owner & Founder of Bombay Restaurant, standing outside the Marrakech flagship location with 20+ years of culinary mastery"
                width={720}
                height={1071}
                className="about-side-img"
                style={{ height: 'auto', objectFit: 'contain' }}
              />
              <figcaption className="img-caption">{lang === 'EN' ? 'Chef Surender Kumar Thakur, Owner & Founder of Bombay Restaurant Morocco.' : 'Le Chef Surender Kumar Thakur, Propriétaire et Fondateur de Bombay Restaurant Maroc.'}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="about-philosophy-section section-reveal" aria-labelledby="philosophy-title">
        <div className="container">
          <div className="section-header-center reveal-on-scroll up">
            <span className="section-label">{copy.philosophyTitle[lang]}</span>
            <h2 id="philosophy-title" className="section-title font-serif">{copy.philosophyTitle[lang]}</h2>
            <div className="section-divider-center" />
          </div>
          <div className="philosophy-grid stagger-reveal">
            <article className="philosophy-card glass-panel">
              <h3 className="font-serif">{copy.phil1Title[lang]}</h3>
              <p>{copy.phil1Desc[lang]}</p>
            </article>
            <article className="philosophy-card glass-panel">
              <h3 className="font-serif">{copy.phil2Title[lang]}</h3>
              <p>{copy.phil2Desc[lang]}</p>
            </article>
            <article className="philosophy-card glass-panel">
              <h3 className="font-serif">{copy.phil3Title[lang]}</h3>
              <p>{copy.phil3Desc[lang]}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Stats band — SSR renders final values (SEO-safe, no CLS); counts up on first view for motion-allowed users */}
      <section className="py-14 border-y border-white/5 section-reveal" aria-label="Restaurant statistics">
        <div className="container max-w-4xl grid grid-cols-3 gap-6 text-center stagger-reveal">
          <CountUpStat value={20} suffix="+" en="Years of Mastery" fr="Ans de Maîtrise" lang={lang} />
          <CountUpStat value={3} en="Locations in Morocco" fr="Adresses au Maroc" lang={lang} />
          <CountUpStat value={85} suffix="+" en="Signature Dishes" fr="Plats Signatures" lang={lang} />
        </div>
      </section>

      {/* Catering Section on About Page */}
      <section className="py-16 bg-black/40 border-b border-white/5 section-reveal" aria-labelledby="catering-title-about">
        <div className="container max-w-4xl text-center reveal-on-scroll up">
          <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-2">
            {lang === 'EN' ? 'Private Dining & Events' : 'Dîners Privés & Événements'}
          </span>
          <h2 id="catering-title-about" className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            {copy.cateringTitle[lang]}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-sand text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-light reveal-on-scroll up delay-1">
            {copy.cateringText[lang]}
          </p>
          <a 
            href="https://wa.me/212613727362?text=Hello%20Bombay%20Restaurant!%20I%20would%20like%20to%20inquire%20about%20catering%20services%20for%20my%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary pulse-glow"
          >
            {copy.cateringCTA[lang]}
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 border-b border-white/5 section-reveal" aria-labelledby="faq-title">
        <div className="container max-w-3xl reveal-on-scroll up">
          <div className="section-header-center mb-10">
            <span className="section-label">{copy.faqTitle[lang]}</span>
            <h2 id="faq-title" className="section-title font-serif">{copy.faqTitle[lang]}</h2>
            <div className="section-divider-center" />
          </div>
          <div className="flex flex-col gap-3">
            {copy.faqs.map((faq, i) => (
              <details key={i} className="glass-panel rounded-xl px-5 py-4 group">
                <summary className="font-serif text-lg text-white cursor-pointer list-none flex items-center justify-between gap-4">
                  {faq.q[lang]}
                  <span className="text-gold text-xl flex-shrink-0 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-sand text-sm md:text-base leading-relaxed mt-3 font-light">
                  {faq.a[lang]}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="about-booking-section section-reveal" aria-labelledby="booking-title">
        <div className="container reveal-on-scroll up">
          <BookingWidget />
        </div>
      </section>
    </div>
  );
}