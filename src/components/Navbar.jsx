import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ userRole, onLogout }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/technologies" style={logoStyle}>🚀 TechTracker</Link>

        {/* Мобильное меню бургер */}
        {isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={hamburgerBtnStyle}
              aria-label="Toggle menu"
            >
              <span style={{ ...hamburgerLine, transform: mobileMenuOpen ? 'rotate(45deg) translateY(10px)' : 'none' }}></span>
              <span style={{ ...hamburgerLine, opacity: mobileMenuOpen ? '0' : '1' }}></span>
              <span style={{ ...hamburgerLine, transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-10px)' : 'none' }}></span>
            </button>
          </div>
        ) : (
          /* Десктопное меню */
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
        )}
      </div>

      {/* Мобильное выпадающее меню */}
      {isMobile && mobileMenuOpen && (
        <div style={mobileMenuStyle}>
          <Link 
            to="/technologies" 
            style={isActive('/technologies') ? activeMobileLink : mobileLinkStyle}
          >
            📱 Главная
          </Link>
          
          <Link 
            to="/stats" 
            style={isActive('/stats') ? activeMobileLink : mobileLinkStyle}
          >
            📊 Статистика
          </Link>

          <Link 
            to="/settings" 
            style={isActive('/settings') ? activeMobileLink : mobileLinkStyle}
          >
            ⚙️ Настройки
          </Link>

          {userRole === 'admin' && (
            <Link 
              to="/admin" 
              style={isActive('/admin') ? activeMobileLink : mobileLinkStyle}
            >
              👨‍💼 Админка
            </Link>
          )}

          <button onClick={onLogout} className="btn" style={mobileLinkStyle}>
            🚪 Выйти
          </button>
        </div>
      )}
    </nav>
  );
}

const navStyle = { 
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  background: 'var(--color-card-bg)',
  borderBottom: '1px solid var(--border-color)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const containerStyle = { 
  height: '70px',
  maxWidth: '1200px', 
  width: '100%', 
  margin: '0 auto', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  padding: '0 20px' 
};

const logoStyle = { 
  fontSize: '20px', 
  fontWeight: 'bold', 
  textDecoration: 'none', 
  color: 'var(--color-primary)',
  whiteSpace: 'nowrap'
};

const linkStyle = { 
  textDecoration: 'none', 
  color: 'var(--color-subtext)', 
  fontWeight: '500',
  fontSize: '15px',
  transition: '0.2s',
  display: 'inline-block'
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
  color: 'var(--color-text)',
  transition: '0.2s'
};

/* Мобильное меню стили */
const hamburgerBtnStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  padding: '8px',
  alignItems: 'center'
};

const hamburgerLine = {
  width: '24px',
  height: '2px',
  background: 'var(--color-text)',
  borderRadius: '2px',
  transition: 'all 0.3s ease'
};

const mobileMenuStyle = {
  position: 'absolute',
  top: '70px',
  left: 0,
  right: 0,
  background: 'var(--color-card-bg)',
  borderBottom: '1px solid var(--border-color)',
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 0',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  zIndex: 999,
  animation: 'slideDown 0.3s ease'
};

const mobileLinkStyle = {
  padding: '12px 20px',
  textDecoration: 'none',
  color: 'var(--color-subtext)',
  fontSize: '14px',
  fontWeight: '500',
  transition: '0.2s',
  borderLeft: '4px solid transparent',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
  display: 'block'
};

const activeMobileLink = {
  ...mobileLinkStyle,
  color: 'var(--color-primary)',
  borderLeftColor: 'var(--color-primary)',
  background: 'rgba(90, 125, 255, 0.05)',
  fontWeight: '700'
};

export default Navbar;