import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import TechnologyCard from '../components/TechnologyCard';
import QuickActions from '../components/QuickActions';
import RoadmapImporter from '../components/RoadmapImporter';

function TechnologyList() {
    const api = useTechnologiesApi();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTechnologies = api.technologies.filter(tech => 
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedTechnologies = [...filteredTechnologies].sort((a, b) => {
        const priority = { 'in-progress': 1, 'not-started': 2, 'completed': 3 };
        return priority[a.status] - priority[b.status];
    });

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px', padding: '20px' }}>
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <h1>Мои технологии</h1>
                    <Link to="/add" className="btn btn-primary" style={{ padding: '10px 20px', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                        ➕ Добавить технологию
                    </Link>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <input 
                        type="text"
                        placeholder="🔍 Поиск по названию или категории..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '16px', outline: 'none' }}
                    />
                </div>

                <div style={{ display: 'grid', gap: '20px' }}>
                    {sortedTechnologies.length > 0 ? (
                        sortedTechnologies.map(tech => (
                            <TechnologyCard 
                                key={tech.id} 
                                tech={tech} 
                                onUpdate={api.setTechnologies} 
                                onDelete={api.deleteTechnology} 
                            />
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '15px' }}>Ничего не найдено</div>
                    )}
                </div>
            </section>

            <aside>
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