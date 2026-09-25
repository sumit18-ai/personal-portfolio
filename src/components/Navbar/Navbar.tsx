import { useEffect, useRef, useState } from 'react';
import { CONTACT_INFO } from '../../data/contact';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Home',           href: '#hero' },
  { label: 'About',          href: '#about' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState('hero');
  const [menuOpen,   setMenuOpen]   = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const sections = NAV_ITEMS.map(n => document.querySelector(n.href));
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header ref={navRef}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}
      role="banner">
      <div className="navbar-inner container">
        {/* Brand */}
        <a href="#hero" className="navbar-brand" onClick={e => { e.preventDefault(); scrollTo('#hero'); }}
           aria-label="Sumit Singh – home">
          <span className="navbar-monogram">S<span className="accent">S</span></span>
          <span className="navbar-name">Sumit Singh</span>
        </a>

        {/* Desktop nav */}
        <nav className="navbar-links" aria-label="Main navigation">
          {NAV_ITEMS.map(item => (
            <a key={item.href}
               href={item.href}
               className={`navbar-link ${active === item.href.slice(1) ? 'navbar-link--active' : ''}`}
               onClick={e => { e.preventDefault(); scrollTo(item.href); }}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="navbar-right">
          <a
            href={CONTACT_INFO.resumeUrl}
            download={CONTACT_INFO.resumeFilename}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline navbar-resume"
            data-cursor="DOWNLOAD"
          >
            Download Résumé
          </a>
          <button className="navbar-hamburger" aria-label="Toggle menu" aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(m => !m)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="navbar-mobile" aria-hidden={!menuOpen}>
        {NAV_ITEMS.map(item => (
          <a key={item.href}
             href={item.href}
             className={`navbar-mobile-link ${active === item.href.slice(1) ? 'navbar-mobile-link--active' : ''}`}
             onClick={e => { e.preventDefault(); scrollTo(item.href); }}
             tabIndex={menuOpen ? 0 : -1}>
            {item.label}
          </a>
        ))}
        <a
          href={CONTACT_INFO.resumeUrl}
          download={CONTACT_INFO.resumeFilename}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ marginTop: '1rem' }}
        >
          Download Résumé
        </a>
      </div>
    </header>
  );
}
