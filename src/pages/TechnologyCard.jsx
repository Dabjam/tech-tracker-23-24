// src/components/TechnologyCard.jsx
import './TechnologyCard.css';

// onStatusChange удален из props
function TechnologyCard({ title, description, status }) { 
  
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
      // !!! onClick удален !!!
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