import React from 'react';
import { Navigate } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import RoadmapImporter from '../components/RoadmapImporter';

function AdminPanel({ userRole }) {
    const api = useTechnologiesApi();
    const isMobile = window.innerWidth < 768;

    // Защита роута
    if (userRole !== 'admin') return <Navigate to="/" replace />;

    const handleFullReset = () => {
        if (window.confirm('⚠️ ВНИМАНИЕ! Это действие удалит ВСЕ данные из базы безвозвратно. Продолжить?')) {
            api.deleteAllTechnologies();
        }
    };

    // Стили для темной темы с адаптацией
    const containerStyle = {
        padding: isMobile ? '15px' : '20px', 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1fr 350px', 
        gap: isMobile ? '20px' : '30px',
        color: 'var(--color-text)'
    };

    const cardStyle = {
        background: 'var(--color-card-bg)', 
        padding: isMobile ? '15px' : '25px', 
        borderRadius: '12px', 
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-light)',
        overflowX: 'auto'
    };

    const tableHeaderStyle = {
        textAlign: 'left', 
        borderBottom: '2px solid var(--border-color)',
        color: 'var(--color-subtext)',
        padding: isMobile ? '10px 8px' : '12px',
        fontSize: isMobile ? '13px' : '14px'
    };

    const tableRowStyle = {
        borderBottom: '1px solid var(--border-color)',
        color: 'var(--color-text)'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={{ marginBottom: '20px', fontSize: isMobile ? '1.5rem' : '2rem' }}>🛠️ Админ панель</h1>
                
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '280px' : '100%' }}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>Технология</th>
                                <th style={tableHeaderStyle}>Категория</th>
                                <th style={tableHeaderStyle}>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {api.technologies.length > 0 ? (
                                api.technologies.map(tech => (
                                    <tr key={tech.id} style={tableRowStyle}>
                                        <td style={{ padding: isMobile ? '10px 8px' : '15px', fontSize: isMobile ? '13px' : '14px', wordBreak: 'break-word' }}>{tech.title}</td>
                                        <td style={{ padding: isMobile ? '10px 8px' : '15px', color: 'var(--color-subtext)', fontSize: isMobile ? '13px' : '14px' }}>{tech.category}</td>
                                        <td style={{ padding: isMobile ? '10px 8px' : '15px', textAlign: 'center' }}>
                                            <button 
                                                onClick={() => api.deleteTechnology(tech.id)} 
                                                style={{ 
                                                    border: 'none', 
                                                    background: 'none', 
                                                    cursor: 'pointer', 
                                                    fontSize: isMobile ? '16px' : '18px',
                                                    padding: '4px',
                                                    filter: 'grayscale(1)' 
                                                }}
                                                title="Удалить"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ padding: '30px', textAlign: 'center', color: 'var(--color-subtext)', fontSize: isMobile ? '13px' : '14px' }}>
                                        База данных пуста
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <aside style={{ display: isMobile ? 'block' : 'initial' }}>
                <div style={cardStyle}>
                    <h3 style={{ marginBottom: '15px', fontSize: isMobile ? '1.1rem' : '1.2rem' }}>📥 Импорт данных</h3>
                    <RoadmapImporter batchAddTechnologies={api.batchAddTechnologies} />
                </div>

                <div style={{ ...cardStyle, marginTop: '20px', borderColor: 'var(--color-danger)', borderWidth: '2px' }}>
                    <h3 style={{ color: 'var(--color-danger)', marginBottom: '10px', fontSize: isMobile ? '1rem' : '1.2rem' }}>🔥 Опасная зона</h3>
                    <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--color-subtext)', marginBottom: '15px', lineHeight: '1.5' }}>
                        Удаление всей базы без восстановления.
                    </p>
                    <button 
                        onClick={handleFullReset} 
                        style={{ 
                            width: '100%', 
                            padding: isMobile ? '12px' : '15px', 
                            background: '#e53e3e', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '8px', 
                            fontWeight: 'bold', 
                            cursor: 'pointer',
                            fontSize: isMobile ? '13px' : '14px'
                        }}
                    >
                        🔥 Стереть
                    </button>
                    <h3 style={{ color: 'var(--color-danger)', marginBottom: '10px' }}>Опасная зона</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-subtext)', marginBottom: '15px' }}>
                        Удаление всей базы данных без возможности восстановления.
                    </p>
                    <button 
                        onClick={handleFullReset} 
                        style={{ 
                            width: '100%', 
                            padding: '15px', 
                            background: '#e53e3e', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '8px', 
                            fontWeight: 'bold', 
                            cursor: 'pointer' 
                        }}
                    >
                        🔥 Стереть всю базу
                    </button>
                </div>
            </aside>
        </div>
    );
}

export default AdminPanel;