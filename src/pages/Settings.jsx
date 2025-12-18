import React, { useState, useEffect } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function Settings() {
    const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'light');
    const { deleteAllTechnologies } = useTechnologiesApi();

    useEffect(() => {
        document.body.className = `${theme}-theme`;
        localStorage.setItem('appTheme', theme);
    }, [theme]);

    const cardStyle = {
        background: 'var(--color-card-bg)',
        padding: '25px',
        borderRadius: '16px',
        marginBottom: '20px',
        border: '1px solid var(--border-color)',
        color: 'var(--color-text)'
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ color: 'var(--color-text)' }}>⚙️ Настройки</h1>

            <div style={cardStyle}>
                <h3>Внешний вид</h3>
                <p style={{ color: 'var(--color-subtext)' }}>Выберите цветовую схему</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button onClick={() => setTheme('light')} className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1 }}>☀️ Светлая</button>
                    <button onClick={() => setTheme('dark')} className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1 }}>🌙 Темная</button>
                </div>
            </div>

            <div style={{ ...cardStyle, borderColor: '#fc8181' }}>
                <h3 style={{ color: '#f56565' }}>Опасная зона</h3>
                <button onClick={deleteAllTechnologies} style={{ width: '100%', padding: '12px', background: '#fff5f5', color: '#c53030', border: '1px solid #fc8181', borderRadius: '8px', marginTop: '10px', cursor: 'pointer' }}>
                    🗑️ Удалить все данные
                </button>
            </div>
        </div>
    );
}

export default Settings;