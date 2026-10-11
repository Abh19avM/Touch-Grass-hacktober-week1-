import React from 'react';
import { Mountain, Trees, Volume2, ArrowRight, Compass, Leaf } from 'lucide-react';

export default function RouteCard({ 
  trail, 
  isSelected, 
  onSelect, 
  onStartPocketMode 
}) {
  const getFoliageBadgeClass = (index) => {
    if (index >= 90) return 'badge-peak';
    if (index >= 80) return 'badge-near-peak';
    return 'badge-turning';
  };

  return (
    <div 
      className="trail-card-surface"
      onClick={() => onSelect(trail)}
      style={{
        padding: '16px 18px',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        border: isSelected ? '1px solid var(--color-moss-light)' : '1px solid var(--border-card)',
        background: isSelected ? '#1e3325' : '#17271c',
        marginBottom: 10,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle green edge for selected route */}
      {isSelected && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: 'var(--color-moss-light)'
        }} />
      )}

      {/* Header: Title and Foliage Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-parchment)', marginBottom: 2 }}>{trail.name}</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-stone)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Compass size={12} color="var(--color-moss-light)" />
            {trail.region}
          </p>
        </div>

        <span className={`badge-tag ${getFoliageBadgeClass(trail.foliageIndex)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Trees size={11} />
          <span>{trail.foliageStatus}</span>
        </span>
      </div>

      {/* Naturalist Match Observation if user searched */}
      {trail.matchScore !== undefined && (
        <div style={{
          margin: '6px 0 10px',
          padding: '6px 10px',
          background: 'rgba(46, 125, 50, 0.15)',
          border: '1px solid rgba(74, 222, 128, 0.3)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <Leaf size={13} color="var(--color-moss-light)" />
          <div style={{ fontSize: '0.75rem', color: 'var(--text-parchment)' }}>
            <span style={{ color: 'var(--color-moss-light)', fontWeight: 600 }}>Trail Note:</span> {trail.matchReason}
          </div>
        </div>
      )}

      {/* Trail Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        margin: '10px 0',
        padding: '8px 0',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Distance</span>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-parchment)', fontFamily: 'var(--font-mono)' }}>
            {trail.distanceKm} km
          </div>
        </div>
        <div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Elevation</span>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-moss-light)', fontFamily: 'var(--font-mono)' }}>
            +{trail.elevationGainM}m
          </div>
        </div>
        <div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Canopy Cover</span>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-ochre-light)', fontFamily: 'var(--font-mono)' }}>
            {trail.canopyCoverPct}%
          </div>
        </div>
      </div>

      {/* Wildlife Highlights */}
      {trail.wildlifeHighlights && trail.wildlifeHighlights.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8, alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-moss-light)', fontWeight: 600 }}>Wildlife:</span>
          {trail.wildlifeHighlights.map((w, idx) => (
            <span 
              key={idx}
              style={{
                fontSize: '0.7rem',
                color: '#d1fae5',
                background: 'rgba(46, 125, 50, 0.25)',
                padding: '2px 7px',
                borderRadius: 4,
                border: '1px solid rgba(74, 222, 128, 0.25)'
              }}
            >
              {w}
            </span>
          ))}
        </div>
      )}

      {/* Primary Tree Species */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
        {trail.primarySpecies.map((sp, idx) => (
            <span 
              key={idx}
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-stone)',
                background: 'rgba(247, 244, 237, 0.04)',
                padding: '2px 7px',
                borderRadius: 3,
                border: '1px solid var(--border-subtle)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Leaf size={10} color="var(--color-moss-light)" />
              <span>{sp}</span>
            </span>
        ))}
      </div>

      {/* Card Footer Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Volume2 size={13} color="var(--color-moss-light)" />
          <span style={{ fontSize: '0.74rem', color: 'var(--color-lichen)' }}>
            {trail.audioCheckpoints.length} audio landmark cues
          </span>
        </div>

        <button
          className="btn-primary"
          style={{ padding: '5px 12px', fontSize: '0.78rem' }}
          onClick={(e) => {
            e.stopPropagation();
            onStartPocketMode(trail);
          }}
        >
          <span>Pocket Run</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
