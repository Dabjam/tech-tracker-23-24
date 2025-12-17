import { useState, useEffect, useCallback, useMemo } from 'react';

const LOCAL_STORAGE_KEY = 'techTrackerData'; 

const mockTechnologies = [
    { id: 1, title: 'React', description: 'Библиотека для создания пользовательских интерфейсов', category: 'frontend', difficulty: 'beginner', resources: ['https://react.dev'], status: 'completed', notes: 'Освоены хуки.' },
    { id: 2, title: 'Node.js', description: 'Среда выполнения JavaScript на сервере', category: 'backend', difficulty: 'intermediate', resources: ['https://nodejs.org'], status: 'in-progress', notes: 'Нужно разобраться с Express.' },
    { id: 3, title: 'TypeScript', description: 'Типизированное надмножество JavaScript', category: 'language', difficulty: 'intermediate', resources: ['https://www.typescriptlang.org'], status: 'not-started', notes: '' }
];

function useTechnologiesApi() {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const generateId = useCallback(() => {
        return Date.now() + Math.floor(Math.random() * 1000);
    }, []);

    const fetchTechnologies = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            const wasCleared = localStorage.getItem('dataCleared');
            
            if (storedData && storedData !== '[]' && !wasCleared) {
                const initialData = JSON.parse(storedData);
                const validatedData = initialData.map(tech => ({
                    ...tech,
                    id: Number(tech.id) || generateId()
                }));
                setTechnologies(validatedData);
            } else if (!wasCleared) {
                setTechnologies([]);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
            } else {
                setTechnologies([]);
            }
            
        } catch (err) {
            console.error('Ошибка загрузки данных:', err);
            setError('Не удалось загрузить данные.');
            setTechnologies([]);
        } finally {
            setLoading(false);
        }
    }, [generateId]);

    const addTechnology = useCallback(async (techData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const newId = generateId();
            
            const newTech = {
                id: newId,
                title: techData.title || '',
                category: techData.category || '',
                difficulty: techData.difficulty || 'beginner',
                status: techData.status || 'not-started',
                description: techData.description || '',
                notes: techData.notes || '',
                resources: Array.isArray(techData.resources) ? techData.resources : [],
                createdAt: new Date().toISOString()
            };

            setTechnologies(prev => [...prev, newTech]);
            
            return newTech;

        } catch (err) {
            console.error('Error adding technology:', err);
            throw new Error('Не удалось добавить технологию');
        }
    }, [generateId]);
    
    const updateTechnology = useCallback((techId, fieldsToUpdate) => {
        setTechnologies(prev => 
            prev.map(tech => 
                tech.id === Number(techId) ? { ...tech, ...fieldsToUpdate } : tech
            )
        );
    }, []);
    
    const deleteTechnology = useCallback((techId) => {
        setTechnologies(prev => prev.filter(tech => {
            const techIdNum = Number(techId);
            const currentTechId = Number(tech.id);
            return currentTechId !== techIdNum;
        }));
    }, []);
    
    const batchAddTechnologies = useCallback(async (techsArray) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const newTechs = techsArray.map(techData => ({
                id: generateId(),
                title: techData.title || '',
                category: techData.category || '',
                difficulty: techData.difficulty || 'beginner',
                status: techData.status || 'not-started',
                description: techData.description || '',
                notes: techData.notes || '',
                resources: Array.isArray(techData.resources) ? techData.resources : [],
                createdAt: new Date().toISOString()
            }));

            setTechnologies(prev => [...prev, ...newTechs]);
            
            return newTechs;

        } catch (err) {
            console.error('Error batch adding technologies:', err);
            throw new Error('Не удалось добавить технологии');
        }
    }, [generateId]);
    
    const deleteAllTechnologies = useCallback(() => {
        setTechnologies([]);
        localStorage.setItem('dataCleared', 'true');
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    }, []);
    
    const markAllCompleted = useCallback(() => {
        setTechnologies(prev => 
            prev.map(tech => ({ ...tech, status: 'completed' }))
        );
        alert('Все технологии отмечены как "Выполнено"!');
    }, []);
    
    const resetAllStatuses = useCallback(() => {
        setTechnologies(prev => 
            prev.map(tech => ({ ...tech, status: 'not-started' }))
        );
        alert('Все статусы сброшены на "Не начато"!');
    }, []);
    
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
    
    const stats = useMemo(() => {
        const completed = technologies.filter(t => t.status === 'completed').length;
        const total = technologies.length;
        const progressPercentage = total > 0 ? (completed / total) * 100 : 0;
        return { completed, total, progressPercentage };
    }, [technologies]);

    useEffect(() => {
        fetchTechnologies();
    }, [fetchTechnologies]);

    useEffect(() => {
        if (technologies.length > 0 || localStorage.getItem('dataCleared') === 'true') {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(technologies));
        }
    }, [technologies]);

    return {
        technologies,
        loading,
        error,
        stats,
        addTechnology,
        updateTechnology,
        deleteTechnology,
        deleteAllTechnologies,
        batchAddTechnologies,
        markAllCompleted,
        resetAllStatuses,
        exportTechnologiesAsJson,
        refetch: fetchTechnologies
    };
}

export default useTechnologiesApi;