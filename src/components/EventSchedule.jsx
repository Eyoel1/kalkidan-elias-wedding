import React, { useState } from 'react';
import { Clock, MapPin, Compass, ExternalLink, Sparkles, Navigation, Layers, Car, Globe } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const EventSchedule = ({ lang }) => {
  const { ceremony, reception } = weddingConfig.venue;
  const { date } = weddingConfig;
  const [selectedVenue, setSelectedVenue] = useState('ceremony');
  const [mapStyle, setMapStyle] = useState('dark'); // 'dark' or 'satellite'

  const isAm = lang === 'am';
  const activeVenue = selectedVenue === 'ceremony' ? ceremony : reception;

  const mapSrc = mapStyle === 'dark'
    ? `https://maps.google.com/maps?q=${encodeURIComponent(activeVenue.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(activeVenue.address)}&t=k&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="events" style={{ padding: '5.5rem 0' }}>
      <div className="section-title">
        <h3>{isAm ? 'የጋብቻና የደስታ ቦታዎች' : 'Sacred Union & Celebration'}</h3>
        <h2>{isAm ? 'የበዓሉ ቦታና ካርታ' : 'Interactive Venue & Map'}</h2>
        <p>
          {isAm
            ? 'ለቃልኪዳንና ለኤልያስ ሠርግ የተመረጡት የተክሊል ቦታና የደስታ አዳራሽ በዘመናዊ ካርታ።'
            : 'Explore our sanctuary & oceanfront glasshouse with our modern dark interactive map.'}
        </p>
      </div>

      {/* Main Luxury Venue Hub */}
      <div
        className="luxury-card"
        style={{
          padding: '2.5rem',
          background: 'radial-gradient(ellipse at top, rgba(22, 28, 24, 0.95) 0%, rgba(9, 12, 10, 0.98) 100%)',
          border: '1.5px solid var(--gold-primary)',
          boxShadow: 'var(--shadow-deep)',
          borderRadius: '32px'
        }}
      >
        {/* Top Venue Switcher Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
            paddingBottom: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            {[
              { id: 'ceremony', name: isAm ? '1. የቅዱስ ተክሊል ቦታ' : '1. Holy Matrimony Sanctuary', time: isAm ? date.ceremonyTimeAm : date.ceremonyTimeEn },
              { id: 'reception', name: isAm ? '2. የምሽት ደስታ አዳራሽ' : '2. Evening Glasshouse Reception', time: isAm ? date.receptionTimeAm : date.receptionTimeEn }
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVenue(v.id)}
                style={{
                  background: selectedVenue === v.id ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
                  color: selectedVenue === v.id ? '#0E120F' : 'var(--gold-light)',
                  border: selectedVenue === v.id ? '1px solid var(--gold-primary)' : '1px solid rgba(212,175,55,0.3)',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '30px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: selectedVenue === v.id ? '0 8px 25px rgba(212,175,55,0.45)' : 'none'
                }}
              >
                {v.name} ({v.time})
              </button>
            ))}
          </div>

          {/* Map View Mode Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {isAm ? 'የካርታ አይነት:' : 'Map Style:'}
            </span>
            <button
              onClick={() => setMapStyle(mapStyle === 'dark' ? 'satellite' : 'dark')}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid var(--gold-primary)',
                color: 'var(--gold-light)',
                padding: '0.45rem 0.9rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Layers size={14} color="var(--gold-primary)" />
              {mapStyle === 'dark' ? (isAm ? 'ሳተላይት (Satellite)' : 'Satellite View') : (isAm ? 'ቪክተር (Dark Map)' : 'Dark Map')}
            </button>
          </div>
        </div>

        {/* 2-Column Split: Venue Details & Modern Map Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          {/* Venue Card Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(212,175,55,0.18)',
                color: 'var(--gold-light)',
                padding: '0.45rem 1.2rem',
                borderRadius: '30px',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                width: 'fit-content'
              }}
            >
              <Sparkles size={15} color="var(--gold-primary)" />
              {selectedVenue === 'ceremony' ? (isAm ? 'የተክሊል ቦታ' : 'Ceremony Sanctuary') : (isAm ? 'የምሽት በዓል ቦታ' : 'Reception Glasshouse')}
            </div>

            <div>
              <h3 className="font-serif" style={{ fontSize: '2.4rem', color: '#FFFFFF', lineHeight: 1.15 }}>
                {isAm ? activeVenue.nameAm : activeVenue.nameEn}
              </h3>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: 'var(--gold-primary)',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  marginTop: '0.6rem'
                }}
              >
                <Clock size={18} />
                <span>
                  {isAm ? date.displayDateAm : date.displayDateEn} @ {selectedVenue === 'ceremony' ? (isAm ? date.ceremonyTimeAm : date.ceremonyTimeEn) : (isAm ? date.receptionTimeAm : date.receptionTimeEn)}
                </span>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(212,175,55,0.25)',
                borderRadius: '16px',
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={20} color="var(--gold-primary)" style={{ shrink: 0, marginTop: '3px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {isAm ? 'የቦታው አድራሻ' : 'Full Address'}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: 600, marginTop: '0.2rem' }}>
                    {activeVenue.address}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', paddingTop: '0.6rem', borderTop: '1px dashed rgba(212,175,55,0.2)', fontSize: '0.85rem', color: 'var(--gold-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Car size={16} color="var(--gold-primary)" />
                  <span>{isAm ? 'ነጻ የቫሌት ፓርኪንግ አለ' : 'Valet Parking Available'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Globe size={16} color="var(--gold-primary)" />
                  <span>{isAm ? 'የባሕር ዳርቻ እይታ' : 'Scenic Ocean Crest View'}</span>
                </div>
              </div>
            </div>

            {/* Direct Navigation Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.4rem' }}>
              <a
                href={activeVenue.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
                style={{ textDecoration: 'none', padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
              >
                <Navigation size={18} /> {isAm ? 'በጉግል ካርታ አቅጣጫ ጀምር' : 'Navigate via Google Maps'}
              </a>

              <a
                href={activeVenue.wazeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-gold"
                style={{ textDecoration: 'none', padding: '0.85rem 1.5rem', fontSize: '0.95rem' }}
              >
                <Compass size={18} /> {isAm ? 'በዌዝ (Waze) ጀምር' : 'Open in Waze'}
              </a>
            </div>
          </div>

          {/* Ultra Modern Glass Map Container with Glowing Live Marker */}
          <div
            style={{
              position: 'relative',
              height: '420px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '2px solid var(--gold-primary)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              background: '#0D110E'
            }}
          >
            <iframe
              title="Venue Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{
                border: 0,
                filter: mapStyle === 'dark' ? 'invert(90%) hue-rotate(180deg) contrast(1.2)' : 'contrast(1.1)'
              }}
              src={mapSrc}
              allowFullScreen
            />

            {/* Floating Glass Overlay Card */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(12, 16, 13, 0.92)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(212,175,55,0.4)',
                borderRadius: '16px',
                padding: '0.8rem 1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#FFFFFF'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <div
                  style={{
                    background: 'var(--gold-gradient)',
                    color: '#0E120F',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    boxShadow: '0 0 15px rgba(212,175,55,0.6)'
                  }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    {isAm ? activeVenue.nameAm : activeVenue.nameEn}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {isAm ? activeVenue.cityAm : activeVenue.cityEn}
                  </div>
                </div>
              </div>

              <a
                href={activeVenue.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'var(--gold-primary)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                {isAm ? 'አቅጣጫ' : 'Directions'} <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
