import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ userRole, onLogout }) {
  const location = useLocation();
  
  // Функция для проверки активной ссылки
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/technologies" style={logoStyle}>🚀 TechTracker</Link>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link 
            to="/technologies" 
            style={isActive('/technologies') ? activeLink : linkStyle}
          >
            Главная
          </Link>
          
          <Link 
            to="/stats" 
            style={isActive('/stats') ? activeLink : linkStyle}
          >
            Статистика
          </Link>

          {/* ССЫЛКА НА НАСТРОЙКИ */}
          <Link 
            to="/settings" 
            style={isActive('/settings') ? activeLink : linkStyle}
          >
            ⚙️ Настройки
          </Link>

          {userRole === 'admin' && (
            <Link 
              to="/admin" 
              style={isActive('/admin') ? activeAdminLink : adminLinkStyle}
            >
              Админка
            </Link>
          )}
          
          <div style={dividerStyle}></div>

          <button onClick={onLogout} className="btn" style={logoutBtnStyle}>
            Выйти
          </button>
        </div>
      </div>
    </nav>
  );
}

// СТИЛИ (теперь используют переменные из index.css)
const navStyle = { 
  height: '70px', 
  background: 'var(--color-card-bg)', 
  borderBottom: '1px solid var(--border-color)', 
  display: 'flex', 
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const containerStyle = { 
  maxWidth: '1200px', 
  width: '100%', 
  margin: '0 auto', 
  display: 'flex', 
  justifyContent: 'space-between', 
  padding: '0 20px' 
};

const logoStyle = { 
  fontSize: '20px', 
  fontWeight: 'bold', 
  textDecoration: 'none', 
  color: 'var(--color-primary)' 
};

const linkStyle = { 
  textDecoration: 'none', 
  color: 'var(--color-subtext)', 
  fontWeight: '500',
  fontSize: '15px',
  transition: '0.2s'
};

const activeLink = { 
  ...linkStyle, 
  color: 'var(--color-primary)', 
  fontWeight: '700' 
};

const adminLinkStyle = {
  ...linkStyle,
  padding: '6px 12px',
  borderRadius: '8px',
  background: 'rgba(90, 125, 255, 0.1)',
  color: 'var(--color-primary)'
};

const activeAdminLink = {
  ...adminLinkStyle,
  background: 'var(--color-primary)',
  color: '#fff'
};

const dividerStyle = {
  width: '1px',
  height: '24px',
  background: 'var(--border-color)',
  margin: '0 5px'
};

const logoutBtnStyle = { 
  padding: '8px 16px', 
  fontSize: '14px', 
  borderRadius: '8px',
  cursor: 'pointer',
  background: 'transparent',
  border: '1px solid var(--border-color)',
  color: 'var(--color-text)'
};

export default Navbar;