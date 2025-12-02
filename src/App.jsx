import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';
import FilterControls from './components/FilterControls';
import SearchInput from './components/SearchInput';
// Импорт страниц
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';

import { INITIAL_DATA } from './data/initialData';
import { useDebounce } from './utils/hooks'; 

// Имитация данных API
const API_MOCK_DATA = [
    { id: 7, title: 'GraphQL', status: 'not-started', category: 'Backend', description: 'Язык запросов для API.' },
    { id: 8, title: 'AWS Basics', status: 'not-started', category: 'DevOps', description: 'Основы облачных вычислений Amazon.' },
];

function App() {
    const [technologies, setTechnologies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // --- Логика API и Загрузка данных (Пр. 24) ---
    useEffect(() => {
        setIsLoading(true);
        setError(null);
        
        const timer = setTimeout(() => {
            try {
                const mergedData = [...INITIAL_DATA, ...API_MOCK_DATA];
                setTechnologies(mergedData);
                setIsLoading(false);
            } catch (err) {
                setError("Ошибка загрузки данных.");
                setIsLoading(false);
            }
        }, 1500); 

        return () => clearTimeout(timer);
    }, []);

    // --- Debounce для поиска (Пр. 24) ---
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // --- Логика Обновления и Действий ---
    const toggleTechnologyStatus = (techId) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => {
                if (tech.id === techId) {
                    let newStatus = '';
                    if (tech.status === 'not-started') newStatus = 'in-progress';
                    else if (tech.status === 'in-progress') newStatus = 'completed';
                    else newStatus = 'not-started';
                    return { ...tech, status: newStatus };
                }
                return tech;
            })
        );
    };

    const markAllCompleted = () => { setTechnologies(prevTech => prevTech.map(tech => ({ ...tech, status: 'completed' }))); };
    const resetAllStatuses = () => { setTechnologies(prevTech => prevTech.map(tech => ({ ...tech, status: 'not-started' }))); };

    const handleExportData = () => { /* ... (логика экспорта) ... */
        const dataStr = JSON.stringify(technologies, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'technology_tracker_export.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('Данные экспортированы в technology_tracker_export.json');
    };

    // --- Логика Фильтрации и Поиска ---
    const filteredResults = useMemo(() => {
        if (isLoading) return [];

        const filteredByStatus = technologies.filter(tech => {
            if (activeFilter === 'all') return true;
            return tech.status === activeFilter;
        });

        if (!debouncedSearchQuery) return filteredByStatus;

        const query = debouncedSearchQuery.toLowerCase();
        
        return filteredByStatus.filter(tech =>
            tech.title.toLowerCase().includes(query) ||
            (tech.description && tech.description.toLowerCase().includes(query))
        );
    }, [technologies, activeFilter, debouncedSearchQuery, isLoading]);

    // --- Расчет Прогресс-бара ---
    const completedCount = technologies.filter(tech => tech.status === 'completed').length;
    const totalCount = technologies.length;
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    // --- Компонент Главной страницы ---
    const HomePage = () => {
        if (isLoading) return <div className="loading-state">⏳ Загрузка данных из API...</div>;
        if (error) return <div className="error-state">❌ Ошибка: {error}</div>;

        return (
            <main className="main-content">
                <section className="controls-section">
                    <QuickActions 
                        onMarkAllCompleted={markAllCompleted}
                        onResetAllStatuses={resetAllStatuses}
                        onExportData={handleExportData}
                    />
                    
                    <div className="filter-and-search">
                        <FilterControls 
                            activeFilter={activeFilter}
                            onFilterChange={(val) => {
                                // Важно: Сброс поиска при смене фильтра
                                setSearchQuery(''); 
                                setActiveFilter(val);
                            }}
                        />
                        {/* Здесь нет сброса, только обновление поискового запроса */}
                        <SearchInput 
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery} 
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
                                onToggleStatus={toggleTechnologyStatus} 
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
    };

    return (
        <div className="app-container">
            <Header progressPercentage={progressPercentage} />
            
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/statistics" element={<Statistics technologies={technologies} />} />
                <Route path="/settings" element={<Settings onResetAllStatuses={resetAllStatuses} />} />
            </Routes>
        </div>
    );
}

export default App;