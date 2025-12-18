import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AdminPanel from './pages/AdminPanel';
import Statistics from './pages/Statistics';
import AddTechnology from './pages/AddTechnology';

function App() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setUserRole(role);
    navigate('/technologies');
  };

  const handleLogout = () => {
    setUserRole(null);
    navigate('/');
  };

  return (
    <div>
      {/* МЕНЮ ПОЯВЛЯЕТСЯ ТОЛЬКО ПОСЛЕ ВХОДА */}
      {userRole && <Navbar userRole={userRole} onLogout={handleLogout} />}
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/technologies" element={
            !userRole ? <LoginScreen onLogin={handleLogin} /> : <TechnologyList />
          } />
          
          <Route path="/admin" element={
            userRole !== 'admin' ? <LoginScreen onLogin={handleLogin} /> : <AdminPanel userRole={userRole} />
          } />
          
          <Route path="/stats" element={
            !userRole ? <LoginScreen onLogin={handleLogin} /> : <Statistics />
          } />
          
          <Route path="/add" element={<AddTechnology />} />
          <Route path="/technology/:techId" element={<TechnologyDetail />} />
        </Routes>
      </main>
    </div>
  );
}

// КРАСИВАЯ МОДАЛКА ВХОДА (LOGIN SCREEN)
function LoginScreen({ onLogin }) {
  const [pass, setPass] = useState('');
  const [role, setRole] = useState('user'); // По умолчанию юзер

  const checkPassword = (e) => {
    e.preventDefault();
    if (role === 'admin' && pass === 'admin') onLogin('admin');
    else if (role === 'user' && pass === 'user') onLogin('user');
    else alert('Неверный пароль! Посмотрите подсказку в поле ввода.');
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2 style={{ marginBottom: '10px' }}>Вход в TechTracker</h2>
        <p style={{ color: '#64748b', marginBottom: '25px' }}>Выберите роль и введите пароль</p>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={() => setRole('user')} 
            style={role === 'user' ? activeRoleBtn : inactiveRoleBtn}
          >👨‍💻 Пользователь</button>
          <button 
            onClick={() => setRole('admin')} 
            style={role === 'admin' ? activeRoleBtn : inactiveRoleBtn}
          >🛠️ Админ</button>
        </div>

        <form onSubmit={checkPassword}>
          <input 
            type="password" 
            placeholder={`Пароль (подсказка: ${role})`} 
            value={pass}
            onChange={e => setPass(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" className="btn btn-primary" style={submitBtnStyle}>
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

// СТИЛИ ДЛЯ МОДАЛКИ
const modalOverlayStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh'
};

const modalContentStyle = {
  background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  width: '100%', maxWidth: '400px', textAlign: 'center', border: '1px solid #e2e8f0'
};

const inputStyle = {
  width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1',
  fontSize: '16px', marginBottom: '15px', boxSizing: 'border-box', outline: 'none'
};

const activeRoleBtn = {
  flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
  background: 'var(--color-primary, #2563eb)', color: '#fff', fontWeight: 'bold', cursor: 'pointer'
};

const inactiveRoleBtn = {
  flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0',
  background: '#f8fafc', color: '#64748b', cursor: 'pointer'
};

const submitBtnStyle = {
  width: '100%', padding: '14px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px'
};

const cancelLinkStyle = {
  background: 'none', border: 'none', color: '#94a3b8', marginTop: '20px', cursor: 'pointer', fontSize: '14px'
};

export default App;