'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BookingWidget() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'fr' ? 'fr' : 'en';
  const [lang, setLang] = useState<'EN' | 'FR'>(locale === 'fr' ? 'FR' : 'EN');
  const [location, setLocation] = useState('medina');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('20:00');
  const [bookingMethod, setBookingMethod] = useState<'eatnow' | 'whatsapp'>('whatsapp');
  const [isSuccess, setIsSuccess] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'EN' | 'FR'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('langChange', handleLangChange);
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setTimeout(() => {
      setDate(tomorrow.toISOString().split('T')[0]);
    }, 0);

    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const locationLabels: Record<string, { EN: string; FR: string }> = {
    gueliz: { EN: 'Bombay Marrakech', FR: 'Bombay Marrakech' },
    medina: { EN: 'Bombay Medina Rooftop', FR: 'Bombay Médina Rooftop' },
    casablanca: { EN: 'Bombay Casablanca', FR: 'Bombay Casablanca' }
  };

  const handleWhatsAppBooking = () => {
    const formattedLocation = locationLabels[location][lang];
    const text = `Hello Bombay Restaurant, I would like to book a table for ${guests} guests at ${formattedLocation} on ${date} at ${time}. Please confirm my booking. Thank you!`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/212613727362?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEatNowBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          location,
          guests,
          date,
          time,
          company_website: honeypot,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMessage(
          data.error || (lang === 'EN' ? 'Something went wrong. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.')
        );
        return;
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      setErrorMessage(
        lang === 'EN' ? 'Network error. Please try again.' : 'Erreur réseau. Veuillez réessayer.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-widget-wrapper glass-panel" id="reserve">
      <div className="booking-header">
        <h3 className="font-serif gold-text booking-title">
          {lang === 'EN' ? 'Reserve Your Experience' : 'Réserver Votre Expérience'}
        </h3>
        <p className="booking-subtitle">
          {lang === 'EN' 
            ? 'Select your preferred location and booking channel below.' 
            : 'Sélectionnez votre restaurant et votre canal de réservation.'}
        </p>
      </div>

      {/* Booking Method Selector */}
      <div className="method-selector">
        <button 
          className={`method-tab ${bookingMethod === 'whatsapp' ? 'active' : ''}`}
          onClick={() => setBookingMethod('whatsapp')}
        >
          <span className="method-icon">💬</span>
          <div className="method-info">
            <span className="method-name">WhatsApp Business</span>
            <span className="method-desc">{lang === 'EN' ? 'Central Branch Router' : 'Routage Centralisé'}</span>
          </div>
        </button>
        <button 
          className={`method-tab ${bookingMethod === 'eatnow' ? 'active' : ''}`}
          onClick={() => setBookingMethod('eatnow')}
        >
          <span className="method-icon">⚡</span>
          <div className="method-info">
            <span className="method-name">EatNow Widget</span>
            <span className="method-desc">{lang === 'EN' ? 'Instant Confirmation' : 'Confirmation Instantanée'}</span>
          </div>
        </button>
      </div>

      <div className="booking-body">
        {bookingMethod === 'whatsapp' ? (
          /* WhatsApp Form Helper */
          <div className="whatsapp-form">
            <div className="form-grid">
              <div className="form-group">
                <label>{lang === 'EN' ? 'Select Location' : 'Choisir le Restaurant'}</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="gueliz">{locationLabels.gueliz[lang]}</option>
                  <option value="medina">{locationLabels.medina[lang]}</option>
                  <option value="casablanca">{locationLabels.casablanca[lang]}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{lang === 'EN' ? 'Diners' : 'Nombre d\'invités'}</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? (lang === 'EN' ? 'Guest' : 'Couverts') : (lang === 'EN' ? 'Guests' : 'Couverts')}</option>
                  ))}
                  <option value="10+">{lang === 'EN' ? 'More than 10 (Event)' : 'Plus de 10 (Événement)'}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{lang === 'EN' ? 'Date' : 'Date'}</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>{lang === 'EN' ? 'Time' : 'Heure'}</label>
                <select value={time} onChange={(e) => setTime(e.target.value)}>
                  {['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {location === 'gueliz' && (
              <div className="cash-notice">
                ⚠️ {lang === 'EN' ? 'Note: Our Marrakech branch operates on cash-only payments.' : 'Note : Notre restaurant de Marrakech accepte uniquement les espèces.'}
              </div>
            )}

            <button className="btn-primary whatsapp-submit-btn" onClick={handleWhatsAppBooking}>
              <span>💬 {lang === 'EN' ? 'Send WhatsApp Booking' : 'Envoyer la réservation WhatsApp'}</span>
            </button>
            <p className="whatsapp-help-text">
              {lang === 'EN' 
                ? 'Clicking will open WhatsApp and load your prefilled booking template for instant routing.' 
                : 'En cliquant, vous ouvrirez WhatsApp avec votre modèle de réservation pré-rempli.'}
            </p>
          </div>
        ) : (
          /* EatNow Mock Widget Form */
          <form className="eatnow-form" onSubmit={handleEatNowBooking}>
            {isSuccess ? (
              <div className="eatnow-success animate-fade-in-simple">
                <span className="success-icon">✓</span>
                <h4>{lang === 'EN' ? 'Reservation Request Sent!' : 'Demande de réservation envoyée !'}</h4>
                <p>
                  {lang === 'EN' 
                    ? 'Our team has received your request via EatNow and will verify it shortly. Check your email or SMS.' 
                    : 'Notre équipe a reçu votre demande via EatNow et la validera sous peu. Vérifiez vos e-mails ou SMS.'}
                </p>
              </div>
            ) : (
              <>
                <div className="form-grid">
                  <div className="form-group">
                    <label>{lang === 'EN' ? 'Select Location' : 'Choisir le Restaurant'}</label>
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
                      <option value="gueliz">{locationLabels.gueliz[lang]}</option>
                      <option value="medina">{locationLabels.medina[lang]}</option>
                      <option value="casablanca">{locationLabels.casablanca[lang]}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>{lang === 'EN' ? 'Guests' : 'Invités'}</label>
                    <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={n}>{n} {lang === 'EN' ? 'Guests' : 'Couverts'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>{lang === 'EN' ? 'Date' : 'Date'}</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>

                  <div className="form-group">
                    <label>{lang === 'EN' ? 'Time' : 'Heure'}</label>
                    <select value={time} onChange={(e) => setTime(e.target.value)}>
                      {['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-grid info-fields">
                  <div className="form-group">
                    <label>{lang === 'EN' ? 'Full Name' : 'Nom Complet'}</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={lang === 'EN' ? 'John Doe' : 'Jean Dupont'}
                    />
                  </div>

                  <div className="form-group">
                    <label>{lang === 'EN' ? 'Phone Number' : 'Numéro de Téléphone'}</label>
                    <input
                      type="tel"
                      required
                      pattern="^\+?[0-9\s-]{6,20}$"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+212 600-000000"
                    />
                  </div>
                </div>

                {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
                <div className="honeypot-field" aria-hidden="true">
                  <label htmlFor="company_website">Company Website</label>
                  <input
                    type="text"
                    id="company_website"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {location === 'gueliz' && (
                  <div className="cash-notice">
                    ⚠️ {lang === 'EN' ? 'Note: Our Marrakech branch operates on cash-only payments.' : 'Note : Notre restaurant de Marrakech accepte uniquement les espèces.'}
                  </div>
                )}

                {errorMessage && (
                  <div className="form-error-notice">{errorMessage}</div>
                )}

                <button type="submit" className="btn-primary eatnow-submit-btn" disabled={isSubmitting}>
                  <span>⚡ {isSubmitting
                    ? (lang === 'EN' ? 'Sending...' : 'Envoi...')
                    : (lang === 'EN' ? 'Confirm Instant Booking' : 'Confirmer la réservation')}</span>
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
