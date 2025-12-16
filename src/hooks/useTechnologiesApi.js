// src/hooks/useTechnologiesApi.js

import { useState, useEffect, useCallback, useMemo } from 'react';

// Имитируем загрузку из localStorage, чтобы сохранить прогресс
const LOCAL_STORAGE_KEY = 'techTrackerData'; 

// Мок данные (если API не используется) - для удобства инициализации, если localStorage пуст
const mockTechnologies = [
    { id: 1, title: 'React', description: 'Библиотека для создания пользовательских интерфейсов', category: 'frontend', difficulty: 'beginner', resources: ['https://react.dev'], status: 'completed', notes: 'Освоены хуки.' },
    { id: 2, title: 'Node.js', description: 'Среда выполнения JavaScript на сервере', category: 'backend', difficulty: 'intermediate', resources: ['https://nodejs.org'], status: 'in-progress', notes: 'Нужно разобраться с Express.' },
    { id: 3, title: 'TypeScript', description: 'Типизированное надмножество JavaScript', category: 'language', difficulty: 'intermediate', resources: ['https://www.typescriptlang.org'], status: 'not-started', notes: '' }
];

function useTechnologiesApi() {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Загрузка технологий (API + localStorage)
    const fetchTechnologies = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Имитация задержки
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            const initialData = storedData ? JSON.parse(storedData) : mockTechnologies;

            // Убедитесь, что ID корректны (числа)
            setTechnologies(initialData.map(tech => ({ ...tech, id: Number(tech.id) })));
            
        } catch (err) {
            setError('Не удалось загрузить данные. Используются мок-данные.');
            setTechnologies(mockTechnologies); 
        } finally {
            setLoading(false);
        }
    }, []);

    // 2. Добавление технологии (CREATE)
    // 2. Добавление технологии (CREATE)
const addTechnology = useCallback(async (techData) => {
    try {
        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Находим максимальный ID
        const maxId = technologies.reduce((max, tech) => Math.max(max, tech.id), 0);
        
        const newTech = {
            id: maxId + 1,
            title: techData.title || '',
            category: techData.category || '',
            difficulty: techData.difficulty || 'beginner',
            status: techData.status || 'not-started',
            description: techData.description || '',
            notes: techData.notes || '',
            resources: Array.isArray(techData.resources) ? techData.resources : [],
            createdAt: new Date().toISOString()
        };

        // Обновляем состояние
        setTechnologies(prev => [...prev, newTech]);
        
        return newTech;

    } catch (err) {
        console.error('Error adding technology:', err);
        throw new Error('Не удалось добавить технологию');
    }
}, [technologies]);
    
    // 3. Обновление статуса/заметок/других полей (UPDATE)
    const updateTechnology = useCallback((techId, fieldsToUpdate) => {
        setTechnologies(prev => 
            prev.map(tech => 
                tech.id === Number(techId) ? { ...tech, ...fieldsToUpdate } : tech
            )
        );
    }, []);
    
    // 4. Удаление технологии (DELETE)
    const deleteTechnology = useCallback((techId) => {
        setTechnologies(prev => prev.filter(tech => tech.id !== Number(techId)));
    }, []);
    
    // --- Пакетные операции (Quick Actions) ---
    
    // 5. Отметить все как выполненные
    const markAllCompleted = useCallback(() => {
        setTechnologies(prev => 
            prev.map(tech => ({ ...tech, status: 'completed' }))
        );
        alert('Все технологии отмечены как "Выполнено"!');
    }, []);
    
    // 6. Сбросить все статусы (на "Не начато")
    const resetAllStatuses = useCallback(() => {
        setTechnologies(prev => 
            prev.map(tech => ({ ...tech, status: 'not-started' }))
        );
        alert('Все статусы сброшены на "Не начато"!');
    }, []);
    
    // 7. Экспорт данных в JSON
    const exportTechnologiesAsJson = useCallback(() => {
        const jsonString = JSON.stringify(technologies, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tech_tracker_export_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [technologies]);
    
    
    // --- Дополнительные данные ---
    
    const stats = useMemo(() => {
        const completed = technologies.filter(t => t.status === 'completed').length;
        const total = technologies.length;
        const progressPercentage = total > 0 ? (completed / total) * 100 : 0;
        return { completed, total, progressPercentage };
    }, [technologies]);


    // Эффект: загрузка при монтировании
    useEffect(() => {
        fetchTechnologies();
    }, [fetchTechnologies]);

    // Эффект: сохранение в localStorage при изменении
    useEffect(() => {
        if (technologies.length > 0) {
             localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(technologies));
        }
    }, [technologies]);


    return {
        technologies,
        loading,
        error,
        stats, // Добавлены посчитанные статистики
        addTechnology,
        updateTechnology,
        deleteTechnology, // Добавлен метод удаления
        markAllCompleted, // Добавлен метод пакетного обновления
        resetAllStatuses, // Добавлен метод пакетного сброса
        exportTechnologiesAsJson, // Добавлен метод экспорта
        refetch: fetchTechnologies // Добавлен для удобства, если нужно обновить список 
    };
}

export default useTechnologiesApi;