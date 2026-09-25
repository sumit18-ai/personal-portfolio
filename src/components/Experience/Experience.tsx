import { useEffect, useRef } from 'react';
import { experiences } from '../../data/experience';
import './Experience.css';

/**
 * Experience Component: Redesigned wide two-column layout.
 * Left: Company, Role, Period, Status.
 * Right: Concise responsibility and achievement bullet points.
 * Optimized for full comfort across 1440–1920px viewports.
 */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const entries = sectionRef.current?.querySelectorAll('.exp-card');
    if (!entries) return;

    const observer = new IntersectionObserver(
      (items) => {
        items.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    entries.forEach((el, index) => {
      (el as HTMLElement).style.transitionDelay = `${index * 0.12}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience section" aria-label="Teaching experience">
      <div className="container experience-container">
        <div className="section-label">
          <span>03 — Experience</span>
        </div>

        <div className="exp-section-header">
          <div>
            <h2 className="t-heading">Teaching &amp; Academic Leadership</h2>
            <p className="t-body exp-lead">
              Applying first-principles thinking, structured pedagogy, and continuous assessment to mentor students in STEM disciplines.
            </p>
          </div>
          <div className="exp-telemetry-pill" aria-hidden="true">
            <span className="exp-telemetry-dot" />
            <span className="exp-telemetry-text">ACTIVE_ROLE // 2+ YEARS</span>
          </div>
        </div>

        <div className="exp-wide-list" role="list">
          {experiences.map((exp) => (
            <article key={exp.id} className="exp-card" role="listitem">
              {/* Left Column: Company, Role, Period */}
              <div className="exp-col-left">
                <div className="exp-header-meta">
                  <span className="exp-ref-code t-label">{exp.refCode}</span>
                  {exp.current && (
                    <span className="exp-status-badge">
                      <span className="exp-status-ping" />
                      Active
                    </span>
                  )}
                </div>

                <h3 className="exp-company-name">{exp.company}</h3>
                <p className="exp-role-title">{exp.role}</p>
                <div className="exp-period-wrap">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span className="exp-period-text">{exp.period}</span>
                </div>

                {/* Skills tags */}
                {exp.skills && (
                  <div className="exp-skills-list">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="exp-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: 3–5 Responsibility & Achievement Bullets */}
              <div className="exp-col-right">
                <h4 className="exp-responsibilities-title t-label">Key Responsibilities &amp; Impact</h4>
                <ul className="exp-bullet-list">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="exp-bullet-item">
                      <span className="exp-bullet-marker" aria-hidden="true" />
                      <span className="exp-bullet-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
