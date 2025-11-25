// src/pages/TechnologyListPage.jsx

import TechnologyCard from '../components/TechnologyCard';
import useLocalStorage from '../hooks/useLocalStorage';
import useTechnologiesApi from '../hooks/useTechnologiesApi'; // !!! Импорт API хука
import { useState, useEffect } from 'react'; // Нужен useEffect для синхронизации
import { Link } from 'react-router-dom'; 

const STORAGE_KEY = 'technology-tracker-data'; 

function TechnologyListPage() {
  
  // 1. Используем API для ЗАГРУЗКИ начальных данных
  const { technologies: apiData, loading, error, refetch } = useTechnologiesApi();

  // 2. Используем LocalStorage для УПРАВЛЕНИЯ состоянием
  // Начальное значение будет пустым массивом, пока API не загрузит данные
  const [technologies, setTechnologies] = useLocalStorage(STORAGE_KEY, []);
  
  // 3. Эффект: Один раз, после загрузки API-данных, синхронизируем их с LocalStorage
  useEffect(() => {
    if (apiData && technologies.length === 0) {
      setTechnologies(apiData);
    }
  }, [apiData, setTechnologies, technologies.length]);
  
  const [newTech, setNewTech] = useState({ title: '', description: '' });

  // ... (handleStatusChange и handleAddTech остаются без изменений) ...
  const handleStatusChange = (id) => {
    setTechnologies(prevTech => prevTech.map(tech => {
      if (tech.id === id) {
        let nextStatus;
        if (tech.status === 'not-started') {
          nextStatus = 'in-progress';
        } else if (tech.status === 'in-progress') {
          nextStatus = 'completed';
        } else {
          nextStatus = 'not-started';
        }
        return { ...tech, status: nextStatus };
      }
      return tech; 
    }));
  };

  const handleAddTech = (e) => {
    e.preventDefault(); 
    if (!newTech.title) return; 

    setTechnologies(prevTech => [
      { 
        id: Date.now(), 
        title: newTech.title, 
        description: newTech.description, 
        status: 'not-started' 
      },
      ...prevTech, 
    ]);
    setNewTech({ title: '', description: '' }); 
  };
  
  // 4. Обработка состояний загрузки и ошибок
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Загрузка технологий...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Ошибка: {error}</p>
        <button onClick={refetch}>Повторить загрузку</button>
      </div>
    );
  }
  
  return (
    <>
      <form onSubmit={handleAddTech} className="add-form">
        <input 
          placeholder="Название технологии (обязательно)" 
          value={newTech.title}
          onChange={e => setNewTech({...newTech, title: e.target.value})}
        />
        <input 
          placeholder="Краткое описание" 
          value={newTech.description}
          onChange={e => setNewTech({...newTech, description: e.target.value})}
        />
        <button type="submit">➕ Добавить</button>
      </form>
      
      <div className="card-list">
        {technologies.map((tech) => (
          <Link 
            key={tech.id} 
            to={`/tech/${tech.id}`} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <TechnologyCard 
              title={tech.title} 
              description={tech.description} 
              status={tech.status} 
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default TechnologyListPage;