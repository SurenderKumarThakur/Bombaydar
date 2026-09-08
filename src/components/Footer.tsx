'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';

export default function Footer() {
  const [lang, setLang] = useState<'EN' | 'FR'>('EN');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'fr' ? 'fr' : 'en';

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'EN' | 'FR'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const content = {
    tagline: {
      EN: "Authentic, home-style North Indian & Punjabi cuisine. Catering for weddings, large or small functions across Morocco since 2004.",
      FR: "Cuisine authentique du nord de l'Inde. Service traiteur pour mariages, petites et grandes réceptions au Maroc depuis 2004."
    },
    quickLinks: {
      EN: "Quick Links",
      FR: "Liens Rapides"
    },
    locations: {
      EN: "Our Locations",
      FR: "Nos Restaurants"
    },
    contact: {
      EN: "Central Booking",
      FR: "Réservations Centrales"
    },
    rights: {
      EN: "All rights reserved. Designed with passion.",
      FR: "Tous droits réservés. Conçu avec passion."
    }
  };

  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        {/* Brand Info */}
        <div className="footer-brand">
          <Link href={`/${locale}`} className="footer-logo">
            <Logo size={54} />
            <div className="logo-text-wrapper">
              <span className="logo-title font-serif gold-text">BOMBAY RESTAURANT</span>
              <span className="logo-subtitle">MOROCCO</span>
            </div>
          </Link>
          <p className="footer-tagline">{content.tagline[lang]}</p>
          <div className="footer-socials">
            <a href="https://instagram.com/bombay_marrakech" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <span className="social-icon">IG</span>
            </a>
            <a href="https://facebook.com/bombaymarrakech" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <span className="social-icon">FB</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4 className="footer-title">{content.quickLinks[lang]}</h4>
          <ul className="footer-links">
            <li><Link href={`/${locale}`}>{lang === 'EN' ? 'Home' : 'Accueil'}</Link></li>
            <li><Link href={`/${locale}/menu`}>{lang === 'EN' ? 'Menu' : 'Carte'}</Link></li>
            <li><Link href={`/${locale}/about`}>{lang === 'EN' ? 'Brand Story' : 'Notre Histoire'}</Link></li>
            <li><Link href={`/${locale}/chef`}>{lang === 'EN' ? 'Our Chef' : 'Notre Chef'}</Link></li>
            <li><Link href={`/${locale}/catering`}>{lang === 'EN' ? 'Catering & Events' : 'Traiteur & Réceptions'}</Link></li>
            <li><Link href={`/${locale}/gallery`}>{lang === 'EN' ? 'Gallery' : 'Galerie'}</Link></li>
            <li><Link href={`/${locale}/blog`}>{lang === 'EN' ? 'Journal' : 'Journal'}</Link></li>
          </ul>
        </div>

        {/* Locations Info */}
        <div className="footer-column">
          <h4 className="footer-title">{content.locations[lang]}</h4>
          <ul className="footer-locations-list">
            <li>
              <strong>Bombay Marrakech</strong>
              <p>7, Rue Ibn Zaidoun</p>
              <span className="footer-hours">Tue - Sun: 12:00 - 23:00 | Mon: 18:00 - 23:00</span>
            </li>
            <li>
              <strong>Medina Rooftop, Marrakech</strong>
              <p>Derb Dabachi, near Jemaa el-Fnaa</p>
              <span className="footer-hours">Open Daily: 12:00 - 00:00</span>
            </li>
            <li>
              <strong>Bombay Casablanca</strong>
              <p>Maârif, Casablanca</p>
              <span className="footer-hours">Open Daily: 12:00 - 23:30</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h4 className="footer-title">{content.contact[lang]}</h4>
          <ul className="footer-contact-details">
            <li>
              <span className="contact-label">Phone:</span>
              <a href="tel:+212613727362" className="contact-value">+212 613-727362</a>
            </li>
            <li>
              <span className="contact-label">Sec. Phone (Marrakech):</span>
              <a href="tel:+212600919304" className="contact-value">+212 600-919304</a>
            </li>
            <li>
              <span className="contact-label">Email:</span>
              <a href="mailto:Indian.maroc@gmail.com" className="contact-value">Indian.maroc@gmail.com</a>
            </li>
            <li className="payment-notice">
              <span className="payment-badge">Cash Only (Marrakech branches)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p>&copy; {new Date().getFullYear()} Bombay Restaurant Morocco. {content.rights[lang]}</p>
        </div>
      </div>
    </footer>
  );
}
