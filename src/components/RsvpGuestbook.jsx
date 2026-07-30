import React, { useState, useEffect } from 'react';
import { Send, Heart, MessageCircle, UserCheck, CheckCircle2, Sparkles } from 'lucide-react';

export const RsvpGuestbook = ({ onToast }) => {
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [wishMessage, setWishMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Live Wishes List stored in localStorage
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_guest_wishes');
      return saved ? JSON.parse(saved) : [
        {
          id: 'w1',
          name: 'Uncle David & Aunt Sarah',
          message: 'Wishing you both a lifetime of laughter, joy, and endless love! We cannot wait to celebrate with you!',
          date: 'Yesterday'
        },
        {
          id: 'w2',
          name: 'Emily & James (Bridesmaid)',
          message: 'To our favorite couple! May your love story continue to inspire everyone around you.',
          date: '2 days ago'
        }
      ];
    } catch {
      return [];
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const newWish = {
      id: `wish_${Date.now()}`,
      name: guestName.trim(),
      message: wishMessage.trim() || 'Congratulations & best wishes to Sophia & Alexander!',
      attending: attending === 'yes',
      date: 'Just now'
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    try {
      localStorage.setItem('wedding_guest_wishes', JSON.stringify(updatedWishes));
    } catch (err) {
      console.log('Error saving wishes:', err);
    }

    setIsSubmitted(true);
    if (onToast) onToast('Thank you! Your RSVP & wish have been received.');

    setTimeout(() => {
      setIsSubmitted(false);
      setGuestName('');
      setWishMessage('');
    }, 4000);
  };

  return (
    <section id="rsvp" style={{ padding: '4rem 0' }}>
      <div className="section-title">
        <h3>RSVP & Warm Wishes</h3>
        <h2>Guestbook & Attendance</h2>
        <p>Kindly confirm your attendance and leave a heartfelt blessing for Sophia & Alexander.</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        {/* RSVP Form */}
        <div className="luxury-card" style={{ padding: '2rem 1.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem', color: 'var(--gold-dark)' }}>
            <UserCheck size={22} />
            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--text-dark)' }}>
              Confirm Attendance
            </h3>
          </div>

          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
              <CheckCircle2 size={48} color="var(--gold-primary)" />
              <h4 className="font-serif" style={{ fontSize: '1.4rem' }}>RSVP Received!</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Thank you for confirming. We look forward to celebrating together!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(212,175,55,0.4)',
                    outline: 'none',
                    fontSize: '0.9rem',
                    marginTop: '0.3rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                  Will you be attending?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    style={{
                      padding: '0.65rem',
                      borderRadius: '10px',
                      border: attending === 'yes' ? '2px solid var(--gold-primary)' : '1px solid #DDD',
                      background: attending === 'yes' ? 'rgba(212,175,55,0.15)' : '#FFF',
                      fontWeight: 600,
                      color: attending === 'yes' ? 'var(--gold-dark)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    Joyfully Accept
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    style={{
                      padding: '0.65rem',
                      borderRadius: '10px',
                      border: attending === 'no' ? '2px solid var(--rose-accent)' : '1px solid #DDD',
                      background: attending === 'no' ? 'rgba(184,91,86,0.15)' : '#FFF',
                      fontWeight: 600,
                      color: attending === 'no' ? 'var(--rose-accent)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {attending === 'yes' && (
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                    Number of Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(212,175,55,0.4)',
                      outline: 'none',
                      fontSize: '0.9rem',
                      marginTop: '0.3rem'
                    }}
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                  Message & Wedding Wishes
                </label>
                <textarea
                  rows={3}
                  value={wishMessage}
                  onChange={(e) => setWishMessage(e.target.value)}
                  placeholder="Share a sweet note or blessing for the couple..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(212,175,55,0.4)',
                    outline: 'none',
                    fontSize: '0.9rem',
                    marginTop: '0.3rem',
                    resize: 'none'
                  }}
                />
              </div>

              <button type="submit" className="btn-gold" style={{ padding: '0.85rem', width: '100%', fontSize: '0.95rem' }}>
                <Send size={16} /> Send RSVP & Wish
              </button>
            </form>
          )}
        </div>

        {/* Live Guestbook Wishes Wall */}
        <div className="luxury-card" style={{ padding: '2rem 1.6rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem', color: 'var(--gold-dark)' }}>
            <MessageCircle size={22} />
            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--text-dark)' }}>
              Live Guest Wishes Wall ({wishes.length})
            </h3>
          </div>

          <div
            style={{
              flex: 1,
              maxHeight: '420px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              paddingRight: '0.5rem'
            }}
          >
            {wishes.map((w) => (
              <div
                key={w.id}
                style={{
                  background: 'rgba(249, 246, 240, 0.8)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  borderRadius: '14px',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Heart size={14} fill="var(--gold-primary)" color="var(--gold-primary)" />
                    {w.name}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{w.date}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-dark)', marginTop: '0.4rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                  "{w.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
