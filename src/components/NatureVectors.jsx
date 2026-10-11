import React from 'react';

// Pure Custom SVG / CSS Animated Vector Nature Illustrations
// Designed with layered biological detail: fluttering 3D wings, vibrating bee wings, swaying grass, shimmering peacock plumage

/**
 * 1. 3D Flapping Butterfly Vector (Blue Mormon / Monarch)
 */
export function ButterflyVector({ color = 'blue', size = 44, className = '' }) {
  const isBlue = color === 'blue';
  const primaryGrad = isBlue ? ['#0284c7', '#0369a1', '#082f49'] : ['#f97316', '#ea580c', '#7c2d12'];
  const glowColor = isBlue ? '#38bdf8' : '#fb923c';

  return (
    <div 
      className={`butterfly-3d-wrap ${className}`} 
      style={{ width: size, height: size * 0.85, display: 'inline-block', position: 'relative' }}
    >
      <svg 
        viewBox="0 0 100 85" 
        width={size} 
        height={size * 0.85} 
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`wingGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryGrad[0]} />
            <stop offset="60%" stopColor={primaryGrad[1]} />
            <stop offset="100%" stopColor={primaryGrad[2]} />
          </linearGradient>
          <radialGradient id={`glowGrad-${color}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Left Wing with 3D Flap */}
        <g className="wing-left" style={{ transformOrigin: '50px 45px' }}>
          {/* Forewing */}
          <path 
            d="M 50 45 C 40 25, 10 5, 5 22 C 0 38, 20 52, 50 48 Z" 
            fill={`url(#wingGrad-${color})`} 
            stroke="#0f172a" 
            strokeWidth="1.5" 
          />
          {/* Hindwing */}
          <path 
            d="M 50 48 C 30 52, 12 60, 22 75 C 32 86, 45 68, 50 54 Z" 
            fill={`url(#wingGrad-${color})`} 
            stroke="#0f172a" 
            strokeWidth="1.5" 
          />
          {/* Iridescent spots */}
          <circle cx="24" cy="30" r="4" fill={glowColor} opacity="0.9" />
          <circle cx="16" cy="40" r="2.5" fill="#f8fafc" opacity="0.8" />
          <circle cx="28" cy="65" r="3" fill={glowColor} opacity="0.85" />
          {/* Delicate veins */}
          <path d="M 50 45 Q 30 35 15 25 M 50 45 Q 32 45 18 42 M 50 50 Q 35 60 25 70" stroke="#090d16" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>

        {/* Right Wing with 3D Flap */}
        <g className="wing-right" style={{ transformOrigin: '50px 45px' }}>
          {/* Forewing */}
          <path 
            d="M 50 45 C 60 25, 90 5, 95 22 C 100 38, 80 52, 50 48 Z" 
            fill={`url(#wingGrad-${color})`} 
            stroke="#0f172a" 
            strokeWidth="1.5" 
          />
          {/* Hindwing */}
          <path 
            d="M 50 48 C 70 52, 88 60, 78 75 C 68 86, 55 68, 50 54 Z" 
            fill={`url(#wingGrad-${color})`} 
            stroke="#0f172a" 
            strokeWidth="1.5" 
          />
          {/* Iridescent spots */}
          <circle cx="76" cy="30" r="4" fill={glowColor} opacity="0.9" />
          <circle cx="84" cy="40" r="2.5" fill="#f8fafc" opacity="0.8" />
          <circle cx="72" cy="65" r="3" fill={glowColor} opacity="0.85" />
          {/* Delicate veins */}
          <path d="M 50 45 Q 70 35 85 25 M 50 45 Q 68 45 82 42 M 50 50 Q 65 60 75 70" stroke="#090d16" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>

        {/* Butterfly Body & Antennae */}
        <g>
          {/* Antennae */}
          <path d="M 49 32 Q 44 18 36 14" stroke="#0f172a" strokeWidth="1.2" fill="none" />
          <circle cx="36" cy="14" r="1.5" fill="#0f172a" />
          <path d="M 51 32 Q 56 18 64 14" stroke="#0f172a" strokeWidth="1.2" fill="none" />
          <circle cx="64" cy="14" r="1.5" fill="#0f172a" />
          {/* Thorax and Abdomen */}
          <ellipse cx="50" cy="35" rx="3" ry="5" fill="#0f172a" />
          <ellipse cx="50" cy="50" rx="2.5" ry="12" fill="#1e293b" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 2. Buzzing Honeybee Vector (Apis cerana)
 */
export function HoneybeeVector({ size = 36, className = '' }) {
  return (
    <div 
      className={`honeybee-wrap ${className}`} 
      style={{ width: size, height: size * 0.9, display: 'inline-block', position: 'relative' }}
    >
      <svg viewBox="0 0 80 72" width={size} height={size * 0.9} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="beeBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>

        {/* Fast Vibrating Translucent Wings */}
        <g className="bee-wings-anim">
          {/* Left Wing */}
          <ellipse cx="32" cy="22" rx="18" ry="8" transform="rotate(-35 32 22)" fill="rgba(224, 242, 254, 0.75)" stroke="#94a3b8" strokeWidth="0.8" />
          <path d="M 22 25 Q 32 20 42 16" stroke="#94a3b8" strokeWidth="0.5" fill="none" />
          {/* Right Wing */}
          <ellipse cx="48" cy="22" rx="18" ry="8" transform="rotate(35 48 22)" fill="rgba(224, 242, 254, 0.75)" stroke="#94a3b8" strokeWidth="0.8" />
          <path d="M 38 16 Q 48 20 58 25" stroke="#94a3b8" strokeWidth="0.5" fill="none" />
        </g>

        {/* Legs */}
        <path d="M 32 44 Q 24 54 20 56 M 48 44 Q 56 54 60 56 M 35 48 Q 28 60 25 64 M 45 48 Q 52 60 55 64" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Head & Antennae */}
        <circle cx="40" cy="26" r="6" fill="#1c1917" />
        <circle cx="37" cy="24" r="1.5" fill="#f8fafc" />
        <path d="M 38 22 Q 34 14 30 12 M 42 22 Q 46 14 50 12" stroke="#1c1917" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        {/* Fuzzy Thorax */}
        <ellipse cx="40" cy="35" rx="8" ry="6.5" fill="#b45309" stroke="#78350f" strokeWidth="1" />

        {/* Striped Abdomen */}
        <g>
          <ellipse cx="40" cy="48" rx="9" ry="12" fill="url(#beeBody)" />
          {/* Dark Stripes */}
          <path d="M 32 42 Q 40 46 48 42" stroke="#1c1917" strokeWidth="3" fill="none" />
          <path d="M 31 47 Q 40 51 49 47" stroke="#1c1917" strokeWidth="3" fill="none" />
          <path d="M 33 53 Q 40 56 47 53" stroke="#1c1917" strokeWidth="2.5" fill="none" />
          {/* Stinger */}
          <path d="M 39 60 L 40 64 L 41 60 Z" fill="#1c1917" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 3. Majestic Indian Peacock Vector (Pavo cristatus)
 */
export function PeacockVector({ size = 70, className = '' }) {
  return (
    <div 
      className={`peacock-vector-wrap ${className}`} 
      style={{ width: size, height: size * 1.1, display: 'inline-block', position: 'relative' }}
    >
      <svg viewBox="0 0 120 135" width={size} height={size * 1.1} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="peacockNeck" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="featherFan" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Shimmering Fan of Tail Coverts */}
        <g className="peacock-tail-fan">
          {/* Fan backdrop */}
          <path 
            d="M 60 90 C 20 80, -5 35, 15 15 C 35 -5, 85 -5, 105 15 C 125 35, 100 80, 60 90 Z" 
            fill="url(#featherFan)" 
            opacity="0.92"
            stroke="#064e3b"
            strokeWidth="1.5"
          />
          {/* Ocellated Eyespot Feathers */}
          {[
            { cx: 30, cy: 30 },
            { cx: 50, cy: 18 },
            { cx: 70, cy: 18 },
            { cx: 90, cy: 30 },
            { cx: 38, cy: 52 },
            { cx: 60, cy: 40 },
            { cx: 82, cy: 52 }
          ].map((spot, i) => (
            <g key={i}>
              <ellipse cx={spot.cx} cy={spot.cy} rx="8.5" ry="11" fill="#047857" stroke="#fbbf24" strokeWidth="1" />
              <ellipse cx={spot.cx} cy={spot.cy} rx="6" ry="8" fill="#d97706" />
              <circle cx={spot.cx} cy={spot.cy + 1} r="3.8" fill="#0284c7" />
              <circle cx={spot.cx - 1} cy={spot.cy} r="1.5" fill="#f8fafc" />
            </g>
          ))}
        </g>

        {/* Royal Crest Feathers on Crown */}
        <g>
          <path d="M 62 48 Q 58 35 56 30" stroke="#0284c7" strokeWidth="1.5" fill="none" />
          <circle cx="56" cy="30" r="2.5" fill="#38bdf8" />
          <path d="M 64 48 Q 64 34 64 28" stroke="#0284c7" strokeWidth="1.5" fill="none" />
          <circle cx="64" cy="28" r="2.5" fill="#38bdf8" />
          <path d="M 66 48 Q 70 35 72 30" stroke="#0284c7" strokeWidth="1.5" fill="none" />
          <circle cx="72" cy="30" r="2.5" fill="#38bdf8" />
        </g>

        {/* Slender Royal Blue Body & S-Curved Neck */}
        <g>
          {/* Body */}
          <ellipse cx="64" cy="85" rx="14" ry="18" fill="#0f172a" />
          {/* Wing fold */}
          <path d="M 54 75 C 60 70, 75 75, 78 88 C 80 98, 65 105, 54 95 Z" fill="#78350f" stroke="#451a03" strokeWidth="1" />
          {/* S-Neck & Head */}
          <path 
            d="M 58 75 C 55 65, 60 52, 64 50 C 68 52, 70 65, 68 75 Z" 
            fill="url(#peacockNeck)" 
          />
          <circle cx="64" cy="50" r="6" fill="#0284c7" />
          {/* Eye with white flash */}
          <ellipse cx="63" cy="49" rx="1.8" ry="1.2" fill="#ffffff" />
          <circle cx="63" cy="49" r="0.8" fill="#0f172a" />
          {/* Beak */}
          <path d="M 60 51 L 53 53 L 60 54 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.5" />
          {/* Legs */}
          <path d="M 60 102 L 60 118 M 68 102 L 68 118 M 56 118 L 62 118 M 65 118 L 71 118" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 4. Wild Indian Hare / Rabbit Vector (Lepus nigricollis)
 */
export function RabbitVector({ size = 52, className = '' }) {
  return (
    <div 
      className={`rabbit-vector-wrap ${className}`} 
      style={{ width: size, height: size * 0.9, display: 'inline-block', position: 'relative' }}
    >
      <svg viewBox="0 0 95 85" width={size} height={size * 0.9} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="rabbitFur" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d6d3d1" />
            <stop offset="50%" stopColor="#a8a29e" />
            <stop offset="100%" stopColor="#78716c" />
          </linearGradient>
        </defs>

        {/* Soft Fluffy Tail */}
        <circle cx="20" cy="56" r="6" fill="#f5f5f4" />

        {/* Back Legs & Haunches */}
        <ellipse cx="36" cy="58" rx="16" ry="12" fill="url(#rabbitFur)" />
        <ellipse cx="38" cy="68" rx="10" ry="4" fill="#a8a29e" />

        {/* Body */}
        <ellipse cx="48" cy="52" rx="19" ry="15" fill="url(#rabbitFur)" />

        {/* Black Nape (Distinctive marker of the Indian Black-Naped Hare) */}
        <path d="M 52 38 Q 56 46 54 50" stroke="#1c1917" strokeWidth="4.5" strokeLinecap="round" />

        {/* Front Paws */}
        <ellipse cx="64" cy="66" rx="6" ry="4" fill="#d6d3d1" />

        {/* Head */}
        <ellipse cx="65" cy="40" rx="11" ry="9" fill="url(#rabbitFur)" />
        <ellipse cx="72" cy="43" rx="4" ry="3.5" fill="#e7e5e4" />
        {/* Pink Nose */}
        <circle cx="76" cy="42" r="1.8" fill="#f43f5e" />
        {/* Whiskers */}
        <path d="M 74 44 L 84 42 M 74 45 L 83 47" stroke="#78716c" strokeWidth="0.6" />
        {/* Dark Eye with shine */}
        <ellipse cx="64" cy="38" rx="2.5" ry="3" fill="#1c1917" />
        <circle cx="63.5" cy="37.5" r="1" fill="#ffffff" />

        {/* Long Upright Sahyadri Ears with Pink Interior */}
        <g className="rabbit-ears-twitch">
          {/* Back Ear */}
          <path d="M 58 35 C 55 20, 50 8, 54 6 C 58 4, 63 18, 62 34 Z" fill="#a8a29e" stroke="#78716c" strokeWidth="0.8" />
          <path d="M 56 30 C 54 20, 52 12, 55 10 C 57 8, 60 18, 60 28 Z" fill="#fda4af" opacity="0.8" />
          {/* Front Ear */}
          <path d="M 63 35 C 62 18, 60 5, 65 4 C 70 3, 71 18, 67 34 Z" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="0.8" />
          <path d="M 64 30 C 63 18, 62 10, 65 8 C 67 6, 68 18, 66 28 Z" fill="#fda4af" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 5. Blooming Flower Vector (Gulmohar, Jasmine, Marigold, Lotus)
 */
export function FlowerVector({ type = 'gulmohar', size = 32, className = '' }) {
  if (type === 'gulmohar') {
    // Blazing 5-petaled scarlet flower
    return (
      <svg viewBox="0 0 50 50" width={size} height={size} className={className}>
        <g transform="translate(25, 25)">
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse 
              key={i} 
              cx="0" 
              cy="-14" 
              rx="6.5" 
              ry="11" 
              transform={`rotate(${angle})`} 
              fill={i === 0 ? '#fef08a' : '#e11d48'} 
              stroke="#be123c" 
              strokeWidth="0.8"
            />
          ))}
          <circle cx="0" cy="0" r="4.5" fill="#f59e0b" />
          <circle cx="0" cy="0" r="2" fill="#78350f" />
        </g>
      </svg>
    );
  }

  if (type === 'jasmine') {
    // Pure fragrant white star jasmine
    return (
      <svg viewBox="0 0 50 50" width={size} height={size} className={className}>
        <g transform="translate(25, 25)">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <ellipse 
              key={i} 
              cx="0" 
              cy="-13" 
              rx="4" 
              ry="10" 
              transform={`rotate(${angle})`} 
              fill="#ffffff" 
              stroke="#cbd5e1" 
              strokeWidth="0.7"
            />
          ))}
          <circle cx="0" cy="0" r="3.5" fill="#fef08a" />
        </g>
      </svg>
    );
  }

  // Golden Marigold / Amaltas
  return (
    <svg viewBox="0 0 50 50" width={size} height={size} className={className}>
      <g transform="translate(25, 25)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse 
            key={i} 
            cx="0" 
            cy="-12" 
            rx="5" 
            ry="9" 
            transform={`rotate(${angle})`} 
            fill="#f59e0b" 
            stroke="#d97706" 
            strokeWidth="0.7"
          />
        ))}
        <circle cx="0" cy="0" r="4.5" fill="#ea580c" />
      </g>
    </svg>
  );
}

