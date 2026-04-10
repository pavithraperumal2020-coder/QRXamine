import React, { useState, useEffect, useRef, useContext } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Camera, Link as LinkIcon, Loader } from 'lucide-react';
import api from '../utils/api';
import ThreatResult from '../components/ThreatResult';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Scan = () => {
  const [activeTab, setActiveTab] = useState('qr'); // 'qr' or 'url'
  const [urlInput, setUrlInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth?mode=login');
      return;
    }

    if (activeTab === 'qr' && !result && !analyzing) {
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: { width: 250, height: 250 },
        fps: 10,
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
      });

      scanner.render(
        (decodedText) => {
          scanner.clear();
          handleAnalyze(decodedText);
        },
        (error) => {
          // Quietly ignore scan errors while waiting for a code
        }
      );

      return () => {
        scanner.clear().catch(e => console.error("Failed to clear scanner", e));
      };
    }
  }, [activeTab, result, analyzing, user, navigate]);

  const handleAnalyze = async (targetUrl) => {
    setAnalyzing(true);
    setResult(null);

    // Get mock geolocation
    let locationStr = "Unknown Location";
    if (navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        locationStr = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
      } catch (e) {
        console.warn("Geolocation denied or failed.", e);
      }
    }

    try {
      const res = await api.post('/api/scan/analyze', { 
        url_content: targetUrl,
        location: locationStr
      });
      setResult(res.data);
    } catch (err) {
      console.error("Scan analysis failed", err);
      // Fallback fallback error UI in production
    } finally {
      setAnalyzing(false);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      handleAnalyze(urlInput.trim());
    }
  };

  if (!user) return null;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>Scanner Module</h2>
      
      {!result && !analyzing && (
        <div className="glass-panel">
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button className={`btn ${activeTab === 'qr' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1 }} onClick={() => setActiveTab('qr')}>
              <Camera size={18} /> Scan QR
            </button>
            <button className={`btn ${activeTab === 'url' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1 }} onClick={() => setActiveTab('url')}>
              <LinkIcon size={18} /> Enter URL
            </button>
          </div>

          <div style={{ minHeight: '300px' }}>
            {activeTab === 'qr' ? (
              <div id="reader" style={{ width: '100%', border: 'none', borderRadius: '1rem', overflow: 'hidden' }}></div>
            ) : (
              <form onSubmit={handleUrlSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Target URL</label>
                  <input type="url" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} required className="input-field" placeholder="https://example.com" />
                </div>
                <button type="submit" className="btn btn-primary">Start Threat Analysis</button>
              </form>
            )}
          </div>
        </div>
      )}

      {analyzing && (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <Loader size={48} color="var(--primary)" style={{ animation: 'spin 2s linear infinite', margin: '0 auto 2rem auto' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Analyzing Threat Vectors...</h3>
          <p style={{ color: 'var(--text-muted)' }}>Running URL through LightGBM and VirusTotal engines.</p>
        </div>
      )}

      {result && !analyzing && (
        <>
          <ThreatResult result={result} />
          <button className="btn btn-outline" style={{ marginTop: '1.5rem', width: '100%' }} onClick={() => { setResult(null); setUrlInput(''); }}>
            Scan Another
          </button>
        </>
      )}

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        /* Style fixes for html5-qrcode standard UI */
        #reader { border: 1px solid var(--panel-border) !important; background: rgba(0,0,0,0.2) !important; }
        #reader__dashboard_section_csr button { background: var(--primary); border: none; color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; font-family: Outfit; font-weight: 500; }
        #reader__dashboard_section_swaplink { color: var(--primary) !important; text-decoration: none; }
      `}</style>
    </div>
  );
};

export default Scan;
