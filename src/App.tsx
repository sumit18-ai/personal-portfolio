import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import CustomCursor  from './components/CustomCursor/CustomCursor';
import Navbar        from './components/Navbar/Navbar';
import Hero          from './components/Hero/Hero';
import About         from './components/About/About';
import Experience    from './components/Experience/Experience';
import Projects      from './components/Projects/Projects';
import Skills        from './components/Skills/Skills';
import Certifications from './components/Certifications/Certifications';
import Contact       from './components/Contact/Contact';
import Footer        from './components/Footer/Footer';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';

import './styles/global.css';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  /* Smooth scroll */
  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {loaded && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main id="main-content">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Certifications />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
