import React from 'react';
import { AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';

const ThreatResult = ({ result }) => {
  const { score, threat_level, action } = result;

  let color = 'var(--safe)';
  let Icon = ShieldCheck;
  let bgGradient = 'rgba(16, 185, 129, 0.1)';

  if (threat_level === 'Suspicious') {
    color = 'var(--warning)';
    Icon = AlertTriangle;
    bgGradient = 'rgba(245, 158, 11, 0.1)';
  } else if (threat_level === 'Malicious') {
    color = 'var(--danger)';
    Icon = ShieldAlert;
    bgGradient = 'rgba(239, 68, 68, 0.1)';
  }

  // Circular progress calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-panel animate-fade-in" style={{ textAlign: 'center', background: bgGradient, border: `1px solid ${color}` }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Analysis Complete</h3>
      
      <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 2rem auto' }}>
        <svg fill="none" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="80" cy="80" r="60" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
          <circle cx="80" cy="80" r="60" stroke={color} strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '2.5rem', fontWeight: '800', color: color }}>{score}</span>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Trust Score</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem', color: color }}>
        <Icon size={24} />
        <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>{threat_level.toUpperCase()}</span>
      </div>

      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        {threat_level === 'Safe' && "This URL appears to be safe. You will be redirected shortly."}
        {threat_level === 'Suspicious' && "Proceed with caution. This URL exhibits suspicious patterns."}
        {threat_level === 'Malicious' && "Danger! This URL is flagged as malicious. Do not proceed."}
      </p>

      {action === 'redirect' && (
        <a href={result.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
          Proceed to URL
        </a>
      )}
      {action === 'sandbox' && (
        <button className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--warning)', color: 'var(--warning)' }}>
          Open in Sandbox View
        </button>
      )}
      {action === 'helpline' && (
        <button className="btn btn-primary" style={{ width: '100%', background: 'var(--danger)', boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.39)' }} onClick={() => window.location.href = '/helpline'}>
          Report to Cyber Helpline
        </button>
      )}
    </div>
  );
};

export default ThreatResult;
