import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { ShieldCheck, ShieldAlert, AlertTriangle, MapPin, ExternalLink, Calendar } from 'lucide-react';

const History = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth?mode=login');
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await api.get('/api/scan/history');
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user, navigate]);

  if (!user || loading) return <p style={{ textAlign: 'center', marginTop: '4rem' }}>Loading...</p>;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Your Scan History</h2>
          <p style={{ color: 'var(--text-muted)' }}>Isolated view of your previously scanned URLs and QR codes.</p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>No scan history found. Start analyzing URLs to see them here.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1rem' }}>
          {history.map((scan) => {
            const isSafe = scan.threat_level === 'Safe';
            const isSuspicious = scan.threat_level === 'Suspicious';
            const Icon = isSafe ? ShieldCheck : isSuspicious ? AlertTriangle : ShieldAlert;
            const color = isSafe ? 'var(--safe)' : isSuspicious ? 'var(--warning)' : 'var(--danger)';

            return (
              <div key={scan.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ background: `rgba(${isSafe ? '16, 185, 129' : isSuspicious ? '245, 158, 11' : '239, 68, 68'}, 0.1)`, padding: '1rem', borderRadius: '1rem' }}>
                  <Icon size={32} color={color} />
                </div>
                
                <div style={{ flexGrow: 1, minWidth: '250px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '1.25rem', margin: 0, wordBreak: 'break-all' }}>{scan.url_content}</h4>
                    <a href={scan.url_content} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}><ExternalLink size={16} /></a>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> {new Date(scan.timestamp).toLocaleString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {scan.location || 'Location Not Provided'}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: color }}>{scan.trust_score.toFixed(1)}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{scan.threat_level}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
