import React, { useState } from 'react';
import { Sparkles, Heart, Gift } from 'lucide-react';

interface BalloonItem {
  id: number;
  color: string;
  gradient: string;
  shadowColor: string;
  wish: string;
  emoji: string;
  popped: boolean;
}

const INITIAL_BALLOONS: BalloonItem[] = [
  {
    id: 1,
    color: '#FB7185',
    gradient: 'from-rose-400 to-pink-500',
    shadowColor: 'rgba(244, 63, 94, 0.4)',
    wish: 'Never lose that infectious, contagious smile! It brightens the universe. 🌸',
    emoji: '🌸',
    popped: false,
  },
  {
    id: 2,
    color: '#F472B6',
    gradient: 'from-pink-400 to-rose-400',
    shadowColor: 'rgba(236, 72, 153, 0.4)',
    wish: 'You have the rarest talent of turning any bad day into a memorable one. ✨',
    emoji: '✨',
    popped: false,
  },
  {
    id: 3,
    color: '#FBBF24',
    gradient: 'from-amber-300 to-pink-400',
    shadowColor: 'rgba(251, 191, 36, 0.4)',
    wish: 'So genuinely proud of who you are and everything you are achieving! 💫',
    emoji: '💫',
    popped: false,
  },
  {
    id: 4,
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600',
    shadowColor: 'rgba(190, 24, 93, 0.4)',
    wish: 'Always in your corner, through every high, low, and crazy adventure! 💗',
    emoji: '👭',
    popped: false,
  },
  {
    id: 5,
    color: '#E879F9',
    gradient: 'from-purple-400 to-pink-500',
    shadowColor: 'rgba(232, 121, 249, 0.4)',
    wish: 'May this new year of your life be filled with pure joy, peace and dream fulfillment! 🎂',
    emoji: '🎂',
    popped: false,
  },
];

export const BalloonPopSection: React.FC = () => {
  const [balloons, setBalloons] = useState<BalloonItem[]>(INITIAL_BALLOONS);
  const [activeWish, setActiveWish] = useState<string | null>(null);

  const popCount = balloons.filter((b) => b.popped).length;

  const handlePop = (id: number) => {
    setBalloons((prev) =>
      prev.map((b) => {
        if (b.id === id && !b.popped) {
          setActiveWish(b.wish);
          return { ...b, popped: true };
        }
        return b;
      })
    );
  };

  const resetBalloons = () => {
    setBalloons(INITIAL_BALLOONS);
    setActiveWish(null);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Interactive Mini-Game</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#831843] mb-3">
          Pop The Birthday Balloons! 🎈
        </h2>
        <p className="text-sm sm:text-base text-pink-900/70 font-normal max-w-md mx-auto mb-8">
          Tap each balloon to pop it and discover a secret bestie wish hidden inside.
        </p>

        {/* Counter */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 text-pink-700 text-xs font-semibold shadow-xs mb-10">
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
          <span>
            {popCount} of {balloons.length} Wishes Unlocked
          </span>
        </div>

        {/* Floating Balloons Cluster */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 my-4">
          {balloons.map((balloon, index) => {
            const isPopped = balloon.popped;
            return (
              <div
                key={balloon.id}
                className="flex flex-col items-center select-none"
                style={{
                  animationName: !isPopped ? 'softFloat' : 'none',
                  animationDuration: `${3 + (index % 3)}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${index * 0.4}s`,
                }}
              >
                {!isPopped ? (
                  <button
                    onClick={() => handlePop(balloon.id)}
                    aria-label={`Pop balloon ${balloon.id}`}
                    className="group relative cursor-pointer active:scale-90 transition-transform duration-200"
                  >
                    {/* Balloon Body */}
                    <div
                      className={`w-20 h-26 sm:w-24 sm:h-32 rounded-full bg-gradient-to-t ${balloon.gradient} shadow-lg relative flex items-center justify-center`}
                      style={{
                        borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                        boxShadow: `0 15px 25px -5px ${balloon.shadowColor}`,
                      }}
                    >
                      {/* Shine reflection */}
                      <div className="absolute top-3 left-4 w-4 h-8 bg-white/40 rounded-full rotate-[-25deg] blur-[1px]" />
                      <span className="text-white text-xl sm:text-2xl font-bold drop-shadow-md">
                        {balloon.emoji}
                      </span>
                    </div>

                    {/* Knot and String */}
                    <div className="w-2.5 h-2 bg-pink-600 mx-auto rounded-xs -mt-0.5" />
                    <div className="w-0.5 h-10 sm:h-12 bg-pink-300/80 mx-auto" />
                  </button>
                ) : (
                  /* Popped State */
                  <div className="w-20 h-26 sm:w-24 sm:h-32 flex flex-col items-center justify-center animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-600 shadow-xs">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                    <span className="text-[11px] font-semibold text-pink-600 mt-2">
                      Popped! ✨
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Revealed Wish Box */}
        {activeWish && (
          <div className="mt-8 max-w-md mx-auto p-6 rounded-3xl glass-panel-elevated border border-pink-300/80 shadow-xl shadow-pink-500/10 animate-fadeIn">
            <p className="text-xs font-semibold uppercase tracking-wider text-pink-500 mb-1">
              Secret Note Revealed:
            </p>
            <p className="font-serif text-lg sm:text-xl font-bold text-[#831843] leading-snug">
              &ldquo;{activeWish}&rdquo;
            </p>
          </div>
        )}

        {/* All popped completion celebrate */}
        {popCount === balloons.length && (
          <div className="mt-8 space-y-3 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm shadow-lg shadow-pink-500/25">
              <Gift className="w-4 h-4" />
              <span>Woohoo! All 5 birthday surprises unlocked for Sadaf! 🎉</span>
            </div>
            <div>
              <button
                onClick={resetBalloons}
                className="text-xs text-pink-500 hover:text-pink-700 underline font-medium cursor-pointer"
              >
                Inflate balloons again 🎈
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
