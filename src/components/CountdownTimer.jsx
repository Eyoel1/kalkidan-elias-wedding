import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const CountdownTimer = ({ lang }) => {
  const targetDate = new Date(weddingConfig.date.weddingDateISO).getTime();
  const isAm = lang === 'am';

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section
      id="countdown"
      style={{
        margin: '-3rem auto 3.5rem auto',
        position: 'relative',
        zIndex: 20,
        maxWidth: '880px',
        padding: '0 1rem'
      }}
    >
      <div
        className="luxury-card"
        style={{
          background: 'rgba(12, 16, 13, 0.94)',
          border: '1.5px solid var(--gold-primary)',
          color: '#FFFFFF',
          textAlign: 'center',
          padding: '2rem 1.5rem',
          boxShadow: '0 15px 45px rgba(0,0,0,0.5)'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'var(--gold-primary)',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '1rem'
          }}
        >
          <Clock size={16} />
          <span>{isAm ? 'ለቀኑ የተቀረው ጊዜ (የቁልቁለት ሰዓት)' : 'Counting Down To The Big Day'}</span>
          <Sparkles size={14} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            maxWidth: '650px',
            margin: '0 auto'
          }}
        >
          {[
            { label: isAm ? 'ቀናት' : 'Days', value: timeLeft.days },
            { label: isAm ? 'ሰዓታት' : 'Hours', value: timeLeft.hours },
            { label: isAm ? 'ደቂቃዎች' : 'Minutes', value: timeLeft.minutes },
            { label: isAm ? 'ሰከንዶች' : 'Seconds', value: timeLeft.seconds }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '14px',
                padding: '1rem 0.5rem'
              }}
            >
              <div
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  color: 'var(--gold-light)',
                  lineHeight: 1
                }}
              >
                {String(item.value).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'rgba(255,255,255,0.75)',
                  marginTop: '0.4rem'
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
