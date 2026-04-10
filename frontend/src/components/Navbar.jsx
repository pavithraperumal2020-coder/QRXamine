import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, User, LogOut } from 'lucide-react';
import '../index.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldCheck color="var(--primary)" size={32} />
        <span style={{ fontSize: '1.5rem', fontWeight: '800' }} className="text-gradient">ORXamine</span>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: '500' }}>
        <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Home</Link>
        <Link to="/about" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>About Us</Link>
        <Link to="/scan" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Scan</Link>
        {user && <Link to="/history" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>History</Link>}
        <Link to="/helpline" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Helpline</Link>
      </div>

      <div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ background: 'var(--panel-border)', padding: '0.5rem', borderRadius: '50%' }}>
                <User size={20} color="var(--primary)" />
              </div>
              <span style={{ fontWeight: '600' }}>{user.name}</span>
            </div>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/auth?mode=login" className="btn btn-outline">Login</Link>
            <Link to="/auth?mode=signup" className="btn btn-primary">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
