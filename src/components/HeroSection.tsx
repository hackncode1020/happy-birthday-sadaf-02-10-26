import React from 'react';
import { Heart, Sparkles, Cake } from 'lucide-react';
import { BirthdayCountdown } from './BirthdayCountdown';

export const HeroSection: React.FC = () => {
  return (
    <section id="top" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden text-center">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-gradient-to-tr from-pink-300/35 via-rose-200/25 to-pink-100/40 rounded-full blur-3xl pointer-events-none -z-10 animate-gentle-glow" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Subtle Bestie Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold tracking-wider uppercase mb-6 border border-pink-200/60 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>A Special Bestie Celebration</span>
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
        </div>

        {/* Large Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#831843] leading-[1.15] mb-4 text-balance">
          Happy Birthday, Sadaf! <span className="inline-block hover:scale-105 transition-transform">🎂💗</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-pink-900/80 font-normal max-w-xl mx-auto mb-6 leading-relaxed">
          Today is all about celebrating you and the happiness you bring into every day.
        </p>

        {/* Elegant October 2nd Countdown Timer */}
        <BirthdayCountdown />

        {/* Date Display Pill */}
        <div className="my-6 inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-2xl glass-panel text-lg sm:text-2xl font-serif font-semibold text-rose-700 border border-pink-200/70 shadow-sm">
          <span>02</span>
          <span className="text-pink-400 font-sans text-sm">●</span>
          <span>10</span>
          <span className="text-pink-400 font-sans text-sm">●</span>
          <span>2003</span>
        </div>

        {/* Floating Accent Icons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-pink-400">
          <span className="inline-flex items-center gap-1.5 text-xs text-pink-600 font-medium">
            <Cake className="w-4 h-4 text-pink-500" /> October 2nd
          </span>
          <span aria-hidden="true" className="text-pink-300">·</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-pink-600 font-medium">
            <Heart className="w-4 h-4 fill-pink-400 text-pink-400" /> Irreplaceable Bestie
          </span>
          <span aria-hidden="true" className="text-pink-300">·</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-pink-600 font-medium">
            <Sparkles className="w-4 h-4 text-pink-500" /> Endless Smiles
          </span>
        </div>
      </div>
    </section>
  );
};
