import React, { useEffect, useRef } from 'react';

/**
 * ParticleField (Kite Garden aesthetic)
 * 55-75 microscopic particles (0.5 - 1.4px) floating calmly with low opacity (0.06 - 0.16).
 * Soft organic drift, gentle mouse repulsion, subtle incident responsiveness.
 * Behind all content, never restarts on route change.
 */
export default function ParticleField({
  quantity = 65,
  color,
  isIncident = false,
  theme = 'light',
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Default color based on theme if not explicitly provided
  const particleColor = color || (theme === 'dark' ? '#F5F5F2' : '#27272A');

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

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Responsive quantity (65 desktop, 30 mobile)
    const count = window.innerWidth < 768 ? 30 : quantity;

    // Initialize particles with soft organic velocities
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22, // 0.08 - 0.35 drift
        vy: (Math.random() - 0.5) * 0.22,
        size: Math.random() * 0.9 + 0.5, // 0.5px to 1.4px
        baseAlpha: Math.random() * 0.08 + 0.04, // refined soft alpha
        currentAlpha: Math.random() * 0.08 + 0.04,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle atmospheric radial gradient in center
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.35,
        40,
        width / 2,
        height * 0.35,
        width * 0.5
      );
      if (theme === 'dark') {
        gradient.addColorStop(0, isIncident ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.025)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradient.addColorStop(0, isIncident ? 'rgba(220, 38, 38, 0.025)' : 'rgba(0, 0, 0, 0.015)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const mouseRadius = 120; // 80 - 140px soft influence

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * 0.18;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            p.currentAlpha = Math.min(0.20, p.baseAlpha + 0.03);
          } else {
            p.currentAlpha += (p.baseAlpha - p.currentAlpha) * 0.05;
          }
        } else {
          p.currentAlpha += (p.baseAlpha - p.currentAlpha) * 0.05;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Smooth wrap
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = isIncident ? Math.min(0.22, p.currentAlpha + 0.03) : p.currentAlpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [quantity, particleColor, isIncident, theme]);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
