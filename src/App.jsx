import React, { useState, useEffect, useCallback } from 'react';
import { Home, Volume2, VolumeX, Settings } from 'lucide-react';
import FloatingGeometry from './components/FloatingGeometry.jsx';
import JourneyBar from './components/JourneyBar.jsx';
import IntroScreen from './components/IntroScreen.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import WonderPhase from './components/phases/WonderPhase.jsx';
import StoryPhase from './components/phases/StoryPhase.jsx';
import SimulatePhase from './components/phases/SimulatePhase.jsx';
import PracticePhase from './components/phases/PracticePhase.jsx';
import ReflectPhase from './components/phases/ReflectPhase.jsx';
import { checkBadges } from './utils/badgeEngine.js';
import { stopNarration } from './utils/audio.js';

const STORAGE_KEY = 'intellia_gradients_g8_v1';

export default function App() {
  const [phase, setPhase] = useState('intro');
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [worldScores, setWorldScores] = useState(Array(10).fill(null));
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [completedStations, setCompletedStations] = useState([false, false, false]);
  const [stationBPerfect, setStationBPerfect] = useState(true);
  const [signQuestionsCorrect, setSignQuestionsCorrect] = useState(0);

  // Settings
  const [term, setTerm] = useState('gradient');
  const [units, setUnits] = useState('metric');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [phaseComplete, setPhaseComplete] = useState({
    wonder: false,
    story: false,
    simulate: false,
    practice: false,
    reflect: false,
  });

  // Stop any voice narration on mount
  useEffect(() => {
    stopNarration();
  }, []);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.timestamp && Date.now() - parsed.timestamp < 86400000) {
          if (parsed.phase) setPhase(parsed.phase);
          if (parsed.xp) setXp(parsed.xp);
          if (parsed.streak) setStreak(parsed.streak);
          if (parsed.maxStreak) setMaxStreak(parsed.maxStreak);
          if (parsed.worldScores) setWorldScores(parsed.worldScores);
          if (parsed.unlockedBadges) setUnlockedBadges(parsed.unlockedBadges);
          if (parsed.phaseComplete) setPhaseComplete(parsed.phaseComplete);
          if (parsed.completedStations) setCompletedStations(parsed.completedStations);
          if (parsed.stationBPerfect !== undefined) setStationBPerfect(parsed.stationBPerfect);
          if (parsed.signQuestionsCorrect) setSignQuestionsCorrect(parsed.signQuestionsCorrect);
          if (parsed.term) setTerm(parsed.term);
          if (parsed.units) setUnits(parsed.units);
        }
      }
    } catch (e) {
      console.warn('Session restore failed:', e);
    }
  }, []);

  // Save session state on change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          phase,
          xp,
          streak,
          maxStreak,
          worldScores,
          unlockedBadges,
          phaseComplete,
          completedStations,
          stationBPerfect,
          signQuestionsCorrect,
          term,
          units,
          timestamp: Date.now(),
        })
      );
    } catch (e) {
      console.warn('Session save failed:', e);
    }
  }, [
    phase,
    xp,
    streak,
    maxStreak,
    worldScores,
    unlockedBadges,
    phaseComplete,
    completedStations,
    stationBPerfect,
    signQuestionsCorrect,
    term,
    units,
  ]);

  // Check and unlock badges automatically
  useEffect(() => {
    const currentState = {
      phaseComplete,
      simStationsComplete: completedStations,
      worldScores: worldScores.map((s) => s || 0),
      maxStreak,
      badges: unlockedBadges,
      stationBPerfect,
      signQuestionsCorrect,
    };
    const newBadges = checkBadges(currentState);
    if (newBadges.length > 0) {
      setUnlockedBadges((prev) => [...prev, ...newBadges]);
    }
  }, [
    phaseComplete,
    completedStations,
    worldScores,
    maxStreak,
    stationBPerfect,
    signQuestionsCorrect,
    unlockedBadges,
  ]);

  const goHome = useCallback(() => {
    stopNarration();
    setPhase('intro');
  }, []);

  const handleNextPhase = (nextPhaseName) => {
    stopNarration();

    if (phase === 'wonder') setPhaseComplete((p) => ({ ...p, wonder: true }));
    if (phase === 'story') setPhaseComplete((p) => ({ ...p, story: true }));
    if (phase === 'simulate') setPhaseComplete((p) => ({ ...p, simulate: true }));
    if (phase === 'practice') setPhaseComplete((p) => ({ ...p, practice: true }));

    setPhase(nextPhaseName);
  };

  return (
    <div className={`app-container ${reducedMotion ? 'reduced-motion' : ''}`}>
      <FloatingGeometry />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        term={term}
        onSetTerm={setTerm}
        units={units}
        onSetUnits={setUnits}
        audioEnabled={audioEnabled}
        onToggleAudio={() => setAudioEnabled(!audioEnabled)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
      />

      {/* Top Header Controls */}
      {phase !== 'intro' && (
        <button className="home-btn" onClick={goHome} title="Return to Intro">
          <Home size={18} />
          <span>Home</span>
        </button>
      )}

      {/* Top Right Header Controls */}
      <div className="header-right-controls">
        <button
          className="header-icon-btn"
          onClick={() => setAudioEnabled(!audioEnabled)}
          title={audioEnabled ? 'Sound On' : 'Sound Off'}
        >
          {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
        <button
          className="header-icon-btn"
          onClick={() => setIsSettingsOpen(true)}
          title="Open Settings"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Top Journey Bar */}
      <JourneyBar
        currentPhase={phase}
        onSelectPhase={(selectedPhase) => {
          stopNarration();
          setPhase(selectedPhase);
        }}
        completedPhases={phaseComplete}
      />

      {/* Main Content Stage */}
      <main className="main-stage">
        {phase === 'intro' && (
          <IntroScreen
            onStart={() => setPhase('wonder')}
            onSelectPhase={(targetPhase) => {
              stopNarration();
              setPhase(targetPhase);
            }}
          />
        )}

        {phase === 'wonder' && (
          <WonderPhase
            audioEnabled={audioEnabled}
            onNext={() => handleNextPhase('story')}
          />
        )}

        {phase === 'story' && (
          <StoryPhase
            audioEnabled={audioEnabled}
            onNext={() => handleNextPhase('simulate')}
          />
        )}

        {phase === 'simulate' && (
          <SimulatePhase
            audioEnabled={audioEnabled}
            onNext={() => handleNextPhase('practice')}
            completedStations={completedStations}
            setCompletedStations={setCompletedStations}
            onSimulationsComplete={() => {
              setPhaseComplete((p) => ({ ...p, simulate: true }));
            }}
            onStationBMiss={() => setStationBPerfect(false)}
          />
        )}

        {phase === 'practice' && (
          <PracticePhase
            audioEnabled={audioEnabled}
            term={term}
            onNext={() => handleNextPhase('reflect')}
            xp={xp}
            setXp={setXp}
            streak={streak}
            setStreak={setStreak}
            maxStreak={maxStreak}
            setMaxStreak={setMaxStreak}
            worldScores={worldScores}
            setWorldScores={setWorldScores}
            onSignQuestionSolved={() => setSignQuestionsCorrect((c) => c + 1)}
          />
        )}

        {phase === 'reflect' && (
          <ReflectPhase
            audioEnabled={audioEnabled}
            onRestart={() => {
              stopNarration();
              setPhase('intro');
            }}
            xp={xp}
            worldScores={worldScores}
            unlockedBadges={unlockedBadges}
          />
        )}
      </main>
    </div>
  );
}
