// src/components/Navigation.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
    const location = useLocation();

    // Функция для определения активного класса
    const getLinkClass = (path) => 
        `nav-link ${location.pathname === path ? 'active-link' : ''}`;

    return (
        <nav className="main-nav">
            <Link to="/" className={getLinkClass('/')}>
                Главная
            </Link>
            <Link to="/technologies" className={getLinkClass('/technologies')}>
                Все технологии
            </Link>
            <Link to="/add" className={getLinkClass('/add')}>
                Добавить технологию
            </Link>
            <Link to="/stats" className={getLinkClass('/stats')}>
                📊 Статистика
            </Link>
            <Link to="/settings" className={getLinkClass('/settings')}>
                ⚙️ Настройки
            </Link>
        </nav>
    );
}

export default Navigation;