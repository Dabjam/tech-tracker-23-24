import React, { useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function TechnologyDetail() {
    const { techId } = useParams();
    const navigate = useNavigate();
    const { technologies, loading, error, updateTechnology, deleteTechnology } = useTechnologiesApi();

    const technology = useMemo(() => {
        return technologies.find(t => t.id === parseInt(techId));
    }, [technologies, techId]);

    const updateStatus = (newStatus) => {
        if (technology) {
            updateTechnology(technology.id, { status: newStatus });
        }
    };

    const handleNotesChange = useCallback((e) => {
        if (technology) {
            updateTechnology(technology.id, { notes: e.target.value });
        }
    }, [technology, updateTechnology]);

    const handleDelete = () => {
        if (window.confirm(`Вы уверены, что хотите удалить технологию "${technology?.title}"?`)) {
            deleteTechnology(technology.id);
            navigate('/technologies');
        }
    };

    if (loading) return <div className="loading-state">Загрузка...</div>;
    if (error) return <div className="error-state">Ошибка: {error}</div>;

    if (!technology) {
        return (
            <div className="error-state">
                <h3>Технология не найдена</h3>
                <p>Технология с ID {techId} не существует или была удалена.</p>
                <Link to="/technologies" className="btn btn-info" style={{ marginTop: '10px' }}>
                    ← К списку технологий
                </Link>
            </div>
        );
    }

    const availableStatuses = ['not-started', 'in-progress', 'completed'];

    const getStatusClassName = (status) => {
        let className = 'btn status-btn';
        if (technology.status === status) {
            className += ` active-status active-status-${status}`;
        }
        return className;
    };

    return (
        <div className="technology-detail-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Link to="/technologies" className="btn btn-back">
                    ← Назад к списку
                </Link>
                
                <button 
                    onClick={handleDelete}
                    className="btn btn-danger"
                    style={{ padding: '8px 16px' }}
                >
                    🗑️ Удалить технологию
                </button>
            </div>

            <h1 className="detail-title">{technology.title}</h1>
            <p className="detail-category">
                <strong>Категория:</strong> {technology.category} 
                <span style={{ margin: '0 10px' }}>•</span>
                <strong>Сложность:</strong> {technology.difficulty}
            </p>

            <div className="detail-section">
                <h3>📄 Описание</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    {technology.description || 'Описание отсутствует.'}
                </p>
            </div>

            <div className="detail-section status-section">
                <h3>⭐ Статус изучения</h3>
                <p style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
                    Текущий статус:
                    <span
                        className={`card-status status-${technology.status}`}
                        style={{ marginLeft: '10px' }}
                    >
                        {technology.status.replace('-', ' ')}
                    </span>
                </p>

                <div className="status-buttons-group">
                    {availableStatuses.map(status => (
                        <button
                            key={status}
                            onClick={() => updateStatus(status)}
                            className={getStatusClassName(status)}
                        >
                            {status.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="detail-section notes-section">
                <h3>✏️ Мои заметки (Автосохранение)</h3>
                <textarea
                    value={technology.notes || ''} 
                    onChange={handleNotesChange}
                    placeholder="Ваши заметки по этой технологии..."
                    rows="10"
                    className="notes-textarea"
                />
                <small style={{ color: 'var(--color-subtext)', fontSize: '12px', display: 'block', marginTop: '5px' }}>
                    Заметки автоматически сохраняются при изменении
                </small>
            </div>

            <div className="detail-section">
                <h3>🔗 Дополнительные ресурсы</h3>
                {technology.resources && technology.resources.length > 0 ? (
                    <ul className="resource-list">
                        {technology.resources.map((res, index) => (
                            <li key={index}>
                                <a href={res} target="_blank" rel="noopener noreferrer">
                                    🔗 {res}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: 'var(--color-subtext)' }}>Ресурсы еще не добавлены.</p>
                )}
            </div>

            <div className="detail-section" style={{ 
                backgroundColor: 'rgba(0,0,0,0.02)', 
                padding: '20px', 
                borderRadius: '8px',
                marginTop: '30px'
            }}>
                <h3>📊 Метаданные</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div>
                        <strong>ID технологии:</strong>
                        <p>{technology.id}</p>
                    </div>
                    <div>
                        <strong>Дата создания:</strong>
                        <p>{technology.createdAt ? new Date(technology.createdAt).toLocaleDateString() : 'Не указана'}</p>
                    </div>
                    <div>
                        <strong>Всего ресурсов:</strong>
                        <p>{technology.resources ? technology.resources.length : 0}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnologyDetail;