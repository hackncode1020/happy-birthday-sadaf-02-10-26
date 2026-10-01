import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface BirthdayCakeProps {
  onBlowCandles?: () => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onBlowCandles }) => {
  const [isBlown, setIsBlown] = useState<boolean>(false);
  const [showSmoke, setShowSmoke] = useState<boolean>(false);

  const handleBlow = () => {
    if (isBlown) {
      // Relight
      setIsBlown(false);
      setShowSmoke(false);
      return;
    }

    setIsBlown(true);
    setShowSmoke(true);
    if (onBlowCandles) {
      onBlowCandles();
    }
  };

  return (
    <section id="cake" className="py-16 md:py-24 relative overflow-hidden text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Date Marker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold tracking-widest uppercase mb-4 border border-pink-200/70 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>02 OCTOBER</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        </div>

        {/* Wish Prompt */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#831843] mb-3">
          {isBlown ? (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#831843] via-rose-600 to-pink-600 animate-fadeIn">
              HAPPY BIRTHDAY SADAF! 🎂💗
            </span>
          ) : (
            <span>Make a wish, Sadaf... 🎂</span>
          )}
        </h2>

        <p className="text-sm sm:text-base text-pink-900/70 font-normal mb-8 max-w-sm mx-auto">
          {isBlown
            ? 'May all your silent wishes and heartfelt dreams find their way to you this year.'
            : 'Close your eyes for three seconds, make the biggest wish, and blow out the candles.'}
        </p>

        {/* SVG Cake Container */}
        <div className="relative mx-auto w-64 sm:w-72 h-56 flex items-center justify-center my-4">
          <svg
            viewBox="0 0 280 220"
            className="w-full h-full drop-shadow-[0_15px_25px_rgba(219,39,119,0.15)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cake Plate */}
            <ellipse cx="140" cy="200" rx="125" ry="16" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2" />
            <ellipse cx="140" cy="198" rx="115" ry="12" fill="#FFFFFF" opacity="0.8" />

            {/* Bottom Tier */}
            <rect x="50" y="130" width="180" height="65" rx="14" fill="#F472B6" />
            <path
              d="M50,150 Q65,165 80,150 T110,150 T140,150 T170,150 T200,150 T230,150 L230,130 L50,130 Z"
              fill="#FFF0F5"
            />
            {/* Sprinkles on bottom tier */}
            <circle cx="80" cy="175" r="3" fill="#FDE047" />
            <circle cx="110" cy="180" r="3" fill="#FFFFFF" />
            <circle cx="140" cy="175" r="3.5" fill="#BE185D" />
            <circle cx="170" cy="182" r="3" fill="#FDE047" />
            <circle cx="200" cy="176" r="3" fill="#FFFFFF" />

            {/* Top Tier */}
            <rect x="75" y="80" width="130" height="55" rx="12" fill="#FB7185" />
            <path
              d="M75,98 Q90,110 105,98 T135,98 T165,98 T195,98 T205,98 L205,80 L75,80 Z"
              fill="#FFFFFF"
            />
            {/* Sprinkles on top tier */}
            <circle cx="100" cy="120" r="2.5" fill="#FFFFFF" />
            <circle cx="125" cy="116" r="3" fill="#FDE047" />
            <circle cx="155" cy="122" r="2.5" fill="#FFF0F5" />
            <circle cx="180" cy="118" r="3" fill="#BE185D" />

            {/* Frosting Swirls on top */}
            <circle cx="95" cy="80" r="8" fill="#FFF0F5" />
            <circle cx="140" cy="78" r="9" fill="#FFF0F5" />
            <circle cx="185" cy="80" r="8" fill="#FFF0F5" />

            {/* 3 Candles */}
            {/* Left Candle */}
            <rect x="92" y="44" width="6" height="34" rx="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
            <line x1="95" y1="44" x2="95" y2="38" stroke="#78350F" strokeWidth="1.5" />

            {/* Middle Candle (Center, slightly taller) */}
            <rect x="137" y="38" width="6" height="40" rx="2" fill="#FDE047" stroke="#CA8A04" strokeWidth="0.8" />
            <line x1="140" y1="38" x2="140" y2="32" stroke="#78350F" strokeWidth="1.5" />

            {/* Right Candle */}
            <rect x="182" y="44" width="6" height="34" rx="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
            <line x1="185" y1="44" x2="185" y2="38" stroke="#78350F" strokeWidth="1.5" />

            {/* Animated Candle Flames (when not blown) */}
            {!isBlown && (
              <g className="animate-flame">
                {/* Left Flame */}
                <ellipse cx="95" cy="28" rx="4.5" ry="8.5" fill="#F59E0B" />
                <ellipse cx="95" cy="29" rx="2.5" ry="5.5" fill="#FEF08A" />

                {/* Center Flame */}
                <ellipse cx="140" cy="22" rx="5" ry="9.5" fill="#F59E0B" />
                <ellipse cx="140" cy="23" rx="3" ry="6" fill="#FEF08A" />

                {/* Right Flame */}
                <ellipse cx="185" cy="28" rx="4.5" ry="8.5" fill="#F59E0B" />
                <ellipse cx="185" cy="29" rx="2.5" ry="5.5" fill="#FEF08A" />
              </g>
            )}

            {/* Smoke Wisps (after blown) */}
            {showSmoke && (
              <g className="animate-smoke text-slate-400">
                <path
                  d="M95,36 Q91,24 96,16 T93,4"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                <path
                  d="M140,30 Q136,18 143,10 T138,-2"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <path
                  d="M185,36 Q189,24 184,16 T187,4"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Blow Candles Action Button */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3">
          <button
            onClick={handleBlow}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 text-base font-semibold text-white rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>{isBlown ? 'RELIGHT THE CANDLES 🕯️' : 'BLOW THE CANDLES 🕯️'}</span>
            <Sparkles className="w-4 h-4 text-pink-200 group-hover:rotate-12 transition-transform" />
          </button>

          {isBlown && (
            <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5 animate-fadeIn">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Wish captured & sent to the universe! ✨</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
