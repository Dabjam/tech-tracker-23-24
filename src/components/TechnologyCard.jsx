import React from 'react';
import { Link } from 'react-router-dom';

function TechnologyCard({ tech, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm(`Удалить "${tech.title}"?`)) {
      onDelete(tech.id);
    }
  };

  return (
    <div style={{ 
        backgroundColor: 'var(--color-card-bg)', // ИСПРАВЛЕНО
        padding: '20px', 
        borderRadius: '16px', 
        border: '1px solid var(--border-color)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        transition: '0.3s'
    }}>
      <Link to={`/technology/${tech.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '24px' }}>
            {tech.status === 'completed' ? '✅' : tech.status === 'in-progress' ? '🟡' : '📁'}
          </span>
          <div>
            <h3 style={{ margin: 0, color: 'var(--color-text)' }}>{tech.title}</h3>
            <p style={{ margin: '5px 0 0', color: 'var(--color-subtext)' }}>{tech.category}</p>
          </div>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={statusBadgeStyle(tech.status)}>
          {tech.status === 'completed' ? 'Изучено' : tech.status === 'in-progress' ? 'В процессе' : 'Не начато'}
        </span>
        <button onClick={handleDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'var(--color-subtext)' }}>
          🗑️
        </button>
      </div>
    </div>
  );
}

const statusBadgeStyle = (status) => ({
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: status === 'completed' ? 'rgba(46, 125, 50, 0.2)' : 'rgba(237, 108, 2, 0.2)',
    color: status === 'completed' ? '#4caf50' : '#ff9800'
});

export default TechnologyCard;