import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import RoadmapImporter from '../components/RoadmapImporter';

function AdminPanel({ userRole }) {
    const api = useTechnologiesApi();

    if (userRole !== 'admin') return <Navigate to="/" replace />;

    const handleFullReset = () => {
        if (window.confirm('⚠️ ВНИМАНИЕ! Удалить ВСЕ данные?')) {
            api.deleteAllTechnologies();
        }
    };

    return (
        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
            <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h1>🛠️ Админка</h1>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                            <th style={{ padding: '10px' }}>Название</th>
                            <th style={{ padding: '10px' }}>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {api.technologies.map(tech => (
                            <tr key={tech.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px' }}>{tech.title}</td>
                                <td style={{ padding: '10px' }}>
                                    <button onClick={() => api.deleteTechnology(tech.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <aside>
                <RoadmapImporter batchAddTechnologies={api.batchAddTechnologies} />
                <button onClick={handleFullReset} style={{ width: '100%', marginTop: '20px', padding: '15px', background: '#e53e3e', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    🔥 Стереть всю базу
                </button>
            </aside>
        </div>
    );
}

export default AdminPanel;