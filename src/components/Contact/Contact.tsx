import { useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_INFO } from '../../data/contact';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

/* Small abstract contact visual */
function ContactOrb() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.2;
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.4) * 0.1;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <torusGeometry args={[1.0, 0.007, 6, 100]} />
        <meshStandardMaterial color="#725CFF" emissive="#725CFF" emissiveIntensity={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.7, 0.005, 6, 100]} />
        <meshStandardMaterial color="#5A8AFF" emissive="#5A8AFF" emissiveIntensity={0.6} />
      </mesh>
      <Sparkles count={30} scale={3} size={0.6} speed={0.2} color="#8B7CFF" opacity={0.5} />
    </group>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-heading', start: 'top 82%' },
      });
      gsap.from('.contact-body', {
        y: 30, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-body', start: 'top 82%' },
      });
      gsap.from('.contact-actions', {
        y: 25, opacity: 0, duration: 0.7, delay: 0.35, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-actions', start: 'top 88%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="contact section" aria-label="Contact">
      <div className="container contact-container">
        {/* Left */}
        <div className="contact-left">
          <div className="section-label">
            <span>07 — Contact</span>
          </div>

          <h2 className="contact-heading t-display">
            LET'S BUILD<br />SCALABLE<br /><span className="accent">SYSTEMS</span><br />TOGETHER.
          </h2>
        </div>

        {/* Right */}
        <div className="contact-right">
          <p className="contact-body t-body">
            I'm always open to discussing interesting opportunities, projects, collaborations, or just having a technical conversation.
          </p>

          <div className="contact-actions">
            <a href={`mailto:${CONTACT_INFO.email}`} className="btn btn-primary" data-cursor="EMAIL">
              Say Hello
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

          <div className="contact-links">
            <a href={`mailto:${CONTACT_INFO.email}`} className="contact-link" data-cursor="EMAIL">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
              </svg>
              {CONTACT_INFO.email}
            </a>
            <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer"
               className="contact-link" data-cursor="LINKEDIN">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
              {CONTACT_INFO.linkedin.replace('https://', '')}
            </a>
            <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer"
               className="contact-link" data-cursor="GITHUB">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              github.com/sumit18-ai
            </a>
          </div>
        </div>

        {/* Abstract orbital visual */}
        <div className="contact-visual" aria-hidden="true">
          <Canvas
            camera={{ position: [0, 0, 3], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.2} />
              <pointLight position={[1, 1, 2]} intensity={2} color="#8B7CFF" />
              <ContactOrb />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}
