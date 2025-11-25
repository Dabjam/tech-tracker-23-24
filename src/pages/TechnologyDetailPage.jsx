// src/pages/TechnologyDetailPage.jsx

import { useParams, Link } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

function TechnologyDetailPage() {
  // Получаем параметр 'id' из URL (например, /tech/123)
  const { id } = useParams(); 
  
  const [technologies, setTechnologies] = useLocalStorage('technology-tracker-data', []);
  
  // Ищем нужную технологию по ID
  // ВАЖНО: id из useParams - это строка, поэтому используем ==
  const technology = technologies.find(tech => tech.id == id); 
  
  if (!technology) {
    return (
      <div className="detail-container">
        <h2>Технология не найдена (ID: {id})</h2>
        <Link to="/" className="back-link">← Назад к списку</Link>
      </div>
    );
  }

  // Функция изменения статуса (как в App.jsx, но только для одной технологии)
  const updateStatus = (newStatus) => {
    setTechnologies(prevTech => prevTech.map(tech => 
      tech.id == id ? { ...tech, status: newStatus } : tech
    ));
  };

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← Назад к списку</Link>
      
      <div className="technology-header">
        <h1>{technology.title}</h1>
      </div>

      <div className="technology-detail">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div className="detail-section">
          <h3>Текущий статус: 
            <span className={`status-badge status-${technology.status}`}>{technology.status}</span>
          </h3>
          <div className="status-buttons">
            <button
              onClick={() => updateStatus('not-started')}
              className={technology.status === 'not-started' ? 'active' : ''}
            >
              Не начато
            </button>
            <button
              onClick={() => updateStatus('in-progress')}
              className={technology.status === 'in-progress' ? 'active' : ''}
            >
              В процессе
            </button>
            <button
              onClick={() => updateStatus('completed')}
              className={technology.status === 'completed' ? 'active' : ''}
            >
              Завершено
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetailPage;