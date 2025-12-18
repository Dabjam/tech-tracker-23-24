import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function AddTechnology() {
    const { addTechnology } = useTechnologiesApi();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: '', category: '', description: '', notes: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addTechnology(formData); // ТЕПЕРЬ ФУНКЦИЯ СУЩЕСТВУЕТ
        navigate('/technologies'); // Переход на Главную
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h1>🆕 Новая технология</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                <input required placeholder="Название (например: React Router)" style={inputStyle} onChange={e => setFormData({...formData, title: e.target.value})} />
                <input required placeholder="Категория (Frontend, Backend...)" style={inputStyle} onChange={e => setFormData({...formData, category: e.target.value})} />
                <textarea placeholder="Краткое описание" style={{...inputStyle, height: '100px'}} onChange={e => setFormData({...formData, description: e.target.value})} />
                <button type="submit" className="btn btn-primary" style={{ padding: '15px' }}>Добавить в мой список</button>
            </form>
        </div>
    );
}

const inputStyle = { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', boxSizing: 'border-box' };

export default AddTechnology;