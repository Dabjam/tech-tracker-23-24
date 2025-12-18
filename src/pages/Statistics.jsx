import React, { useMemo } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

// Вспомогательный компонент для гистограммы по статусам
const StatusHistogram = ({ stats }) => {
    const total = stats.completed + stats['in-progress'] + stats['not-started'];
    
    if (total === 0) return <p>Данные отсутствуют</p>;

    const data = [
        { label: 'Выполнено', value: stats.completed, color: 'var(--color-success)' },
        { label: 'В процессе', value: stats['in-progress'], color: 'var(--color-warning)' },
        { label: 'Не начато', value: stats['not-started'], color: 'var(--color-danger)' }
    ];

    const maxValue = Math.max(...data.map(item => item.value));
    const maxHeight = 180;

    return (
        <div className="chart-container">
            <svg width="100%" height="250" style={{ overflow: 'visible' }}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <line
                        key={`grid-${i}`}
                        x1="0"
                        y1={50 + i * 40}
                        x2="100%"
                        y2={50 + i * 40}
                        stroke="#e0e0e0"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                    />
                ))}

                {data.map((item, index) => {
                    const barWidth = 60;
                    const gap = 40;
                    const x = 50 + index * (barWidth + gap);
                    const height = maxValue > 0 ? (item.value / maxValue) * maxHeight : 0;
                    const y = 200 - height;

                    return (
                        <g key={item.label}>
                            <rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={height}
                                fill={item.color}
                                rx="4"
                                ry="4"
                                className="histogram-bar"
                                style={{ transition: 'height 0.8s ease' }}
                            />
                            
                            <text
                                x={x + barWidth / 2}
                                y={y - 10}
                                textAnchor="middle"
                                fill="var(--color-text)"
                                fontWeight="bold"
                                fontSize="14"
                            >
                                {item.value}
                            </text>
                            
                            <text
                                x={x + barWidth / 2}
                                y={225}
                                textAnchor="middle"
                                fill="var(--color-subtext)"
                                fontSize="12"
                            >
                                {item.label}
                            </text>
                        </g>
                    );
                })}

                <line
                    x1="40"
                    y1="50"
                    x2="40"
                    y2="200"
                    stroke="#333"
                    strokeWidth="2"
                />

                <line
                    x1="40"
                    y1="200"
                    x2="100%"
                    y2="200"
                    stroke="#333"
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
};

// Вспомогательный компонент для гистограммы по категориям
const CategoryHistogram = ({ categoryStats }) => {
    const categories = Object.entries(categoryStats);
    
    if (categories.length === 0) return <p>Категории не определены</p>;

    const sortedData = categories
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);

    const maxValue = Math.max(...sortedData.map(item => item.count));
    const maxHeight = 180;

    const colors = [
        '#5a7dff', '#ff6b6b', '#4ecdc4', '#ffd166', '#06d6a0',
        '#118ab2', '#ef476f', '#073b4c'
    ];

    return (
        <div className="chart-container">
            <svg width="100%" height="300" style={{ overflow: 'visible' }}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <line
                        key={`cat-grid-${i}`}
                        x1="0"
                        y1={50 + i * 40}
                        x2="100%"
                        y2={50 + i * 40}
                        stroke="#e0e0e0"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                    />
                ))}

                {sortedData.map((item, index) => {
                    const barWidth = 50;
                    const gap = 20;
                    const x = 60 + index * (barWidth + gap);
                    const height = maxValue > 0 ? (item.count / maxValue) * maxHeight : 0;
                    const y = 200 - height;
                    const color = colors[index % colors.length];

                    return (
                        <g key={item.name}>
                            <rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={height}
                                fill={color}
                                rx="4"
                                ry="4"
                                className="histogram-bar"
                                style={{ transition: 'height 0.8s ease' }}
                            />
                            
                            <text
                                x={x + barWidth / 2}
                                y={y - 10}
                                textAnchor="middle"
                                fill="var(--color-text)"
                                fontWeight="bold"
                                fontSize="14"
                            >
                                {item.count}
                            </text>
                            
                            <text
                                x={x + barWidth / 2}
                                y={225}
                                textAnchor="end"
                                fill="var(--color-subtext)"
                                fontSize="11"
                                transform={`rotate(-45, ${x + barWidth / 2}, 225)`}
                            >
                                {item.name}
                            </text>
                        </g>
                    );
                })}

                <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="200"
                    stroke="#333"
                    strokeWidth="2"
                />

                <line
                    x1="50"
                    y1="200"
                    x2="100%"
                    y2="200"
                    stroke="#333"
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
};

