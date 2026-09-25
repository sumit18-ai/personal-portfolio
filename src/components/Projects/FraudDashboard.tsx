import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FraudDashboard.css';

gsap.registerPlugin(ScrollTrigger);


/* Simulated recent transactions */
const TXN_DATA = [
  { id: 'TXN-8821', amount: '$4,299', risk: 97, status: 'fraud' },
  { id: 'TXN-8820', amount: '$156',   risk: 3,  status: 'safe' },
  { id: 'TXN-8819', amount: '$2,890', risk: 89, status: 'fraud' },
  { id: 'TXN-8818', amount: '$430',   risk: 8,  status: 'safe' },
  { id: 'TXN-8817', amount: '$99',    risk: 2,  status: 'safe' },
];

const FEATURE_BARS = [
  { label: 'Transaction Amount', pct: 88 },
  { label: 'Location Anomaly',   pct: 74 },
  { label: 'Time Pattern',       pct: 61 },
  { label: 'Merchant Category',  pct: 45 },
  { label: 'Device Fingerprint', pct: 38 },
];

/* Tiny bar chart data */
const CHART_BARS = [32, 58, 45, 70, 42, 88, 55, 67, 43, 91, 48, 72];

function AnimatedBar({ pct, delay }: { pct: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 88%',
      onEnter: () => {
        gsap.from(ref.current, { width: '0%', duration: 0.9, ease: 'power3.out', delay });
      },
    });
  }, [delay]);
  return (
    <div ref={ref} className="feature-bar-fill" style={{ width: `${pct}%` }} />
  );
}

export default function FraudDashboard() {
  const dashRef = useRef<HTMLDivElement>(null);
  const [metricValues, setMetricValues] = useState({ recall: 0, f1: 0, auc: 0 });

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: dashRef.current,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const obj = { recall: 0, f1: 0, auc: 0 };
        gsap.to(obj, {
          recall: 99.7, f1: 99.85, auc: 0.9993,
          duration: 1.8, ease: 'power2.out',
          onUpdate: () => {
            setMetricValues({
              recall: parseFloat(obj.recall.toFixed(1)),
              f1:     parseFloat(obj.f1.toFixed(2)),
              auc:    parseFloat(obj.auc.toFixed(4)),
            });
          },
        });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div ref={dashRef} className="fraud-dashboard" aria-label="FraudShieldAI dashboard preview">
      {/* Header bar */}
      <div className="fraud-header">
        <div className="fraud-header-left">
          <span className="fraud-dot fraud-dot--red" />
          <span className="fraud-dot fraud-dot--yellow" />
          <span className="fraud-dot fraud-dot--green" />
          <span className="fraud-title">FraudShieldAI — Live Monitor</span>
        </div>
        <span className="fraud-status">
          <span className="fraud-status-dot" />
          ACTIVE
        </span>
      </div>

      <div className="fraud-body">
        {/* Model metrics row */}
        <div className="fraud-panel fraud-metrics-row">
          <div className="fraud-metric-chip">
            <span className="fraud-chip-value">{metricValues.recall}%</span>
            <span className="fraud-chip-label">Recall</span>
          </div>
          <div className="fraud-metric-chip">
            <span className="fraud-chip-value">{metricValues.f1}%</span>
            <span className="fraud-chip-label">F1 Score</span>
          </div>
          <div className="fraud-metric-chip">
            <span className="fraud-chip-value">{metricValues.auc}</span>
            <span className="fraud-chip-label">ROC-AUC</span>
          </div>
        </div>

        {/* Activity chart + transactions */}
        <div className="fraud-row-2">
          {/* Mini bar chart */}
          <div className="fraud-panel fraud-chart-panel">
            <p className="fraud-panel-label">Transaction Volume</p>
            <div className="mini-chart">
              {CHART_BARS.map((h, i) => (
                <div key={i} className="mini-bar-wrap">
                  <div
                    className={`mini-bar ${i === 9 || i === 6 ? 'mini-bar--alert' : ''}`}
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recent transactions */}
          <div className="fraud-panel fraud-txn-panel">
            <p className="fraud-panel-label">Recent Transactions</p>
            <div className="fraud-txn-list">
              {TXN_DATA.map(t => (
                <div key={t.id} className={`fraud-txn ${t.status === 'fraud' ? 'fraud-txn--alert' : ''}`}>
                  <span className="fraud-txn-id">{t.id}</span>
                  <span className="fraud-txn-amount">{t.amount}</span>
                  <div className="fraud-risk-bar">
                    <div className="fraud-risk-fill" style={{ width: `${t.risk}%`, background: t.risk > 60 ? '#FF4466' : '#22C55E' }} />
                  </div>
                  <span className={`fraud-txn-badge ${t.status === 'fraud' ? 'fraud-txn-badge--fraud' : 'fraud-txn-badge--safe'}`}>
                    {t.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SHAP Feature importance */}
        <div className="fraud-panel fraud-shap-panel">
          <p className="fraud-panel-label">SHAP Feature Importance</p>
          <div className="feature-bars">
            {FEATURE_BARS.map((f, i) => (
              <div key={f.label} className="feature-bar-row">
                <span className="feature-bar-label">{f.label}</span>
                <div className="feature-bar-track">
                  <AnimatedBar pct={f.pct} delay={i * 0.08} />
                </div>
                <span className="feature-bar-pct">{f.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
