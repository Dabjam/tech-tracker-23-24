import React from 'react';
import { Navigate } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import RoadmapImporter from '../components/RoadmapImporter';

function AdminPanel({ userRole }) {
    const api = useTechnologiesApi();

    // Защита роута
    if (userRole !== 'admin') return <Navigate to="/" replace />;

    const handleFullReset = () => {
        if (window.confirm('⚠️ ВНИМАНИЕ! Это действие удалит ВСЕ данные из базы безвозвратно. Продолжить?')) {
            api.deleteAllTechnologies();
        }
    };

    // Стили для темной темы
    const containerStyle = {
        padding: '20px', 
        display: 'grid', 
        gridTemplateColumns: '1fr 350px', 
        gap: '30px',
        color: 'var(--color-text)'
    };

    const cardStyle = {
        background: 'var(--color-card-bg)', 
        padding: '25px', 
        borderRadius: '16px', 
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-light)'
    };

    const tableHeaderStyle = {
        textAlign: 'left', 
        borderBottom: '2px solid var(--border-color)',
        color: 'var(--color-subtext)',
        padding: '12px'
    };

    const tableRowStyle = {
        borderBottom: '1px solid var(--border-color)',
        color: 'var(--color-text)'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={{ marginBottom: '20px' }}>🛠️ Панель администратора</h1>
                
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>Название технологии</th>
                            <th style={tableHeaderStyle}>Категория</th>
                            <th style={tableHeaderStyle}>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {api.technologies.length > 0 ? (
                            api.technologies.map(tech => (
                                <tr key={tech.id} style={tableRowStyle}>
                                    <td style={{ padding: '15px' }}>{tech.title}</td>
                                    <td style={{ padding: '15px', color: 'var(--color-subtext)' }}>{tech.category}</td>
                                    <td style={{ padding: '15px' }}>
                                        <button 
                                            onClick={() => api.deleteTechnology(tech.id)} 
                                            style={{ 
                                                border: 'none', 
                                                background: 'none', 
                                                cursor: 'pointer', 
                                                fontSize: '18px',
                                                filter: 'grayscale(1)' // Слегка приглушаем иконку
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
                                <td colSpan="3" style={{ padding: '30px', textAlign: 'center', color: 'var(--color-subtext)' }}>
                                    База данных пуста
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <aside>
                {/* Импортёр тоже должен поддерживать переменные внутри себя */}
                <div style={cardStyle}>
                    <h3 style={{ marginBottom: '15px' }}>Импорт данных</h3>
                    <RoadmapImporter batchAddTechnologies={api.batchAddTechnologies} />
                </div>

                <div style={{ ...cardStyle, marginTop: '20px', borderColor: 'var(--color-danger)' }}>
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