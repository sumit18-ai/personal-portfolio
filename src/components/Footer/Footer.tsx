import { CONTACT_INFO } from '../../data/contact';
import './Footer.css';

const NAV_LINKS = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Certifications', 'Contact'];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(`#${id.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <a href="#hero"
             onClick={e => { e.preventDefault(); scrollTo('hero'); }}
             className="footer-monogram" aria-label="Sumit Singh">
            S<span className="accent">S</span>
          </a>
          <span className="footer-name">Sumit Singh</span>
        </div>

        {/* Nav */}
        <nav className="footer-nav" aria-label="Footer navigation">
          {NAV_LINKS.map(link => (
            <a key={link}
               href={`#${link.toLowerCase()}`}
               className="footer-nav-link"
               onClick={e => { e.preventDefault(); scrollTo(link); }}>
              {link}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="footer-socials">
          <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer"
             className="footer-social" aria-label="GitHub">GH</a>
          <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer"
             className="footer-social" aria-label="LinkedIn">IN</a>
          <a href={`mailto:${CONTACT_INFO.email}`} className="footer-social" aria-label="Email">@</a>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <span className="t-label">Designed &amp; Built by Sumit Singh</span>
          <span className="t-label">{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
