import React from 'react';
import { Link } from 'react-router-dom';

function TechnologyCard({ tech, onUpdate, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm(`Удалить "${tech.title}"?`)) {
      onDelete(tech.id);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to={`/technology/${tech.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '24px' }}>
            {tech.status === 'completed' ? '✅' : tech.status === 'in-progress' ? '🟡' : '📁'}
          </span>
          <div>
            <h3 style={{ margin: 0 }}>{tech.title}</h3>
            <p style={{ margin: '5px 0 0', color: '#64748b' }}>{tech.category}</p>
          </div>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={statusBadgeStyle(tech.status)}>
          {tech.status === 'completed' ? 'Изучено' : tech.status === 'in-progress' ? 'В процессе' : 'Не начато'}
        </span>
        <button onClick={handleDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#cbd5e1' }}>
          🗑️
        </button>
      </div>
    </div>
  );
}

const statusBadgeStyle = (status) => ({
  padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold',
  backgroundColor: status === 'completed' ? '#dcfce7' : status === 'in-progress' ? '#fef9c3' : '#f1f5f9',
  color: status === 'completed' ? '#15803d' : status === 'in-progress' ? '#a16207' : '#475569'
});

export default TechnologyCard;