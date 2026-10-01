import React from 'react';
import { HeartHandshake } from 'lucide-react';

export const PersonalMessage: React.FC = () => {
  return (
    <section id="message" className="py-12 md:py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative glass-panel rounded-3xl p-8 sm:p-12 md:p-14 border border-pink-200/60 shadow-xl shadow-pink-500/5 text-center">
          {/* Subtle Decorative Crest */}
          <div className="mx-auto w-12 h-12 rounded-full bg-pink-100/90 flex items-center justify-center text-pink-500 mb-6 shadow-xs">
            <HeartHandshake className="w-6 h-6" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-pink-500 mb-4">
            A Note From The Heart
          </p>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#831843] mb-8">
            To Someone Truly Irreplaceable
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-pink-950/85 leading-relaxed font-normal max-w-xl mx-auto">
            <p>
              Some people enter our lives and somehow make ordinary moments feel special.
              You are one of those people, Sadaf.
            </p>

            <p>
              On your special day, I just want you to know how genuinely special you are.
              Keep smiling, keep shining, and keep being the beautiful person you are.
            </p>

            <p>
              May this year bring you endless happiness, beautiful memories and everything your heart wishes for.
            </p>

            <div className="pt-4">
              <p className="font-serif text-xl sm:text-2xl font-bold text-rose-700 italic">
                Happy Birthday, Bestie! 💗
              </p>
            </div>
          </div>

          {/* Decorative bottom hairline */}
          <div className="mt-8 pt-6 border-t border-pink-100 flex items-center justify-center gap-2 text-xs text-pink-400">
            <span>✨</span>
            <span className="tracking-wider">Cherished Memories</span>
            <span>✨</span>
          </div>
        </div>
      </div>
    </section>
  );
};
