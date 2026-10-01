import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Sparkles, Clock, PartyPopper, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthdayToday: boolean;
}

function calculateTimeLeft(forceOctober2nd: boolean): TimeLeft {
  if (forceOctober2nd) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isBirthdayToday: true,
    };
  }

  const now = new Date();
  const currentYear = now.getFullYear();

  // Target: October 2nd of current year (Month is 0-indexed in JS, so 9 is October)
  let targetDate = new Date(currentYear, 9, 2, 0, 0, 0);

  // Check if today is October 2nd
  const isToday = now.getMonth() === 9 && now.getDate() === 2;

  if (isToday) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isBirthdayToday: true,
    };
  }

  // If October 2nd of this year has already passed, target next year's Oct 2nd
  if (now.getTime() > targetDate.getTime() + 24 * 60 * 60 * 1000) {
    targetDate = new Date(currentYear + 1, 9, 2, 0, 0, 0);
  }

  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isBirthdayToday: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isBirthdayToday: false,
  };
}

// Grand exploding celebratory confetti burst
export function fireOctober2ndExplosion() {
  // Center high-energy burst
  confetti({
    particleCount: 90,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#F472B6', '#EC4899', '#FDA4AF', '#FDE047', '#FFFFFF', '#FB7185'],
    ticks: 250,
    gravity: 0.9,
    scalar: 1.2,
  });

  // Left angled cannon
  setTimeout(() => {
    confetti({
      particleCount: 65,
      angle: 60,
      spread: 70,
      origin: { x: 0.05, y: 0.65 },
      colors: ['#FB7185', '#F472B6', '#FBBF24', '#FFFFFF'],
    });
  }, 220);

  // Right angled cannon
  setTimeout(() => {
    confetti({
      particleCount: 65,
      angle: 120,
      spread: 70,
      origin: { x: 0.95, y: 0.65 },
      colors: ['#FB7185', '#F472B6', '#FBBF24', '#FFFFFF'],
    });
  }, 440);

  // Starlight fountain
  setTimeout(() => {
    confetti({
      particleCount: 45,
      spread: 120,
      origin: { y: 0.35 },
      shapes: ['star', 'circle'],
      colors: ['#FFD700', '#FF69B4', '#FFF'],
    });
  }, 650);
}

export const BirthdayCountdown: React.FC = () => {
  // Allow toggling between real-time countdown and October 2nd celebration mode
  const [forceOctober2nd, setForceOctober2nd] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(false));

  const triggerExplosion = useCallback(() => {
    fireOctober2ndExplosion();
  }, []);

  // Update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(forceOctober2nd));
    }, 1000);
    return () => clearInterval(timer);
  }, [forceOctober2nd]);

  // RECURRING CONFETTI ON OCTOBER 2ND:
  // When October 2nd arrives (or celebration mode is active), fire festive recurring confetti explosions every 7 seconds!
  useEffect(() => {
    if (!timeLeft.isBirthdayToday) return;

    // Trigger initial burst
    triggerExplosion();

    // Recurring festive bursts
    const recurringInterval = setInterval(() => {
      // Alternate between gentle streamer showers and corner bursts
      const burstType = Math.random();
      if (burstType > 0.5) {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#F472B6', '#FDE047', '#FB7185'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 45,
            angle: 120,
            spread: 60,
            origin: { x: 0.9, y: 0.7 },
            colors: ['#F472B6', '#FDE047', '#FB7185'],
          });
        }, 300);
      } else {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.5 },
          shapes: ['star', 'circle'],
          colors: ['#FFD700', '#FF69B4', '#FDA4AF', '#FFFFFF'],
        });
      }
    }, 7000);

    return () => clearInterval(recurringInterval);
  }, [timeLeft.isBirthdayToday, triggerExplosion]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="my-8 max-w-xl mx-auto px-4 select-none">
      {/* Decorative header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="h-px w-8 sm:w-12 bg-pink-200" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/80 text-[11px] font-semibold text-pink-700 uppercase tracking-widest">
          <Calendar className="w-3.5 h-3.5 text-pink-500" />
          <span>October 2nd Countdown</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        </div>
        <div className="h-px w-8 sm:w-12 bg-pink-200" />
      </div>

      {timeLeft.isBirthdayToday ? (
        /* Celebratory birthday state on October 2nd */
        <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-2xl shadow-pink-500/35 text-center overflow-hidden border border-pink-300/40 animate-gentle-glow">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-center gap-2 mb-2">
            <PartyPopper className="w-6 h-6 text-yellow-300 animate-bounce" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              It&apos;s October 2nd Today! 🎉
            </h3>
            <PartyPopper className="w-6 h-6 text-yellow-300 animate-bounce" />
          </div>

          <p className="text-sm sm:text-base text-pink-100 font-medium max-w-md mx-auto mb-5 leading-relaxed">
            Happy Birthday, Sadaf! May your day be as pure, glowing, and wonderful as your heart! 🎂💗
          </p>

          {/* Interactive Explode Confetti Button */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={triggerExplosion}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-rose-600 hover:bg-pink-50 font-bold text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
              <span>Explode Confetti Fireworks 🎊</span>
            </button>

            <button
              onClick={() => setForceOctober2nd(false)}
              className="text-[11px] text-pink-200 hover:text-white underline cursor-pointer"
            >
              Back to Countdown
            </button>
          </div>
        </div>
      ) : (
        /* Elegant Countdown Grid */
        <div>
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
            {timeUnits.map((unit, index) => (
              <div
                key={index}
                className="relative p-3 sm:p-4 rounded-2xl glass-panel-elevated border border-pink-200/90 shadow-lg shadow-pink-500/5 flex flex-col items-center justify-center group hover:scale-105 transition-transform"
              >
                {/* Glowing top line */}
                <div className="absolute top-0 inset-x-3 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-60 rounded-full" />

                <span className="font-mono text-2xl sm:text-4xl font-bold text-[#831843] tabular-nums tracking-tight">
                  {unit.value < 10 ? `0${unit.value}` : unit.value}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-pink-600/80 uppercase tracking-wider mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Actions & preview toggle */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={triggerExplosion}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-100/80 hover:bg-pink-200 text-pink-700 text-xs font-semibold border border-pink-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            >
              <PartyPopper className="w-3.5 h-3.5 text-pink-500" />
              <span>Explode Confetti 🎉</span>
            </button>

            <button
              onClick={() => setForceOctober2nd(true)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-pink-600 hover:text-pink-800 bg-white/70 border border-pink-200/60 hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <Flame className="w-3 h-3 text-rose-500" />
              <span>October 2nd Mode</span>
            </button>
          </div>
        </div>
      )}

      {/* Sub-caption */}
      <p className="text-xs sm:text-sm text-pink-800/70 font-medium mt-3 flex items-center justify-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-pink-400" />
        <span>Ticking toward Sadaf&apos;s Grand 23rd Celebration (02.10.2003) 🌸</span>
      </p>
    </div>
  );
};
