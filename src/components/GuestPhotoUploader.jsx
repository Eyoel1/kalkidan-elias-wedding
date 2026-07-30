import React, { useState, useRef } from 'react';
import { UploadCloud, X, CheckCircle, Sparkles, User, MessageSquare } from 'lucide-react';
import { saveGuestPhoto } from '../utils/photoStore';

export const GuestPhotoUploader = ({ isOpen, onClose, onPhotoUploaded, lang }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploaderName, setUploaderName] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const isAm = lang === 'am';

  if (!isOpen) return null;

  const handleFileChange = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    setIsUploading(true);
    try {
      const newPhoto = await saveGuestPhoto({
        src: selectedImage,
        uploaderName: uploaderName.trim() || (isAm ? 'የተከበሩ እንግዳ' : 'Joyful Guest'),
        caption: caption.trim(),
        likes: 0
      });

      setUploadSuccess(true);
      setTimeout(() => {
        setIsUploading(false);
        setUploadSuccess(false);
        setSelectedImage(null);
        setUploaderName('');
        setCaption('');
        if (onPhotoUploaded) onPhotoUploaded(newPhoto);
        onClose();
      }, 1200);
    } catch (err) {
      console.error('Error uploading photo:', err);
      setIsUploading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        className="luxury-card"
        style={{
          background: '#121613',
          border: '1.5px solid var(--gold-primary)',
          color: '#FFFFFF',
          width: '100%',
          maxWidth: '520px',
          borderRadius: '24px',
          position: 'relative',
          padding: '2.2rem 1.6rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.7)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: 'var(--gold-light)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.6rem' }}>
          <div
            className="font-cursive"
            style={{ fontSize: '2.6rem', color: 'var(--gold-primary)', lineHeight: 1 }}
          >
            {isAm ? 'ትዝታዎን ያጋሩ' : 'Capture a Spark of Our Day'}
          </div>
          <h3
            className="font-serif"
            style={{ fontSize: '1.3rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#FFFFFF', marginTop: '0.2rem' }}
          >
            {isAm ? 'የቃልኪዳንና የኤልያስ ሠርግ' : 'Add Your Snapshot to Our Story'}
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            {isAm
              ? 'በሠርጉ ቀን ያነሱትን ውብ ፎቶ እዚህ በማስገባት ለቃልኪዳንና ለኤልያስ የህይወት አልበም ያጋሩ።'
              : 'Share a candid moment, a smile, or a celebration photo to add it to Kalkidan & Elias\'s album!'}
          </p>
        </div>

        {uploadSuccess ? (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <CheckCircle size={56} color="var(--gold-primary)" />
            <h4 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--gold-light)' }}>
              {isAm ? 'ትዝታዎ በስኬት ተመዝግቧል!' : 'Moment Preserved!'}
            </h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: dragActive ? '2px dashed var(--gold-primary)' : '1.5px dashed rgba(212, 175, 55, 0.45)',
                background: dragActive ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                padding: selectedImage ? '1rem' : '2.5rem 1rem',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                style={{ display: 'none' }}
              />

              {selectedImage ? (
                <div style={{ position: 'relative' }}>
                  <img
                    src={selectedImage}
                    alt="Preview"
                    style={{
                      maxHeight: '220px',
                      width: '100%',
                      objectFit: 'contain',
                      borderRadius: '12px'
                    }}
                  />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                  <UploadCloud size={34} color="var(--gold-primary)" />
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--gold-light)' }}>
                    {isAm ? 'ፎቶዎን እዚህ ያስገቡ' : 'Drop your photo here, or browse'}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--gold-light)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={14} color="var(--gold-primary)" /> {isAm ? 'የእርስዎን ስም ያስገቡ' : 'Your Name'}
              </label>
              <input
                type="text"
                value={uploaderName}
                onChange={(e) => setUploaderName(e.target.value)}
                placeholder={isAm ? 'ለምሳሌ፡ አቶ በቀለ' : 'Your name'}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!selectedImage || isUploading}
              className="btn-gold"
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '1rem',
                opacity: !selectedImage || isUploading ? 0.6 : 1
              }}
            >
              <Sparkles size={18} /> {isAm ? 'ፎቶውን ወደ አልበም አስገባ' : 'Add Moment to Album'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
