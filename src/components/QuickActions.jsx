// src/components/QuickActions.jsx

function QuickActions({ onMarkAllCompleted, onResetAllStatuses, onExportData }) {
    return (
        <div className="quick-actions-container">
            <h2 className="section-title">Быстрые действия и данные</h2>
            <div className="action-buttons-group">
                <button onClick={onMarkAllCompleted} className="btn btn-success">
                    ✅ Отметить все как выполненные
                </button>
                <button onClick={onResetAllStatuses} className="btn btn-warning">
                    🔄 Сбросить все статусы
                </button>
                {/* Кнопка экспорта, добавленная в Пр. 22 */}
                <button onClick={onExportData} className="btn btn-primary">
                    💾 Экспорт данных
                </button>
            </div>
        </div>
    );
}

export default QuickActions;