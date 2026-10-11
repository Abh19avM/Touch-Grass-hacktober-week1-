import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Volume2, VolumeX, Play, Pause, FastForward, Smartphone, 
  Wind, Trees, Heart, Compass, CheckCircle2, Award 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioCoach } from '../services/audioCoach';
import { localAI } from '../services/localAi';

export default function PocketModeModal({ 
  trail, 
  onClose,
  initialProgressKm = 0,
  onProgressUpdate
}) {
  const [isRunning, setIsRunning] = useState(true);
  const [currentKm, setCurrentKm] = useState(initialProgressKm);
  const [cadence, setCadence] = useState(168); // spm
  const [heartRate, setHeartRate] = useState(142); // bpm
  const [lastAudioPrompt, setLastAudioPrompt] = useState(null);
  const [ambientSound, setAmbientSound] = useState(true);
  const [voiceActive, setVoiceActive] = useState(true);
  const [completed, setCompleted] = useState(false);

  const lastSpokenKmRef = useRef(-1);

  // Initialize audio coach & wake lock
  useEffect(() => {
    audioCoach.requestWakeLock();
    if (ambientSound) {
      audioCoach.startAmbientNatureSoundscape();
    }

    // Initial audio cue
    const cue = localAI.generateLiveAudioCue(trail, 0.1);
    setLastAudioPrompt(cue);
    if (voiceActive) {
      audioCoach.speak(cue.spokenText);
      lastSpokenKmRef.current = 0.1;
    }

    return () => {
      audioCoach.stopAmbientNatureSoundscape();
      audioCoach.stopSpeaking();
      audioCoach.releaseWakeLock();
    };
  }, []);

  // Ambient sound toggle
  useEffect(() => {
    if (ambientSound) {
      audioCoach.startAmbientNatureSoundscape();
    } else {
      audioCoach.stopAmbientNatureSoundscape();
    }
  }, [ambientSound]);

  // Simulation timer
  useEffect(() => {
    if (!isRunning || completed) return;

    const interval = setInterval(() => {
      setCurrentKm((prev) => {
        const next = prev + 0.05; // advance 50 meters
        if (onProgressUpdate) onProgressUpdate(next);

        // Check if crossed checkpoint
        trail.audioCheckpoints.forEach((cp) => {
          if (next >= cp.km && lastSpokenKmRef.current < cp.km) {
            lastSpokenKmRef.current = cp.km;
            const liveCue = localAI.generateLiveAudioCue(trail, next, heartRate);
            setLastAudioPrompt(liveCue);
            if (voiceActive) {
              audioCoach.speak(liveCue.spokenText);
            }
          }
        });

        if (next >= trail.distanceKm) {
          setCompleted(true);
          setIsRunning(false);
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
          });
          const finishMsg = `Trail completed! You ran ${trail.distanceKm} kilometers on ${trail.name} in Pune. Take a deep breath of fresh Sahyadri morning air.`;
          audioCoach.speak(finishMsg);
          return trail.distanceKm;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, completed, voiceActive, trail, heartRate]);

  const handleSpeakCurrent = () => {
    const liveCue = localAI.generateLiveAudioCue(trail, currentKm, heartRate);
    setLastAudioPrompt(liveCue);
    audioCoach.speak(liveCue.spokenText);
  };

  const pct = Math.min(100, Math.round((currentKm / trail.distanceKm) * 100));

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: '#0d130f',
      color: 'var(--text-parchment)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 20px',
      overflowY: 'auto'
    }}>
      {/* Top Header / Mode Banner */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#4d7c5f',
              boxShadow: '0 0 8px #4d7c5f'
            }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--color-lichen)', textTransform: 'uppercase' }}>
              Pocket Run Active • Screen In Pocket
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(244, 240, 234, 0.08)',
              border: 'none',
              color: 'var(--text-parchment)',
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <h2 style={{ fontSize: '1.45rem', color: 'var(--text-parchment)', fontFamily: 'var(--font-serif)' }}>
            {trail.name}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-stone)', marginTop: 2 }}>
            {trail.region} • {trail.foliageStatus}
          </p>
        </div>
      </div>

      {/* Main Focus: Minimal High-Contrast Metric Display */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        {/* Distance Big Display */}
        <div style={{
          fontSize: '4.8rem',
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          lineHeight: 1,
          color: 'var(--text-parchment)'
        }}>
          {currentKm.toFixed(2)}
          <span style={{ fontSize: '1.4rem', color: 'var(--text-stone)', marginLeft: 8 }}>km</span>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: 8 }}>
          of {trail.distanceKm} km total ({pct}% completed)
        </p>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          maxWidth: 420,
          height: 6,
          background: 'rgba(244, 240, 234, 0.08)',
          borderRadius: 3,
          margin: '18px auto',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${pct}%`,
            height: '100%',
            background: 'var(--color-terracotta)',
            transition: 'width 0.4s ease'
          }} />
        </div>

        {/* Runner Vitals */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Heart size={15} color="var(--color-clay-soft)" />
            <span style={{ fontSize: '1.05rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{heartRate}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>BPM</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Compass size={15} color="var(--color-ochre-light)" />
            <span style={{ fontSize: '1.05rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{cadence}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>SPM</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Trees size={15} color="var(--color-moss-light)" />
            <span style={{ fontSize: '1.05rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{trail.canopyCoverPct}%</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Canopy</span>
          </div>
        </div>
      </div>

      {/* Live Trail Voice Landmark Display */}
      {lastAudioPrompt && (
        <div style={{
          maxWidth: 560,
          margin: '0 auto',
          background: '#16201a',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-sm)',
          padding: '16px 20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="nature-soundwave">
                <span />
                <span />
                <span />
                <span />
              </div>
              <strong style={{ fontSize: '0.86rem', color: 'var(--color-clay-soft)' }}>
                {lastAudioPrompt.title}
              </strong>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-lichen)', background: 'rgba(62, 112, 82, 0.2)', padding: '2px 7px', borderRadius: 3 }}>
              Audio Landmark Cue
            </span>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-parchment)', lineHeight: 1.45 }}>
            "{lastAudioPrompt.spokenText}"
          </p>

          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSpeakCurrent}
              className="btn-secondary"
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                gap: 6
              }}
            >
              <Volume2 size={12} color="var(--color-ochre-light)" /> Replay Voice Cue
            </button>
          </div>
        </div>
      )}

      {/* Reassurance Note */}
      <div style={{
        textAlign: 'center',
        padding: '12px',
        maxWidth: 420,
        margin: '12px auto 0',
        background: 'rgba(244, 240, 234, 0.03)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, color: 'var(--text-stone)', fontSize: '0.78rem' }}>
          <Smartphone size={14} color="var(--color-moss-light)" />
          <span>Screen lock active. Put your phone in your pocket and listen to the trail.</span>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div style={{
        maxWidth: 580,
        margin: '16px auto 0',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        paddingTop: 12,
        borderTop: '1px solid var(--border-subtle)'
      }}>
        {/* Ambient Sound Toggle */}
        <button
          onClick={() => setAmbientSound(!ambientSound)}
          className="btn-secondary"
          style={{ padding: '8px 12px', fontSize: '0.8rem' }}
          title="Procedural forest breeze audio"
        >
          <Wind size={14} color={ambientSound ? 'var(--color-moss-light)' : 'var(--text-muted)'} />
          <span>{ambientSound ? 'Breeze Audio On' : 'Breeze Muted'}</span>
        </button>

        {/* Play / Pause Runner Simulation */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.84rem' }}
          >
            {isRunning ? (
              <>
                <Pause size={14} /> Pause Run
              </>
            ) : (
              <>
                <Play size={14} /> Resume Run
              </>
            )}
          </button>

          {/* Jump 1km ahead to test next audio landmark */}
          <button
            onClick={() => {
              setCurrentKm(prev => Math.min(trail.distanceKm, prev + 1.0));
            }}
            className="btn-secondary"
            style={{ padding: '8px 12px' }}
            title="Fast forward simulation to next kilometer"
          >
            <FastForward size={14} />
          </button>
        </div>

        {/* Voice Coaching Toggle */}
        <button
          onClick={() => setVoiceActive(!voiceActive)}
          className="btn-secondary"
          style={{ padding: '8px 12px', fontSize: '0.8rem' }}
        >
          {voiceActive ? (
            <>
              <Volume2 size={14} color="var(--color-clay-soft)" />
              <span>Voice On</span>
            </>
          ) : (
            <>
              <VolumeX size={14} color="var(--text-muted)" />
              <span>Voice Muted</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
