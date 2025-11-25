// src/App.jsx

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // !!! Импорт роутера
import TechnologyListPage from './pages/TechnologyListPage';
import TechnologyDetailPage from './pages/TechnologyDetailPage';

function App() {
  return (
    // Оборачиваем приложение в BrowserRouter
    <BrowserRouter> 
      <div className="app">
        <h1>Трекер изучения технологий (Практика 23)</h1>
        
        {/* Компонент, отвечающий за маршрутизацию */}
        <Routes> 
          {/* Маршрут для главной страницы */}
          <Route path="/" element={<TechnologyListPage />} /> 
          
          {/* Маршрут для страницы деталей: :id - это динамический параметр */}
          <Route path="/tech/:id" element={<TechnologyDetailPage />} /> 
          
          {/* Страница 404 */}
          <Route path="*" element={<h2>404 | Страница не найдена</h2>} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;