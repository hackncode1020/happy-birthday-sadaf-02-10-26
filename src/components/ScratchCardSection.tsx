import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';

export const ScratchCardSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [scratchedPercent, setScratchedPercent] = useState<number>(0);
  const isDrawingRef = useRef<boolean>(false);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match display size
    const width = 360;
    const height = 200;
    canvas.width = width;
    canvas.height = height;

    // Draw shimmering rose gold scratch coating
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#F472B6');
    grad.addColorStop(0.3, '#FDA4AF');
    grad.addColorStop(0.5, '#FCE7F3');
    grad.addColorStop(0.7, '#FB7185');
    grad.addColorStop(1, '#EC4899');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative texture & pattern
    ctx.fillStyle = '#831843';
    ctx.font = 'bold 15px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH HERE WITH FINGER / MOUSE ✨', width / 2, height / 2 - 10);

    ctx.font = '12px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = '#9D174D';
    ctx.fillText('Secret Bestie Message Hidden Below', width / 2, height / 2 + 15);

    setIsRevealed(false);
    setScratchedPercent(0);
  };

  useEffect(() => {
    initCanvas();
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check scratched percentage occasionally
    if (Math.random() > 0.7) {
      checkPercentage();
    }
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    const pct = Math.round((transparent / (pixels.length / 4)) * 100);
    setScratchedPercent(pct);

    if (pct > 35 && !isRevealed) {
      setIsRevealed(true);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  return (
    <section className="py-20 md:py-28 relative text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Interactive Scratch Card</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#831843] mb-3">
          Scratch To Reveal ✨
        </h2>
        <p className="text-sm sm:text-base text-pink-900/70 font-normal mb-8">
          Rub your finger or mouse across the card below to unveil the secret message.
        </p>

        {/* Scratch Card Frame */}
        <div className="relative mx-auto w-full max-w-sm h-52 rounded-3xl overflow-hidden border-2 border-rose-300 shadow-2xl shadow-pink-500/20 bg-gradient-to-br from-[#FFF5F8] to-[#FFE4EE] select-none touch-none">
          {/* Secret Message Underneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0">
            <Heart className="w-6 h-6 fill-pink-500 text-pink-500 mb-2 animate-bounce" />
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#831843] leading-snug">
              &ldquo;If you ever forget how truly rare & wonderful you are, I promise to remind you every single day.&rdquo;
            </h4>
            <p className="font-handwriting text-2xl text-pink-700 font-bold mt-2">
              — Your Bestie 💗
            </p>
          </div>

          {/* Interactive Scratch Canvas on Top */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-700 ${
              isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
        </div>

        {/* Status / Reset */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {isRevealed ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Secret Unveiled! 💗</span>
              <button
                onClick={initCanvas}
                className="ml-2 inline-flex items-center gap-1 text-pink-500 hover:text-pink-700 underline cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Scratch again
              </button>
            </div>
          ) : (
            <p className="text-xs text-pink-700/70 font-medium">
              Scratch progress: {scratchedPercent}%
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
