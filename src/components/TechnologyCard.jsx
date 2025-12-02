// src/components/TechnologyCard.jsx

import React from 'react';

function TechnologyCard({ tech, onToggleStatus }) { 
    
    const statusText = {
        'not-started': 'Не начато',
        'in-progress': 'В процессе',
        'completed': 'Выполнено'
    };

    const statusClass = `status-${tech.status}`;

    return (
        <div 
            className={`tech-card ${statusClass}`} 
            onClick={() => onToggleStatus(tech.id)}
        >
            <h3 className="card-title">{tech.title}</h3> 
            <p className="card-category">{tech.category}</p>
            <span className="card-status">
                {statusText[tech.status]}
            </span>
        </div>
    );
}

export default TechnologyCard;