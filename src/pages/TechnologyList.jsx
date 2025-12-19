import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import TechnologyCard from '../components/TechnologyCard';
import QuickActions from '../components/QuickActions';
import RoadmapImporter from '../components/RoadmapImporter';

function TechnologyList() {
    const api = useTechnologiesApi();
    const [searchQuery, setSearchQuery] = useState('');
    const isMobile = window.innerWidth < 768;

    const filteredTechnologies = api.technologies.filter(tech => 
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedTechnologies = [...filteredTechnologies].sort((a, b) => {
        const priority = { 'in-progress': 1, 'not-started': 2, 'completed': 3 };
        return priority[a.status] - priority[b.status];
    });

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 350px',
        gap: isMobile ? '20px' : '30px',
        padding: isMobile ? '15px' : '20px'
    };

    const headerStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        marginBottom: '25px',
        gap: isMobile ? '15px' : '0'
    };

    const headingStyle = {
        color: 'var(--color-text)',
        fontSize: isMobile ? '1.8rem' : '2rem',
        margin: '0'
    };

    const buttonStyle = {
        padding: isMobile ? '12px 18px' : '10px 20px',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        width: isMobile ? '100%' : 'auto',
        fontSize: isMobile ? '14px' : '16px'
    };

    const searchStyle = {
        width: '100%',
        padding: isMobile ? '12px' : '15px',
        borderRadius: '12px',
        border: '2px solid var(--border-color)',
        fontSize: isMobile ? '14px' : '16px',
        outline: 'none',
        background: 'var(--color-card-bg)',
        color: 'var(--color-text)',
        marginBottom: '20px'
    };

    return (
        <div style={containerStyle}>
            <section>
                <div style={headerStyle}>
                    <h1 style={headingStyle}>Мои технологии</h1>
                    <Link to="/add" className="btn btn-primary touch-btn" style={buttonStyle}>
                        ➕ Добавить технологию
                    </Link>
                </div>

                <div>
                    <input 
                        type="text"
                        placeholder="Поиск по названию..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={searchStyle}
                    />
                </div>

                <div style={{ display: 'grid', gap: '20px' }}>
                    {sortedTechnologies.length > 0 ? (
                        sortedTechnologies.map(tech => (
                            <TechnologyCard 
                                key={tech.id} 
                                tech={tech} 
                                onDelete={api.deleteTechnology} 
                            />
                        ))
                    ) : (
                        <div style={{ 
                            textAlign: 'center', 
                            padding: isMobile ? '30px 15px' : '50px',
                            background: 'var(--color-card-bg)', 
                            color: 'var(--color-text)',       
                            borderRadius: '15px',
                            fontSize: isMobile ? '14px' : '16px'
                        }}>
                            Ничего не найдено
                        </div>
                    )}
                </div>
            </section>

            <aside style={{ display: isMobile ? 'none' : 'block' }}>
                <QuickActions 
                    technologies={api.technologies}
                    updateAllStatuses={api.updateAllStatuses}
                    exportTechnologiesAsJson={api.exportTechnologiesAsJson}
                />
                <RoadmapImporter batchAddTechnologies={api.batchAddTechnologies} />
            </aside>
        </div>
    );
}

export default TechnologyList;