import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Box, Sparkles, AlertCircle } from 'lucide-react';
import Mascot from '../Mascot.jsx';
import { STORY_PANELS } from '../../data/storyContent.js';
import { getStoryNarration } from '../../utils/narration.js';
import { narrate } from '../../utils/audio.js';

import TryItDragLine from '../story/TryItDragLine.jsx';
import TryItStaircase from '../story/TryItStaircase.jsx';
import TryItSignFlip from '../story/TryItSignFlip.jsx';
import TryItRotateLine from '../story/TryItRotateLine.jsx';
import TryItTwoPoints from '../story/TryItTwoPoints.jsx';
import TryItParallelPerp from '../story/TryItParallelPerp.jsx';

export default function StoryPhase({ onNext, audioEnabled = true }) {
  const [panelIndex, setPanelIndex] = useState(0);
  const [tryItDone, setTryItDone] = useState(Array(6).fill(false));
  const panel = STORY_PANELS[panelIndex];

  useEffect(() => {
    narrate(getStoryNarration(panelIndex), audioEnabled);
  }, [panelIndex, audioEnabled]);

  const handleNext = () => {
    if (panelIndex < STORY_PANELS.length - 1) {
      setPanelIndex((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const handlePrev = () => {
    if (panelIndex > 0) {
      setPanelIndex((prev) => prev - 1);
    }
  };

  const markTryItDone = (idx) => {
    setTryItDone((prev) => {
      const updated = [...prev];
      updated[idx] = true;
      return updated;
    });
  };

  const renderTryIt = () => {
    switch (panelIndex) {
      case 0: return <TryItDragLine onDone={() => markTryItDone(0)} />;
      case 1: return <TryItStaircase onDone={() => markTryItDone(1)} />;
      case 2: return <TryItSignFlip onDone={() => markTryItDone(2)} />;
      case 3: return <TryItRotateLine onDone={() => markTryItDone(3)} />;
      case 4: return <TryItTwoPoints onDone={() => markTryItDone(4)} />;
      case 5: return <TryItParallelPerp onDone={() => markTryItDone(5)} />;
      default: return null;
    }
  };

  return (
    <div className="phase-container story-phase">
      <div className="glass-card phase-card">
        {/* Header */}
        <div className="phase-header">
          <div>
            <span className="phase-tag">PHASE 2 — STORY</span>
            <h2>The Gradient Trail Expedition</h2>
          </div>

          <div className="panel-dots">
            {STORY_PANELS.map((p, idx) => (
              <button
                key={p.id}
                className={`panel-dot ${idx === panelIndex ? 'active' : ''}`}
                onClick={() => setPanelIndex(idx)}
                title={`Panel ${idx + 1}: ${p.title}`}
              />
            ))}
          </div>
        </div>

        <div className="story-content-wrapper">
          {/* Visual Showcase Card with Try-It Micro-Simulation */}
          <div className="story-visual-card">
            <div className="story-card-top-bar">
              <div className="story-location-badge" style={{ fontSize: '0.96rem', fontWeight: 800 }}>
                <MapPin size={17} />
                <span>{panel.location}</span>
              </div>

              <div className="panel-counter-badge" style={{ fontSize: '0.88rem', fontWeight: 800 }}>
                <span>Discovery {panelIndex + 1} of 6</span>
              </div>
            </div>

            {/* Micro-Interaction Try-It stage */}
            <div
              className="visual-graphic-container"
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 270,
                background: 'rgba(10, 10, 46, 0.75)',
                borderRadius: 16,
                padding: '16px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              {renderTryIt()}
            </div>

            {/* Concept Takeaway banner */}
            <div
              style={{
                width: '100%',
                marginTop: 14,
                padding: '12px 16px',
                background: 'rgba(0, 229, 255, 0.12)',
                borderLeft: '4px solid #00e5ff',
                borderRadius: 10,
                fontSize: '1.02rem',
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: '#00e5ff', fontWeight: 800 }}>Key Concept: </strong>
              <span style={{ color: '#ffffff' }}>{panel.conceptTaught}</span>
            </div>
          </div>

          {/* Narrative Text Panel with Story Illustration */}
          <div className="story-text-panel">
            {/* Matching Contextual Story Image */}
            {panel.image && (
              <div
                className="story-scene-banner-container"
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: 16,
                  overflow: 'hidden',
                  marginBottom: 16,
                  border: '1.5px solid rgba(0, 229, 255, 0.3)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45), 0 0 20px rgba(0, 229, 255, 0.15)',
                  aspectRatio: '16/9',
                  maxHeight: 210,
                }}
              >
                <img
                  src={panel.image}
                  alt={panel.imageAlt || panel.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '8px 14px',
                    background: 'linear-gradient(to top, rgba(10, 10, 46, 0.95) 0%, rgba(10, 10, 46, 0.6) 60%, transparent 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.88rem', color: '#ffd54f', fontWeight: 800 }}>
                    {panel.location}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                    Scene {panelIndex + 1} of 6
                  </span>
                </div>
              </div>
            )}

            {/* Story Title with Increased Text Size */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                color: '#ffd54f',
                fontSize: '1.85rem',
                lineHeight: 1.25,
                marginBottom: 14,
                letterSpacing: 0.3,
                textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              }}
            >
              {panel.title}
            </h3>

            {/* Story Paragraphs with Increased Text Size (1.24rem) and Generous Line Height */}
            <div className="story-paragraphs-box" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {panel.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="story-lead-text"
                  style={{
                    fontSize: '1.24rem',
                    lineHeight: 1.72,
                    color: '#f8fafc',
                    letterSpacing: 0.2,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Misconception Alert if present */}
            {panel.misconception && (
              <div
                className="misconception-bubble glass-card"
                style={{
                  marginTop: 16,
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  border: '1.5px solid rgba(255,193,7,0.45)',
                  background: 'rgba(255,193,7,0.12)',
                  borderRadius: 12,
                }}
              >
                <Mascot mood="thinking" size="small" />
                <div>
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      color: '#ffd54f',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      display: 'block',
                      marginBottom: 4,
                    }}
                  >
                    Grady's Misconception Alert! ⚠️
                  </span>
                  <span style={{ fontSize: '1.02rem', color: '#ffffff', fontWeight: 600, lineHeight: 1.5 }}>
                    {panel.misconception}
                  </span>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22 }}>
              <button
                className="btn btn-secondary"
                onClick={handlePrev}
                disabled={panelIndex === 0}
                style={{ visibility: panelIndex === 0 ? 'hidden' : 'visible', padding: '10px 18px', fontSize: '0.95rem' }}
              >
                <ArrowLeft size={17} />
                <span>Previous</span>
              </button>

              <button className="btn btn-primary" onClick={handleNext} style={{ minWidth: 170, padding: '10px 22px', fontSize: '0.98rem' }}>
                <span>{panelIndex === STORY_PANELS.length - 1 ? 'Enter Simulation Lab' : 'Next Discovery'}</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
