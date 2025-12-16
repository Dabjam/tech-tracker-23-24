// src/App.jsx

import React from 'react';
// Импортируем только то, что используем в рендере (Routes, Route, Navigate)
import { Routes, Route, Navigate } from 'react-router-dom'; 

// --- ОБНОВЛЕННЫЕ ИМПОРТЫ: ВСЕ С .JSX ИЛИ БЕЗ РАСШИРЕНИЯ ---

import Navigation from './components/Navigation';       // Должен быть Navigation.jsx
import Home from './pages/Home';                         // Должен быть Home.jsx
import TechnologyList from './pages/TechnologyList';     // Должен быть TechnologyList.jsx
import TechnologyDetail from './pages/TechnologyDetail'; // Должен быть TechnologyDetail.jsx
import AddTechnology from './pages/AddTechnology';       // Должен быть AddTechnology.jsx
import Statistics from './pages/Statistics';             // Должен быть Statistics.jsx
import Settings from './pages/Settings';                 // Должен быть Settings.jsx

// Примечание: В современных React-проектах часто можно опускать расширение (.jsx) 
// при импорте, но самое важное, что файл в файловой системе должен называться .jsx.
// Если в App.jsx в ваших импортах явно указано .js, удалите это .js.
// Например: import Home from './pages/Home.js'; -> import Home from './pages/Home';

function App() {
    return (
        // ВАЖНО: Убедитесь, что <BrowserRouter> находится только в main.jsx, а не здесь!
        <div className="app-container">
            <header className="app-header">
                <h1>🚀 Трекер технологий</h1>
                <Navigation />
            </header>

            <main className="main-content" style={{ marginTop: '20px' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/technologies" element={<TechnologyList />} />
                    <Route path="/technology/:techId" element={<TechnologyDetail />} />
                    <Route path="/add" element={<AddTechnology />} />
                    <Route path="/stats" element={<Statistics />} /> 
                    <Route path="/settings" element={<Settings />} /> 
                    
                    {/* Защищенный маршрут */}
                    <Route 
                        path="/admin" 
                        element={
                            localStorage.getItem('userRole') === 'admin' 
                                ? <p>Панель администратора</p> 
                                : <Navigate to="/" replace />
                        } 
                    />
                    
                    {/* Маршрут 404 */}
                    <Route path="*" element={<h2>404: Страница не найдена</h2>} />
                </Routes>
            </main>
        </div>
    );
}

export default App;