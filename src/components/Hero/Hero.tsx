import { lazy, Suspense, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Hero.css';
import { SOCIAL_LINKS, CONTACT_INFO } from '../../data/contact';
const CoreScene = lazy(() => import('../3d/CoreScene'));

export default function Hero() {
  const heroRef   = useRef<HTMLElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out' });
      gsap.from('.hero-name-line', { opacity: 0, y: 40, duration: 0.9, stagger: 0.08, delay: 0.2, ease: 'power3.out' });
      gsap.from('.hero-tagline', { opacity: 0, y: 20, duration: 0.7, delay: 0.6, ease: 'power3.out' });
      gsap.from('.hero-bio',    { opacity: 0, y: 20, duration: 0.7, delay: 0.75, ease: 'power3.out' });
      gsap.from('.hero-actions',{ opacity: 0, y: 20, duration: 0.7, delay: 0.9, ease: 'power3.out' });
      gsap.from('.hero-socials',{ opacity: 0, y: 20, duration: 0.7, delay: 1.05, ease: 'power3.out' });
      gsap.from('.hero-orb-wrap',{ opacity: 0, scale: 0.85, duration: 1.2, delay: 0.3, ease: 'power3.out' });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="hero section" aria-label="Introduction">
      {/* Background grid */}
      <div className="hero-grid" aria-hidden="true" />

      <div className="container hero-container">
        {/* ── Left text ── */}
        <div ref={textRef} className="hero-text">
          <p className="hero-eyebrow t-label">Hello, I'm</p>

          <h1 className="hero-name t-display" aria-label="Sumit Singh">
            <span className="hero-name-line">SUMIT</span>
            <span className="hero-name-line accent">SINGH</span>
          </h1>

          <p className="hero-tagline">
            Computer Engineering Student&nbsp;&nbsp;·&nbsp;&nbsp;Full-Stack Developer&nbsp;&nbsp;·&nbsp;&nbsp;AI/ML Enthusiast
          </p>

          <p className="hero-bio t-body">
            I build scalable web applications and intelligent systems that solve real-world problems.
          </p>

          <div className="hero-actions">
            <a href="#projects"
               onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
               className="btn btn-primary" data-cursor="EXPLORE">
              View My Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href={CONTACT_INFO.resumeUrl}
              download={CONTACT_INFO.resumeFilename}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              data-cursor="DOWNLOAD"
            >
              Download Résumé
            </a>
          </div>

          <div className="hero-socials">
            {SOCIAL_LINKS.map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                 className="hero-social-link" aria-label={link.label} data-cursor={link.label.toUpperCase()}>
                {link.label === 'GitHub' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                )}
                {link.label === 'LinkedIn' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                )}
                {link.label === 'Email' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M2 7l10 7 10-7"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: 3D Orb ── */}
        <div className="hero-orb-wrap" aria-hidden="true">
          <div className="hero-orb-labels">
            <span className="orb-label orb-label--tl">AI / ML</span>
            <span className="orb-label orb-label--tr">Full-Stack</span>
            <span className="orb-label orb-label--bl">Problem Solving</span>
            <span className="orb-label orb-label--br">Scalable Systems</span>
          </div>
          <Suspense fallback={<div className="hero-orb-fallback" />}>
            <CoreScene />
          </Suspense>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll" aria-hidden="true">
        <span className="t-label">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
