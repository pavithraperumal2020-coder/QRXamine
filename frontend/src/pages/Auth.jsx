import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, User, Phone } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { login, signup, user } = useContext(AuthContext);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: ''});
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('mode') === 'signup') setIsLogin(false);
    else setIsLogin(true);
  }, [location]);

  useEffect(() => {
    if (user) navigate('/history'); // Redirect post login
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        navigate('/history');
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match"); return;
        }
        await signup({ name: formData.name, email: formData.email, phone: formData.phone, password: formData.password });
        setIsLogin(true);
        setError("Successfully signed up! Please login.");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Authentication Failed. Please try again.");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
          {isLogin ? 'Welcome Back' : 'Join ORXamine'}
        </h2>
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid var(--danger)' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '0.75rem', border: '1px solid var(--panel-border)', paddingLeft: '1rem' }}>
                  <User color="var(--text-muted)" size={18} />
                  <input type="text" name="name" onChange={handleChange} required className="input-field" style={{ border: 'none', background: 'transparent', flexGrow: 1 }} placeholder="John Doe" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '0.75rem', border: '1px solid var(--panel-border)', paddingLeft: '1rem' }}>
                  <Phone color="var(--text-muted)" size={18} />
                  <input type="tel" name="phone" onChange={handleChange} required className="input-field" style={{ border: 'none', background: 'transparent', flexGrow: 1 }} placeholder="+1 234 567 8900" />
                </div>
              </div>
            </>
          )}

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '0.75rem', border: '1px solid var(--panel-border)', paddingLeft: '1rem' }}>
              <Mail color="var(--text-muted)" size={18} />
              <input type="email" name="email" onChange={handleChange} required className="input-field" style={{ border: 'none', background: 'transparent', flexGrow: 1 }} placeholder="you@domain.com" />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '0.75rem', border: '1px solid var(--panel-border)', paddingLeft: '1rem' }}>
              <Lock color="var(--text-muted)" size={18} />
              <input type="password" name="password" onChange={handleChange} required className="input-field" style={{ border: 'none', background: 'transparent', flexGrow: 1 }} placeholder="••••••••" />
            </div>
          </div>

          {!isLogin && (
            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '0.75rem', border: '1px solid var(--panel-border)', paddingLeft: '1rem' }}>
                <Lock color="var(--text-muted)" size={18} />
                <input type="password" name="confirmPassword" onChange={handleChange} required className="input-field" style={{ border: 'none', background: 'transparent', flexGrow: 1 }} placeholder="••••••••" />
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '500' }} 
            onClick={() => { setError(null); navigate(`/auth?mode=${isLogin ? 'signup' : 'login'}`) }}>
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
