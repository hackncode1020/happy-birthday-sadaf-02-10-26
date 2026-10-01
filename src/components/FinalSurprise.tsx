import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  opacity: number;
  shape: 'heart' | 'circle' | 'rect';
}

export const FinalSurprise: React.FC = () => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const fireConfettiBurst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || 650;

    const colors = ['#EC4899', '#F43F5E', '#FB7185', '#F472B6', '#FDE047', '#FFFFFF'];
    const shapes: ('heart' | 'circle' | 'rect')[] = ['heart', 'circle', 'rect'];

    const count = 65;
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.4;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3.5;
      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 9 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        opacity: 1,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    if (!animFrameRef.current) {
      animateParticles();
    }
  };

  const animateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.16; // gravity
      p.vx *= 0.98;
      p.rotation += p.vRot;
      p.opacity -= 0.011;

      if (p.opacity <= 0) {
        particlesRef.current.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;

      if (p.shape === 'heart') {
        const s = p.size;
        ctx.beginPath();
        const topCurveHeight = s * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, topCurveHeight);
        ctx.bezierCurveTo(-s / 2, (s + topCurveHeight) / 2, 0, (s + topCurveHeight) / 2, 0, s);
        ctx.bezierCurveTo(0, (s + topCurveHeight) / 2, s / 2, (s + topCurveHeight) / 2, s / 2, topCurveHeight);
        ctx.bezierCurveTo(s / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }

      ctx.restore();
    }

    if (particlesRef.current.length > 0) {
      animFrameRef.current = requestAnimationFrame(animateParticles);
    } else {
      animFrameRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleTriggerSurprise = () => {
    setHasStarted(true);

    setTimeout(() => setStage(1), 400); // 02 • 10 • 2003
    setTimeout(() => setStage(2), 1200); // HAPPY BIRTHDAY
    setTimeout(() => setStage(3), 2000); // SADAF 💗
    setTimeout(() => setStage(4), 2800); // Keep smiling...
    setTimeout(() => {
      setStage(5); // Montage & Confetti burst
      fireConfettiBurst();
    }, 3600);
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden transition-colors duration-1000">
      {/* Background Darkening upon Surprise Trigger */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          hasStarted ? 'bg-[#12020a] opacity-95' : 'bg-transparent opacity-0'
        }`}
      />

      {/* Floating Light Blooms & Starlight */}
      {hasStarted && (
        <>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-pink-500/20 blur-[130px] rounded-full pointer-events-none animate-gentle-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/15 blur-[120px] rounded-full pointer-events-none animate-gentle-glow" />
        </>
      )}

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-30"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {!hasStarted ? (
          /* INITIAL STATE */
          <div className="max-w-xl mx-auto glass-panel-elevated rounded-3xl p-8 sm:p-14 border border-pink-200/90 shadow-2xl shadow-pink-500/10">
            <p className="text-xs font-semibold uppercase tracking-widest text-pink-500 mb-3">
              Before you leave...
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#831843] mb-6">
              There is one last memory waiting
            </h2>
            <button
              onClick={handleTriggerSurprise}
              className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-white rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>ONE LAST SURPRISE 🎁</span>
            </button>
          </div>
        ) : (
          /* CINEMATIC REVEAL SEQUENCE */
          <div className="py-6 space-y-8 text-white">
            {/* Stage 1: 02 • 10 • 2003 */}
            <div
              className={`transition-all duration-700 transform ${
                stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-200 font-mono text-sm tracking-[0.25em]">
                <span>02</span>
                <span className="text-pink-400">●</span>
                <span>10</span>
                <span className="text-pink-400">●</span>
                <span>2003</span>
              </div>
            </div>

            {/* Stage 2: HAPPY BIRTHDAY */}
            <div
              className={`transition-all duration-700 transform ${
                stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="text-base sm:text-2xl font-sans tracking-[0.2em] uppercase font-semibold text-pink-300">
                HAPPY BIRTHDAY
              </p>
            </div>

            {/* Stage 3: HUGE SADAF 💗 */}
            <div
              className={`transition-all duration-1000 transform ${
                stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-pink-100 drop-shadow-[0_0_35px_rgba(244,114,182,0.6)]">
                SADAF 💗
              </h2>
            </div>

            {/* Stage 4: Keep smiling... */}
            <div
              className={`transition-all duration-800 transform ${
                stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="max-w-md mx-auto space-y-2">
                <p className="font-serif text-2xl sm:text-3xl text-pink-100 leading-snug font-medium">
                  Keep smiling.
                </p>
                <p className="text-base sm:text-xl text-pink-300/90 font-light italic">
                  The world looks a little better when you do. ✨
                </p>
              </div>
            </div>

            {/* Stage 5: Final Montage with the 3 Photos */}
            <div
              className={`pt-8 transition-all duration-1000 transform ${
                stage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                {['/photos/sadaf-1.jpg', '/photos/sadaf-2.jpg', '/photos/sadaf-3.jpg'].map((src, i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-pink-400/40 shadow-[0_0_20px_rgba(244,114,182,0.25)] bg-pink-900/40"
                  >
                    <img
                      src={src}
                      alt={`Sadaf memory ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `/photos/photo${i + 1}.jpg`;
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={fireConfettiBurst}
                  className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-md shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Celebrate Again</span>
                  <Heart className="w-4 h-4 fill-white text-white" />
                </button>
                <a
                  href="#top"
                  className="px-6 py-3 rounded-full text-sm font-medium text-pink-300 hover:text-white transition-colors"
                >
                  Scroll To Top ↑
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
