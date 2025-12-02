// src/pages/Settings.jsx

import React from 'react';

function Settings({ onResetAllStatuses }) {
    return (
        <div className="page-container">
            <h1>⚙️ Настройки приложения</h1>
            <div className="settings-panel">
                <p>Управление данными приложения:</p>
                <button 
                    className="btn btn-danger large-btn"
                    onClick={() => {
                        if (window.confirm("Вы уверены? Это сбросит все статусы технологий!")) {
                            onResetAllStatuses();
                        }
                    }}
                >
                    Сбросить все статусы
                </button>
                <p className="note mt-20">
                    {/* * Этот пункт сбросит прогресс всех технологий в состояние "Не начато". */}
                </p>
            </div>
        </div>
    );
}

export default Settings;