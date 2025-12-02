// src/pages/Home.jsx

import React from 'react';
import QuickActions from '../components/QuickActions';
import FilterControls from '../components/FilterControls';
import SearchInput from '../components/SearchInput';
import TechnologyCard from '../components/TechnologyCard';

function Home({ 
    isLoading, error, technologies, activeFilter, 
    onToggleStatus, onFilterChange, searchQuery, 
    onSearchChange, filteredResults, onMarkAllCompleted, 
    onResetAllStatuses, onExportData
}) {
    
    const totalCount = technologies.length;

    if (isLoading) return <div className="loading-state">⏳ Загрузка данных из API...</div>;
    if (error) return <div className="error-state">❌ Ошибка: {error}</div>;

    return (
        <main className="main-content">
            <section className="controls-section">
                <QuickActions 
                    onMarkAllCompleted={onMarkAllCompleted}
                    onResetAllStatuses={onResetAllStatuses}
                    onExportData={onExportData}
                />
                
                <div className="filter-and-search">
                    <FilterControls 
                        activeFilter={activeFilter}
                        onFilterChange={onFilterChange}
                    />
                    <SearchInput 
                        searchQuery={searchQuery}
                        onSearchChange={onSearchChange}
                        resultCount={filteredResults.length}
                    />
                </div>
            </section>

            <section className="technology-list-section">
                <h2 className="section-title">
                    Список технологий ({filteredResults.length} из {totalCount})
                </h2>
                <div className="technology-list">
                    {filteredResults.map(tech => (
                        <TechnologyCard 
                            key={tech.id} 
                            tech={tech} 
                            onToggleStatus={onToggleStatus} 
                        />
                    ))}
                </div>
                {filteredResults.length === 0 && (
                    <p className="no-results">
                        Нет результатов, соответствующих критериям.
                    </p>
                )}
            </section>
        </main>
    );
}

export default Home;