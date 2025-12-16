// src/components/SearchWithDebounce.js

import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

function SearchWithDebounce({ onSearchChange, resultsCount, totalCount }) {
    const [inputValue, setInputValue] = useState('');
    // Используем кастомный хук Debounce
    const debouncedSearchTerm = useDebounce(inputValue, 500); 

    // Эффект, который вызывает функцию поиска только после задержки
    React.useEffect(() => {
        onSearchChange(debouncedSearchTerm);
    }, [debouncedSearchTerm, onSearchChange]);


    return (
        <div className="search-controls-container" style={{ flex: '1', minWidth: '300px' }}>
            <h3 className="section-title">Поиск технологий (Debounce)</h3>
            <input
                type="text"
                placeholder="Искать по названию, описанию или заметкам..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="search-input" 
            />
            <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                Найдено: **{resultsCount}** из {totalCount}
            </p>
        </div>
    );
}

export default SearchWithDebounce;