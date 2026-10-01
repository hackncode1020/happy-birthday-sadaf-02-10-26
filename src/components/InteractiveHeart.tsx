import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface FloatingHeartItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const InteractiveHeart: React.FC = () => {
  const [isTapped, setIsTapped] = useState<boolean>(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeartItem[]>([]);
  const [pulse, setPulse] = useState<boolean>(false);

  const handleTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPulse(true);
    setTimeout(() => setPulse(false), 500);

    setIsTapped(true);

    // Spawn 14-18 floating upward hearts
    const rect = e.currentTarget.getBoundingClientRect();
    const count = 16;
    const newHearts: FloatingHeartItem[] = [];
    const colors = ['#F43F5E', '#EC4899', '#FB7185', '#F472B6', '#FDA4AF'];

    for (let i = 0; i < count; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * rect.width * 1.5,
        y: (Math.random() - 0.5) * 30,
        size: Math.random() * 14 + 14,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setFloatingHearts(newHearts);

    setTimeout(() => {
      setFloatingHearts([]);
    }, 2000);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden text-center">
      {/* Gentle Radial Glow when tapped */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-400/25 blur-3xl pointer-events-none transition-opacity duration-1000 ${
          isTapped ? 'opacity-100 scale-125' : 'opacity-40 scale-100'
        }`}
      />

      <div className="max-w-xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Tap For You</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#831843] mb-8">
          Okay Sadaf... tap the heart ❤️
        </h2>

        {/* Large Glowing Interactive Heart */}
        <div className="relative inline-flex items-center justify-center my-6">
          {/* Floating rising mini-hearts container */}
          <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center">
            {floatingHearts.map((h) => (
              <div
                key={h.id}
                className="absolute transition-all ease-out"
                style={{
                  transform: `translate(${h.x}px, -110px) scale(1.1)`,
                  transitionDuration: '1.8s',
                  opacity: 0,
                }}
              >
                <Heart
                  className="fill-current drop-shadow-sm"
                  style={{
                    width: `${h.size}px`,
                    height: `${h.size}px`,
                    color: h.color,
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleTap}
            aria-label="Tap glowing heart"
            className={`group relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-600 text-white flex items-center justify-center shadow-[0_0_40px_rgba(244,63,94,0.45)] hover:shadow-[0_0_60px_rgba(244,63,94,0.7)] transition-all duration-300 cursor-pointer active:scale-90 ${
              pulse ? 'scale-115' : 'hover:scale-108'
            }`}
          >
            <Heart className="w-16 h-16 sm:w-20 sm:h-20 fill-white text-white drop-shadow-md group-hover:scale-105 transition-transform" />
          </button>
        </div>

        {/* Revealed message */}
        <div
          className={`mt-8 transition-all duration-700 ${
            isTapped
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="inline-block p-6 rounded-3xl glass-panel-elevated border border-pink-200/80 shadow-xl shadow-pink-500/10 max-w-md">
            <p className="font-serif text-xl sm:text-2xl font-bold text-[#831843] leading-snug">
              &ldquo;You deserve all the happiness in the world. 💗&rdquo;
            </p>
            <p className="text-xs text-pink-600/80 mt-2 font-medium">
              Every single ounce of it, always.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
