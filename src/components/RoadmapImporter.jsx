// src/components/RoadmapImporter.js

import React, { useState } from 'react';
// Предполагаем, что addTechnology передается из useTechnologiesApi через TechnologyList
function RoadmapImporter({ addTechnology }) {
    const [importing, setImporting] = useState(false);

    const handleExampleImport = async () => {
        if (!addTechnology) return alert("Ошибка: addTechnology не предоставлена.");
        
        try {
            setImporting(true);

            // Имитация загрузки дорожной карты из API
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            // Mock данные для импорта
            const roadmapData = {
                technologies: [
                    { title: 'GraphQL', description: 'Язык запросов для API', category: 'backend', difficulty: 'intermediate' },
                    { title: 'Docker', description: 'Платформа для контейнеризации', category: 'devops', difficulty: 'intermediate' }
                ]
            };

            for (const tech of roadmapData.technologies) {
                await addTechnology(tech);
            }

            alert(`Успешно импортировано ${roadmapData.technologies.length} технологий: ${roadmapData.technologies.map(t => t.title).join(', ')}`);

        } catch (err) {
            alert(`Ошибка импорта: Не удалось загрузить дорожную карту`);
        } finally {
            setImporting(false);
        }
    };

    return (
        <div className="import-container" style={{ flex: '1', minWidth: '250px' }}>
            <h3 className="section-title">Импорт дорожной карты</h3>
            <button 
                onClick={handleExampleImport} 
                disabled={importing}
                className="btn btn-primary"
            >
                {importing ? 'Импорт...' : 'Импорт пример дорожной карты (Mock)'}
            </button>
        </div>
    );
}

export default RoadmapImporter;