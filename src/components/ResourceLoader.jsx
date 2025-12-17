// src/components/ResourceLoader.jsx

import React, { useState, useCallback } from 'react';
import useTechResourcesApi from '../hooks/useTechResourcesApi';

const ResourceLoader = ({ techName, onResourceSelect, existingResources = [] }) => {
    const [showResources, setShowResources] = useState(false);
    const { resources, loading, error, fetchResources, resetResources } = useTechResourcesApi();
    
    const handleLoadResources = useCallback(async () => {
        if (!techName) {
            alert('Укажите название технологии для поиска ресурсов');
            return;
        }
        
        setShowResources(true);
        await fetchResources(techName);
    }, [techName, fetchResources]);
    
    const handleResourceSelect = (resource) => {
        // Проверяем, не добавлен ли уже этот ресурс
        const isAlreadyAdded = existingResources.some(
            existing => existing.url === resource.url || existing === resource.url
        );
        
        if (!isAlreadyAdded) {
            onResourceSelect(resource);
            alert(`Ресурс "${resource.title}" добавлен!`);
        } else {
            alert('Этот ресурс уже добавлен');
        }
    };
    
    const handleClose = () => {
        setShowResources(false);
        resetResources();
    };
    
    // Определяем иконки по типу ресурса
    const getResourceIcon = (type) => {
        switch(type) {
            case 'documentation': return '📚';
            case 'github': return '🐙';
            case 'tutorial': return '🎓';
            case 'api': return '🔌';
            case 'sandbox': return '⚡';
            case 'qna': return '❓';
            case 'package-manager': return '📦';
            case 'registry': return '🏢';
            case 'cloud': return '☁️';
            case 'search': return '🔍';
            default: return '🔗';
        }
    };

    return (
        <div className="resource-loader" style={{ marginTop: '15px' }}>
            <button 
                onClick={handleLoadResources}
                disabled={loading || !techName}
                className="btn btn-info"
                style={{ width: '100%' }}
            >
                {loading ? (
                    <>
                        <span className="loading-spinner" style={{
                            display: 'inline-block',
                            width: '16px',
                            height: '16px',
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTopColor: 'white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginRight: '8px'
                        }}></span>
                        Загрузка ресурсов...
                    </>
                ) : (
                    '🌐 Загрузить дополнительные ресурсы из API'
                )}
            </button>
            
            {error && (
                <div className="error-message" style={{ 
                    marginTop: '10px',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    borderLeft: '3px solid var(--color-danger)',
                    padding: '10px',
                    borderRadius: '4px',
                    fontSize: '14px'
                }}>
                    ❌ {error}
                </div>
            )}
            
            {showResources && resources.length > 0 && (
                <div className="resources-list" style={{ 
                    marginTop: '15px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '15px',
                    maxHeight: '300px',
                    overflowY: 'auto'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h4 style={{ fontSize: '16px', color: 'var(--color-text)' }}>
                            Найдено ресурсов: {resources.length}
                        </h4>
                        <button 
                            onClick={handleClose}
                            className="btn btn-info"
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="resources-grid" style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '10px'
                    }}>
                        {resources.map((resource, index) => {
                            const isAlreadyAdded = existingResources.some(
                                existing => existing.url === resource.url || existing === resource.url
                            );
                            
                            return (
                                <div 
                                    key={index}
                                    className="resource-card"
                                    style={{
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '6px',
                                        padding: '12px',
                                        backgroundColor: isAlreadyAdded ? 'rgba(76, 175, 80, 0.1)' : 'var(--color-card-bg)',
                                        opacity: isAlreadyAdded ? 0.7 : 1
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '18px', marginRight: '8px' }}>
                                            {getResourceIcon(resource.type)}
                                        </span>
                                        <strong style={{ fontSize: '14px' }}>{resource.title}</strong>
                                    </div>
                                    
                                    <div style={{ 
                                        fontSize: '12px', 
                                        color: 'var(--color-subtext)',
                                        marginBottom: '10px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {resource.url}
                                    </div>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <a 
                                            href={resource.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn btn-info"
                                            style={{ 
                                                padding: '4px 8px', 
                                                fontSize: '11px',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            Открыть
                                        </a>
                                        
                                        <button 
                                            onClick={() => handleResourceSelect(resource)}
                                            disabled={isAlreadyAdded}
                                            className={isAlreadyAdded ? 'btn btn-success' : 'btn btn-primary'}
                                            style={{ 
                                                padding: '4px 8px', 
                                                fontSize: '11px',
                                                opacity: isAlreadyAdded ? 0.5 : 1
                                            }}
                                        >
                                            {isAlreadyAdded ? '✓ Добавлено' : 'Добавить'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div style={{ 
                        marginTop: '15px',
                        padding: '10px',
                        backgroundColor: 'rgba(90, 125, 255, 0.05)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: 'var(--color-subtext)'
                    }}>
                        <strong>ℹ️ Информация:</strong> Эти ресурсы загружаются из мокового API. 
                        В реальном проекте подключите реальный API документации.
                    </div>
                </div>
            )}
            
            {showResources && !loading && resources.length === 0 && !error && (
                <div style={{ 
                    marginTop: '15px',
                    padding: '20px',
                    textAlign: 'center',
                    border: '1px dashed var(--border-color)',
                    borderRadius: '8px'
                }}>
                    <p>Ресурсы не найдены для "{techName}"</p>
                    <button 
                        onClick={handleClose}
                        className="btn btn-info"
                        style={{ marginTop: '10px' }}
                    >
                        Закрыть
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResourceLoader;