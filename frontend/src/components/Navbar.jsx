import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, User, LogOut, Menu, X } from 'lucide-react';
import '../index.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="glass-panel navbar-custom">
      {/* Brand logo section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldCheck color="var(--primary)" size={32} />
        <span style={{ fontSize: '1.5rem', fontWeight: '800' }} className="text-gradient">QRXamine</span>
      </div>

      {/* Desktop navigation links */}
      <div className="nav-desktop" style={{ gap: '2rem', alignItems: 'center', fontWeight: '500' }}>
        <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Home</Link>
        <Link to="/about" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>About Us</Link>
        <Link to="/scan" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Scan</Link>
        {user && <Link to="/history" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>History</Link>}
        <Link to="/helpline" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Helpline</Link>
      </div>

      {/* Desktop auth options */}
      <div className="nav-desktop">
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

      {/* Hamburger menu button for mobile screens */}
      <button className="nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile dropdown menu drawer */}
      <div className={`mobile-nav-menu ${isOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontWeight: '500' }}>
          <Link to="/" onClick={closeMenu} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>Home</Link>
          <Link to="/about" onClick={closeMenu} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>About Us</Link>
          <Link to="/scan" onClick={closeMenu} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>Scan</Link>
          {user && <Link to="/history" onClick={closeMenu} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>History</Link>}
          <Link to="/helpline" onClick={closeMenu} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>Helpline</Link>
        </div>

        <div style={{ borderTop: '1px solid var(--panel-border)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ background: 'var(--panel-border)', padding: '0.5rem', borderRadius: '50%' }}>
                  <User size={20} color="var(--primary)" />
                </div>
                <span style={{ fontWeight: '600' }}>{user.name}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', padding: '0.75rem 1rem' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/auth?mode=login" onClick={closeMenu} className="btn btn-outline" style={{ width: '100%' }}>Login</Link>
              <Link to="/auth?mode=signup" onClick={closeMenu} className="btn btn-primary" style={{ width: '100%' }}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
