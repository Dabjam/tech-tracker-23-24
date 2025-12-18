import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function TechnologyDetail() {
    const { techId } = useParams();
    const navigate = useNavigate();
    const { technologies, setTechnologies } = useTechnologiesApi();
    
    // Состояние режима редактирования
    const [isEditing, setIsEditing] = useState(false);
    
    // Поиск конкретной технологии в базе
    const tech = technologies.find(t => t.id.toString() === techId?.toString());
    
    // Локальное состояние для полей формы
    const [editData, setEditData] = useState(null);

    // Загружаем данные в форму, когда технология найдена
    useEffect(() => {
        if (tech) setEditData({ ...tech });
    }, [tech]);

    if (!tech || !editData) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>⚠️ Технология не найдена</h2>
                <Link to="/technologies" className="btn btn-primary">Вернуться к списку</Link>
            </div>
        );
    }

    const handleSave = () => {
        const updatedList = technologies.map(t => t.id === tech.id ? editData : t);
        setTechnologies(updatedList);
        setIsEditing(false);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
            <Link to="/technologies" style={{ color: '#64748b', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
                ← Назад к списку
            </Link>

            <div style={{ backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                
                {/* Шапка контента */}
                <div style={{ padding: '30px', borderBottom: '1px solid #f1f5f9', background: isEditing ? '#f8fafc' : '#fff' }}>
                    {!isEditing ? (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <span style={statusBadgeStyle(tech.status)}>{formatStatus(tech.status)}</span>
                                <h1 style={{ margin: '15px 0 5px', fontSize: '32px' }}>{tech.title}</h1>
                                <p style={{ color: '#2563eb', fontWeight: '600', margin: 0 }}>{tech.category}</p>
                            </div>
                            <button onClick={() => setIsEditing(true)} className="btn btn-outline" style={{ padding: '8px 20px' }}>
                                ✏️ Редактировать
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <h2>Редактирование</h2>
                            <label style={labelStyle}>Название технологии</label>
                            <input 
                                style={inputStyle} 
                                value={editData.title} 
                                onChange={e => setEditData({...editData, title: e.target.value})} 
                            />
                            
                            <label style={labelStyle}>Статус прогресса</label>
                            <select 
                                style={inputStyle} 
                                value={editData.status} 
                                onChange={e => setEditData({...editData, status: e.target.value})}
                            >
                                <option value="not-started">🔴 Не начато</option>
                                <option value="in-progress">🟡 В процессе</option>
                                <option value="completed">🟢 Изучено</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Основной контент */}
                <div style={{ padding: '30px' }}>
                    {!isEditing ? (
                        <>
                            <h3 style={sectionTitle}>Описание</h3>
                            <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '18px' }}>
                                {tech.description || "Описание отсутствует."}
                            </p>
                            
                            <h3 style={{ ...sectionTitle, marginTop: '30px' }}>Заметки и ссылки</h3>
                            <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', whiteSpace: 'pre-wrap' }}>
                                {tech.notes || "Здесь пока нет ваших записей."}
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={labelStyle}>Краткое описание</label>
                                <textarea 
                                    style={{ ...inputStyle, minHeight: '100px' }} 
                                    value={editData.description} 
                                    onChange={e => setEditData({...editData, description: e.target.value})} 
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Заметки (планы, ссылки, важные мысли)</label>
                                <textarea 
                                    style={{ ...inputStyle, minHeight: '200px', fontFamily: 'monospace' }} 
                                    value={editData.notes} 
                                    onChange={e => setEditData({...editData, notes: e.target.value})} 
                                />
                            </div>
                            
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button onClick={handleSave} className="btn btn-primary" style={{ padding: '12px 30px' }}>
                                    💾 Сохранить изменения
                                </button>
                                <button onClick={() => setIsEditing(false)} className="btn btn-outline" style={{ padding: '12px 30px' }}>
                                    Отмена
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Стили
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '700', color: '#64748b', marginBottom: '5px', textTransform: 'uppercase' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '16px', boxSizing: 'border-box', outline: 'none' };
const sectionTitle = { fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', marginBottom: '15px' };

const formatStatus = (s) => {
    if (s === 'completed') return '🟢 Изучено';
    if (s === 'in-progress') return '🟡 В процессе';
    return '🔴 Не начато';
};

const statusBadgeStyle = (s) => ({
    padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
    backgroundColor: s === 'completed' ? '#dcfce7' : s === 'in-progress' ? '#fef9c3' : '#f1f5f9',
    color: s === 'completed' ? '#15803d' : s === 'in-progress' ? '#a16207' : '#475569'
});

export default TechnologyDetail;