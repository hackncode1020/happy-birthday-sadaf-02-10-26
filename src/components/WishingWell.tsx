import React, { useState } from 'react';
import { Sparkles, Star, Plus, Check } from 'lucide-react';

const SUGGESTIONS = [
  'Endless Happiness & Peace 🌸',
  'Big Career & Life Wins 🚀',
  'Crazy Late Night Talks & Laughs 👭',
  'Dream Trips & Adventures ✈️',
  'Good Health & Unstoppable Energy 🌟',
];

export const WishingWell: React.FC = () => {
  const [selectedWishes, setSelectedWishes] = useState<string[]>([]);
  const [customWish, setCustomWish] = useState<string>('');
  const [showStarlight, setShowStarlight] = useState<boolean>(false);

  const toggleWish = (wish: string) => {
    if (selectedWishes.includes(wish)) {
      setSelectedWishes(selectedWishes.filter((w) => w !== wish));
    } else {
      if (selectedWishes.length >= 3) return;
      setSelectedWishes([...selectedWishes, wish]);
      triggerStar();
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWish.trim()) return;
    if (selectedWishes.length >= 3) return;
    setSelectedWishes([...selectedWishes, customWish.trim()]);
    setCustomWish('');
    triggerStar();
  };

  const triggerStar = () => {
    setShowStarlight(true);
    setTimeout(() => setShowStarlight(false), 1200);
  };

  return (
    <section className="py-20 md:py-28 relative text-center overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>Wishing Fountain</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#831843] mb-3">
          Make 3 Wishes For Your New Year 🌟
        </h2>
        <p className="text-sm sm:text-base text-pink-900/70 font-normal mb-8 max-w-md mx-auto">
          Pick or type your 3 biggest hopes for this chapter. They are sealed and sent to the stars!
        </p>

        {/* Counter badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-pink-200 text-pink-700 text-sm font-semibold shadow-xs mb-8">
          <span>{selectedWishes.length} of 3 Wishes Chosen</span>
          {selectedWishes.length === 3 && <span>✨ (All 3 Locked!)</span>}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-xl mx-auto mb-8">
          {SUGGESTIONS.map((wish, i) => {
            const isSelected = selectedWishes.includes(wish);
            return (
              <button
                key={i}
                onClick={() => toggleWish(wish)}
                disabled={!isSelected && selectedWishes.length >= 3}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25 scale-105'
                    : selectedWishes.length >= 3
                    ? 'bg-pink-50 text-pink-300 border border-pink-100 cursor-not-allowed opacity-60'
                    : 'bg-white/80 text-pink-800 border border-pink-200/80 hover:bg-pink-100 hover:border-pink-300'
                }`}
              >
                {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-pink-400" />}
                <span>{wish}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Wish Input */}
        {selectedWishes.length < 3 && (
          <form onSubmit={handleAddCustom} className="flex items-center justify-center gap-2 max-w-md mx-auto mb-10">
            <input
              type="text"
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              placeholder="Or write your own wish here..."
              className="flex-1 px-4 py-2.5 rounded-full border border-pink-200 bg-white/90 text-sm text-pink-900 placeholder:text-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              disabled={!customWish.trim()}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 cursor-pointer hover:scale-105 transition-all"
            >
              Add Wish
            </button>
          </form>
        )}

        {/* Locked Wishes Card */}
        {selectedWishes.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-pink-200 shadow-xl shadow-pink-500/10 max-w-lg mx-auto text-left relative overflow-hidden">
            {showStarlight && (
              <div className="absolute inset-0 bg-pink-400/20 backdrop-blur-xs flex items-center justify-center animate-fadeIn pointer-events-none">
                <Sparkles className="w-12 h-12 text-pink-500 animate-spin" />
              </div>
            )}
            <h4 className="font-serif text-lg font-bold text-[#831843] mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>Sadaf&apos;s Locked Wishes for 2026-2027</span>
            </h4>
            <div className="space-y-3">
              {selectedWishes.map((w, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/80 border border-pink-100"
                >
                  <span className="text-sm text-pink-900 font-medium">
                    {idx + 1}. {w}
                  </span>
                  <button
                    onClick={() => toggleWish(w)}
                    className="text-xs text-pink-400 hover:text-pink-600 ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
