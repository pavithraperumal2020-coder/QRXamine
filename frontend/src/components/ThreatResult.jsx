import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ShieldAlert, X, Globe, ExternalLink, Shield } from 'lucide-react';

const ThreatResult = ({ result }) => {
  const { score, threat_level, action } = result;
  const [showSandbox, setShowSandbox] = useState(false);

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
        <button 
          className="btn btn-outline" 
          style={{ width: '100%', borderColor: 'var(--warning)', color: 'var(--warning)' }}
          onClick={() => setShowSandbox(true)}
        >
          Open in Sandbox View
        </button>
      )}
      {action === 'helpline' && (
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', background: 'var(--danger)', boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.39)' }} 
          onClick={() => window.location.href = 'https://cybercrime.gov.in/Webform/cyber_suspect.aspx'}
        >
          Report to Cyber Helpline
        </button>
      )}

      {/* Secure Sandboxed Browser Modal Overlay */}
      {showSandbox && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(5, 10, 21, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '1000px',
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            border: '1px solid var(--warning)',
            background: 'var(--panel-bg)',
            overflow: 'hidden',
            position: 'relative',
            textAlign: 'left'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              borderBottom: '1px solid var(--panel-border)',
              paddingBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)' }}>
                <Shield size={20} />
                <span style={{ fontWeight: '700', fontSize: '1.25rem' }}>Secure Sandboxed Preview</span>
              </div>
              <button 
                onClick={() => setShowSandbox(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.25rem',
                  borderRadius: '50%',
                  transition: 'background 0.2s'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Warning Message */}
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              color: 'var(--warning)',
              marginBottom: '1rem',
              lineHeight: '1.4'
            }}>
              <strong>Security Alert:</strong> This site is suspicious. It has been isolated in a restricted sandbox frame to prevent unauthorized downloads, script executions outside the sandbox context, or session hijacking on your local browser.
            </div>

            {/* Browser Address Bar Mock */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--panel-border)',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              marginBottom: '1rem'
            }}>
              <Globe size={16} color="var(--warning)" />
              <div style={{
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flexGrow: 1
              }}>
                {result.url}
              </div>
            </div>

            {/* Sandbox frame / display */}
            <div style={{ flexGrow: 1, position: 'relative', borderRadius: '0.5rem', overflow: 'hidden', background: '#fff', border: '1px solid var(--panel-border)' }}>
              <iframe
                title="Sandboxed View"
                src={result.url}
                sandbox="allow-scripts"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: '#fff'
                }}
              />
            </div>

            {/* Footer / Fallback options */}
            <div style={{
              marginTop: '1rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--panel-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '60%' }}>
                If the preview remains blank, the host website may block embedding (CORS/X-Frame-Options).
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a 
                  href={`https://www.browserling.com/?url=${encodeURIComponent(result.url)}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline" 
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderColor: 'var(--warning)', color: 'var(--warning)', gap: '0.25rem' }}
                >
                  <ExternalLink size={14} /> Open in Remote Sandbox (Browserling)
                </a>
                <button 
                  onClick={() => setShowSandbox(false)} 
                  className="btn btn-primary"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
                >
                  Close Sandbox
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreatResult;
