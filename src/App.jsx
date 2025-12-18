// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

import Navigation from './components/Navigation';       
import Home from './pages/Home';                         
import TechnologyList from './pages/TechnologyList';     
import TechnologyDetail from './pages/TechnologyDetail'; 
import AddTechnology from './pages/AddTechnology';       
import Statistics from './pages/Statistics';             
import Settings from './pages/Settings';                 
import AdminPanel from './pages/AdminPanel';             

function App() {
    return (
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
                    <Route path="/admin" element={<AdminPanel />} />
                    
                    <Route path="*" element={<h2>404: Страница не найдена</h2>} />
                </Routes>
            </main>
        </div>
    );
}

export default App;