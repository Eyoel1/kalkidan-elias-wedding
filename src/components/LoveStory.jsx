import React, { useState } from 'react';
import { Heart, Eye, Image as ImageIcon } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const LoveStory = ({ lang, onSelectPhoto }) => {
  const story = weddingConfig.loveStory;
  const isAm = lang === 'am';
  const [activeMilestoneId, setActiveMilestoneId] = useState(story[0].id);

  const activeMilestone = story.find((s) => s.id === activeMilestoneId) || story[0];

  return (
    <section id="story" style={{ padding: '5.5rem 0' }}>
      <div className="section-title">
        <h3>{isAm ? 'የፍቅራችን አጭር ታሪክ' : 'Our Journey Together'}</h3>
        <h2>{isAm ? 'የቃልኪዳንና የኤልያስ ታሪክ' : 'The Story of Us'}</h2>
      </div>

      {/* Interactive Story Hub */}
      <div
        className="luxury-card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          padding: '2.5rem',
          alignItems: 'center',
          borderRadius: '32px',
          background: 'radial-gradient(ellipse at top, rgba(22, 28, 24, 0.95) 0%, rgba(9, 12, 10, 0.98) 100%)',
          border: '1.5px solid var(--gold-primary)',
          boxShadow: 'var(--shadow-deep)'
        }}
      >
        {/* Left Column: Interactive Milestone Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {story.map((item) => {
            const isSelected = item.id === activeMilestoneId;

            return (
              <div
                key={item.id}
                onClick={() => setActiveMilestoneId(item.id)}
                onMouseEnter={() => setActiveMilestoneId(item.id)}
                style={{
                  background: isSelected ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected ? '2px solid var(--gold-primary)' : '1px solid rgba(212,175,55,0.25)',
                  borderRadius: '20px',
                  padding: '1.4rem',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isSelected ? 'translateX(8px) scale(1.02)' : 'none',
                  boxShadow: isSelected ? '0 10px 30px rgba(212,175,55,0.3)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span
                    style={{
                      background: isSelected ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.1)',
                      color: isSelected ? '#0E120F' : 'var(--gold-light)',
                      padding: '0.25rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  >
                    {item.year}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: isSelected ? 'var(--gold-primary)' : 'var(--text-muted)', fontSize: '0.8rem' }}>
                    <ImageIcon size={14} />
                    <span>{isSelected ? (isAm ? 'በምስል ታይቷል' : 'Photo Active') : (isAm ? 'ይጫኑ' : 'Click Photo')}</span>
                  </div>
                </div>

                <h3 className="font-serif" style={{ fontSize: '1.35rem', color: isSelected ? 'var(--gold-light)' : '#FFFFFF' }}>
                  {isAm ? item.titleAm : item.titleEn}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.4rem', lineHeight: 1.6 }}>
                  {isAm ? item.descriptionAm : item.descriptionEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Romantic Milestone Photo Display Frame */}
        <div
          style={{
            position: 'relative',
            height: '440px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '2px solid var(--gold-primary)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            background: '#121613'
          }}
        >
          {/* Animated Milestone Image */}
          <img
            key={activeMilestone.id}
            src={activeMilestone.image}
            alt={activeMilestone.titleEn}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />

          {/* Floating Dark Glass Caption Card */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(9, 12, 10, 0.94) 100%)',
              padding: '1.5rem',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--gold-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '0.2rem'
                }}
              >
                <Heart size={14} fill="var(--gold-primary)" />
                {activeMilestone.year} — {isAm ? 'የፍቅር ትዝታ' : 'Milestone Memory'}
              </div>
              <h4 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--gold-light)' }}>
                {isAm ? activeMilestone.titleAm : activeMilestone.titleEn}
              </h4>
            </div>

            {onSelectPhoto && (
              <button
                onClick={() => onSelectPhoto([{ src: activeMilestone.image, titleEn: activeMilestone.titleEn, titleAm: activeMilestone.titleAm }], 0)}
                className="btn-gold"
                style={{ padding: '0.55rem 1.1rem', fontSize: '0.8rem' }}
              >
                <Eye size={14} /> {isAm ? 'ትልቁን ይመልከቱ' : 'View High-Res'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
