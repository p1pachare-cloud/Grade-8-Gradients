import React, { useState } from 'react';
import SceneCard from '../shared/SceneCard.jsx';
import Mascot from '../Mascot.jsx';
import { frac, formatFrac } from '../../utils/fraction.js';
import { steeper } from '../../utils/gradientMath.js';
import { playChime, playBuzz, playClick } from '../../utils/audio.js';

export default function SteepestPathStation({ onComplete, onMiss }) {
  const [round, setRound] = useState(0); // 0: Match, 1: Rank, 2: Spot the sign
  const [selectedCards, setSelectedCards] = useState([]);
  const [feedback, setFeedback] = useState(null);

  // Round 1: Match correct cards
  const matchCards = [
    { id: 1, scene: 'ramp', rise: 3, run: 4, unit: 'm', claim: 'm = 3/4', isCorrect: true, m: frac(3, 4) },
    { id: 2, scene: 'roof', rise: 2, run: 6, unit: 'm', claim: 'm = 3', isCorrect: false, m: frac(1, 3) }, // inverted
    { id: 3, scene: 'ski', rise: 100, run: 200, unit: 'm', claim: 'm = 1/2', isCorrect: true, m: frac(1, 2) },
    { id: 4, scene: 'trail', rise: 4, run: 2, unit: 'm', claim: 'm = 2', isCorrect: true, m: frac(2, 1) },
  ];

  // Round 2: Rank gentlest to steepest
  const [rankOrder, setRankOrder] = useState([
    { id: 'b1', name: 'Trail A (m = 1/4)', mag: 0.25 },
    { id: 'b2', name: 'Trail B (m = 2)', mag: 2.0 },
    { id: 'b3', name: 'Trail C (m = 1/2)', mag: 0.5 },
    { id: 'b4', name: 'Trail D (m = 3/4)', mag: 0.75 },
  ]);

  // Round 3: Spot the wrong sign
  const signCards = [
    { id: 's1', scene: 'ski', rise: -3, run: 4, unit: 'm', claim: 'm = +3/4 (Downhill)', hasWrongSign: true },
    { id: 's2', scene: 'ramp', rise: 2, run: 5, unit: 'm', claim: 'm = +2/5 (Uphill)', hasWrongSign: false },
    { id: 's3', scene: 'cable', rise: -100, run: 200, unit: 'm', claim: 'm = +1/2 (Downhill)', hasWrongSign: true },
    { id: 's4', scene: 'trail', rise: 4, run: 3, unit: 'm', claim: 'm = +4/3 (Uphill)', hasWrongSign: false },
  ];

  const handleToggleCard = (id) => {
    playClick();
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCheckMatch = () => {
    const correctIds = matchCards.filter((c) => c.isCorrect).map((c) => c.id);
    const isPerfect =
      selectedCards.length === correctIds.length &&
      selectedCards.every((id) => correctIds.includes(id));

    if (isPerfect) {
      playChime();
      setFeedback({ success: true, text: 'Spot on! All accurate gradient claims matched!' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedCards([]);
        setRound(1);
      }, 1500);
    } else {
      playBuzz();
      if (onMiss) onMiss();
      setFeedback({
        success: false,
        text: 'Look closely! Card 2 inverted run ÷ rise (6 ÷ 2 = 3 instead of 2/6 = 1/3).',
      });
    }
  };

  const handleSwapRank = (idx, direction) => {
    playClick();
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= rankOrder.length) return;
    const updated = [...rankOrder];
    const temp = updated[idx];
    updated[idx] = updated[newIdx];
    updated[newIdx] = temp;
    setRankOrder(updated);
  };

  const handleCheckRank = () => {
    // Check if sorted by mag ascending
    const isSorted = rankOrder.every((item, i) => i === 0 || item.mag >= rankOrder[i - 1].mag);
    if (isSorted) {
      playChime();
      setFeedback({ success: true, text: 'Perfect ranking from gentlest to steepest!' });
      setTimeout(() => {
        setFeedback(null);
        setRound(2);
      }, 1500);
    } else {
      playBuzz();
      if (onMiss) onMiss();
      setFeedback({
        success: false,
        text: 'Not quite in order! Compare magnitudes: 1/4 (0.25) < 1/2 (0.5) < 3/4 (0.75) < 2.',
      });
    }
  };

  const handleCheckSigns = () => {
    const wrongSignIds = signCards.filter((c) => c.hasWrongSign).map((c) => c.id);
    const isPerfect =
      selectedCards.length === wrongSignIds.length &&
      selectedCards.every((id) => wrongSignIds.includes(id));

    if (isPerfect) {
      playChime();
      setFeedback({ success: true, text: 'Awesome eye! You spotted all the negative downhill sign traps!' });
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      playBuzz();
      if (onMiss) onMiss();
      setFeedback({
        success: false,
        text: 'Remember: lines falling left to right must have a negative (−) sign!',
      });
    }
  };

  return (
    <div className="station-container glass-card" style={{ padding: '20px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <span className="phase-tag">STATION B · PICTORIAL LAB</span>
          <h3 style={{ margin: '4px 0', fontFamily: 'var(--font-display)', color: '#ffffff' }}>
            Steepest Path Detective
          </h3>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Round:</span>
          <div style={{ color: '#ffd54f', fontWeight: 800, fontSize: '1.1rem' }}>
            {round === 0 ? 'Mode 1: Match Claims' : round === 1 ? 'Mode 2: Rank Steepness' : 'Mode 3: Spot Wrong Signs'}
          </div>
        </div>
      </div>

      {/* Round 1: Match */}
      {round === 0 && (
        <div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 14 }}>
            🔍 Tap every card whose printed gradient claim is <strong>correct</strong> (Rise ÷ Run), then press Check:
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            {matchCards.map((card) => (
              <SceneCard
                key={card.id}
                scene={card.scene}
                rise={card.rise}
                run={card.run}
                unit={card.unit}
                claim={card.claim}
                selected={selectedCards.includes(card.id)}
                onSelect={() => handleToggleCard(card.id)}
                width={200}
                height={150}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleCheckMatch} style={{ minWidth: 160 }}>
              Check Selection
            </button>
            <button className="btn btn-secondary" onClick={() => setRound(1)}>
              Next ➔
            </button>
          </div>
        </div>
      )}

      {/* Round 2: Rank */}
      {round === 1 && (
        <div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 14 }}>
            🧗 Use the up/down arrows to rank trails in order from <strong>Gentlest (top) to Steepest (bottom)</strong>:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 420, margin: '0 auto' }}>
            {rankOrder.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(10,10,46,0.85)',
                  padding: '12px 18px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <span style={{ fontWeight: 800, color: '#ffffff' }}>{idx + 1}. {item.name}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                    onClick={() => handleSwapRank(idx, -1)}
                    disabled={idx === 0}
                  >
                    ▲
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                    onClick={() => handleSwapRank(idx, 1)}
                    disabled={idx === rankOrder.length - 1}
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleCheckRank} style={{ minWidth: 160 }}>
              Check Ranking
            </button>
            <button className="btn btn-secondary" onClick={() => setRound(2)}>
              Next ➔
            </button>
          </div>
        </div>
      )}

      {/* Round 3: Spot the sign */}
      {round === 2 && (
        <div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 14 }}>
            ⚠️ Tap every card where the <strong>sign is wrong</strong> (e.g. downhill labeled positive):
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            {signCards.map((card) => (
              <SceneCard
                key={card.id}
                scene={card.scene}
                rise={card.rise}
                run={card.run}
                unit={card.unit}
                claim={card.claim}
                selected={selectedCards.includes(card.id)}
                onSelect={() => handleToggleCard(card.id)}
                width={200}
                height={150}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleCheckSigns} style={{ minWidth: 160 }}>
              Check Signs
            </button>
            <button className="btn btn-secondary" onClick={onComplete}>
              Next ➔
            </button>
          </div>
        </div>
      )}

      {/* Feedback banner */}
      {feedback && (
        <div
          style={{
            marginTop: 16,
            textAlign: 'center',
            padding: '10px 14px',
            borderRadius: 10,
            background: feedback.success ? 'rgba(76,175,80,0.2)' : 'rgba(239,68,68,0.2)',
            color: feedback.success ? '#81c784' : '#ef9a9a',
            fontWeight: 700,
          }}
        >
          {feedback.text}
        </div>
      )}
    </div>
  );
}
