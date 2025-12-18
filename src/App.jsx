import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AdminPanel from './pages/AdminPanel';
import Statistics from './pages/Statistics';
import AddTechnology from './pages/AddTechnology';
import Settings from './pages/Settings'; 

function App() {
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });
  
  const navigate = useNavigate();

  // Эффект для инициализации темы при запуске приложения
  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme') || 'light';
    document.body.className = `${savedTheme}-theme`;
  }, []);

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
    navigate('/technologies');
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="app-container">
      {userRole && <Navbar userRole={userRole} onLogout={handleLogout} />}
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<Home />} />
          
          {/* Список технологий (защищенный роут) */}
          <Route path="/technologies" element={
            !userRole ? <LoginScreen onLogin={handleLogin} /> : <TechnologyList />
          } />
          
          {/* Деталка технологии */}
          <Route path="/technology/:techId" element={
            !userRole ? <Navigate to="/" /> : <TechnologyDetail />
          } />

          {/* Статистика */}
          <Route path="/stats" element={
            !userRole ? <Navigate to="/" /> : <Statistics />
          } />

          {/* Добавление новой технологии */}
          <Route path="/add" element={
            !userRole ? <Navigate to="/" /> : <AddTechnology />
          } />

          {/* Настройки */}
          <Route path="/settings" element={
            !userRole ? <Navigate to="/" /> : <Settings />
          } />
          
          {/* Админка (проверка на роль admin) */}
          <Route path="/admin" element={
            userRole !== 'admin' ? <Navigate to="/technologies" /> : <AdminPanel userRole={userRole} />
          } />

          {/* Редирект для несуществующих страниц */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [role, setRole] = useState('user');

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2 style={{ marginBottom: '10px' }}>Вход в систему</h2>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>Выберите вашу роль для продолжения</p>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          <button 
            onClick={() => setRole('user')}
            style={role === 'user' ? activeRoleBtn : inactiveRoleBtn}
          >
            👨‍💻 Пользователь
          </button>
          <button 
            onClick={() => setRole('admin')}
            style={role === 'admin' ? activeRoleBtn : inactiveRoleBtn}
          >
            🛠️ Админ
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(role); }}>
          <input type="password" placeholder="Пароль (необязательно)" style={inputStyle} />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
            Войти как {role === 'admin' ? 'Админ' : 'Пользователь'}
          </button>
        </form>
        
        <button onClick={() => window.location.href='/'} style={cancelLinkStyle}>
          Вернуться на главную
        </button>
      </div>
    </div>
  );
}

// СТИЛИ
const modalOverlayStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh'
};

const modalContentStyle = {
  background: 'var(--color-card-bg)', padding: '40px', borderRadius: '24px', 
  boxShadow: 'var(--shadow-deep)', width: '100%', maxWidth: '400px', 
  textAlign: 'center', border: '1px solid var(--border-color)'
};

const inputStyle = {
  width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)',
  fontSize: '16px', marginBottom: '15px', boxSizing: 'border-box', outline: 'none',
  background: 'var(--color-bg)', color: 'var(--color-text)'
};

const activeRoleBtn = {
  flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
  background: '#2563eb', color: '#fff', fontWeight: 'bold', cursor: 'pointer'
};

const inactiveRoleBtn = {
  flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0',
  background: '#f8fafc', color: '#64748b', cursor: 'pointer'
};

const cancelLinkStyle = {
  background: 'none', border: 'none', color: '#94a3b8', marginTop: '20px', 
  cursor: 'pointer', textDecoration: 'underline'
};

export default App;