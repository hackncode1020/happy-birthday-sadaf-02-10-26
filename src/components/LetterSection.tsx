import React, { useState, useEffect, useRef } from 'react';
import { Mail, MailOpen, RotateCcw, Heart } from 'lucide-react';

const LETTER_BODY = `Dear Sadaf,

Today isn't just another date on the calendar.

It's the day someone genuinely special came into this world.

I hope this new chapter brings you countless reasons to smile, beautiful memories to keep, people who truly value you, and everything your heart quietly wishes for.

Keep being the wonderful person you are.

And most importantly...

never stop smiling.

Happy Birthday, Sadaf. 💗`;

const SIGNATURE = '— Your Bestie ✨';

export const LetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showSignature, setShowSignature] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect logic
  useEffect(() => {
    if (!isExpanded) {
      setTypedText('');
      setIsTyping(false);
      setShowSignature(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTypedText(LETTER_BODY);
      setIsTyping(false);
      setShowSignature(true);
      return;
    }

    setIsTyping(true);
    let index = 0;

    const typeNextChar = () => {
      if (index < LETTER_BODY.length) {
        const char = LETTER_BODY[index];
        index++;
        setTypedText(LETTER_BODY.slice(0, index));

        let delay = 24 + Math.random() * 12; // Natural human variation
        if (char === ',') {
          delay = 180;
        } else if (char === '.' || char === '!' || char === '?') {
          delay = 320;
        } else if (char === '\n') {
          delay = 240;
        }

        timeoutRef.current = setTimeout(typeNextChar, delay);
      } else {
        setIsTyping(false);
        // Pause briefly before handwriting signature
        timeoutRef.current = setTimeout(() => {
          setShowSignature(true);
        }, 500);
      }
    };

    timeoutRef.current = setTimeout(typeNextChar, 400);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isExpanded]);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    // Sequence: Flap opens (0-400ms), paper slides out & expands (400-800ms)
    setTimeout(() => {
      setIsExpanded(true);
    }, 500);
  };

  const handleCloseEnvelope = () => {
    setIsExpanded(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleReplay = () => {
    setTypedText('');
    setShowSignature(false);
    setIsExpanded(false);
    setTimeout(() => {
      setIsExpanded(true);
    }, 150);
  };

  return (
    <section id="letter" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-pink-500 mb-2">
            Just Between Best Friends
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#831843] mb-3">
            A Letter For Sadaf
          </h2>
          <p className="text-sm sm:text-base text-pink-900/70 font-normal">
            Take a quiet moment. Break the seal to read what was written for you.
          </p>
        </div>

        {/* Envelope & Letter Frame */}
        <div className="relative mx-auto max-w-xl">
          {!isExpanded ? (
            /* CLOSED ENVELOPE */
            <div
              className={`relative mx-auto w-full aspect-[16/11] max-w-md bg-gradient-to-b from-[#FFF5F8] to-[#FFE8F0] rounded-2xl border-2 border-pink-200/90 shadow-2xl shadow-pink-500/15 flex flex-col items-center justify-center p-6 text-center transition-all duration-500 ${
                isOpen ? 'scale-105 opacity-90' : 'hover:scale-[1.02]'
              }`}
            >
              {/* Envelope Flap Simulation */}
              <div
                className={`absolute top-0 left-0 right-0 h-1/2 bg-[#FFDFEB] border-b border-pink-300/40 rounded-t-2xl origin-top transition-transform duration-500 flex items-center justify-center ${
                  isOpen ? '-rotate-x-180 opacity-40' : ''
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              />

              {/* Envelope Stamp / Seal */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 mb-4 animate-soft-float">
                <Heart className="w-8 h-8 fill-white/90 text-white" />
              </div>

              {/* Envelope Label */}
              <div className="relative z-10 mb-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#831843] mb-1">
                  💌 A little letter for Sadaf
                </h3>
                <p className="text-xs text-pink-700/70 font-sans tracking-wide">
                  To: The most wonderful bestie · October 2nd
                </p>
              </div>

              {/* Open Button */}
              <button
                onClick={handleOpenEnvelope}
                className="relative z-10 inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-md shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>OPEN IT 💗</span>
              </button>
            </div>
          ) : (
            /* OPEN LETTER STATIONERY WITH LIVE HANDWRITING REVEAL */
            <div className="relative rounded-3xl bg-[#FFFDF9] p-8 sm:p-12 md:p-14 border border-rose-200/90 shadow-2xl shadow-pink-500/15 transition-all duration-500 animate-fadeIn">
              {/* Top Controls Bar */}
              <div className="flex items-center justify-between border-b border-rose-100 pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-xs font-serif font-bold">
                    S
                  </div>
                  <span className="font-serif text-sm italic text-pink-900/60">
                    Written with genuine care
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {!isTyping && (
                    <button
                      onClick={handleReplay}
                      title="Replay handwriting"
                      className="p-1.5 rounded-full text-pink-500 hover:text-pink-700 hover:bg-pink-50 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={handleCloseEnvelope}
                    className="inline-flex items-center gap-1.5 text-xs text-pink-500 hover:text-pink-700 font-medium cursor-pointer transition-colors"
                  >
                    <MailOpen className="w-3.5 h-3.5" />
                    <span>Fold letter</span>
                  </button>
                </div>
              </div>

              {/* Handwritten Letter Body (Character by Character Live Stream) */}
              <div className="min-h-[380px] font-handwriting text-2xl sm:text-3xl text-pink-950/90 leading-relaxed tracking-wide whitespace-pre-line select-text">
                {typedText}
                {isTyping && (
                  <span className="inline-block w-2 h-6 bg-pink-500 ml-0.5 align-middle animate-cursor" />
                )}
              </div>

              {/* Live Handwritten Signature Reveal */}
              <div
                className={`mt-8 pt-4 transition-all duration-700 font-handwriting text-3xl sm:text-4xl text-[#831843] flex items-center gap-2 ${
                  showSignature
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-3 pointer-events-none'
                }`}
              >
                <span>{SIGNATURE}</span>
              </div>

              {/* Stationery Watermark Footer */}
              <div className="mt-10 pt-4 border-t border-rose-100/70 flex items-center justify-center gap-2 text-xs text-pink-400 font-sans">
                <Heart className="w-3.5 h-3.5 fill-pink-300 text-pink-300" />
                <span className="text-[11px] uppercase tracking-widest">
                  Forever grateful for our friendship
                </span>
                <Heart className="w-3.5 h-3.5 fill-pink-300 text-pink-300" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
