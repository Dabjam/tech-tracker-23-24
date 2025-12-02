// src/utils/hooks.js

import { useState, useEffect } from 'react';

/**
 * Хук для отложенного обновления значения (Debounce)
 * @param {string} value - Исходное значение (например, поисковый запрос)
 * @param {number} delay - Задержка в миллисекундах
 * @returns {string} Значение, которое обновится только после задержки
 */
export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Устанавливаем таймер для обновления значения
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Очистка предыдущего таймера при изменении value
        // Это гарантирует, что предыдущий ввод отменяется, 
        // и обновление происходит только после того, как ввод прекратился (Debounce).
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}