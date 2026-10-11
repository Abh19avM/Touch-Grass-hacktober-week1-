import React, { useState } from 'react';
import { X, Trees, BookOpen, Volume2, Search, Leaf } from 'lucide-react';
import { FLORA_SPECIES, TRAIL_BIRDS } from '../data/foliageKnowledge';
import { localAI } from '../services/localAi';
import { audioCoach } from '../services/audioCoach';
import { FlowerVector } from './NatureVectors';

export default function FloraIdentifierModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('trees'); // 'trees' | 'birds' | 'ai-identify'
  const [queryText, setQueryText] = useState('');
  const [identificationResult, setIdentificationResult] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(FLORA_SPECIES[0]);

  const quickSamples = [
    'Massive canopy with hanging aerial prop roots and glossy oval leaves',
    'Blazing scarlet red flower petals carpeting the red dirt trail',
    'Cascading golden yellow chandeliers swaying in the hill breeze',
    'Electric violet flowers with sweet honey scent on the mountain ridge'
  ];

  const handleIdentify = (text) => {
    const query = text || queryText;
    setQueryText(query);
    const res = localAI.identifyFlora(query);
    setIdentificationResult(res);
    if (res && res.species) {
      setSelectedSpecies(res.species);
    }
  };

  const handleSpeakTip = (text) => {
    audioCoach.speak(text);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2500,
      background: 'rgba(10, 16, 12, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="trail-card-surface" style={{
        width: '100%',
        maxWidth: 780,
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '26px 26px',
        position: 'relative',
        background: '#151f18',
        border: '1px solid var(--border-card)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 'var(--radius-sm)',
                background: '#233427',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-moss-light)'
              }}>
                <Trees size={18} />
              </div>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-parchment)', fontFamily: 'var(--font-serif)' }}>
                Pune Botanical & Wildlife Field Guide
              </h2>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-stone)', marginTop: 4 }}>
              Offline Sahyadri catalog • Identify banyan canopies, flame trees, Karvi blooms, and hill bird calls
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(244, 240, 234, 0.06)',
              border: 'none',
              color: 'var(--text-parchment)',
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <button
            onClick={() => setActiveTab('trees')}
            className={activeTab === 'trees' ? 'btn-moss' : 'btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Trees size={14} />
            <span>Botanical Trees Catalog</span>
          </button>
          <button
            onClick={() => setActiveTab('ai-identify')}
            className={activeTab === 'ai-identify' ? 'btn-moss' : 'btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Search size={14} />
            <span>Trail Sighting Classifier</span>
          </button>
          <button
            onClick={() => setActiveTab('birds')}
            className={activeTab === 'birds' ? 'btn-moss' : 'btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Volume2 size={14} />
            <span>Wildlife Calls Guide</span>
          </button>
        </div>

        {/* TAB 1: Sighting Classifier */}
        {activeTab === 'ai-identify' && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-stone)', fontWeight: 500, display: 'block', marginBottom: 6 }}>
                Describe what you observe on the Pune trail (leaf color, shape, bark texture, or sunlight):
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleIdentify()}
                  placeholder="e.g. Blazing scarlet red flower petals carpeting the red murrum dirt..."
                  style={{
                    flex: 1,
                    background: '#101712',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '9px 14px',
                    color: 'var(--text-parchment)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)'
                  }}
                />
                <button 
                  onClick={() => handleIdentify()}
                  className="btn-primary" 
                  style={{ padding: '9px 18px' }}
                >
                  <Search size={14} /> Classify
                </button>
              </div>

              {/* Sample Observation Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Try observations:</span>
                {quickSamples.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleIdentify(s)}
                    style={{
                      background: 'rgba(244, 240, 234, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-stone)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '3px 8px',
                      fontSize: '0.72rem',
                      cursor: 'pointer'
                    }}
                  >
                    "{s}"
                  </button>
                ))}
              </div>
            </div>

            {/* Results Card */}
            {identificationResult && (
              <div style={{
                background: '#19261d',
                border: '1px solid rgba(112, 162, 132, 0.35)',
                borderRadius: 'var(--radius-sm)',
                padding: '18px 20px',
                marginTop: 16
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: '#253d2d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Leaf size={20} color="var(--color-moss-light)" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-parchment)', fontFamily: 'var(--font-serif)' }}>
                        {identificationResult.species.commonName}
                      </h3>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-lichen)', fontStyle: 'italic' }}>
                        {identificationResult.species.scientificName}
                      </span>
                    </div>
                  </div>
                  <span style={{
                    background: 'rgba(46, 125, 50, 0.25)',
                    color: 'var(--color-moss-light)',
                    border: '1px solid rgba(74, 222, 128, 0.35)',
                    padding: '3px 9px',
                    borderRadius: 3,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {identificationResult.confidencePct}% Botanical Match
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div style={{ background: '#111812', padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <strong style={{ fontSize: '0.72rem', color: 'var(--color-clay-soft)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Pigment Chemistry
                    </strong>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-stone)', marginTop: 4 }}>
                      {identificationResult.species.pigmentScience}
                    </p>
                  </div>
                  <div style={{ background: '#111812', padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <strong style={{ fontSize: '0.72rem', color: 'var(--color-clay-soft)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Leaf Architecture
                    </strong>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-stone)', marginTop: 4 }}>
                      {identificationResult.species.leafShape}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-stone)' }}>
                    🌲 <em>{identificationResult.species.funFact}</em>
                  </span>
                  <button
                    onClick={() => handleSpeakTip(identificationResult.species.trailAudioTip)}
                    className="btn-secondary"
                    style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                  >
                    <Volume2 size={12} color="var(--color-ochre-light)" />
                    <span>Hear Audio Field Note</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Tree Catalog */}
        {activeTab === 'trees' && (
          <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr', gap: 16 }}>
            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {FLORA_SPECIES.map((sp) => (
                <div
                  key={sp.id}
                  onClick={() => setSelectedSpecies(sp)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: selectedSpecies.id === sp.id ? '#24352a' : 'rgba(244, 240, 234, 0.03)',
                    border: selectedSpecies.id === sp.id ? '1px solid rgba(112, 162, 132, 0.4)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Leaf size={16} color="var(--color-moss-light)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-parchment)' }}>{sp.commonName}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{sp.autumnColor.split(' ')[0]}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail Pane */}
            {selectedSpecies && (
              <div style={{ background: '#121a14', padding: '18px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <Trees size={22} color="var(--color-moss-light)" />
                      <h3 style={{ fontSize: '1.35rem', color: 'var(--text-parchment)', fontFamily: 'var(--font-serif)' }}>
                        {selectedSpecies.commonName}
                      </h3>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-lichen)', fontStyle: 'italic' }}>
                      {selectedSpecies.scientificName}
                    </div>
                  </div>
                  <span className="badge-tag badge-near-peak">
                    {selectedSpecies.autumnColor}
                  </span>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-stone)', lineHeight: 1.5, marginBottom: 14 }}>
                  <p><strong>Leaf Anatomy:</strong> {selectedSpecies.leafShape}</p>
                  <p style={{ marginTop: 5 }}><strong>Bark Texture:</strong> {selectedSpecies.barkDescription}</p>
                  <p style={{ marginTop: 5 }}><strong>Pigment Chemistry:</strong> {selectedSpecies.pigmentScience}</p>
                </div>

                <div style={{ background: '#17231c', border: '1px solid rgba(112, 162, 132, 0.25)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', marginBottom: 14 }}>
                  <strong style={{ fontSize: '0.72rem', color: 'var(--color-moss-light)', textTransform: 'uppercase' }}>Trail Audio Prompt</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-parchment)', marginTop: 3 }}>
                    "{selectedSpecies.trailAudioTip}"
                  </p>
                </div>

                <button
                  onClick={() => handleSpeakTip(selectedSpecies.trailAudioTip)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Volume2 size={14} /> Listen to Audio Field Note
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Wildlife Calls Guide */}
        {activeTab === 'birds' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TRAIL_BIRDS.map((b) => (
              <div 
                key={b.id}
                style={{
                  background: '#121a14',
                  border: '1px solid var(--border-subtle)',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-parchment)', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Volume2 size={14} color="var(--color-moss-light)" />
                    <span>{b.name.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim()}</span>
                  </h4>
                  <button
                    onClick={() => handleSpeakTip(`The ${b.name} call sounds like: ${b.call}. ${b.fieldNote}`)}
                    className="btn-secondary"
                    style={{ padding: '3px 10px', fontSize: '0.72rem' }}
                  >
                    <Volume2 size={12} color="var(--color-ochre-light)" /> Preview Audio
                  </button>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-clay-soft)', marginBottom: 3 }}>
                  <strong>Audio Signature:</strong> "{b.call}"
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-stone)' }}>
                  <strong>Habitat:</strong> {b.habitat} • <em>{b.fieldNote}</em>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
