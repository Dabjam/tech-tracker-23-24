// src/pages/Settings.js

import React, { useState } from 'react';

function Settings() {
    const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'light');
    const [notifications, setNotifications] = useState(JSON.parse(localStorage.getItem('notificationsEnabled') || 'true'));

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('appTheme', newTheme);
        document.body.className = `${newTheme}-theme`; // Для применения CSS-класса
    };

    const handleNotificationsToggle = (e) => {
        const newState = e.target.checked;
        setNotifications(newState);
        localStorage.setItem('notificationsEnabled', JSON.stringify(newState));
        alert(`Уведомления ${newState ? 'включены' : 'выключены'}.`);
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
                        Темная (Имитация)
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
                <h3>Управление данными</h3>
                <button 
                    onClick={() => { 
                        if (window.confirm('Вы уверены? Это удалит все данные!')) {
                            localStorage.removeItem('techTrackerData');
                            window.location.reload();
                        }
                    }} 
                    className="btn btn-danger"
                >
                    Сбросить все данные (localStorage)
                </button>
            </div>
        </div>
    );
}

export default Settings;