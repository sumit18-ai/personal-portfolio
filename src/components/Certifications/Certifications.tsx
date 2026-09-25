import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certifications } from '../../data/certifications';
import './Certifications.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Certifications Component: Clean, high-density technical register.
 * Provides direct PDF verification access to official accredited certificates.
 */
export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cert-row', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cert-table', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="certifications section" aria-label="Certifications and credentials">
      <div className="container certifications-container">
        <div className="section-label">
          <span>06 — Certifications</span>
        </div>

        <div className="cert-header">
          <div>
            <h2 className="t-heading">Verified Technical Credentials</h2>
            <p className="t-body cert-lead">
              Official industry certifications spanning Artificial Intelligence, Operating Systems, Machine Learning, and Software Engineering.
            </p>
          </div>
          <div className="cert-telemetry-badge" aria-hidden="true">
            <span className="cert-telemetry-count">{certifications.length.toString().padStart(2, '0')}</span>
            <span className="cert-telemetry-label">ACCREDITED_CREDENTIALS</span>
          </div>
        </div>

        {/* Technical Register Table */}
        <div className="cert-table" role="list">
          <div className="cert-table-header" aria-hidden="true">
            <span className="col-idx">#</span>
            <span className="col-cert">Credential &amp; Issuing Authority</span>
            <span className="col-domain">Specialization Domain</span>
            <span className="col-code">Reference / Cert ID</span>
            <span className="col-link">Certificate</span>
          </div>

          {certifications.map((cert, i) => (
            <div
              key={cert.id}
              className="cert-row"
              role="listitem"
            >
              {/* Index */}
              <span className="cert-cell-idx t-label">
                {(i + 1).toString().padStart(2, '0')}
              </span>

              {/* Title & Authority */}
              <div className="cert-cell-info">
                <h3 className="cert-name">{cert.title}</h3>
                <div className="cert-provider-row">
                  <span className="cert-provider-pill">{cert.provider}</span>
                  {cert.issueDate && <span className="cert-date-text">· {cert.issueDate}</span>}
                </div>
              </div>

              {/* Domain */}
              <div className="cert-cell-domain">
                <span className="cert-domain-text">{cert.domain}</span>
              </div>

              {/* Technical Code */}
              <div className="cert-cell-code">
                <span className="cert-code-tag">{cert.code}</span>
              </div>

              {/* Action / PDF Link */}
              <div className="cert-cell-action">
                {cert.pdfPath ? (
                  <div className="cert-btn-group">
                    <a
                      href={cert.pdfPath}
                      download={cert.pdfPath.endsWith('.png') ? `${cert.id}_certificate.png` : `${cert.id}_certificate.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-pdf-btn cert-download-btn"
                      data-cursor="DOWNLOAD"
                      title={`Download ${cert.title} Certificate`}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M7 1.5v8m0 0l-3-3m3 3l3-3M2 12.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Download</span>
                    </a>
                    <a
                      href={cert.pdfPath.endsWith('.png') ? cert.pdfPath : `${cert.pdfPath}?view=1`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-pdf-btn cert-view-btn"
                      data-cursor="VIEW_CERT"
                      title={`View ${cert.title} Certificate in browser`}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>View</span>
                    </a>
                  </div>
                ) : (
                  <span className="cert-verified-status">
                    <span className="cert-status-dot" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
