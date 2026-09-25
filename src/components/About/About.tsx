import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '9.32', label: 'CGPA' },
  { value: '3+',   label: 'Major Projects' },
  { value: '2+',   label: 'Teaching Roles' },
  { value: 'TCET', label: 'Mumbai, India' },
];

function CountUp({ target, duration = 1.4 }: { target: string; duration?: number }) {
  const elRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const numericEnd = parseFloat(target);
    const isNumeric  = !isNaN(numericEnd);
    const suffix     = target.replace(/[\d.]/g, ''); // e.g. '' or '+'

    if (!elRef.current) return;

    // Set initial display
    if (elRef.current) {
      elRef.current.textContent = isNumeric ? '0' + suffix : target;
    }

    ScrollTrigger.create({
      trigger: elRef.current,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        if (triggered.current || !isNumeric) return;
        triggered.current = true;
        const decimals = target.includes('.') ? (target.split('.')[1]?.replace(/\D/g, '').length || 0) : 0;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericEnd,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (elRef.current) {
              elRef.current.textContent = obj.val.toFixed(decimals) + suffix;
            }
          },
        });
      },
    });
  }, [target, duration]);

  return <span ref={elRef}>{target}</span>;
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-heading', {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-heading', start: 'top 80%' },
      });
      gsap.from('.about-body', {
        y: 30, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-body', start: 'top 82%' },
      });
      gsap.from('.about-stat', {
        y: 25, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-stats', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about section" aria-label="About Sumit Singh">
      <div className="container">
        <div className="section-label">
          <span>02 — About</span>
        </div>

        <div className="about-layout">
          {/* Left column */}
          <div className="about-left">
            <h2 className="about-heading t-heading">
              Building Software &amp;<br />Intelligent Systems
            </h2>

            <p className="about-body t-body">
              I'm a final-year Computer Engineering student at Thakur College of Engineering and Technology
              with a strong interest in Full-Stack Development and AI/ML. I enjoy building real-world software
              systems, experimenting with intelligent technologies, and continuously improving my problem-solving skills.
            </p>

            {/* Stats strip */}
            <div className="about-stats">
              {STATS.map(s => (
                <div key={s.label} className="about-stat">
                  <div className="about-stat-value">
                    <CountUp target={s.value} />
                  </div>
                  <div className="about-stat-label t-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column – abstract visual */}
          <div className="about-visual" aria-hidden="true">
            <div className="about-code-block">
              <div className="code-line"><span className="code-keyword">const</span> <span className="code-var">sumit</span> <span className="code-op">=</span> {'{'}</div>
              <div className="code-line code-indent"><span className="code-key">role</span><span className="code-op">:</span> <span className="code-str">"CS Engineer + Teacher"</span><span className="code-op">,</span></div>
              <div className="code-line code-indent"><span className="code-key">stack</span><span className="code-op">:</span> [<span className="code-str">"React"</span><span className="code-op">,</span> <span className="code-str">"Spring Boot"</span><span className="code-op">,</span> <span className="code-str">"Python"</span>]<span className="code-op">,</span></div>
              <div className="code-line code-indent"><span className="code-key">focus</span><span className="code-op">:</span> [<span className="code-str">"Full-Stack"</span><span className="code-op">,</span> <span className="code-str">"AI/ML"</span>]<span className="code-op">,</span></div>
              <div className="code-line code-indent"><span className="code-key">cgpa</span><span className="code-op">:</span> <span className="code-num">9.32</span><span className="code-op">,</span></div>
              <div className="code-line code-indent"><span className="code-key">available</span><span className="code-op">:</span> <span className="code-bool">true</span></div>
              <div className="code-line">{'}'}</div>
            </div>
            <div className="about-visual-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}
