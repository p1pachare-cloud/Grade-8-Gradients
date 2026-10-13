import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle } from 'lucide-react';
import { STATIONS } from '../../data/stationContent.js';
import SlopeClimberStation from '../simulations/SlopeClimberStation.jsx';
import SteepestPathStation from '../simulations/SteepestPathStation.jsx';
import FormulaBuilderStation from '../simulations/FormulaBuilderStation.jsx';
import Mascot from '../Mascot.jsx';
import { stationInstructionNarration } from '../../utils/narration.js';
import { narrate } from '../../utils/audio.js';

export default function SimulatePhase({
  onNext,
  audioEnabled = true,
  completedStations = [false, false, false],
  setCompletedStations,
  onSimulationsComplete,
  onStationBMiss,
}) {
  const [stationIdx, setStationIdx] = useState(0);

  const handleStationComplete = (index) => {
    const updated = [...completedStations];
    updated[index] = true;
    if (setCompletedStations) setCompletedStations(updated);

    const isNowAllDone = updated.every(Boolean);

    if (isNowAllDone) {
      try {
        confetti({
          particleCount: 100,
          spread: 85,
          origin: { y: 0.5 },
        });
      } catch (e) {}
      if (onSimulationsComplete) onSimulationsComplete();
      // After completing the simulation phase, smoothly transition to the practice phase
      setTimeout(() => {
        onNext();
      }, 1200);
    } else {
      // Advance to next incomplete station
      const nextIdx = updated.findIndex((done, i) => !done && i > index);
      const target = nextIdx !== -1 ? nextIdx : updated.findIndex((done) => !done);
      if (target !== -1) {
        setStationIdx(target);
        narrate(stationInstructionNarration(target), audioEnabled);
      }
    }
  };

  const allDone = completedStations.every(Boolean);

  return (
    <div className="phase-container simulate-phase-curious">
      <div className="glass-card simulate-main-card">
        {/* Phase Header */}
        <div className="simulate-phase-top-bar">
          <div className="simulate-title-group">
            <span className="phase-tag">PHASE 3 — SIMULATE</span>
            <h2 className="simulate-main-title">The Gradient Engineering Laboratory</h2>
            <p className="simulate-tagline">
              Master all 3 core gradient discoveries! Complete each station to unlock the Slope Builder badge and advance to the Practice Phase.
            </p>
          </div>

          {/* 3 Stations Hub Tabs */}
          <div className="simulate-stations-hub" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {STATIONS.map((st, i) => {
              const isActive = i === stationIdx;
              const isDone = completedStations[i];
              return (
                <div
                  key={st.id}
                  className={`station-hub-card ${isActive ? 'is-active-station' : ''} ${isDone ? 'is-station-done' : ''}`}
                  onClick={() => {
                    setStationIdx(i);
                    narrate(stationInstructionNarration(i), audioEnabled);
                  }}
                >
                  <div className="station-card-icon-row">
                    <span className="station-icon-badge">{st.icon}</span>
                    <span className="station-tag-label">{st.tag}</span>
                    {isDone && <CheckCircle size={16} className="done-check-icon" />}
                  </div>
                  <h4 className="station-hub-name">{st.name}</h4>
                  <p className="station-hub-desc">{st.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Station Action Toolbar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
              marginTop: 16,
              padding: '12px 18px',
              background: 'rgba(10, 10, 46, 0.75)',
              borderRadius: 12,
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Active Station:</span>
              <span style={{ fontWeight: 800, color: '#ffd54f', fontSize: '1rem' }}>
                {STATIONS[stationIdx]?.name}
              </span>
              {completedStations[stationIdx] ? (
                <span style={{ color: '#81c784', fontWeight: 800, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle size={15} /> Completed ✓
                </span>
              ) : (
                <span style={{ color: '#00e5ff', fontSize: '0.82rem', fontWeight: 700 }}>
                  (In Progress)
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {!allDone ? (
                <button
                  className="btn btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.9rem' }}
                  onClick={() => handleStationComplete(stationIdx)}
                >
                  <span>Next Station ➔</span>
                </button>
              ) : (
                <span style={{ color: '#81c784', fontWeight: 800, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle size={16} /> All 3 Stations Completed ✓
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Active Station Stage */}
        <div className="simulation-active-stage">
          {stationIdx === 0 && (
            <SlopeClimberStation
              audioEnabled={audioEnabled}
              onComplete={() => handleStationComplete(0)}
            />
          )}

          {stationIdx === 1 && (
            <SteepestPathStation
              audioEnabled={audioEnabled}
              onComplete={() => handleStationComplete(1)}
              onMiss={onStationBMiss}
            />
          )}

          {stationIdx === 2 && (
            <FormulaBuilderStation
              audioEnabled={audioEnabled}
              onComplete={() => handleStationComplete(2)}
            />
          )}
        </div>

        {/* Bottom Station Status & Action Bar */}
        <div
          className="simulation-bottom-bar glass-card"
          style={{
            marginTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Mascot mood={allDone ? 'celebrating' : 'encouraging'} size="small" />
            <div>
              <h4 style={{ color: '#ffd54f', margin: 0 }}>
                {allDone ? 'All 3 Stations Completed! 🎓' : `Station ${stationIdx + 1} of 3: ${STATIONS[stationIdx]?.name}`}
              </h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {allDone
                  ? 'Great job! Entering the Practice Phase...'
                  : `${completedStations.filter(Boolean).length}/3 Stations completed. Complete all stations to advance to Practice!`}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {!allDone ? (
              <button
                className="btn btn-primary"
                onClick={() => handleStationComplete(stationIdx)}
                style={{ minWidth: 180 }}
              >
                <span>Next Station ➔</span>
              </button>
            ) : (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  borderRadius: 12,
                  background: 'rgba(76, 175, 80, 0.2)',
                  border: '1px solid rgba(76, 175, 80, 0.5)',
                  color: '#81c784',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                }}
              >
                <CheckCircle size={18} />
                <span>Simulation Complete! Advancing to Practice...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
