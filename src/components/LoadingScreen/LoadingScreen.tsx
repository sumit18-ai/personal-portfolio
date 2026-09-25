import { useEffect, useRef, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'monogram' | 'name' | 'bar' | 'done'>('monogram');
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Phase 1: monogram flashes in (400ms)
    const t1 = setTimeout(() => setPhase('name'), 400);
    // Phase 2: name appears (600ms later)
    const t2 = setTimeout(() => setPhase('bar'), 1000);
    // Phase 3: progress bar fills
    const t3 = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(intervalRef.current!);
            setTimeout(() => {
              setPhase('done');
              setTimeout(onComplete, 400);
            }, 150);
            return 100;
          }
          return prev + 4;
        });
      }, 20);
    }, 1100);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen ${phase === 'done' ? 'loading-screen--exit' : ''}`}
         aria-label="Loading portfolio" role="progressbar" aria-valuenow={progress}>
      <div className="loading-inner">
        <div className={`loading-monogram ${phase !== 'monogram' ? 'loading-monogram--full' : ''}`}>
          <span>S</span><span className="accent">S</span>
        </div>
        <div className={`loading-name ${phase === 'name' || phase === 'bar' ? 'loading-name--visible' : ''}`}>
          SUMIT SINGH
        </div>
        <div className={`loading-bar-wrap ${phase === 'bar' ? 'loading-bar-wrap--visible' : ''}`}>
          <div className="loading-bar-track">
            <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
