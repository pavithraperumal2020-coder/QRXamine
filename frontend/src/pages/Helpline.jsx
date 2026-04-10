import React, { useState, useEffect } from 'react';
import { PhoneCall, Map, Info, Gavel } from 'lucide-react';

const Helpline = () => {
  const [locationPermitted, setLocationPermitted] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state === 'granted') setLocationPermitted(true);
      });
    }
  }, []);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationPermitted(true),
        (err) => alert("Location permission denied. Showing default nationwide helplines.", err)
      );
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--danger)' }}>Cybercrime Helpline & Reporting</h2>
        <p style={{ color: 'var(--text-muted)' }}>If you have been a victim of a cybercrime, report it immediately.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ border: '1px solid var(--danger)', background: 'rgba(239, 68, 68, 0.05)' }}>
          <PhoneCall color="var(--danger)" size={40} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>National Helpline</h3>
          <p style={{ fontSize: '3rem', fontWeight: '800', margin: '1rem 0' }}>1930</p>
          <p style={{ color: 'var(--text-muted)' }}>Call immediately if money has been deducted from your account fraudulently.</p>
        </div>

        <div className="glass-panel">
          <Info color="var(--primary)" size={40} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Reporting Portal</h3>
          <p style={{ margin: '1rem 0' }}>
            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Report Online</a>
          </p>
          <p style={{ color: 'var(--text-muted)' }}>Official Government of India Cybercrime Reporting Portal.</p>
        </div>
      </div>

      <div className="glass-panel" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Map color="var(--secondary)" size={32} />
          <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Nearby Police Stations</h3>
        </div>
        
        {!locationPermitted ? (
          <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem' }}>
            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Enable location to view the nearest cyber cell.</p>
            <button className="btn btn-primary" onClick={requestLocation}>Grant Location Permission</button>
          </div>
        ) : (
          <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem', border: '1px solid var(--panel-border)' }}>
            <p style={{ color: 'var(--safe)' }}>Location Access Granted. In a production environment, this will render an embedded map of nearby cyber stations based on your coordinates.</p>
          </div>
        )}
      </div>

      <div className="glass-panel">
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Gavel color="var(--primary)" size={32} />
          <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Cyber Law Awareness</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--panel-border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1rem 0' }}>Crime Type</th>
              <th style={{ padding: '1rem 0' }}>Legal Section</th>
              <th style={{ padding: '1rem 0' }}>Punishment</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem 0' }}>Identity Theft / Phishing</td>
              <td>IT Act, Sec 66C</td>
              <td>Up to 3 yrs imprisonment + ₹1 Lakh fine</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem 0' }}>Cheating by Personation</td>
              <td>IT Act, Sec 66D</td>
              <td>Up to 3 yrs imprisonment + ₹1 Lakh fine</td>
            </tr>
            <tr>
              <td style={{ padding: '1rem 0' }}>Publishing Malicious Content</td>
              <td>IT Act, Sec 67</td>
              <td>Up to 3 yrs imprisonment + ₹5 Lakh fine</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Helpline;
