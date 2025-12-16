// src/hooks/useDebounce.js

import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    // Состояние для хранения отложенного (debounced) значения
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Устанавливаем таймер для обновления debouncedValue после задержки
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Очистка таймера при каждом изменении 'value' (отмена предыдущего запроса)
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Зависит от значения и задержки

    return debouncedValue;
}

export default useDebounce;