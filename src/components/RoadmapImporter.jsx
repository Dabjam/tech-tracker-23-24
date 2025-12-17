// src/components/RoadmapImporter.jsx

import React, { useState, useRef } from 'react';

function RoadmapImporter({ addTechnology, batchAddTechnologies }) {
    const [importing, setImporting] = useState(false);
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');

    // Импорт примеров
    const handleExampleImport = async () => {
        if (!batchAddTechnologies) return alert("Ошибка: функция batchAddTechnologies не предоставлена.");
        
        try {
            setImporting(true);

            // Примерные данные
            const roadmapData = [
                { 
                    title: 'GraphQL', 
                    description: 'Язык запросов для API', 
                    category: 'Backend', 
                    difficulty: 'intermediate',
                    status: 'not-started',
                    notes: 'Изучить основы GraphQL, схемы, запросы и мутации'
                },
                { 
                    title: 'Docker', 
                    description: 'Платформа для контейнеризации', 
                    category: 'DevOps', 
                    difficulty: 'intermediate',
                    status: 'in-progress',
                    notes: 'Освоить Dockerfile, Docker Compose, управление контейнерами',
                    resources: ['https://docs.docker.com']
                },
                { 
                    title: 'TypeScript', 
                    description: 'Типизированное надмножество JavaScript', 
                    category: 'Language', 
                    difficulty: 'intermediate',
                    status: 'completed',
                    notes: 'Пройден базовый курс, нужно практиковаться на реальных проектах'
                },
                { 
                    title: 'Next.js', 
                    description: 'React-фреймворк для продакшена', 
                    category: 'Frontend', 
                    difficulty: 'advanced',
                    status: 'in-progress',
                    notes: 'Изучить Server Components, API Routes, оптимизацию'
                },
                { 
                    title: 'MongoDB', 
                    description: 'NoSQL база данных', 
                    category: 'Database', 
                    difficulty: 'intermediate',
                    status: 'not-started',
                    notes: 'Планирую изучить документную модель, агрегации'
                }
            ];

            // Используем пакетное добавление
            const result = await batchAddTechnologies(roadmapData);
            
            alert(`✅ Успешно импортировано ${result.length} технологий!\n\nТеперь каждая технология имеет уникальный ID и может быть удалена отдельно.`);

        } catch (err) {
            alert(`❌ Ошибка импорта: ${err.message || 'Не удалось загрузить дорожную карту'}`);
        } finally {
            setImporting(false);
        }
    };

    // Импорт из файла
    const handleFileImport = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        setFileName(file.name);
        setImporting(true);
        
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            try {
                const content = e.target.result;
                let data;
                
                try {
                    data = JSON.parse(content);
                } catch (parseError) {
                    throw new Error('Файл должен содержать валидный JSON');
                }
                
                // Получаем массив технологий
                let technologies = [];
                if (Array.isArray(data)) {
                    technologies = data;
                } else if (data.technologies && Array.isArray(data.technologies)) {
                    technologies = data.technologies;
                } else if (data.data && Array.isArray(data.data)) {
                    technologies = data.data;
                } else {
                    throw new Error('Формат данных не распознан. Ожидается массив или объект с полем "technologies"');
                }
                
                // Нормализуем данные
                const normalizedTechs = technologies.map(techData => ({
                    title: techData.title || techData.name || 'Без названия',
                    category: techData.category || techData.type || 'Прочее',
                    difficulty: techData.difficulty || techData.level || 'beginner',
                    status: techData.status || 'not-started',
                    description: techData.description || '',
                    notes: techData.notes || techData.description || '',
                    resources: Array.isArray(techData.resources) ? techData.resources : 
                             techData.url ? [techData.url] : []
                }));
                
                // Используем пакетное добавление
                const result = await batchAddTechnologies(normalizedTechs);
                
                // Очищаем input
                event.target.value = null;
                setFileName('');
                
                alert(`✅ Импорт завершен!\n\nУспешно добавлено ${result.length} технологий с уникальными ID.`);
                
            } catch (err) {
                alert(`❌ Ошибка при импорте файла: ${err.message}`);
            } finally {
                setImporting(false);
            }
        };
        
        reader.onerror = () => {
            alert('❌ Ошибка чтения файла');
            setImporting(false);
            setFileName('');
        };
        
        reader.readAsText(file);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="import-container">
            <h3 className="section-title">Импорт технологий</h3>
            
            <div style={{ 
                marginBottom: '15px', 
                padding: '10px', 
                backgroundColor: 'rgba(90, 125, 255, 0.05)', 
                borderRadius: '8px',
                fontSize: '14px'
            }}>
                <p style={{ margin: '0 0 10px 0' }}>
                    <strong>📥 Импорт примеров:</strong> Добавить тестовые данные с уникальными ID
                </p>
                
                <p style={{ margin: '0' }}>
                    <strong>📂 Импорт из файла:</strong> Загрузить свои технологии из JSON-файла
                </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                    onClick={handleExampleImport} 
                    disabled={importing}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                >
                    {importing ? (
                        <>
                            <span className="loading-spinner" style={{
                                display: 'inline-block',
                                width: '16px',
                                height: '16px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderTopColor: 'white',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                marginRight: '8px'
                            }}></span>
                            Идет импорт...
                        </>
                    ) : (
                        '📥 Импорт пример дорожной карты'
                    )}
                </button>
                
                <div style={{ position: 'relative' }}>
                    <button 
                        onClick={triggerFileInput} 
                        disabled={importing}
                        className="btn btn-success"
                        style={{ width: '100%' }}
                    >
                        📂 Импорт из JSON-файла
                    </button>
                    
                    {fileName && (
                        <div style={{
                            position: 'absolute',
                            top: '-25px',
                            left: '0',
                            right: '0',
                            fontSize: '12px',
                            color: 'var(--color-primary)',
                            textAlign: 'center'
                        }}>
                            Выбран: {fileName}
                        </div>
                    )}
                    
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileImport}
                        accept=".json,application/json"
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
            
            <div style={{ 
                marginTop: '15px', 
                padding: '10px', 
                backgroundColor: 'rgba(0, 0, 0, 0.03)', 
                borderRadius: '8px',
                fontSize: '12px',
                color: 'var(--color-subtext)'
            }}>
                <strong>✅ Исправлено:</strong> Теперь каждая импортированная технология получает уникальный ID и может быть удалена отдельно.
            </div>
        </div>
    );
}

export default RoadmapImporter;