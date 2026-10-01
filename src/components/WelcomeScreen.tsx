import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Gift, Cake, Mail, Music, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WelcomeScreenProps {
  onOpen: () => void;
  onStartAudio: () => void;
}

export function fireCinematicConfetti() {
  // Center high-energy burst
  confetti({
    particleCount: 100,
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#F472B6', '#EC4899', '#FDA4AF', '#FDE047', '#FFFFFF', '#FB7185'],
    ticks: 260,
    gravity: 0.85,
    scalar: 1.15,
  });

  // Left cannon
  setTimeout(() => {
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.65 },
      colors: ['#FB7185', '#F472B6', '#FBBF24', '#F43F5E', '#FFFFFF'],
    });
  }, 180);

  // Right cannon
  setTimeout(() => {
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.65 },
      colors: ['#FB7185', '#F472B6', '#FBBF24', '#F43F5E', '#FFFFFF'],
    });
  }, 320);

  // Floating starburst shower
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 120,
      origin: { y: 0.3 },
      shapes: ['star', 'circle'],
      colors: ['#FFD700', '#FF69B4', '#FFF0F5', '#F472B6'],
    });
  }, 480);
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpen, onStartAudio }) => {
  const [step, setStep] = useState<number>(0);
  const [isOpening, setIsOpening] = useState(false);
  const [boxWiggle, setBoxWiggle] = useState(false);

  // Trigger gentle starlight confetti upon landing on the welcome screen
  useEffect(() => {
    const timerIntroConfetti = setTimeout(() => {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.25 },
          colors: ['#F472B6', '#FDA4AF', '#FDE047'],
          disableForReducedMotion: true,
        });
      } catch {
        // ignore
      }
    }, 700);

    const timer1 = setTimeout(() => setStep(1), 250); // "Wait... Sadaf 👀💗"
    const timer2 = setTimeout(() => setStep(2), 1000); // "I made a little something for you..."
    const timer3 = setTimeout(() => setStep(3), 1800); // "OPEN YOUR SURPRISE ✨"

    return () => {
      clearTimeout(timerIntroConfetti);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStart = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (isOpening) return;

    // Trigger grand cinematic confetti explosion!
    fireCinematicConfetti();

    // Start continuous audio immediately inside user gesture
    onStartAudio();
    setIsOpening(true);

    // Smooth transition into the main page
    setTimeout(() => {
      onOpen();
    }, 650);
  };

  const handleBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBoxWiggle(true);
    setTimeout(() => setBoxWiggle(false), 500);
    handleStart();
  };

  return (
    <div
      onClick={() => onStartAudio()}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#11010a] via-[#280517] to-[#0c0007] transition-all duration-700 ease-out px-4 overflow-y-auto overflow-x-hidden select-none ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Cinematic Pink Light Blooms & Gentle Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-pink-600/25 blur-[150px] pointer-events-none animate-gentle-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-rose-500/20 blur-[140px] pointer-events-none animate-gentle-glow" />

      {/* Floating Starlight / Particle Dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-pink-200/60"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 13) % 96}%`,
              left: `${(i * 19) % 94}%`,
              animationName: 'pulse',
              animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
              animationIterationCount: 'infinite',
              animationDuration: `${2.2 + (i % 4)}s`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Center Cinematic Container */}
      <div className="relative max-w-xl w-full text-center z-10 px-4 sm:px-6 py-10 flex flex-col items-center my-auto">
        {/* Top Floating Badge */}
        <div
          className={`transition-all duration-700 transform mb-5 ${
            step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-rose-500/25 to-pink-500/20 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-lg shadow-pink-900/30">
            <Sparkles className="w-4 h-4 text-pink-300 animate-spin" />
            <span>A Special Birthday Experience For You</span>
            <Heart className="w-4 h-4 fill-pink-400 text-pink-300" />
          </div>
        </div>

        {/* Interactive Sparkling 3D Gift Box */}
        <div
          className={`transition-all duration-1000 transform ${
            step >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'
          }`}
        >
          <div
            onClick={handleBoxClick}
            className={`relative cursor-pointer group my-2 ${
              boxWiggle ? 'animate-bounce' : 'animate-soft-float'
            }`}
          >
            {/* Ambient gift glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-pink-500/40 blur-xl group-hover:blur-2xl transition-all duration-300" />

            {/* Gift Box Card */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-300 p-1 shadow-[0_0_50px_rgba(244,114,182,0.55)] group-hover:scale-105 group-hover:shadow-[0_0_70px_rgba(244,114,182,0.8)] transition-all duration-300">
              <div className="w-full h-full rounded-[22px] bg-[#1e0413] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Golden Ribbon cross lines */}
                <div className="absolute inset-x-0 h-4 bg-gradient-to-r from-amber-400 via-pink-300 to-amber-400 opacity-80" />
                <div className="absolute inset-y-0 w-4 bg-gradient-to-b from-amber-400 via-pink-300 to-amber-400 opacity-80" />

                <Gift className="w-12 h-12 text-pink-200 z-10 drop-shadow-md group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>

            {/* Tap to unwrap badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-bold shadow-md shadow-pink-900/50 flex items-center gap-1">
              <span>Tap to Open 🎀</span>
            </div>

            {/* Top sparkle badge */}
            <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 text-white flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Main Heading: Wait... Sadaf 👀💗 */}
        <h1
          className={`font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mt-8 mb-3 transition-all duration-1000 transform ${
            step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="drop-shadow-[0_4px_25px_rgba(244,114,182,0.6)]">
            Wait... Sadaf <span className="inline-block hover:scale-110 transition-transform">👀💗</span>
          </span>
        </h1>

        {/* Subtitle Message */}
        <p
          className={`text-base sm:text-xl text-pink-200/90 font-light leading-relaxed mb-6 max-w-md transition-all duration-1000 transform ${
            step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          I made a little magical corner of the world just for your birthday... ✨
        </p>

        {/* Sneak-Peek Feature Chips */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2 mb-8 transition-all duration-1000 transform ${
            step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-xs font-medium backdrop-blur-xs">
            <Cake className="w-3.5 h-3.5 text-pink-400" /> Virtual Cake & Candles
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-xs font-medium backdrop-blur-xs">
            <Mail className="w-3.5 h-3.5 text-pink-400" /> Personal Letter
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-xs font-medium backdrop-blur-xs">
            <Music className="w-3.5 h-3.5 text-pink-400" /> Varron Forever ♫
          </span>
        </div>

        {/* Primary Action Button: OPEN YOUR SURPRISE 🎁 */}
        <div
          className={`transition-all duration-1000 transform ${
            step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <button
            onClick={handleStart}
            disabled={isOpening}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4.5 sm:px-12 sm:py-5 text-base sm:text-lg font-bold text-white rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-[0_0_50px_rgba(236,72,153,0.65)] hover:shadow-[0_0_75px_rgba(236,72,153,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 cursor-pointer"
          >
            <span>OPEN YOUR SURPRISE</span>
            <Gift className="w-5 h-5 text-pink-100 group-hover:rotate-12 transition-transform duration-300" />
            <ArrowRight className="w-5 h-5 text-pink-200 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Romantic Bottom Date Stamp */}
        <div
          className={`mt-10 transition-all duration-1000 text-xs text-pink-400/80 font-mono tracking-[0.3em] uppercase flex items-center gap-2 ${
            step >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
          <span>02 • 10 • 2003 · BESTIE FOREVER</span>
          <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
        </div>
      </div>
    </div>
  );
};
