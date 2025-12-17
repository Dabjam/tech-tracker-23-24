// src/pages/Settings.jsx

import React, { useState, useEffect } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function Settings() {
    const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'light');
    const [notifications, setNotifications] = useState(
        JSON.parse(localStorage.getItem('notificationsEnabled') || 'true')
    );
    
    const { deleteAllTechnologies } = useTechnologiesApi();

    // Получаем текущую роль
    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem('userRole') || 'user';
    });

    // Обновляем тему при изменении
    useEffect(() => {
        document.body.className = `${theme}-theme`;
    }, [theme]);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('appTheme', newTheme);
        // Генерируем событие для обновления темы в реальном времени
        window.dispatchEvent(new Event('themeChange'));
    };

    const handleNotificationsToggle = (e) => {
        const newState = e.target.checked;
        setNotifications(newState);
        localStorage.setItem('notificationsEnabled', JSON.stringify(newState));
        alert(`Уведомления ${newState ? 'включены' : 'выключены'}.`);
    };

    const handleRoleChange = (role) => {
        // Сохраняем новую роль
        localStorage.setItem('userRole', role);
        setUserRole(role);
        
        // Генерируем событие для обновления навигации
        window.dispatchEvent(new Event('storage'));
        
        alert(`Роль изменена на: ${role === 'admin' ? 'Администратор' : 'Пользователь'}`);
        
        // Если мы на странице админки и сменили роль на пользователя - показываем сообщение
        if (role !== 'admin' && window.location.pathname === '/admin') {
            alert('Теперь у вас нет доступа к админ-панели. Вы будете перенаправлены на главную.');
        }
    };

    const handleClearData = () => {
        if (window.confirm('Вы уверены? Это удалит все данные о технологиях!')) {
            deleteAllTechnologies();
            alert('✅ Все данные удалены. Демо-данные не будут загружены автоматически.');
            window.location.href = '/technologies';
        }
    };

    return (
        <div className="settings-page">
            <h2>⚙️ Настройки приложения</h2>

            <div className="setting-group">
                <h3>Внешний вид</h3>
                <label>Тема:</label>
                <div className="theme-buttons">
                    <button 
                        onClick={() => handleThemeChange('light')} 
                        className={`btn ${theme === 'light' ? 'btn-active' : ''}`}
                    >
                        Светлая
                    </button>
                    <button 
                        onClick={() => handleThemeChange('dark')} 
                        className={`btn ${theme === 'dark' ? 'btn-active' : ''}`}
                        style={{ marginLeft: '10px' }}
                    >
                        Темная
                    </button>
                </div>
            </div>

            <div className="setting-group">
                <h3>Уведомления</h3>
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={notifications} 
                        onChange={handleNotificationsToggle} 
                    />
                    <span className="slider round"></span>
                </label>
                <span style={{ marginLeft: '10px' }}>
                    {notifications ? 'Уведомления включены' : 'Уведомления выключены'}
                </span>
            </div>

            <div className="setting-group">
                <h3>Управление доступом</h3>
                <p style={{ marginBottom: '10px', fontSize: '14px', color: 'var(--color-subtext)' }}>
                    Текущая роль: <strong style={{ 
                        color: userRole === 'admin' ? 'var(--color-warning)' : 'var(--color-primary)',
                        fontSize: '16px'
                    }}>
                        {userRole === 'admin' ? '👑 Администратор' : '👤 Пользователь'}
                    </strong>
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button 
                        onClick={() => handleRoleChange('user')} 
                        className={`btn ${userRole !== 'admin' ? 'btn-active' : 'btn-info'}`}
                        style={{ opacity: userRole !== 'admin' ? 1 : 0.8 }}
                    >
                        👤 Установить роль: Пользователь
                    </button>
                    <button 
                        onClick={() => handleRoleChange('admin')} 
                        className={`btn ${userRole === 'admin' ? 'btn-active' : 'btn-warning'}`}
                        style={{ opacity: userRole === 'admin' ? 1 : 0.8 }}
                    >
                        👑 Установить роль: Администратор
                    </button>
                </div>
                
                <div style={{ 
                    marginTop: '15px', 
                    padding: '10px', 
                    backgroundColor: 'rgba(255, 193, 7, 0.1)', 
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: 'var(--color-subtext)'
                }}>
                    <strong>ℹ️ Как это работает:</strong>
                    <ul style={{ marginTop: '5px', paddingLeft: '15px' }}>
                        <li>При выборе роли "Администратор" - в навигации появится ссылка "🔒 Админ-панель"</li>
                        <li>При выборе роли "Пользователь" - ссылка на админку исчезнет</li>
                        <li>Для проверки: установите роль "Администратор", затем нажмите на ссылку в навигации</li>
                    </ul>
                </div>
            </div>

            <div className="setting-group">
                <h3>Управление данными</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button 
                        onClick={handleClearData} 
                        className="btn btn-danger"
                    >
                        🗑️ Удалить все технологии
                    </button>
                    
                    <button 
                        onClick={() => { 
                            if (window.confirm('Сбросить ВСЕ настройки приложения?')) {
                                localStorage.clear();
                                window.location.reload();
                            }
                        }} 
                        className="btn btn-danger"
                    >
                        ⚡ Полный сброс приложения
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;