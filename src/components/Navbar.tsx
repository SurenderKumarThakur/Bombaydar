'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split('/')[1] === 'fr' ? 'fr' : 'en';
  const [lang, setLang] = useState<'EN' | 'FR'>(locale === 'fr' ? 'FR' : 'EN');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'EN' | 'FR'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('langChange', handleLangChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('langChange', handleLangChange);
    };
  }, []);

  // Keep the toggle in sync with the actual URL locale (e.g. after
  // navigating directly to /fr/... or using browser back/forward) without
  // triggering a synchronous setState-in-effect lint violation.
  const derivedLang = locale === 'fr' ? 'FR' : 'EN';
  if (lang !== derivedLang) {
    setLang(derivedLang);
  }

  const toggleLang = () => {
    const nextLocale = locale === 'fr' ? 'en' : 'fr';
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    const nextPath = segments.join('/') || `/${nextLocale}`;
    window.dispatchEvent(new CustomEvent('langChange', { detail: nextLocale === 'fr' ? 'FR' : 'EN' }));
    router.push(nextPath);
  };

  const navLinks = [
    { href: `/${locale}`, label: { EN: 'Home', FR: 'Accueil' } },
    { href: `/${locale}/menu`, label: { EN: 'Menu', FR: 'Carte' } },
    { href: `/${locale}/about`, label: { EN: 'Brand Story', FR: 'Notre Histoire' } },
    { href: `/${locale}/locations/gueliz`, label: { EN: 'Bombay Marrakech', FR: 'Bombay Marrakech' } },
    { href: `/${locale}/locations/medina`, label: { EN: 'Medina Rooftop', FR: 'Médina Rooftop' } },
    { href: `/${locale}/locations/casablanca`, label: { EN: 'Casablanca', FR: 'Casablanca' } },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link href={`/${locale}`} className="nav-logo" onClick={handleLinkClick}>
          <Logo size={44} />
          <div className="logo-text-wrapper">
            <span className="logo-title font-serif gold-text">BOMBAY RESTAURANT</span>
            <span className="logo-subtitle">MOROCCO</span>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button 
          className={`mobile-menu-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation links */}
        <div className={`nav-links-wrapper ${isOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={handleLinkClick}
                  >
                    {link.label[lang]}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="nav-actions">
            <a 
              href="https://wa.me/212613727362?text=Hello%20Bombay%20Restaurant!%20I%20would%20like%20to%20order%20food%20for%20delivery/takeaway." 
              target="_blank"
              rel="noopener noreferrer"
              className="nav-delivery-btn"
              title="Order Delivery / Takeaway via WhatsApp"
            >
              
              <span>{lang === 'EN' ? 'Delivery' : 'Livraison'}</span>
            </a>

            <button
              onClick={toggleLang}
              className="lang-toggle-btn"
              title="Switch Language"
            >
              {lang === 'EN' ? 'FR' : 'EN'}
            </button>

            <ThemeToggle />

            <Link
              href={`/${locale}#reserve`}
              className="btn-primary nav-book-btn"
              onClick={handleLinkClick}
            >
              {lang === 'EN' ? 'Book a Table' : 'Réserver'}
            </Link>
          </div>
        </div>
      </div>
    
      {/* Mobile Floating Sticky CTA Bar */}
      <div className="mobile-sticky-bar">
        <Link href={`/${locale}#reserve`} className="mobile-sticky-btn mobile-btn-book" onClick={handleLinkClick}>
           {lang === 'EN' ? 'Book Table' : 'Réserver'}
        </Link>
        <a 
          href="https://wa.me/212613727362?text=Hello%20Bombay%20Restaurant!%20I%20would%20like%20to%20order%20food%20for%20delivery/takeaway."
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-sticky-btn mobile-btn-delivery"
        >
           {lang === 'EN' ? 'Delivery' : 'Livraison'}
        </a>
      </div>
    </nav>
  );
}
