// src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function Home() {
    const { technologies } = useTechnologiesApi();

    const completedCount = technologies.filter(tech => tech.status === 'completed').length;
    const totalCount = technologies.length;
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    
    return (
        <div className="home-page">
            <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Добро пожаловать в Трекер Технологий!</h2>
            
            <div className="progress-card">
                <h3>Ваш общий прогресс</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#4a90e2', margin: '10px 0' }}>
                    {progressPercentage.toFixed(1)}%
                </p>
                <p>Вы изучили **{completedCount}** из **{totalCount}** запланированных технологий.</p>
                <div className="progress-bar-container" style={{ margin: '15px 0', height: '15px' }}>
                    <div 
                        className="progress-bar" 
                        style={{ width: `${progressPercentage}%`, background: '#50e3c2', borderRadius: '5px' }}
                    ></div> 
                </div>
            </div>

            <div className="home-links">
                <Link to="/technologies" className="btn btn-info">Перейти к списку</Link>
                <Link to="/stats" className="btn btn-warning">Посмотреть статистику</Link>
            </div>
            
            <p style={{ marginTop: '20px', color: '#666' }}>
                Используйте навигацию выше, чтобы начать работу с трекером.
            </p>
        </div>
    );
}

export default Home;