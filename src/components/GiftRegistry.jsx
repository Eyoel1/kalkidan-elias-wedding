import React, { useState } from 'react';
import { Gift, Copy, Check, CreditCard, Heart, Smartphone } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const GiftRegistry = ({ onToast }) => {
  const { wishingWell } = weddingConfig;
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    if (onToast) onToast('Account details copied to clipboard!');
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <section id="registry" style={{ padding: '4rem 0' }}>
      <div className="section-title">
        <h3>Digital Wishing Well</h3>
        <h2>Gift Registry & Blessing</h2>
        <p>{wishingWell.message}</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          maxWidth: '850px',
          margin: '0 auto'
        }}
      >
        {wishingWell.accounts.map((acc, idx) => (
          <div
            key={idx}
            className="luxury-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              padding: '2rem 1.6rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div
                  style={{
                    background: 'rgba(212, 175, 55, 0.15)',
                    padding: '0.6rem',
                    borderRadius: '50%',
                    color: 'var(--gold-dark)'
                  }}
                >
                  {acc.type.includes('Bank') ? <CreditCard size={22} /> : <Smartphone size={22} />}
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px' }}>
                    {acc.type}
                  </span>
                  <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text-dark)' }}>
                    {acc.bankName || acc.platform}
                  </h4>
                </div>
              </div>
              <Gift size={22} color="var(--gold-primary)" />
            </div>

            <div
              style={{
                background: 'rgba(244, 239, 230, 0.7)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1.2rem',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Account Name</div>
              <div style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem', marginBottom: '0.6rem' }}>
                {acc.accountName || acc.holder}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Account / Number</div>
              <div
                className="font-serif"
                style={{
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: 'var(--gold-dark)',
                  letterSpacing: '1px'
                }}
              >
                {acc.accountNumber || acc.handle || acc.phone}
              </div>
            </div>

            <button
              onClick={() => handleCopy(acc.accountNumber || acc.handle || acc.phone, idx)}
              className="btn-gold"
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}
            >
              {copiedIndex === idx ? (
                <>
                  <Check size={16} /> Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy size={16} /> Copy Account Details
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
