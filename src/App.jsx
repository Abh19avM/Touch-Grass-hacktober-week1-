import React, { useState, useEffect } from 'react';
import { 
  Volume2, MapPin, Search, Layers, BookOpen, 
  Smartphone, RefreshCw, Trees, Mountain, Wind, ChevronRight
} from 'lucide-react';
import { TRAILS_DATA } from './data/trails';
import { localAI } from './services/localAi';
import { audioCoach } from './services/audioCoach';
import MapViewer from './components/MapViewer';
import RouteCard from './components/RouteCard';
import PocketModeModal from './components/PocketModeModal';
import FloraIdentifierModal from './components/FloraIdentifierModal';
import NatureCursorFollower from './components/NatureCursorFollower';
import { PeacockVector, FlowerVector } from './components/NatureVectors';

export default function App() {
  const [trails, setTrails] = useState(TRAILS_DATA);
  const [selectedTrail, setSelectedTrail] = useState(TRAILS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filterDistance, setFilterDistance] = useState('all'); // 'all' | 'short' | 'medium' | 'long'
  const [filterWildlife, setFilterWildlife] = useState('all'); // 'all' | 'peacock' | 'banyan'
  const [mapLayer, setMapLayer] = useState('outdoor'); // 'outdoor' | 'topo' | 'satellite'

  // Modals
  const [isPocketModeOpen, setIsPocketModeOpen] = useState(false);
  const [isFloraModalOpen, setIsFloraModalOpen] = useState(false);

  // Runner simulation progress
  const [runnerProgressKm, setRunnerProgressKm] = useState(0);

  useEffect(() => {
    localAI.loadModel();
  }, []);

  // Natural language trail prompt ranking for Pune routes
  const handleAISearch = async (query) => {
    const q = query !== undefined ? query : searchQuery;
    setSearchQuery(q);
    if (!q.trim()) {
      setTrails(TRAILS_DATA);
      return;
    }

    setIsSearching(true);
    const ranked = await localAI.rankTrailsByPrompt(q, TRAILS_DATA);
    setTrails(ranked);
    if (ranked.length > 0) {
      setSelectedTrail(ranked[0]);
      setRunnerProgressKm(0);
    }
    setIsSearching(false);
  };

  // Filter logic
  const filteredTrails = trails.filter((t) => {
    if (filterDistance === 'short' && t.distanceKm > 5.0) return false;
    if (filterDistance === 'medium' && (t.distanceKm <= 5.0 || t.distanceKm > 7.0)) return false;
    if (filterDistance === 'long' && t.distanceKm <= 7.0) return false;
    if (filterWildlife === 'peacock' && !t.wildlifeHighlights?.some(w => w.toLowerCase().includes('peacock'))) return false;
    if (filterWildlife === 'banyan' && !t.primarySpecies?.some(s => s.toLowerCase().includes('banyan'))) return false;
    return true;
  });

  const handleTriggerCheckpoint = (cp) => {
    audioCoach.speak(`${cp.title}. ${cp.cue} ${cp.sensoryPrompt}`);
  };

  // Quick prompt presets for Pune runners
  const punePrompts = [
    'Vetal Tekdi sunrise run with peacocks, rabbits, and soft red murrum dirt',
    'Taljai banyan tree sanctuary with dancing peacocks and cool morning shade',
    'Sinhagad fort mountain climb through cool fog and wild Karvi blooms',
    'Pashan Lake bamboo glade with water lilies, butterflies, and morning birds'
  ];

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Background Ambience */}
      <div className="nature-ambient-bg" />

      {/* Interactive Cursor Follower: Flying Butterfly or Honeybee with gentle sparkling pollen */}
      <NatureCursorFollower />

      {/* Main Content Container */}
      <div className="app-container">
        
        {/* Navigation & Pune Masthead */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          padding: '16px 0 20px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          {/* Logo & Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: 'var(--radius-sm)',
              background: '#193222',
              border: '1.5px solid rgba(74, 222, 128, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              overflow: 'hidden'
            }}>
              <PeacockVector size={38} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.65rem', color: 'var(--text-parchment)', lineHeight: 1.1 }}>
                  CanopyRoute Pune
                </h1>
                <span style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-moss-light)',
                  letterSpacing: '0.04em',
                  background: 'rgba(46, 125, 50, 0.25)',
                  padding: '2px 8px',
                  borderRadius: 4,
                  border: '1px solid rgba(74, 222, 128, 0.3)'
                }}>
                  सह्याद्री Hill Runner • MH
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-stone)', marginTop: 3 }}>
                Screen-free trail running companion for Pune’s tekdis, banyan groves, peacocks & hill ridges
              </p>
            </div>
          </div>

          {/* Masthead Actions */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            {/* Field Status Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(20, 34, 24, 0.85)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '0.75rem',
              color: 'var(--text-parchment)'
            }}>
              <span style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 6px #22c55e'
              }} />
              <span>Offline GPS & Audio Ready</span>
            </div>

            {/* Field Guide Button */}
            <button
              onClick={() => setIsFloraModalOpen(true)}
              className="btn-moss"
            >
              <BookOpen size={14} />
              <span>Pune Flora & Wildlife</span>
            </button>

            {/* Start Pocket Run Mode */}
            <button
              onClick={() => setIsPocketModeOpen(true)}
              className="btn-primary"
            >
              <Smartphone size={15} />
              <span>Pocket Run Mode</span>
            </button>
          </div>
        </header>

        {/* Natural Pune Trail Discovery Search */}
        <section style={{ margin: '20px 0 18px' }}>
          <div className="trail-card-surface" style={{
            padding: '22px 24px',
            background: 'linear-gradient(180deg, #182a1e 0%, #132218 100%)',
            border: '1px solid rgba(74, 222, 128, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', color: 'var(--text-parchment)' }}>
                  Discover Pune’s Tekdis, Peacocks & Banyan Canopies
                </h2>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-stone)', marginTop: 3 }}>
                  Find trails by wildlife, trees, slope, or flowers. Put your phone in your pocket and let audio landmark cues guide your run.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.78rem', color: 'var(--color-moss-light)', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <PeacockVector size={18} /> Taljai & Vetal Tekdi
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Mountain size={14} color="#60a5fa" /> Sinhagad Ridge
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <FlowerVector type="gulmohar" size={16} /> Karvi & Gulmohar Blooms
                </span>
              </div>
            </div>

            {/* Search Input Bar */}
            <div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 280, position: 'relative' }}>
                  <Search size={17} color="var(--color-moss-light)" style={{ position: 'absolute', left: 14, top: 12 }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                    placeholder="Describe your ideal Pune trail (e.g. 5k morning run with peacocks, soft red soil, and banyan trees)..."
                    style={{
                      width: '100%',
                      padding: '11px 16px 11px 40px',
                      background: '#0d1610',
                      border: '1px solid rgba(74, 222, 128, 0.25)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-parchment)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border-color 0.18s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-moss-light)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(74, 222, 128, 0.25)'}
                  />
                </div>

                <button
                  onClick={() => handleAISearch()}
                  className="btn-primary"
                  disabled={isSearching}
                  style={{ minWidth: 130, justifyContent: 'center' }}
                >
                  {isSearching ? <RefreshCw size={15} className="animate-spin" /> : <Search size={15} />}
                  <span>Find Trails</span>
                </button>
              </div>

              {/* Sample Prompt Chips for Pune */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Popular in Pune:</span>
                {punePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAISearch(p)}
                    style={{
                      background: 'rgba(247, 244, 237, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '3px 10px',
                      color: 'var(--text-stone)',
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-moss-light)';
                      e.currentTarget.style.color = 'var(--text-parchment)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.color = 'var(--text-stone)';
                    }}
                  >
                    "{p}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Filter Toolbar */}
        <section style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          margin: '0 0 16px'
        }}>
          {/* Distance & Habitat Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginRight: 4 }}>Filter:</span>
            {['all', 'short', 'medium', 'long'].map((dst) => (
              <button
                key={dst}
                onClick={() => setFilterDistance(dst)}
                style={{
                  background: filterDistance === dst ? '#25422d' : 'rgba(247, 244, 237, 0.04)',
                  color: filterDistance === dst ? 'var(--text-parchment)' : 'var(--text-stone)',
                  fontWeight: filterDistance === dst ? 600 : 400,
                  border: filterDistance === dst ? '1px solid var(--color-moss-light)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '5px 12px',
                  fontSize: '0.76rem',
                  cursor: 'pointer'
                }}
              >
                {dst === 'all' ? 'All Distances' : dst === 'short' ? 'Under 5 km' : dst === 'medium' ? '5 - 7 km' : '8+ km (Sinhagad)'}
              </button>
            ))}

            <button
              onClick={() => setFilterWildlife(filterWildlife === 'peacock' ? 'all' : 'peacock')}
              style={{
                background: filterWildlife === 'peacock' ? 'rgba(46, 125, 50, 0.25)' : 'rgba(247, 244, 237, 0.04)',
                color: filterWildlife === 'peacock' ? 'var(--color-moss-light)' : 'var(--text-stone)',
                fontWeight: filterWildlife === 'peacock' ? 600 : 400,
                border: filterWildlife === 'peacock' ? '1px solid var(--color-moss-light)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 12px',
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <PeacockVector size={16} />
              <span>Peacock Sanctuaries</span>
            </button>

            <button
              onClick={() => setFilterWildlife(filterWildlife === 'banyan' ? 'all' : 'banyan')}
              style={{
                background: filterWildlife === 'banyan' ? 'rgba(200, 90, 50, 0.25)' : 'rgba(247, 244, 237, 0.04)',
                color: filterWildlife === 'banyan' ? 'var(--color-clay-soft)' : 'var(--text-stone)',
                fontWeight: filterWildlife === 'banyan' ? 600 : 400,
                border: filterWildlife === 'banyan' ? '1px solid var(--color-terracotta)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 12px',
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <FlowerVector type="jasmine" size={14} />
              <span>Ancient Banyan Canopies</span>
            </button>
          </div>

          {/* Map Layer Switcher: Topo, Satellite, Outdoor */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Layers size={13} color="var(--color-moss-light)" />
            <span style={{ fontSize: '0.76rem', color: 'var(--text-stone)' }}>Map Layer:</span>
            {[
              { id: 'outdoor', label: 'Sahyadri Topo' },
              { id: 'satellite', label: 'Green Satellite' },
              { id: 'dark', label: 'Trail Paths' }
            ].map((layer) => (
              <button
                key={layer.id}
                onClick={() => setMapLayer(layer.id)}
                style={{
                  background: mapLayer === layer.id ? '#25422d' : 'rgba(247, 244, 237, 0.04)',
                  color: mapLayer === layer.id ? 'var(--text-parchment)' : 'var(--text-stone)',
                  border: mapLayer === layer.id ? '1px solid var(--color-moss-light)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 10px',
                  fontSize: '0.74rem',
                  cursor: 'pointer'
                }}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </section>

        {/* Split Grid: Trails Column & Map/Audio Checkpoint Column */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(360px, 470px) 1fr',
          gap: 20,
          alignItems: 'start'
        }}>
          
          {/* Left Column: Pune Trail List & Route Cards */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-moss-light)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                Pune Trails ({filteredTrails.length})
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Tap to explore GPS path
              </span>
            </div>

            {filteredTrails.map((trail) => (
              <RouteCard
                key={trail.id}
                trail={trail}
                isSelected={selectedTrail.id === trail.id}
                onSelect={(t) => {
                  setSelectedTrail(t);
                  setRunnerProgressKm(0);
                }}
                onStartPocketMode={(t) => {
                  setSelectedTrail(t);
                  setIsPocketModeOpen(true);
                }}
              />
            ))}

            {filteredTrails.length === 0 && (
              <div className="trail-card-surface" style={{ padding: 32, textAlign: 'center' }}>
                <p style={{ color: 'var(--text-stone)', fontSize: '0.88rem' }}>No Pune trails match your current filter.</p>
                <button
                  onClick={() => { setFilterDistance('all'); setFilterWildlife('all'); }}
                  className="btn-secondary"
                  style={{ marginTop: 12, padding: '6px 14px', fontSize: '0.78rem' }}
                >
                  Show All Pune Routes
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Pune Leaflet Map & Audio Landmark Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Interactive Pune Map Panel */}
            <div className="trail-card-surface" style={{ padding: 10, height: 490 }}>
              <MapViewer
                trail={selectedTrail}
                runnerProgressKm={runnerProgressKm}
                onTriggerCheckpoint={handleTriggerCheckpoint}
                mapLayer={mapLayer}
              />
            </div>

            {/* Selected Trail Audio Landmarks Timeline */}
            <div className="trail-card-surface" style={{ padding: '20px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-parchment)' }}>
                      {selectedTrail.name}
                    </h3>
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-moss-light)', fontFamily: 'var(--font-mono)' }}>
                      • {selectedTrail.distanceKm} km ({selectedTrail.surfaceType})
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-stone)', marginTop: 3 }}>
                    Auditory checkpoints triggered automatically when your phone is in your pocket
                  </p>
                </div>

                <button
                  onClick={() => setIsPocketModeOpen(true)}
                  className="btn-primary"
                  style={{ padding: '7px 16px', fontSize: '0.8rem' }}
                >
                  <Smartphone size={14} /> Start Pocket Run
                </button>
              </div>

              {/* Checkpoints Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                {selectedTrail.audioCheckpoints.map((cp, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#122016',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 10
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-clay-soft)', fontFamily: 'var(--font-mono)' }}>
                          Km {cp.km}
                        </span>
                        <span style={{
                          fontSize: '0.7rem',
                          color: 'var(--color-moss-light)',
                          background: 'rgba(46, 125, 50, 0.2)',
                          padding: '1px 6px',
                          borderRadius: 3
                        }}>
                          {cp.floraFeature}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-parchment)', marginBottom: 3, fontWeight: 600 }}>
                        {cp.title}
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-stone)', lineHeight: 1.4 }}>
                        {cp.cue}
                      </p>
                    </div>

                    <button
                      onClick={() => handleTriggerCheckpoint(cp)}
                      className="btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.73rem', width: '100%', justifyContent: 'center' }}
                    >
                      <Volume2 size={12} color="var(--color-ochre-light)" />
                      <span>Preview Audio Note</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Clean Pune Nature Footer */}
        <footer style={{
          marginTop: 40,
          padding: '24px 0',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-parchment)' }}>
              <PeacockVector size={20} />
              <span>CanopyRoute Pune</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: 'var(--color-moss-light)' }}>सह्याद्री Trail Running Companion</span>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Built for Pune runners. Run with your eyes on the trail, peacocks, and green tekdis — zero data sent to external clouds.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setIsFloraModalOpen(true)}
              className="btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.76rem' }}
            >
              <BookOpen size={13} color="var(--color-moss-light)" />
              <span>Pune Botanical Field Guide</span>
            </button>
            <button
              onClick={() => { setSelectedTrail(TRAILS_DATA[0]); setRunnerProgressKm(0); }}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.76rem' }}
            >
              Reset View
            </button>
          </div>
        </footer>

      </div>

      {/* Pocket Mode Screen-Off Audio Runner */}
      {isPocketModeOpen && (
        <PocketModeModal
          trail={selectedTrail}
          initialProgressKm={runnerProgressKm}
          onProgressUpdate={(km) => setRunnerProgressKm(km)}
          onClose={() => setIsPocketModeOpen(false)}
        />
      )}

      {/* Pune Botanical & Wildlife Field Guide Modal */}
      {isFloraModalOpen && (
        <FloraIdentifierModal
          onClose={() => setIsFloraModalOpen(false)}
        />
      )}
    </div>
  );
}
