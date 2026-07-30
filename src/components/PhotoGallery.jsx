import React, { useState, useEffect } from 'react';
import { Camera, ChevronLeft, ChevronRight, Play, Pause, Sparkles, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { getAllGuestPhotos } from '../utils/photoStore';

export const PhotoGallery = ({ onOpenUploader, onSelectPhoto, refreshKey, lang }) => {
  const officialPhotos = weddingConfig.officialPhotos;
  const [guestPhotos, setGuestPhotos] = useState([]);
  const [coverflowIndex, setCoverflowIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const isAm = lang === 'am';

  const loadGuestPhotos = async () => {
    const photos = await getAllGuestPhotos();
    setGuestPhotos(photos);
  };

  useEffect(() => {
    loadGuestPhotos();
  }, [refreshKey]);

  // Combine official + guest photos for 3D Carousel
  const combinedPhotos = [
    ...officialPhotos.map((p) => ({ ...p, type: 'official' })),
    ...guestPhotos.map((p) => ({ ...p, type: 'guest' }))
  ];

  // Auto Advance for 3D Stage Carousel
  useEffect(() => {
    if (!isAutoPlay || combinedPhotos.length === 0) return;
    const interval = setInterval(() => {
      setCoverflowIndex((prev) => (prev + 1) % combinedPhotos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay, combinedPhotos.length]);

  const handlePrevCoverflow = () => {
    setCoverflowIndex((prev) => (prev === 0 ? combinedPhotos.length - 1 : prev - 1));
  };

  const handleNextCoverflow = () => {
    setCoverflowIndex((prev) => (prev === combinedPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" style={{ padding: '5.5rem 0' }}>
      {/* Pristine Title Section - ONLY Living Memory Album */}
      <div className="section-title" style={{ marginBottom: '2.5rem' }}>
        <h3>{isAm ? 'የውብ ትዝታዎች አልበም' : 'Living Memory Album'}</h3>
      </div>

      {/* PRISTINE 3D STAGE CAROUSEL */}
      <div
        style={{
          position: 'relative',
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, rgba(22, 28, 24, 0.95) 0%, rgba(9, 12, 10, 0.98) 100%)',
          borderRadius: '32px',
          border: '1.5px solid var(--gold-primary)',
          padding: '2.5rem 1rem',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-deep)'
        }}
      >
        {/* Top Controls Bar */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Action Button: Capture a Moment */}
          <button
            onClick={onOpenUploader}
            className="btn-gold"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
          >
            <Camera size={16} /> {isAm ? 'ትዝታዎን ያጋሩ (ፎቶ ያስገቡ)' : 'Capture a Spark of Our Day'}
          </button>

          {/* Play/Pause Auto Advance Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            style={{
              background: isAutoPlay ? 'var(--gold-primary)' : 'rgba(255,255,255,0.1)',
              color: isAutoPlay ? '#0E120F' : 'var(--gold-light)',
              border: '1px solid var(--gold-primary)',
              padding: '0.45rem 1.1rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backdropFilter: 'blur(8px)'
            }}
          >
            {isAutoPlay ? <Pause size={14} /> : <Play size={14} />}
            <span>{isAutoPlay ? (isAm ? 'አቁም' : 'Pause Auto') : (isAm ? 'አስጀምር' : 'Auto Play')}</span>
          </button>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={handlePrevCoverflow}
          style={{
            position: 'absolute',
            left: '20px',
            zIndex: 40,
            background: 'rgba(12, 16, 13, 0.85)',
            border: '1.5px solid var(--gold-primary)',
            color: 'var(--gold-light)',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(0,0,0,0.6)'
          }}
        >
          <ChevronLeft size={30} />
        </button>

        {/* 3D Perspective Stage Cards (Clean Pristine Images Only) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            height: '420px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px'
          }}
        >
          {combinedPhotos.map((photo, idx) => {
            const total = combinedPhotos.length;
            let diff = idx - coverflowIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isActive = diff === 0;

            if (Math.abs(diff) > 2) return null;

            let transform = `translateX(${diff * 230}px) scale(${1 - Math.abs(diff) * 0.22}) rotateY(${-diff * 28}deg)`;
            let opacity = isActive ? 1 : 0.45;
            let zIndex = 20 - Math.abs(diff) * 5;

            return (
              <div
                key={photo.id || idx}
                onClick={() => {
                  if (isActive) onSelectPhoto(combinedPhotos, idx);
                  else setCoverflowIndex(idx);
                }}
                style={{
                  position: 'absolute',
                  width: '330px',
                  height: '410px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: isActive ? '2.5px solid var(--gold-primary)' : '1px solid rgba(212,175,55,0.3)',
                  boxShadow: isActive ? '0 20px 60px rgba(212,175,55,0.4)' : '0 10px 30px rgba(0,0,0,0.5)',
                  transform,
                  opacity,
                  zIndex,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  background: '#121613'
                }}
              >
                <img
                  src={photo.src}
                  alt="Wedding Photo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNextCoverflow}
          style={{
            position: 'absolute',
            right: '20px',
            zIndex: 40,
            background: 'rgba(12, 16, 13, 0.85)',
            border: '1.5px solid var(--gold-primary)',
            color: 'var(--gold-light)',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(0,0,0,0.6)'
          }}
        >
          <ChevronRight size={30} />
        </button>

        {/* Bottom Slide Indicators */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '1.5rem',
            zIndex: 30
          }}
        >
          {combinedPhotos.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCoverflowIndex(idx)}
              style={{
                width: idx === coverflowIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: idx === coverflowIndex ? 'var(--gold-primary)' : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* DEDICATED GUEST UPLOADED MEMORIES FEED */}
      {guestPhotos.length > 0 && (
        <div style={{ marginTop: '3.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'var(--gold-primary)',
              fontSize: '1.1rem',
              fontWeight: 700,
              marginBottom: '1.2rem'
            }}
          >
            <Sparkles size={20} />
            <span>{isAm ? 'በእንግዶች የተጋሩ ትዝታዎች (Guest Uploaded Moments)' : 'Guest Shared Snapshots'}</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.2rem'
            }}
          >
            {guestPhotos.map((gPhoto, index) => (
              <div
                key={gPhoto.id || index}
                onClick={() => onSelectPhoto(guestPhotos, index)}
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1.5px solid var(--gold-primary)',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
                  background: '#121613'
                }}
              >
                <img
                  src={gPhoto.src}
                  alt={gPhoto.uploaderName || 'Guest Photo'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(9, 12, 10, 0.92) 100%)',
                    padding: '0.8rem',
                    color: '#FFFFFF'
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    {gPhoto.uploaderName}
                  </div>
                  {gPhoto.caption && (
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>
                      "{gPhoto.caption}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
