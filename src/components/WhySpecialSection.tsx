import React, { useState, useEffect, useRef } from 'react';
import { Smile, Sparkles, Heart, Star } from 'lucide-react';

interface SpecialItem {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgGrad: string;
  borderColor: string;
}

const ITEMS: SpecialItem[] = [
  {
    number: '01',
    title: 'That Smile 💗',
    description: 'The kind that makes ordinary moments better.',
    icon: <Smile className="w-6 h-6 text-pink-500" />,
    bgGrad: 'from-pink-50/90 via-white to-pink-50/50',
    borderColor: 'border-pink-200/90',
  },
  {
    number: '02',
    title: 'That Energy ✨',
    description: 'Impossible to replace.',
    icon: <Sparkles className="w-6 h-6 text-rose-500" />,
    bgGrad: 'from-rose-50/90 via-white to-rose-50/50',
    borderColor: 'border-rose-200/90',
  },
  {
    number: '03',
    title: 'That Heart 🌸',
    description: 'Beautiful in ways words cannot fully explain.',
    icon: <Heart className="w-6 h-6 text-pink-600 fill-pink-100" />,
    bgGrad: 'from-pink-50/90 via-white to-pink-50/50',
    borderColor: 'border-pink-200/90',
  },
  {
    number: '04',
    title: 'Simply You 🎀',
    description: "And honestly, that's more than enough.",
    icon: <Star className="w-6 h-6 text-amber-500 fill-amber-100" />,
    bgGrad: 'from-amber-50/80 via-white to-pink-50/50',
    borderColor: 'border-amber-200/80',
  },
];

export const WhySpecialSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisibleIndices([0, 1, 2, 3]);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal cards sequentially one by one
            ITEMS.forEach((_, idx) => {
              setTimeout(() => {
                setVisibleIndices((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
              }, idx * 260);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="why-special" className="py-16 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-18">
          <p className="text-xs font-semibold uppercase tracking-widest text-pink-500 mb-2">
            Cherished Bestie Qualities
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#831843] mb-4">
            Just a few things that make you... YOU 💗
          </h2>
          <p className="text-sm sm:text-base text-pink-900/70 font-normal">
            Some qualities can never be duplicated. You carry them effortlessly.
          </p>
        </div>

        {/* 4 Cards Grid - Revealed Separately */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ITEMS.map((item, idx) => {
            const isVisible = visibleIndices.includes(idx);
            return (
              <div
                key={idx}
                className={`group relative p-8 rounded-3xl bg-gradient-to-b ${item.bgGrad} border ${item.borderColor} shadow-lg shadow-pink-500/5 hover:shadow-2xl hover:shadow-pink-500/15 transition-all duration-700 transform flex flex-col justify-between hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-sm font-semibold tracking-wider text-pink-400">
                      {item.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-pink-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#831843] mb-3 group-hover:text-pink-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-pink-950/75 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-8 pt-4 border-t border-pink-100/70 flex items-center justify-between text-xs text-pink-400 font-medium">
                  <span>Forever Bestie</span>
                  <span className="group-hover:scale-125 transition-transform">🌸</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
