import React from 'react';
import { Home, Camera, Image as ImageIcon, Calendar, Heart } from 'lucide-react';

export const MobileNav = ({ onOpenUploader }) => {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: 'rgba(9, 12, 10, 0.95)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(212, 175, 55, 0.4)',
        padding: '0.65rem 0.8rem',
        zIndex: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.6)'
      }}
    >
      {[
        { href: '#hero', label: 'Home', icon: Home },
        { href: '#gallery', label: 'Album', icon: ImageIcon },
        { action: onOpenUploader, label: 'Capture', icon: Camera, highlight: true },
        { href: '#events', label: 'Events & Map', icon: Calendar },
        { href: '#story', label: 'Our Story', icon: Heart }
      ].map((item, idx) => {
        const Icon = item.icon;
        if (item.action) {
          return (
            <button
              key={idx}
              onClick={item.action}
              style={{
                background: 'var(--gold-gradient)',
                color: '#0E120F',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '-18px',
                boxShadow: '0 6px 20px rgba(212, 175, 55, 0.55)',
                cursor: 'pointer'
              }}
            >
              <Icon size={22} />
            </button>
          );
        }

        return (
          <a
            key={idx}
            href={item.href}
            style={{
              color: 'var(--gold-light)',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              opacity: 0.85
            }}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
};
