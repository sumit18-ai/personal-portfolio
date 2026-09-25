import { useEffect, useRef, useState } from 'react';
import { skillGroups } from '../../data/skills';
import './Skills.css';


export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.skill-group');
    if (!items) return;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    items.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 0.06}s`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="skills section" aria-label="Technical skills">
      <div className="container">
        <div className="section-label">
          <span>05 — Technical Skills</span>
        </div>

        <div className="skills-header">
          <h2 className="t-heading">Technical Skills</h2>
          <p className="t-body" style={{ maxWidth: '36ch' }}>
            Technologies I work with to build scalable applications and intelligent systems.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map(group => (
            <div
              key={group.category}
              className={`skill-group ${activeGroup === group.category ? 'skill-group--active' : ''} ${activeGroup && activeGroup !== group.category ? 'skill-group--dim' : ''}`}
              onMouseEnter={() => setActiveGroup(group.category)}
              onMouseLeave={() => setActiveGroup(null)}
            >
              <h3 className="skill-group-title t-label">{group.category}</h3>
              <div className="skill-tags">
                {group.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
