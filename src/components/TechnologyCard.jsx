// src/components/TechnologyCard.jsx
import './TechnologyCard.css';

// Принимаем новый проп onStatusChange
function TechnologyCard({ title, description, status, onStatusChange }) {
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      default: return 'status-not-started';
    }
  };

  return (
    <div 
      className={`technology-card ${getStatusClass(status)}`}
      // !!! Добавляем обработчик клика, который вызывает функцию родителя
      onClick={onStatusChange} 
      style={{ cursor: 'pointer' }} // Делаем ее кликабельной
      title="Нажмите, чтобы изменить статус"
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-footer">
         <span className={`status-badge ${getStatusClass(status)}`}>
           {status}
         </span>
      </div>
    </div>
  );
}

export default TechnologyCard;