import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TechContext = createContext();

export const TechProvider = ({ children }) => {
    const [technologies, setTechnologies] = useState([]);
    const LOCAL_STORAGE_KEY = 'techTrackerData';

    // Загрузка при старте
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            setTechnologies(JSON.parse(saved));
        }
    }, []);

    // Сохранение при каждом изменении
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(technologies));
    }, [technologies]);

    const deleteTechnology = useCallback((id) => {
        setTechnologies(prev => prev.filter(tech => tech.id !== id));
    }, []);

    const addTechnology = useCallback((tech) => {
        setTechnologies(prev => [...prev, { ...tech, id: Date.now() }]);
    }, []);

    return (
        <TechContext.Provider value={{ technologies, deleteTechnology, addTechnology }}>
            {children}
        </TechContext.Provider>
    );
};

export const useTech = () => useContext(TechContext);