import React, { useState, useEffect } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function Settings() {
    const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'light');
    const { deleteAllTechnologies } = useTechnologiesApi();
    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        document.body.className = `${theme}-theme`;
        localStorage.setItem('appTheme', theme);
    }, [theme]);

    const cardStyle = {
        background: 'var(--color-card-bg)',
        padding: isMobile ? '15px' : '25px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '1px solid var(--border-color)',
        color: 'var(--color-text)'
    };

    const buttonGroupStyle = {
        display: 'flex',
        gap: isMobile ? '8px' : '10px',
        marginTop: '15px',
        flexDirection: isMobile ? 'column' : 'row'
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: isMobile ? '15px' : '20px' }}>
            <h1 style={{ color: 'var(--color-text)', fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '20px' }}>⚙️ Настройки</h1>

            <div style={cardStyle}>
                <h3 style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', marginBottom: '10px' }}>☀️ Внешний вид</h3>
                <p style={{ color: 'var(--color-subtext)', fontSize: isMobile ? '13px' : '14px' }}>Выберите цветовую схему</p>
                <div style={buttonGroupStyle}>
                    <button 
                        onClick={() => setTheme('light')} 
                        className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-outline'}`} 
                        style={{ flex: 1, padding: isMobile ? '10px' : '12px', fontSize: isMobile ? '13px' : '14px' }}
                    >
                        ☀️ Светлая
                    </button>
                    <button 
                        onClick={() => setTheme('dark')} 
                        className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-outline'}`} 
                        style={{ flex: 1, padding: isMobile ? '10px' : '12px', fontSize: isMobile ? '13px' : '14px' }}
                    >
                        🌙 Темная
                    </button>
                </div>
            </div>

            <div style={{ ...cardStyle, borderColor: '#fc8181', borderWidth: '2px' }}>
                <h3 style={{ color: '#f56565', fontSize: isMobile ? '1.1rem' : '1.3rem', marginBottom: '10px' }}>🗑️ Опасная зона</h3>
                <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--color-subtext)', marginBottom: '15px' }}>
                    Это действие удалит все данные без возможности восстановления.
                </p>
                <button 
                    onClick={deleteAllTechnologies} 
                    style={{ 
                        width: '100%', 
                        padding: isMobile ? '12px' : '14px', 
                        background: '#fff5f5', 
                        color: '#c53030', 
                        border: '1px solid #fc8181', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontSize: isMobile ? '13px' : '14px',
                        fontWeight: 'bold'
                    }}
                >
                    🗑️ Удалить все данные
                </button>
            </div>
        </div>
    );
}

export default Settings;