/**
 * 6. Swaying Lush Meadow Grass Clump with Wildflowers
 */
export function MeadowGrassVector({ width = '100%', height = 65, className = '' }) {
  return (
    <div className={`grass-svg-container ${className}`} style={{ width, height, overflow: 'hidden' }}>
      <svg viewBox="0 0 1200 70" preserveAspectRatio="none" width="100%" height={height}>
        {/* Gradient fill for soil/meadow base */}
        <defs>
          <linearGradient id="grassBladeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="60%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
        </defs>

        {/* Back Grass Blades (Swaying slowly) */}
        <g className="grass-back-sway">
          {Array.from({ length: 48 }).map((_, i) => {
            const x = i * 25 + 5;
            const h = 45 + (i % 5) * 4;
            const curve = (i % 2 === 0 ? 8 : -8);
            return (
              <path 
                key={`bg-${i}`} 
                d={`M ${x} 70 Q ${x + curve} ${70 - h * 0.6} ${x + curve * 1.5} ${70 - h}`} 
                stroke="#15803d" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                fill="none" 
              />
            );
          })}
        </g>

        {/* Front Grass Blades (Swaying with wind) */}
        <g className="grass-front-sway">
          {Array.from({ length: 55 }).map((_, i) => {
            const x = i * 22;
            const h = 50 + (i % 6) * 3;
            const curve = (i % 3 === 0 ? 10 : -7);
            return (
              <path 
                key={`fg-${i}`} 
                d={`M ${x} 70 Q ${x + curve} ${70 - h * 0.5} ${x + curve * 1.8} ${70 - h}`} 
                stroke="url(#grassBladeGrad)" 
                strokeWidth="3" 
                strokeLinecap="round" 
                fill="none" 
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

/**
 * 7. Drooping Botanical Banyan Vines & Canopy
 */
export function HangingVinesCanopyVector({ height = 75 }) {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" width="100%" height={height} className="vines-vector-svg">
      <defs>
        <linearGradient id="vineWood" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1c3d25" />
          <stop offset="50%" stopColor="#2e633d" />
          <stop offset="100%" stopColor="#1c3d25" />
        </linearGradient>
      </defs>

      {/* Main overarching woody vines */}
      <path d="M -20 0 Q 140 45, 300 20 T 680 40 T 1060 18 T 1460 35" stroke="url(#vineWood)" strokeWidth="4.5" fill="none" />
      <path d="M 0 0 Q 200 32, 420 12 T 840 32 T 1220 14 T 1440 28" stroke="#163820" strokeWidth="3" fill="none" opacity="0.85" />

      {/* Hanging leafy tendrils & blossoms */}
      {[
        { x: 140, h: 68, leafCount: 4, flower: 'jasmine' },
        { x: 310, h: 78, leafCount: 5, flower: 'gulmohar' },
        { x: 490, h: 62, leafCount: 3, flower: null },
        { x: 680, h: 84, leafCount: 6, flower: 'jasmine' },
        { x: 880, h: 72, leafCount: 4, flower: 'gulmohar' },
        { x: 1080, h: 65, leafCount: 4, flower: null },
        { x: 1260, h: 80, leafCount: 5, flower: 'jasmine' }
      ].map((tendril, idx) => (
        <g key={idx} className="tendril-sway" style={{ transformOrigin: `${tendril.x}px 0px` }}>
          <path 
            d={`M ${tendril.x} 20 Q ${tendril.x + 8} ${tendril.h * 0.6} ${tendril.x} ${tendril.h}`} 
            stroke="#2e633d" 
            strokeWidth="2.2" 
            fill="none" 
          />
          {/* Leaves along tendril */}
          {Array.from({ length: tendril.leafCount }).map((_, lIdx) => {
            const ly = 25 + lIdx * 12;
            const side = lIdx % 2 === 0 ? 1 : -1;
            return (
              <path 
                key={lIdx} 
                d={`M ${tendril.x} ${ly} Q ${tendril.x + side * 10} ${ly + 2} ${tendril.x + side * 14} ${ly + 8} Q ${tendril.x + side * 6} ${ly + 10} ${tendril.x} ${ly}`} 
                fill="#4ade80" 
                stroke="#15803d" 
                strokeWidth="0.8" 
              />
            );
          })}
          {/* Blooming flower at end */}
          {tendril.flower === 'jasmine' && (
            <circle cx={tendril.x} cy={tendril.h} r="4.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
          )}
          {tendril.flower === 'gulmohar' && (
            <circle cx={tendril.x} cy={tendril.h} r="5" fill="#e11d48" stroke="#9f1239" strokeWidth="0.8" />
          )}
        </g>
      ))}
    </svg>
  );
}
