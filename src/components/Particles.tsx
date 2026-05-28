import { useEffect, useRef } from 'react';

interface ParticlesProps {
  color: string;
  count?: number;
}

interface Particle {
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Particles({ color, count = 18 }: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 15 + 12,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.15,
    }));

    particles.forEach((p) => {
      const el = document.createElement('div');
      el.className = 'particle absolute rounded-full';
      el.style.cssText = `
        left: ${p.x}%;
        bottom: -10px;
        width: ${p.size}px;
        height: ${p.size}px;
        background: ${color};
        opacity: ${p.opacity};
        animation-duration: ${p.duration}s;
        animation-delay: ${p.delay}s;
        filter: blur(1px);
      `;
      containerRef.current!.appendChild(el);
    });
  }, [color, count]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    />
  );
}
