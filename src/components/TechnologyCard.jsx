import React from 'react';
import { Link } from 'react-router-dom';

function TechnologyCard({ tech, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm(`Удалить "${tech.title}"?`)) {
      onDelete(tech.id);
    }
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div style={{ 
        backgroundColor: 'var(--color-card-bg)', 
        padding: '16px', 
        borderRadius: '12px', 
        border: '1px solid var(--border-color)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        gap: '10px',
        transition: '0.3s',
        flexWrap: isMobile ? 'wrap' : 'nowrap'
    }}>
      <Link to={`/technology/${tech.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '15px' }}>
          <span style={{ fontSize: isMobile ? '20px' : '24px', flexShrink: 0 }}>
            {tech.status === 'completed' ? '✅' : tech.status === 'in-progress' ? '🟡' : '📁'}
          </span>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: 0, color: 'var(--color-text)', fontSize: isMobile ? '16px' : '18px', wordBreak: 'break-word' }}>{tech.title}</h3>
            <p style={{ margin: '5px 0 0', color: 'var(--color-subtext)', fontSize: isMobile ? '12px' : '14px' }}>{tech.category}</p>
          </div>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '15px', flexShrink: 0 }}>
        <span style={statusBadgeStyle(tech.status)}>
          {tech.status === 'completed' ? 'Изучено' : tech.status === 'in-progress' ? 'В процессе' : 'Не начато'}
        </span>
        <button onClick={handleDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: isMobile ? '16px' : '18px', color: 'var(--color-subtext)', padding: 0 }}>
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