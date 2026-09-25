import { useEffect, useRef } from 'react';
import { projects } from '../../data/projects';
import FraudDashboard from './FraudDashboard';
import './Projects.css';

const OTHER_PROJECTS = projects.filter(p => !p.featured);

function TechTag({ tech }: { tech: string }) {
  return <span className="tech-tag">{tech}</span>;
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <article className="project-card" data-cursor="VIEW">
      <div className="project-card-inner">
        {/* Technical Header */}
        <div className="project-card-header">
          <div className="project-card-meta">
            <span className="project-sys-id">{project.sysId}</span>
            <span className="project-category-tag">{project.category}</span>
          </div>
          {project.statusTag && (
            <span className="project-status-pill">{project.statusTag}</span>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-subtitle">{project.subtitle}</p>

        {/* Description */}
        <p className="project-card-desc">{project.description}</p>

        {/* System Architecture Highlights */}
        {project.architecture && (
          <div className="project-card-arch">
            <span className="project-arch-label t-label">Architecture Highlights</span>
            <ul className="project-arch-list">
              {project.architecture.map((item, idx) => (
                <li key={idx} className="project-arch-item">
                  <span className="project-arch-marker" aria-hidden="true" />
                  <span className="project-arch-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer: Tech Stack & Link */}
        <div className="project-card-footer">
          <div className="project-card-tech">
            {project.tech.map(t => (
              <TechTag key={t} tech={t} />
            ))}
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              aria-label={`View ${project.title} on GitHub`}
              data-cursor="GITHUB"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.featured-project, .project-card');
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
      { threshold: 0.08 }
    );

    items.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
      obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const featured = projects.find(p => p.featured)!;

  return (
    <section id="projects" ref={sectionRef} className="projects section" aria-label="Selected engineering work">
      <div className="container projects-container">
        <div className="section-label">
          <span>04 — Selected Work</span>
        </div>

        <div className="projects-intro">
          <div>
            <h2 className="t-heading">Selected Engineering Systems</h2>
            <p className="t-body projects-lead">
              A curated portfolio of software architectures, machine learning models, and real-time systems.
            </p>
          </div>
          <div className="projects-telemetry-badge" aria-hidden="true">
            <span className="projects-telemetry-dot" />
            <span className="projects-telemetry-text">6_SYSTEMS_INDEXED</span>
          </div>
        </div>

        {/* Featured: FraudShieldAI */}
        <article className="featured-project" aria-label="Featured project: FraudShieldAI">
          <div className="featured-left">
            <div className="featured-meta">
              <span className="project-category t-label">{featured.category}</span>
              <span className="featured-badge">Featured System</span>
            </div>

            <h3 className="featured-title">{featured.title}</h3>
            <p className="featured-subtitle t-label">
              {featured.subtitle}
            </p>

            <p className="t-body featured-desc">
              {featured.description}
            </p>

            {/* Metrics */}
            {featured.metrics && (
              <div className="featured-metrics">
                {featured.metrics.map(m => (
                  <div key={m.label} className="featured-metric">
                    <span className="featured-metric-value">{m.value}</span>
                    <span className="featured-metric-label t-label">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="featured-tech">
              {featured.tech.map(t => (
                <TechTag key={t} tech={t} />
              ))}
            </div>

            <div className="featured-links">
              <a href={featured.github || '#'} target="_blank" rel="noopener noreferrer"
                 className="btn btn-outline" data-cursor="GITHUB">
                View Source Code
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="featured-right">
            <FraudDashboard />
          </div>
        </article>

        {/* Other Projects: High-Density 2-Column Systems Grid */}
        <div className="other-projects-heading">
          <h3 className="t-heading other-heading-text">Platform &amp; ML Architectures</h3>
          <span className="other-heading-rule" aria-hidden="true" />
        </div>

        <div className="projects-grid">
          {OTHER_PROJECTS.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
