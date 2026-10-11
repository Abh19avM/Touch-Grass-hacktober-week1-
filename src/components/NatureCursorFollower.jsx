import React, { useEffect, useState, useRef } from 'react';
import { ButterflyVector, HoneybeeVector } from './NatureVectors';

export default function NatureCursorFollower() {
  const [creatureType, setCreatureType] = useState('butterfly'); // 'butterfly' | 'honeybee'
  const [particles, setParticles] = useState([]);
  
  // Position refs for 60fps smooth spring/lerp tracking
  const mousePos = useRef({ x: -100, y: -100 });
  const creaturePos = useRef({ x: -100, y: -100 });
  const rotation = useRef(0);
  const velocity = useRef({ x: 0, y: 0 });
  const creatureEl = useRef(null);
  const isMoving = useRef(false);
  const lastMoveTime = useRef(Date.now());
  const particleId = useRef(0);

  useEffect(() => {
    // Only run on devices with a mouse/pointer
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      isMoving.current = true;
      lastMoveTime.current = Date.now();

      // Occasionally spawn a glowing pollen particle behind the creature
      if (Math.random() < 0.22) {
        particleId.current += 1;
        const pId = particleId.current;
        const newParticle = {
          id: pId,
          x: creaturePos.current.x + (Math.random() * 12 - 6),
          y: creaturePos.current.y + (Math.random() * 12 - 6),
          size: Math.random() * 3.5 + 2,
          color: creatureType === 'butterfly' ? '#38bdf8' : '#fbbf24'
        };
        setParticles((prev) => [...prev.slice(-14), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth animation loop
    let animId;
    const animate = () => {
      // Spring lerp towards cursor: offset slightly so cursor itself is not blocked
      const targetX = mousePos.current.x + 18;
      const targetY = mousePos.current.y + 16;

      const dx = targetX - creaturePos.current.x;
      const dy = targetY - creaturePos.current.y;

      // Smooth lag / organic floating drift
      creaturePos.current.x += dx * 0.12;
      creaturePos.current.y += dy * 0.12;

      velocity.current = { x: dx * 0.12, y: dy * 0.12 };
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Rotate towards movement direction when moving
      if (speed > 1.2) {
        const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        // Smoothly interpolate angle
        rotation.current += (targetAngle - rotation.current) * 0.14;
      } else {
        // Return to upright angle when idle
        rotation.current += (0 - rotation.current) * 0.08;
      }

      if (Date.now() - lastMoveTime.current > 350) {
        isMoving.current = false;
      }

      if (creatureEl.current) {
        creatureEl.current.style.transform = `translate3d(${creaturePos.current.x}px, ${creaturePos.current.y}px, 0) rotate(${rotation.current}deg)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [creatureType]);

  // Clean up old particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <>
      {/* Floating Golden Pollen / Stardust Sparkles */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          overflow: 'hidden'
        }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="pollen-sparkle"
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
              opacity: 0.85
            }}
          />
        ))}
      </div>

      {/* Creature Cursor Follower */}
      <div
        ref={creatureEl}
        className="cursor-creature-follower"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          marginTop: -20,
          marginLeft: -20,
          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.45))'
        }}
      >
        {creatureType === 'butterfly' ? (
          <ButterflyVector color="blue" size={40} />
        ) : (
          <HoneybeeVector size={34} />
        )}
      </div>

      {/* Unobtrusive Companion Switcher Pill in Top Right Corner */}
      <div 
        style={{
          position: 'fixed',
          bottom: 14,
          right: 14,
          zIndex: 10000,
          background: 'rgba(20, 34, 24, 0.92)',
          border: '1px solid rgba(74, 222, 128, 0.3)',
          borderRadius: 'var(--radius-full)',
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <span style={{ fontSize: '0.72rem', color: 'var(--text-stone)', fontWeight: 500 }}>
          Cursor Companion:
        </span>
        <button
          onClick={() => setCreatureType('butterfly')}
          style={{
            background: creatureType === 'butterfly' ? 'rgba(74, 222, 128, 0.25)' : 'transparent',
            border: creatureType === 'butterfly' ? '1px solid var(--color-moss-light)' : 'none',
            borderRadius: 'var(--radius-full)',
            padding: '2px 8px',
            color: creatureType === 'butterfly' ? 'var(--text-parchment)' : 'var(--text-muted)',
            fontSize: '0.72rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
          title="Follow with Blue Mormon Butterfly"
        >
          <ButterflyVector color="blue" size={16} />
          <span>Butterfly</span>
        </button>

        <button
          onClick={() => setCreatureType('honeybee')}
          style={{
            background: creatureType === 'honeybee' ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
            border: creatureType === 'honeybee' ? '1px solid var(--color-ochre-light)' : 'none',
            borderRadius: 'var(--radius-full)',
            padding: '2px 8px',
            color: creatureType === 'honeybee' ? 'var(--text-parchment)' : 'var(--text-muted)',
            fontSize: '0.72rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
          title="Follow with Hill Honeybee"
        >
          <HoneybeeVector size={14} />
          <span>Honeybee</span>
        </button>
      </div>
    </>
  );
}