function Statistics() {
    const { technologies, loading } = useTechnologiesApi();

    const statusStats = useMemo(() => {
        return technologies.reduce((acc, tech) => {
            acc[tech.status] = (acc[tech.status] || 0) + 1;
            return acc;
        }, { 'completed': 0, 'in-progress': 0, 'not-started': 0 });
    }, [technologies]);

    const categoryStats = useMemo(() => {
        return technologies.reduce((acc, tech) => {
            const cat = tech.category || 'Прочее';
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});
    }, [technologies]);

    const progressPercentage = useMemo(() => {
        const total = technologies.length;
        if (total === 0) return 0;
        return ((statusStats.completed + statusStats['in-progress'] * 0.5) / total) * 100;
    }, [technologies, statusStats]);

    if (loading) return <div className="loading">Загрузка данных...</div>;

    return (
        <div className="statistics-page">
            <h2 style={{ marginBottom: '30px', fontSize: '28px' }}>📊 Аналитика вашего пути</h2>
            
            <div className="stats-grid">
                <div className="stats-card">
                    <h3>Распределение по статусам</h3>
                    <StatusHistogram stats={statusStats} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <div className="stat-item">
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-success)' }}>
                                {statusStats.completed}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--color-subtext)' }}>Завершено</div>
                        </div>
                        <div className="stat-item">
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-warning)' }}>
                                {statusStats['in-progress']}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--color-subtext)' }}>В процессе</div>
                        </div>
                        <div className="stat-item">
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-danger)' }}>
                                {statusStats['not-started']}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--color-subtext)' }}>Не начато</div>
                        </div>
                    </div>
                </div>

                <div className="stats-card">
                    <h3>Технологии по категориям</h3>
                    <CategoryHistogram categoryStats={categoryStats} />
                    
                    <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border-color)' }}>
                        <h4 style={{ fontSize: '14px', marginBottom: '10px', color: 'var(--color-subtext)' }}>
                            Всего категорий: {Object.keys(categoryStats).length}
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {Object.entries(categoryStats).map(([name, count]) => (
                                <span 
                                    key={name}
                                    style={{
                                        backgroundColor: 'var(--color-primary)',
                                        color: 'white',
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '12px'
                                    }}
                                >
                                    {name}: {count}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="stats-grid" style={{ marginTop: '25px' }}>
                <div className="stats-card">
                    <h3>Общая статистика</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '120px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                {technologies.length}
                            </div>
                            <div style={{ fontSize: '14px', color: 'var(--color-subtext)' }}>Всего технологий</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--color-success)' }}>
                                {progressPercentage.toFixed(1)}%
                            </div>
                            <div style={{ fontSize: '14px', color: 'var(--color-subtext)' }}>Общий прогресс</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--color-warning)' }}>
                                {statusStats['in-progress']}
                            </div>
                            <div style={{ fontSize: '14px', color: 'var(--color-subtext)' }}>В активной работе</div>
                        </div>
                    </div>
                </div>

                <div className="stats-card">
                    <h3>Прогресс изучения</h3>
                    <div style={{ padding: '20px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Завершено</span>
                            <span style={{ fontWeight: 'bold' }}>{statusStats.completed}</span>
                        </div>
                        <div className="progress-bar-container">
                            <div 
                                className="progress-bar" 
                                style={{ 
                                    width: `${technologies.length > 0 ? (statusStats.completed / technologies.length) * 100 : 0}%`,
                                    backgroundColor: 'var(--color-success)'
                                }}
                            />
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '10px' }}>
                            <span>В процессе</span>
                            <span style={{ fontWeight: 'bold' }}>{statusStats['in-progress']}</span>
                        </div>
                        <div className="progress-bar-container">
                            <div 
                                className="progress-bar" 
                                style={{ 
                                    width: `${technologies.length > 0 ? (statusStats['in-progress'] / technologies.length) * 100 : 0}%`,
                                    backgroundColor: 'var(--color-warning)'
                                }}
                            />
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '10px' }}>
                            <span>Не начато</span>
                            <span style={{ fontWeight: 'bold' }}>{statusStats['not-started']}</span>
                        </div>
                        <div className="progress-bar-container">
                            <div 
                                className="progress-bar" 
                                style={{ 
                                    width: `${technologies.length > 0 ? (statusStats['not-started'] / technologies.length) * 100 : 0}%`,
                                    backgroundColor: 'var(--color-danger)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;