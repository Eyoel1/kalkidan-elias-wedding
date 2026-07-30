import React, { useState, useEffect } from 'react';
import { Camera, Calendar, MapPin, ChevronDown, Globe } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const HeaderHero = ({ onOpenUploader, lang, onToggleLang }) => {
  const photos = weddingConfig.officialPhotos;
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % photos.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [photos.length]);

  const isAm = lang === 'am';

  return (
    <header
      id="hero"
      style={{
        position: 'relative',
        minHeight: '94vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem 1rem',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* Language Switcher Badge at Top Right */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 50
        }}
      >
        <button
          onClick={onToggleLang}
          style={{
            background: 'rgba(12, 16, 13, 0.85)',
            border: '1.5px solid var(--gold-primary)',
            color: 'var(--gold-light)',
            padding: '0.5rem 1.1rem',
            borderRadius: '30px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.5)'
          }}
        >
          <Globe size={16} color="var(--gold-primary)" />
          <span>{isAm ? 'English' : 'አማርኛ 🇪🇹'}</span>
        </button>
      </div>

      {/* Background Slideshow with Smooth Crossfade */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      >
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${photo.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: idx === currentBgIndex ? 1 : 0,
              transform: idx === currentBgIndex ? 'scale(1.05)' : 'scale(1.0)',
              transition: 'opacity 1.8s ease-in-out, transform 7s ease-out'
            }}
          />
        ))}
        {/* Dark Royal Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at center, rgba(9, 12, 10, 0.45) 0%, rgba(9, 12, 10, 0.88) 100%)'
          }}
        />
      </div>

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '850px',
          margin: '0 auto'
        }}
      >
        {/* Cursive Subtitle */}
        <h2
          className="font-cursive"
          style={{
            fontSize: 'clamp(3.2rem, 7vw, 4.5rem)',
            color: 'var(--gold-light)',
            textShadow: '0 4px 20px rgba(0,0,0,0.7)',
            marginBottom: '0.1rem',
            fontWeight: 400
          }}
        >
          {isAm ? 'የክብርና የፍቅር ጋብቻ' : 'The Royal Union of'}
        </h2>

        {/* Main Title Names */}
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(3rem, 7.5vw, 5.2rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '1px',
            textShadow: '0 8px 30px rgba(0,0,0,0.8)',
            marginBottom: '1.5rem',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF5E8 60%, #D4AF37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {isAm ? weddingConfig.couple.fullTitleAm : weddingConfig.couple.fullTitleEn}
        </h1>

        {/* Date & Location Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2.5rem',
            fontSize: '0.95rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(12, 16, 13, 0.75)',
              padding: '0.65rem 1.4rem',
              borderRadius: '30px',
              border: '1px solid rgba(212,175,55,0.35)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <Calendar size={16} color="var(--gold-primary)" />
            <span>{isAm ? weddingConfig.date.displayDateAm : weddingConfig.date.displayDateEn}</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(12, 16, 13, 0.75)',
              padding: '0.65rem 1.4rem',
              borderRadius: '30px',
              border: '1px solid rgba(212,175,55,0.35)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <MapPin size={16} color="var(--gold-primary)" />
            <span>{isAm ? 'አዲስ አበባ፤ ኢትዮጵያ' : 'Addis Ababa, Ethiopia'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.2rem'
          }}
        >
          <button
            onClick={onOpenUploader}
            className="btn-gold"
            style={{
              padding: '1rem 2.4rem',
              fontSize: '1.05rem'
            }}
          >
            <Camera size={20} />
            {isAm ? 'ትዝታዎን ያጋሩ (ፎቶ ያስገቡ)' : 'Capture a Spark of Our Day'}
          </button>

          <a
            href="#gallery"
            className="btn-outline-gold"
            style={{
              padding: '1rem 2.2rem',
              fontSize: '1.05rem',
              textDecoration: 'none'
            }}
          >
            {isAm ? 'የፎቶ አልበም ይመልከቱ' : 'Explore Living Album'}
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#gallery"
        style={{
          position: 'absolute',
          bottom: '1.8rem',
          zIndex: 10,
          color: 'var(--gold-light)',
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          opacity: 0.85,
          fontSize: '0.8rem',
          letterSpacing: '1.5px'
        }}
      >
        <span>{isAm ? 'የደስታችን ቀናት' : 'OUR MOMENTS'}</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </header>
  );
};
