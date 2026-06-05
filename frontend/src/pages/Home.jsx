import React from 'react';
import { ShieldAlert, Fingerprint, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container hero-container animate-fade-in">
      <h1 className="hero-title">
        Secure your digital world with <br />
        <span className="text-gradient">QRXamine</span>
      </h1>
      <p className="hero-subtitle">
        Experience enterprise-grade security for your QR codes and URLs. Advanced threat analysis powered by Machine Learning and zero-trust validation.
      </p>

      <div className="hero-buttons">
        <Link to="/scan" className="btn btn-primary">Start Scanning</Link>
        <Link to="/about" className="btn btn-outline">Learn More</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }} className="delay-200 animate-fade-in">
        <div className="glass-panel" style={{ textAlign: 'left' }}>
          <ShieldAlert color="var(--danger)" size={48} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Real-time Validation</h3>
          <p style={{ color: 'var(--text-muted)' }}>We analyze against millions of known threat vectors and immediately flag malicious destinations.</p>
        </div>
        <div className="glass-panel" style={{ textAlign: 'left' }}>
          <Fingerprint color="var(--primary)" size={48} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>AI Powered (LightGBM)</h3>
          <p style={{ color: 'var(--text-muted)' }}>Heuristics and behavior analysis catch zero-day phishing links disguised as legitimate campaigns.</p>
        </div>
        <div className="glass-panel" style={{ textAlign: 'left' }}>
          <Lock color="var(--safe)" size={48} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Privacy First</h3>
          <p style={{ color: 'var(--text-muted)' }}>Your scan history remains strictly yours. End-to-end security ensures isolation natively.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
