import React, { useState, useEffect, useRef } from 'react';
import { Music, VolumeX, Volume2, Sparkles } from 'lucide-react';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);

  // Simple Web Audio API ambient harp/piano arpeggio sound generator for smooth background music without external audio dependencies
  const startAmbientSynth = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Play soft pentatonic wedding melody sequence in loop
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 523.25, 392.00, 329.63]; // C E G C E G
      let index = 0;

      const interval = setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[index % notes.length], ctx.currentTime);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.8);

        index++;
      }, 700);

      oscillatorRef.current = interval;
      setIsPlaying(true);
    } catch (e) {
      console.log('Audio init prevented:', e);
    }
  };

  const stopAmbientSynth = () => {
    if (oscillatorRef.current) {
      clearInterval(oscillatorRef.current);
      oscillatorRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAmbientSynth();
    } else {
      startAmbientSynth();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientSynth();
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '5.5rem',
        right: '1.2rem',
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      <button
        onClick={toggleAudio}
        title={isPlaying ? 'Pause Background Ambiance' : 'Play Background Ambiance'}
        style={{
          background: isPlaying ? 'var(--gold-gradient)' : 'rgba(22, 27, 24, 0.85)',
          color: isPlaying ? '#1A1813' : 'var(--gold-light)',
          border: '1px solid var(--gold-primary)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isPlaying ? '0 0 20px rgba(212, 175, 55, 0.6)' : '0 8px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease'
        }}
      >
        {isPlaying ? (
          <Volume2 className="animate-pulse" size={22} />
        ) : (
          <VolumeX size={22} />
        )}
      </button>

      {isPlaying && (
        <span
          style={{
            background: 'rgba(15, 18, 16, 0.85)',
            color: 'var(--gold-light)',
            padding: '0.4rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            border: '1px solid rgba(212,175,55,0.3)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Sparkles size={12} color="var(--gold-primary)" />
          Soft Ambiance
        </span>
      )}
    </div>
  );
};
