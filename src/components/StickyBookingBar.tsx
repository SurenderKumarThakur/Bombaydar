'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StickyBookingBar() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'fr' ? 'fr' : 'en';
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState<'EN' | 'FR'>(locale === 'fr' ? 'FR' : 'EN');

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'EN' | 'FR'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('langChange', handleLangChange);

    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('langChange', handleLangChange);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <Link
      href="#booking-anchor"
      className="sticky-booking-bar"
      aria-label={lang === 'EN' ? 'Book a table' : 'Réserver une table'}
    >
      <span className="booking-bar-icon" aria-hidden="true">📅</span>
      <span className="booking-bar-text">
        {lang === 'EN' ? 'Book a Table' : 'Réserver une Table'}
      </span>
      <span className="booking-bar-arrow" aria-hidden="true">→</span>
    </Link>
  );
}