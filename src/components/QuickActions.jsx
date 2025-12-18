import React from 'react';

// Принимаем функции через пропсы (destructuring)
function QuickActions({ technologies, updateAllStatuses, exportTechnologiesAsJson }) {

    const handleMarkAllDone = () => {
        if (window.confirm('Отметить всё как изученное?')) {
            updateAllStatuses('completed');
        }
    };

    const handleResetAll = () => {
        if (window.confirm('Сбросить все статусы?')) {
            updateAllStatuses('not-started');
        }
    };

    return (
        <div className="quick-actions" style={containerStyle}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>⚡ Быстрые действия</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button onClick={handleMarkAllDone} className="btn" style={{ ...btnStyle, backgroundColor: '#48bb78' }}>
                    ✅ Выполнить всё
                </button>

                <button onClick={handleResetAll} className="btn" style={{ ...btnStyle, backgroundColor: '#ed8936' }}>
                    🔄 Сбросить статусы
                </button>

                <button onClick={exportTechnologiesAsJson} className="btn" style={{ ...btnStyle, backgroundColor: '#4a5568' }}>
                    📤 Экспорт JSON
                </button>
            </div>
            
            <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '10px', color: '#666' }}>
                Всего: {technologies?.length || 0}
            </p>
        </div>
    );
}

const containerStyle = { padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' };
const btnStyle = { width: '100%', padding: '12px', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

export default QuickActions;