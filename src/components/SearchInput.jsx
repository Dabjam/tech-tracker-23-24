// src/components/SearchInput.jsx

import React from 'react'; // <--- Важно импортировать React

function SearchInput({ searchQuery, onSearchChange, resultCount }) {
    return (
        <div className="search-input-container">
            <h2 className="section-title">Поиск технологий</h2>
            <input
                type="text"
                placeholder="Найти по названию или описанию..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
            />
            <p className="search-results-count">Найдено результатов: {resultCount}</p>
        </div>
    );
}

// *** Оборачиваем в React.memo для стабилизации и сохранения фокуса ***
export default React.memo(SearchInput);