import { useEffect, useRef } from 'react';

/**
 * ParticlesBackground (Quiet Command)
 * 50 microscopic particles (0.6 - 1.4px) floating calmly with low opacity (0.08 - 0.20).
 * Atmospheric, meditative, and non-distracting.
 */
export default function ParticlesBackground({ quantity = 55, color = '#F5F5F2' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize 40-60 particles
    const particles = [];
    for (let i = 0; i < quantity; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18, // very slow drift
        vy: (Math.random() - 0.5) * 0.18,
        size: Math.random() * 0.8 + 0.6, // 0.6px to 1.4px
        alpha: Math.random() * 0.12 + 0.08, // 0.08 to 0.20
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle radial glow in upper-center (3-4% opacity)
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.35,
        50,
        width / 2,
        height * 0.35,
        width * 0.45
      );
      gradient.addColorStop(0, 'rgba(159, 232, 227, 0.035)');
      gradient.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [quantity, color]);

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />;
}
