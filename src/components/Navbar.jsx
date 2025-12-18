import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ userRole, onLogout }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/technologies" style={logoStyle}>🚀 TechTracker</Link>

        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <Link to="/technologies" style={isActive('/technologies') ? activeLink : linkStyle}>Главная</Link>
          <Link to="/stats" style={isActive('/stats') ? activeRole : linkStyle}>Статистика</Link>
          {userRole === 'admin' && (
            <Link to="/admin" style={isActive('/admin') ? activeRole : linkStyle}>Админка</Link>
          )}
          
          <button onClick={onLogout} className="btn" style={logoutBtnStyle}>
            Выйти ({userRole === 'admin' ? 'Админ' : 'Юзер'})
          </button>
        </div>
      </div>
    </nav>
  );
}

const navStyle = { height: '70px', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center' };
const containerStyle = { maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', padding: '0 20px' };
const logoStyle = { fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: '#2563eb' };
const linkStyle = { textDecoration: 'none', color: '#64748b', fontWeight: '500' };
const activeLink = { ...linkStyle, color: '#2563eb', fontWeight: '700' };
const activeRole = { ...linkStyle, color: '#2563eb', fontWeight: '700' };

const logoutBtnStyle = {
  backgroundColor: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600'
};

export default Navbar;