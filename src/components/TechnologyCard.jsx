import React from 'react';
import { Link } from 'react-router-dom';

function TechnologyCard({ tech, onDelete }) {
    
    const statusText = {
        'not-started': 'Не начато',
        'in-progress': 'В процессе',
        'completed': 'Выполнено'
    };

    const statusClass = `status-${tech.status}`;

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm(`Удалить технологию "${tech.title}"?`)) {
            onDelete(tech.id);
        }
    };

    return (
        <Link to={`/technology/${tech.id}`} className={`tech-card ${statusClass}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 className="card-title">{tech.title}</h3>
                <button 
                    onClick={handleDelete}
                    className="delete-btn"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-danger)',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: '5px 8px',
                        borderRadius: '4px'
                    }}
                    title="Удалить технологию"
                >
                    ×
                </button>
            </div>
            <p className="card-category">{tech.category}</p>
            <p className="card-description">{tech.description || 'Нет описания.'}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span className={`card-status status-${tech.status}`}>
                    {statusText[tech.status]}
                </span>
                <span className="details-link">
                    Подробнее →
                </span>
            </div>
        </Link>
    );
}

export default TechnologyCard;