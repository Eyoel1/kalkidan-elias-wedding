import React, { useState } from 'react';
import { PetalsAnimation } from './components/PetalsAnimation';
import { MusicPlayer } from './components/MusicPlayer';
import { HeaderHero } from './components/HeaderHero';
import { PhotoGallery } from './components/PhotoGallery';
import { GuestPhotoUploader } from './components/GuestPhotoUploader';
import { LightboxModal } from './components/LightboxModal';
import { LoveStory } from './components/LoveStory';
import { MobileNav } from './components/MobileNav';
import { weddingConfig } from './config/weddingConfig';
import { Heart, Check } from 'lucide-react';
import './styles/index.css';

export function App() {
  const [lang, setLang] = useState('en'); // Default to English
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState({ isOpen: false, photos: [], index: 0 });
  const [galleryRefreshKey, setGalleryRefreshKey] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'am' ? 'en' : 'am'));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenUploader = () => {
    setIsUploaderOpen(true);
  };

  const handleCloseUploader = () => {
    setIsUploaderOpen(false);
  };

  const handlePhotoUploaded = () => {
    setGalleryRefreshKey((prev) => prev + 1);
    showToast(lang === 'am' ? 'ትዝታዎ ወደ አልበሙ ተጨምሯል!' : 'Moment preserved in our living album!');
  };

  const handleSelectPhoto = (photosArray, index) => {
    setLightboxState({ isOpen: true, photos: photosArray, index });
  };

  const handleCloseLightbox = () => {
    setLightboxState({ isOpen: false, photos: [], index: 0 });
  };

  return (
    <div className="app-wrapper">
      {/* Floating Petals */}
      <PetalsAnimation />

      {/* Floating Ambient Music Player */}
      <MusicPlayer />

      {/* Hero Header with Amharic Language Switcher */}
      <HeaderHero
        onOpenUploader={handleOpenUploader}
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* Main Sections */}
      <main className="main-content">
        {/* Pristine 3D Photo Carousel & Living Album */}
        <PhotoGallery
          onOpenUploader={handleOpenUploader}
          onSelectPhoto={handleSelectPhoto}
          refreshKey={galleryRefreshKey}
          lang={lang}
        />

        {/* Love Story Journey with Interactive Milestone Photos */}
        <LoveStory
          lang={lang}
          onSelectPhoto={handleSelectPhoto}
        />
      </main>

      {/* Luxury Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '3.5rem 1rem 7rem 1rem',
          background: 'rgba(9, 12, 10, 0.96)',
          color: 'var(--gold-light)',
          borderTop: '1px solid rgba(212, 175, 55, 0.35)',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div
          className="font-cursive"
          style={{ fontSize: '3.2rem', color: 'var(--gold-primary)', lineHeight: 1 }}
        >
          {lang === 'am' ? weddingConfig.couple.fullTitleAm : weddingConfig.couple.fullTitleEn}
        </div>
        <div
          style={{
            fontSize: '0.85rem',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            margin: '0.6rem 0 1.4rem 0'
          }}
        >
          {weddingConfig.couple.hashtag}
        </div>
        <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <span>{lang === 'am' ? 'በፍቅር ተዘጋጀ' : 'Crafted with'}</span>{' '}
          <Heart size={14} fill="var(--gold-primary)" color="var(--gold-primary)" />{' '}
          <span>{lang === 'am' ? 'ለቃልኪዳንና ለኤልያስ ሠርግ' : 'for Kalkidan & Elias wedding'}</span>
        </div>
      </footer>

      {/* Guest Photo Uploader Modal */}
      <GuestPhotoUploader
        isOpen={isUploaderOpen}
        onClose={handleCloseUploader}
        onPhotoUploaded={handlePhotoUploaded}
        lang={lang}
      />

      {/* Lightbox Modal */}
      {lightboxState.isOpen && (
        <LightboxModal
          photos={lightboxState.photos}
          initialIndex={lightboxState.index}
          onClose={handleCloseLightbox}
        />
      )}

      {/* Mobile Navigation */}
      <MobileNav onOpenUploader={handleOpenUploader} lang={lang} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <Check size={18} color="var(--gold-primary)" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
