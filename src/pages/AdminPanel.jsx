// src/pages/AdminPanel.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function AdminPanel() {
    const navigate = useNavigate();
    const { technologies, deleteTechnology, deleteAllTechnologies, exportTechnologiesAsJson } = useTechnologiesApi();
    
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('user');
    const [showAccessDenied, setShowAccessDenied] = useState(false);

    // Получаем роль из localStorage при загрузке
    useEffect(() => {
        const role = localStorage.getItem('userRole') || 'user';
        setUserRole(role);
        
        // Проверяем доступ только после небольшой задержки
        setTimeout(() => {
            setLoading(false);
            if (role !== 'admin') {
                setShowAccessDenied(true);
            }
        }, 100);
    }, []);

    const handleDeleteAll = () => {
        if (window.confirm('⚠️ ВЫ УВЕРЕНЫ?\n\nЭто действие удалит ВСЕ технологии.')) {
            deleteAllTechnologies();
            alert('✅ Все технологии удалены.');
        }
    };

    const handleExportToCSV = () => {
        if (technologies.length === 0) {
            alert('Нет данных для экспорта.');
            return;
        }
        
        const headers = ['ID', 'Название', 'Категория', 'Статус', 'Сложность', 'Описание', 'Заметки', 'Ресурсы'];
        const csvData = technologies.map(tech => [
            tech.id,
            `"${tech.title}"`,
            `"${tech.category}"`,
            tech.status,
            tech.difficulty,
            `"${tech.description}"`,
            `"${tech.notes || ''}"`,
            `"${(tech.resources || []).join(', ')}"`
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tech_tracker_admin_export_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Если загрузка - показываем индикатор
    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '300px' 
            }}>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    // Если нет доступа
    if (showAccessDenied) {
        return (
            <div style={{ 
                padding: '40px', 
                textAlign: 'center',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                <h2 style={{ color: 'var(--color-danger)', marginBottom: '20px' }}>🚫 Доступ запрещен</h2>
                <p style={{ marginBottom: '20px' }}>У вас недостаточно прав для доступа к этой странице.</p>
                <p style={{ marginBottom: '20px', color: 'var(--color-subtext)' }}>
                    Текущая роль: <strong>{userRole === 'admin' ? 'Администратор' : 'Пользователь'}</strong>
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button 
                        onClick={() => navigate('/')}
                        className="btn btn-primary"
                    >
                        На главную
                    </button>
                    <button 
                        onClick={() => navigate('/settings')}
                        className="btn btn-warning"
                    >
                        ⚙️ Настройки
                    </button>
                </div>
            </div>
        );
    }

    // Рендер админ-панели
    return (
        <div className="admin-panel-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2>🔒 Панель администратора</h2>
                    <p style={{ color: 'var(--color-subtext)', marginTop: '5px' }}>
                        Текущая роль: <strong style={{ color: 'var(--color-warning)' }}>Администратор</strong>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={() => navigate('/')}
                        className="btn btn-info"
                    >
                        ← На главную
                    </button>
                    <button 
                        onClick={() => navigate('/settings')}
                        className="btn btn-warning"
                    >
                        ⚙️ Настройки
                    </button>
                </div>
            </div>

            <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div className="admin-stat-card" style={{ background: 'var(--color-card-bg)', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow-light)' }}>
                    <h3>Всего технологий</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--color-primary)' }}>{technologies.length}</p>
                </div>
                
                <div className="admin-stat-card" style={{ background: 'var(--color-card-bg)', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow-light)' }}>
                    <h3>Размер данных</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-success)' }}>
                        {((JSON.stringify(technologies).length) / 1024).toFixed(2)} KB
                    </p>
                </div>
                
                <div className="admin-stat-card" style={{ background: 'var(--color-card-bg)', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow-light)' }}>
                    <h3>Статус данных</h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-subtext)', marginTop: '5px' }}>
                        {localStorage.getItem('dataCleared') === 'true' ? '⚪ Пользовательские' : '🟢 Демо-данные'}
                    </p>
                </div>
            </div>

            <div className="admin-actions" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div className="admin-action-card" style={{ border: '2px solid var(--color-primary)', padding: '20px', borderRadius: '12px' }}>
                    <h3>📊 Экспорт данных</h3>
                    <p>Экспортировать все данные в разных форматах</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                        <button 
                            onClick={exportTechnologiesAsJson} 
                            className="btn btn-primary"
                            disabled={technologies.length === 0}
                        >
                            📁 Экспорт в JSON
                        </button>
                        <button 
                            onClick={handleExportToCSV} 
                            className="btn btn-success"
                            disabled={technologies.length === 0}
                        >
                            📊 Экспорт в CSV
                        </button>
                    </div>
                </div>

                <div className="admin-action-card" style={{ border: '2px solid var(--color-warning)', padding: '20px', borderRadius: '12px' }}>
                    <h3>🛠️ Управление данными</h3>
                    <p>Действия с данными приложения</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                        <button 
                            onClick={() => {
                                const jsonData = JSON.stringify(technologies, null, 2);
                                navigator.clipboard.writeText(jsonData || 'Нет данных');
                                alert('Данные скопированы в буфер обмена!');
                            }}
                            className="btn btn-info"
                            disabled={technologies.length === 0}
                        >
                            📋 Копировать все данные
                        </button>
                        <button 
                            onClick={() => {
                                const data = prompt('Вставьте JSON данные для импорта:');
                                if (data) {
                                    try {
                                        JSON.parse(data);
                                        localStorage.setItem('techTrackerData', data);
                                        alert('Данные импортированы! Перезагрузите страницу.');
                                    } catch {
                                        alert('Ошибка: Неверный формат JSON!');
                                    }
                                }
                            }}
                            className="btn btn-warning"
                        >
                            📥 Импорт данных (JSON)
                        </button>
                    </div>
                </div>

                <div className="admin-action-card" style={{ border: '2px solid var(--color-danger)', padding: '20px', borderRadius: '12px' }}>
                    <h3>⚠️ Опасная зона</h3>
                    <p>Действия, которые нельзя отменить</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                        <button 
                            onClick={handleDeleteAll}
                            className="btn btn-danger"
                        >
                            🗑️ Удалить ВСЕ данные
                        </button>
                        <button 
                            onClick={() => {
                                if (window.confirm('❌ Сбросить ВСЕ настройки и данные?\n\nЭто удалит абсолютно всё.')) {
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

            <div className="admin-technologies-list" style={{ marginTop: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3>Все технологии ({technologies.length})</h3>
                    {technologies.length > 0 && (
                        <button 
                            onClick={() => {
                                if (window.confirm(`Удалить все ${technologies.length} технологий?`)) {
                                    deleteAllTechnologies();
                                }
                            }}
                            className="btn btn-danger"
                            style={{ padding: '8px 15px', fontSize: '14px' }}
                        >
                            Удалить все
                        </button>
                    )}
                </div>
                
                {technologies.length === 0 ? (
                    <div style={{ 
                        padding: '40px', 
                        textAlign: 'center', 
                        border: '2px dashed var(--border-color)', 
                        borderRadius: '12px',
                        backgroundColor: 'rgba(0,0,0,0.02)'
                    }}>
                        <h4 style={{ color: 'var(--color-subtext)' }}>Нет технологий</h4>
                        <p style={{ color: 'var(--color-subtext)', marginTop: '10px' }}>
                            Данные были удалены или еще не добавлены.
                        </p>
                        <button 
                            onClick={() => {
                                localStorage.removeItem('dataCleared');
                                window.location.reload();
                            }}
                            className="btn btn-primary"
                            style={{ marginTop: '15px' }}
                        >
                            Загрузить демо-данные
                        </button>
                    </div>
                ) : (
                    <div style={{ 
                        maxHeight: '400px', 
                        overflowY: 'auto', 
                        marginTop: '15px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '15px'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                                    <th style={{ textAlign: 'left', padding: '10px' }}>ID</th>
                                    <th style={{ textAlign: 'left', padding: '10px' }}>Название</th>
                                    <th style={{ textAlign: 'left', padding: '10px' }}>Категория</th>
                                    <th style={{ textAlign: 'left', padding: '10px' }}>Статус</th>
                                    <th style={{ textAlign: 'left', padding: '10px' }}>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {technologies.map(tech => (
                                    <tr key={tech.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '10px' }}>{tech.id}</td>
                                        <td style={{ padding: '10px' }}>{tech.title}</td>
                                        <td style={{ padding: '10px' }}>{tech.category}</td>
                                        <td style={{ padding: '10px' }}>
                                            <span className={`card-status status-${tech.status}`} style={{ fontSize: '11px' }}>
                                                {tech.status.replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            <button 
                                                onClick={() => {
                                                    if (window.confirm(`Удалить "${tech.title}"?`)) {
                                                        deleteTechnology(tech.id);
                                                    }
                                                }}
                                                className="btn btn-danger"
                                                style={{ padding: '5px 10px', fontSize: '12px' }}
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPanel;