import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf  = useRef<number>(0);

  useEffect(() => {
    // Don't activate on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', move, { passive: true });

    // Animate ring with lerp
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${ring.current.x + 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    // Interactive targets
    const handleEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const cursorLabel = el.dataset.cursor || '';
      setLabel(cursorLabel);
      ringRef.current?.classList.add('cursor-ring--active');
      if (cursorLabel) ringRef.current?.classList.add('cursor-ring--label');
    };
    const handleLeave = () => {
      setLabel('');
      ringRef.current?.classList.remove('cursor-ring--active', 'cursor-ring--label');
    };

    const targets = document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], .project-card, [data-cursor]'
    );
    targets.forEach(t => {
      t.addEventListener('mouseenter', handleEnter);
      t.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf.current);
      targets.forEach(t => {
        t.removeEventListener('mouseenter', handleEnter);
        t.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true">{label}</div>
    </>
  );
}
