import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function AddTechnology() {
    const { addTechnology } = useTechnologiesApi(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        difficulty: 'beginner',
        status: 'not-started',
        description: '',
        notes: '',
        resources: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        
        try {
            const resourcesArray = formData.resources 
                ? formData.resources.split(',').map(res => res.trim()).filter(res => res !== '')
                : [];

            const newTech = {
                title: formData.title.trim(),
                category: formData.category.trim(),
                difficulty: formData.difficulty,
                status: formData.status,
                description: formData.description.trim(),
                notes: formData.notes.trim(),
                resources: resourcesArray
            };

            if (!newTech.title || !newTech.category) {
                throw new Error('Название и категория обязательны для заполнения');
            }

            await addTechnology(newTech);
            
            setFormData({
                title: '',
                category: '',
                difficulty: 'beginner',
                status: 'not-started',
                description: '',
                notes: '',
                resources: ''
            });
            
            navigate('/technologies');
            
        } catch (err) {
            setError(err.message || 'Произошла ошибка при добавлении технологии');
            console.error('Ошибка добавления:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-tech-page">
            <h2>➕ Добавить новую технологию</h2>
            
            {error && (
                <div className="error-message" style={{
                    backgroundColor: 'var(--color-danger)',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom: '20px'
                }}>
                    ❌ {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="add-tech-form">
                
                <div className="form-group">
                    <label htmlFor="title">
                        Название технологии *
                        <span style={{ color: 'var(--color-danger)', marginLeft: '5px' }}>*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Например: React, TypeScript, Docker"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">
                        Категория *
                        <span style={{ color: 'var(--color-danger)', marginLeft: '5px' }}>*</span>
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Например: Frontend, Backend, DevOps"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="difficulty">Уровень сложности:</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    >
                        <option value="beginner">Начинающий</option>
                        <option value="intermediate">Средний</option>
                        <option value="advanced">Продвинутый</option>
                        <option value="expert">Эксперт</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Статус изучения:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    >
                        <option value="not-started">Не начато</option>
                        <option value="in-progress">В процессе</option>
                        <option value="completed">Выполнено</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Краткое описание:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Опишите технологию, для чего она нужна, ключевые особенности..."
                        rows="4"
                        disabled={isSubmitting}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="resources">Ссылки на ресурсы (через запятую):</label>
                    <input
                        type="text"
                        id="resources"
                        name="resources"
                        value={formData.resources}
                        onChange={handleChange}
                        placeholder="https://react.dev, https://docs.docker.com"
                        disabled={isSubmitting}
                    />
                    <small style={{ color: 'var(--color-subtext)', fontSize: '12px', marginTop: '5px' }}>
                        Укажите ссылки через запятую
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Заметки / План изучения:</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Ваши заметки, план изучения, полезные советы..."
                        className="notes-textarea"
                        rows="10"
                        disabled={isSubmitting}
                    ></textarea>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Добавление...' : 'Сохранить технологию'}
                    </button>
                    
                    <button 
                        type="button" 
                        className="btn btn-info"
                        onClick={() => navigate('/technologies')}
                        disabled={isSubmitting}
                    >
                        Отмена
                    </button>
                </div>

            </form>
        </div>
    );
}

export default AddTechnology;