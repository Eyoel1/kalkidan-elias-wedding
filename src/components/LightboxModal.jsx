import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, Heart, User, Sparkles } from 'lucide-react';

export const LightboxModal = ({ photos, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setCurrentIndex(initialIndex || 0);
    setZoomLevel(1);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos]);

  if (!photos || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  const handlePrev = () => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = currentPhoto.src;
    a.download = `wedding_photo_${currentIndex + 1}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(10, 12, 10, 0.95)',
        backdropFilter: 'blur(15px)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem'
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--gold-light)',
          padding: '0.5rem 0',
          zIndex: 10
        }}
      >
        <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
          Photo {currentIndex + 1} of {photos.length}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button
            onClick={() => setZoomLevel((z) => (z > 1 ? 1 : 1.6))}
            title="Toggle Zoom"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#FFFFFF',
              padding: '0.5rem',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            {zoomLevel > 1 ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>

          <button
            onClick={handleDownload}
            title="Download Photo"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#FFFFFF',
              padding: '0.5rem',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <Download size={18} />
          </button>

          <button
            onClick={onClose}
            title="Close Lightbox"
            style={{
              background: 'var(--gold-primary)',
              border: 'none',
              color: '#1A1813',
              padding: '0.5rem',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '1rem 0'
        }}
      >
        {/* Left Nav Button */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '10px',
            zIndex: 20,
            background: 'rgba(15, 18, 16, 0.65)',
            border: '1px solid rgba(212,175,55,0.4)',
            color: 'var(--gold-light)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronLeft size={28} />
        </button>

        {/* High Res Image */}
        <img
          src={currentPhoto.src}
          alt={currentPhoto.title || currentPhoto.caption || 'Wedding Photo'}
          style={{
            maxHeight: '78vh',
            maxWidth: '90vw',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.3s ease'
          }}
        />

        {/* Right Nav Button */}
        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '10px',
            zIndex: 20,
            background: 'rgba(15, 18, 16, 0.65)',
            border: '1px solid rgba(212,175,55,0.4)',
            color: 'var(--gold-light)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Bottom Photo Caption & Metadata */}
      <div
        style={{
          width: '100%',
          maxWidth: '750px',
          background: 'rgba(22, 27, 24, 0.9)',
          border: '1px solid rgba(212,175,55,0.3)',
          borderRadius: '16px',
          padding: '0.9rem 1.5rem',
          textAlign: 'center',
          color: '#FFFFFF',
          marginBottom: '0.5rem'
        }}
      >
        <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--gold-light)' }}>
          {currentPhoto.title || currentPhoto.caption || (currentPhoto.type === 'guest' ? 'Shared Memory' : 'Wedding Portrait')}
        </h4>

        {currentPhoto.uploaderName && (
          <div
            style={{
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.8)',
              marginTop: '0.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <Sparkles size={14} color="var(--gold-primary)" />
            <span>Uploaded by {currentPhoto.uploaderName}</span>
          </div>
        )}
      </div>
    </div>
  );
};
