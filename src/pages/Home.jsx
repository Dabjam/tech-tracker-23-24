import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px' }}>
        Tech<span style={{ color: '#2563eb' }}>Tracker</span>
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 40px' }}>
        Ваш личный навигатор в мире IT. Структурируйте обучение, 
        отслеживайте прогресс и храните важные заметки в одном месте.
      </p>
      
      <Link 
        to="/technologies" 
        className="btn btn-primary" 
        style={{ padding: '18px 45px', fontSize: '1.2rem', borderRadius: '50px', textDecoration: 'none', display: 'inline-block' }}
      >
        Начать обучение
      </Link>
    </div>
  );
}

export default Home;