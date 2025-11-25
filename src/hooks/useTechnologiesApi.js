// src/hooks/useTechnologiesApi.js

import { useState, useEffect } from 'react';

// Имитация внешних данных
const MOCK_API_DATA = [
    { id: 1, title: 'HTML & CSS Basics', description: 'Основы разметки и стилизации', status: 'completed' },
    { id: 2, title: 'JavaScript ES6+', description: 'Современный синтаксис JS', status: 'in-progress' },
    { id: 3, title: 'React Hooks (useState)', description: 'Изучение состояния компонентов', status: 'not-started' },
    { id: 4, title: 'Redux Toolkit', description: 'Глобальное управление состоянием', status: 'not-started' },
    { id: 5, title: 'Node.js Basics', description: 'Основы серверной разработки', status: 'in-progress' },
];

function useTechnologiesApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Функция для имитации запроса
  const fetchTechnologies = () => {
    setLoading(true);
    setError(null);

    // Имитация задержки сети (3 секунды)
    const delay = 3000; 
    
    setTimeout(() => {
        // Имитация успешного ответа
        setData(MOCK_API_DATA);
        setLoading(false);

        // Для демонстрации ошибки можно раскомментировать:
        // setError("Не удалось загрузить данные из API.");
        // setData(null);
        // setLoading(false);

    }, delay);
  };

  // Выполнение запроса при монтировании компонента
  useEffect(() => {
    fetchTechnologies();
  }, []); // Пустой массив зависимостей - запуск один раз

  // Возвращаем данные, состояние загрузки и ошибку
  return { technologies: data, loading, error, refetch: fetchTechnologies };
}

export default useTechnologiesApi;