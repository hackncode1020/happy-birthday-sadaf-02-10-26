import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayDistance: number;
  swayOffset: number;
  opacity: number;
  color: string;
}

export const FloatingHearts: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const colors = [
      'rgba(244, 114, 182, 0.45)', // pink-400
      'rgba(251, 113, 133, 0.40)', // rose-400
      'rgba(249, 168, 212, 0.50)', // pink-300
      'rgba(219, 39, 119, 0.35)',  // pink-600
      'rgba(253, 164, 175, 0.45)'  // rose-300
    ];

    // Keep particle count light (16-22 particles)
    const particleCount = Math.min(22, Math.max(12, Math.floor(width / 70)));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 10,
        speedY: Math.random() * 0.5 + 0.35,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayDistance: Math.random() * 20 + 10,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawHeart = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(
        x, y,
        x - size / 2, y,
        x - size / 2, y + topCurveHeight
      );
      // bottom left curve
      ctx.bezierCurveTo(
        x - size / 2, y + (size + topCurveHeight) / 2,
        x, y + (size + topCurveHeight) / 2,
        x, y + size
      );
      // bottom right curve
      ctx.bezierCurveTo(
        x, y + (size + topCurveHeight) / 2,
        x + size / 2, y + (size + topCurveHeight) / 2,
        x + size / 2, y + topCurveHeight
      );
      // top right curve
      ctx.bezierCurveTo(
        x + size / 2, y,
        x, y,
        x, y + topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    let time = 0;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        time += 1;

        for (const p of particles) {
          p.y -= p.speedY;
          const currentX = p.x + Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayDistance;

          if (p.y + p.size < 0) {
            p.y = height + p.size + 10;
            p.x = Math.random() * width;
          }

          drawHeart(currentX, p.y, p.size, p.color, p.opacity);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
