// src/App.jsx

// !!! Импортируем хук useState
import { useState } from 'react'; 
import './App.css';
import TechnologyCard from './components/TechnologyCard';

function App() {
  // 1. Инициализируем состояние для списка технологий
  const [technologies, setTechnologies] = useState([
    { id: 1, title: 'HTML & CSS Basics', description: 'Основы разметки и стилизации', status: 'completed' },
    { id: 2, title: 'JavaScript ES6+', description: 'Современный синтаксис JS', status: 'in-progress' },
    { id: 3, title: 'React Hooks (useState)', description: 'Изучение состояния компонентов', status: 'not-started' },
  ]);
  // 

  // 2. Состояние для данных новой технологии в форме
  const [newTech, setNewTech] = useState({ title: '', description: '' });

  // 3. Функция для изменения статуса
  const handleStatusChange = (id) => {
    // ВАЖНО: Мы создаем НОВЫЙ массив, чтобы React увидел изменение состояния
    setTechnologies(technologies.map(tech => {
      if (tech.id === id) {
        // Логика циклического переключения статуса
        let nextStatus;
        if (tech.status === 'not-started') {
          nextStatus = 'in-progress';
        } else if (tech.status === 'in-progress') {
          nextStatus = 'completed';
        } else {
          nextStatus = 'not-started';
        }
        // Используем оператор spread ({...tech}), чтобы создать новый объект с новым статусом
        return { ...tech, status: nextStatus };
      }
      return tech; // Возвращаем неизменный объект
    }));
  };

  // 4. Функция для добавления новой технологии через форму
  const handleAddTech = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    if (!newTech.title) return; 

    // Добавляем новый элемент, создавая НОВЫЙ массив с помощью spread-оператора
    setTechnologies([
      { 
        id: Date.now(), // Уникальный ID
        title: newTech.title, 
        description: newTech.description, 
        status: 'not-started' 
      },
      ...technologies, // Остальные технологии
    ]);
    
    setNewTech({ title: '', description: '' }); // Очищаем форму
  };

  return (
    <div className="app">
      <h1>Трекер изучения технологий (Практика 20: useState)</h1>
      
      {/* Форма добавления */}
      <form onSubmit={handleAddTech} className="add-form">
        <input 
          placeholder="Название технологии (обязательно)" 
          value={newTech.title}
          // Обновляем состояние newTech при каждом вводе
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
          <TechnologyCard 
            key={tech.id} 
            title={tech.title} 
            description={tech.description} 
            status={tech.status} 
            // Передаем функцию-обработчик onStatusChange
            onStatusChange={() => handleStatusChange(tech.id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;