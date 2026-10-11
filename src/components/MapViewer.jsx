import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Volume2, Trees, Compass } from 'lucide-react';

// Custom Map Controller to smoothly pan & fit bounds when trail changes
function MapRecenter({ coordinates, runnerCoords }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates && coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [35, 35], maxZoom: 15 });
    }
  }, [coordinates, map]);

  useEffect(() => {
    if (runnerCoords) {
      map.panTo(runnerCoords, { animate: true, duration: 0.5 });
    }
  }, [runnerCoords, map]);

  return null;
}

// Custom DivIcons with organic botanical vector styling
const createNaturePinIcon = (label, color = '#2e7d32') => {
  return L.divIcon({
    className: 'custom-nature-icon',
    html: `<div style="
      background: ${color};
      color: #ffffff;
      font-weight: 700;
      font-size: 11px;
      padding: 3px 9px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 4px;
      border: 2px solid #f4f0ea;
      box-shadow: 0 3px 8px rgba(0,0,0,0.4);
      white-space: nowrap;
    ">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
      <span>${label}</span>
    </div>`,
    iconSize: [52, 24],
    iconAnchor: [26, 12]
  });
};

const runnerIcon = L.divIcon({
  className: 'runner-icon-wrapper',
  html: `<div class="runner-pulsing-marker" title="Your current location on trail"></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11]
});

// Pune & Maharashtra bounded coordinates: keeps the view localized to Pune's Sahyadri hills
const PUNE_BOUNDS = [
  [17.80, 73.20], // Southwest (Western Ghats / Mahabaleshwar)
  [19.20, 74.40]  // Northeast (Pune district border)
];

export default function MapViewer({ 
  trail, 
  runnerProgressKm = 0, 
  onTriggerCheckpoint,
  mapLayer = 'outdoor'
}) {
  if (!trail || !trail.coordinates || trail.coordinates.length === 0) {
    return <div className="trail-card-surface" style={{ padding: 40, textAlign: 'center' }}>No Pune trail selected</div>;
  }

  // Calculate runner position along coordinate path
  const totalCoords = trail.coordinates.length;
  const progressRatio = Math.min(1, Math.max(0, runnerProgressKm / trail.distanceKm));
  const coordIndex = Math.min(totalCoords - 1, Math.floor(progressRatio * (totalCoords - 1)));
  const runnerCoords = trail.coordinates[coordIndex];

  // Tile layer providers: High-detail regional maps for Pune & Maharashtra
  const tileSources = {
    outdoor: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Topographic Western Ghats'
    },
    topo: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenTopoMap contributors'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; High-Res Green Canopy'
    },
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CARTO &mdash; Pune Nature Paths'
    }
  };

  const activeTiles = tileSources[mapLayer] || tileSources.outdoor;

  // Checkpoint icons array for visual delight
  const checkpointEmojis = ['🦚', '🦋', '🐇', '🐝', '🌸', '🌿'];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 480, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <MapContainer
        center={trail.coordinates[0]}
        zoom={14}
        minZoom={10}
        maxZoom={18}
        maxBounds={PUNE_BOUNDS}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution={activeTiles.attribution}
          url={activeTiles.url}
          maxZoom={18}
        />

        <MapRecenter coordinates={trail.coordinates} runnerCoords={runnerCoords} />

        {/* Trail Polyline - Lush Forest Amber/Green path */}
        <Polyline
          positions={trail.coordinates}
          pathOptions={{
            color: '#2e7d32',
            weight: 6,
            opacity: 0.9,
            lineJoin: 'round',
            lineCap: 'round'
          }}
        />

        {/* Trailhead Start Pin */}
        <Marker 
          position={trail.coordinates[0]} 
          icon={createNaturePinIcon('Trailhead', '#1b5e20')}
        >
          <Popup>
            <div style={{ padding: '3px 5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#2e7d32', fontWeight: 700, fontSize: '0.85rem' }}>
                <span>Pune Trailhead Start</span>
              </div>
              <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: '#1f2937' }}>{trail.name}</p>
              <span style={{ fontSize: '0.74rem', color: '#6b7280' }}>Elevation: 0m gain • Red Murrum Trail</span>
            </div>
          </Popup>
        </Marker>

        {/* Checkpoint Markers with Clean Vector Badges */}
        {trail.audioCheckpoints.map((cp, idx) => {
          const cpRatio = cp.km / trail.distanceKm;
          const cpIndex = Math.min(trail.coordinates.length - 1, Math.floor(cpRatio * (trail.coordinates.length - 1)));
          const pos = trail.coordinates[cpIndex] || trail.coordinates[0];

          return (
            <Marker 
              key={idx} 
              position={pos} 
              icon={createNaturePinIcon(`Km ${cp.km}`, '#c85a32')}
            >
              <Popup>
                <div style={{ maxWidth: 230, padding: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <strong style={{ fontSize: '0.85rem', color: '#c85a32' }}>{cp.title}</strong>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#374151', marginBottom: 6 }}>
                    {cp.cue}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#166534', background: '#dcfce7', padding: '4px 6px', borderRadius: 4, fontStyle: 'italic' }}>
                    "{cp.sensoryPrompt}"
                  </div>
                  <button
                    onClick={() => onTriggerCheckpoint && onTriggerCheckpoint(cp)}
                    className="btn-primary"
                    style={{
                      marginTop: 8,
                      width: '100%',
                      padding: '5px 8px',
                      fontSize: '0.74rem',
                      justifyContent: 'center',
                      borderRadius: 4
                    }}
                  >
                    <Volume2 size={12} /> Play Landmark Audio
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Live Runner Position on Pune Trail */}
        {runnerCoords && (
          <Marker position={runnerCoords} icon={runnerIcon}>
            <Popup>
              <div style={{ padding: 4 }}>
                <strong>🏃 Your Current Pune Pace</strong>
                <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: '#374151' }}>
                  {runnerProgressKm.toFixed(2)} km / {trail.distanceKm} km
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Floating Pune Hill HUD */}
      <div style={{
        position: 'absolute',
        top: 14,
        right: 14,
        zIndex: 1000,
        background: 'rgba(21, 35, 25, 0.92)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(112, 162, 132, 0.3)',
        borderRadius: 'var(--radius-sm)',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 4px 16px rgba(0,0,0,0.45)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Compass size={14} color="var(--color-moss-light)" />
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-parchment)' }}>
            Pune, MH
          </span>
        </div>
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Trees size={14} color="var(--color-moss-light)" />
          <span style={{ fontSize: '0.78rem', color: 'var(--color-lichen)' }}>
            {trail.canopyCoverPct}% Canopy Cover
          </span>
        </div>
      </div>
    </div>
  );
}
