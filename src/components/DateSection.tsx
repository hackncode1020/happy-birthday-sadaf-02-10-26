import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

export const DateSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative glass-panel rounded-3xl p-8 sm:p-14 text-center border border-pink-200/80 shadow-2xl shadow-pink-500/10 overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-pink-400/20 via-rose-300/15 to-transparent rounded-full blur-3xl pointer-events-none animate-gentle-glow" />

          {/* Minimalist Top Ornament */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold uppercase tracking-widest mb-6">
            <Calendar className="w-3.5 h-3.5 text-pink-500" />
            <span>Timeless Milestone</span>
          </div>

          {/* Large Premium Date Card */}
          <div className="relative inline-block my-2">
            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#831843] via-pink-600 to-rose-700 drop-shadow-xs">
              02 OCTOBER
            </h2>
          </div>

          {/* Chapter Subtitle */}
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-pink-900/85 font-medium italic mt-6 mb-4">
            Another beautiful chapter begins...
          </p>

          <p className="text-sm sm:text-base text-pink-900/60 max-w-md mx-auto leading-relaxed">
            Every year adds more grace, more stories, and even more light to who you are. Here’s to every moment still waiting to unfold.
          </p>

          {/* Subtle Decorative Milestone Badges */}
          <div className="mt-8 pt-6 border-t border-pink-200/50 flex flex-wrap items-center justify-center gap-6 text-xs text-pink-600 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Born October 2, 2003
            </span>
            <span aria-hidden="true" className="text-pink-300">·</span>
            <span>Always Glowing</span>
            <span aria-hidden="true" className="text-pink-300">·</span>
            <span>Cherished Bestie</span>
          </div>
        </div>
      </div>
    </section>
  );
};
