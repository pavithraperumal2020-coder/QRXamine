import React from 'react';
import { Shield, Target, Smartphone } from 'lucide-react';

const About = () => {
  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '800px' }}>
      <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>About <span className="text-gradient">ORXamine</span></h2>
      
      <div className="glass-panel" style={{ marginBottom: '2rem', fontSize: '1.125rem', color: 'var(--text-muted)' }}>
        <p style={{ marginBottom: '1rem' }}>
          <strong>ORXamine</strong> is a next-generation cybersecurity platform designed to protect users from malicious QR codes and deceptive URLs that facilitate phishing, malware distribution, and identity theft.
        </p>
        <p>
          With the rapid adoption of QR codes for payments, restaurant menus, and marketing, attackers have increasingly utilized "Quishing" (QR Phishing). ORXamine acts as a critical intermediary layer, neutralizing threats before they reach your device's browser.
        </p>
      </div>

      <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', marginTop: '3rem' }}>How It Works</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '1rem' }}><Smartphone color="var(--primary)" size={24} /></div>
          <div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>1. Capture & Extract</h4>
            <p style={{ color: 'var(--text-muted)' }}>Our engine seamlessly captures QR payloads using your mobile/desktop camera without storing the imagery.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '1rem' }}><Target color="var(--primary)" size={24} /></div>
          <div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>2. Threat Intelligence Pipeline</h4>
            <p style={{ color: 'var(--text-muted)' }}>The URL is piped into a sandbox where it is verified against the <strong>VirusTotal Database</strong> and subjected to behavioral analysis via our <strong>LightGBM</strong> machine learning model.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '1rem' }}><Shield color="var(--primary)" size={24} /></div>
          <div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>3. Secure Routing</h4>
            <p style={{ color: 'var(--text-muted)' }}>Based on the Trust Score: Safe links auto-redirect, suspicious links enter a manual verification queue, and malicious links redirect you strictly to cyber helplines.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
