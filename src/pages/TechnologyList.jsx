// src/pages/TechnologyList.jsx

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import TechnologyCard from '../components/TechnologyCard';
import RoadmapImporter from '../components/RoadmapImporter';
import SearchWithDebounce from '../components/SearchWithDebounce'; 
import FilterControls from '../components/FilterControls';
import QuickActions from '../components/QuickActions';

function TechnologyList() {
    const { 
        technologies, 
        loading, 
        error, 
        addTechnology, 
        deleteTechnology, // Добавлено: функция удаления
        markAllCompleted,
        resetAllStatuses,
        exportTechnologiesAsJson
    } = useTechnologiesApi();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredTechnologies = useMemo(() => {
        let currentList = technologies;

        if (activeFilter !== 'all') {
            currentList = currentList.filter(tech => tech.status === activeFilter);
        }
        
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            currentList = currentList.filter(tech => 
                (tech.title || '').toLowerCase().includes(lowerCaseSearchTerm) ||
                (tech.description || '').toLowerCase().includes(lowerCaseSearchTerm) ||
                (tech.notes || '').toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        return currentList;
    }, [technologies, activeFilter, searchTerm]);

    const handleDelete = (techId) => {
        deleteTechnology(techId);
    };

    if (loading) return <div className="loading-state">Загрузка технологий...</div>;
    if (error) return <div className="error-state">Ошибка загрузки: {error}</div>;

    const totalCount = technologies.length;
    
    return (
        <div className="technology-list-page">
            <h2>📚 Моя дорожная карта</h2>
            <Link to="/add" className="btn btn-primary" style={{ marginBottom: '20px' }}>
                + Добавить новую технологию
            </Link>

            <div className="controls-container">
                <SearchWithDebounce 
                    onSearchChange={setSearchTerm} 
                    resultsCount={filteredTechnologies.length}
                    totalCount={totalCount}
                />
                
                <FilterControls 
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />
            </div>
            
            <div className="quick-actions-and-import-container">
                <QuickActions 
                    onMarkAllCompleted={markAllCompleted}
                    onResetAllStatuses={resetAllStatuses}
                    onExportData={exportTechnologiesAsJson}
                />
                <RoadmapImporter addTechnology={addTechnology} />
            </div>

            <div className="technology-list">
                {filteredTechnologies.map(tech => (
                    <TechnologyCard 
                        key={tech.id} 
                        tech={tech}
                        onDelete={handleDelete} // Передаем функцию удаления
                    />
                ))}
            </div>

            {filteredTechnologies.length === 0 && (
                <div className="empty-state">
                    Технологий пока нет или они не соответствуют поиску/фильтру.
                    <Link to="/add" className="btn btn-info" style={{ marginTop: '10px' }}>
                        Добавить первую технологию
                    </Link>
                </div>
            )}
        </div>
    );
}

export default TechnologyList;