import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function AddTechnology() {
    const { addTechnology } = useTechnologiesApi();
    const navigate = useNavigate();
    
    // Состояние формы
    const [formData, setFormData] = useState({ 
        title: '', 
        category: '', 
        description: '', 
        notes: '' 
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addTechnology(formData);
        navigate('/technologies'); 
    };

    // Стили, использующие CSS-переменные темы
    const containerStyle = { 
        maxWidth: '600px', 
        margin: '20px auto', 
        padding: '20px', 
        background: 'var(--color-card-bg)',
        borderRadius: '16px', 
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-light)',
        color: 'var(--color-text)'
    };

    const inputStyle = {
        width: '100%',
        padding: '14px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        fontSize: '16px',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'border-color 0.2s'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        color: 'var(--color-subtext)',
        marginBottom: '8px',
        marginLeft: '4px'
    };

    const buttonContainerStyle = {
        display: 'flex',
        gap: '10px',
        marginTop: '20px',
        flexDirection: 'row'
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={containerStyle}>
                <h1 style={{ marginBottom: '10px', fontSize: '24px' }}>🆕 Новая технология</h1>
                <p style={{ color: 'var(--color-subtext)', marginBottom: '25px' }}>
                    Заполните данные, чтобы начать отслеживать прогресс
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={labelStyle}>Название</label>
                        <input 
                            required 
                            placeholder="Например: React Router" 
                            style={inputStyle} 
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})} 
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Категория</label>
                        <input 
                            required 
                            placeholder="Frontend, Backend, Design..." 
                            style={inputStyle} 
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value})} 
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Краткое описание</label>
                        <textarea 
                            placeholder="Для чего нужна эта технология?" 
                            style={{ ...inputStyle, height: '100px', resize: 'vertical' }} 
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})} 
                        />
                    </div>

                    <div style={buttonContainerStyle}>
                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            style={{ flex: 2, padding: '12px', fontWeight: 'bold' }}
                        >
                            Добавить
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate('/technologies')}
                            className="btn btn-outline" 
                            style={{ flex: 1, padding: '12px' }}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTechnology;