import { useEffect, useRef } from 'react';
import './ScrollProgress.css';

const SECTIONS = [
  { id: 'hero',           num: '01' },
  { id: 'about',          num: '02' },
  { id: 'experience',     num: '03' },
  { id: 'projects',       num: '04' },
  { id: 'skills',         num: '05' },
  { id: 'certifications', num: '06' },
  { id: 'contact',        num: '07' },
];

export default function ScrollProgress() {
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const sections = SECTIONS.map(s => document.getElementById(s.id));
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = SECTIONS.findIndex(s => s.id === entry.target.id);
          if (idx !== -1 && dotsRef.current[idx]) {
            dotsRef.current[idx]!.classList.toggle('sp-dot--active', entry.isIntersecting);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="scroll-progress" aria-label="Page sections">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          ref={el => { dotsRef.current[i] = el; }}
          className="sp-dot"
          aria-label={`Go to section ${s.num}`}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="sp-num">{s.num}</span>
          <span className="sp-line" />
        </button>
      ))}
    </nav>
  );
}
