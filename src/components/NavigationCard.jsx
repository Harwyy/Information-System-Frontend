import { useNavigate } from 'react-router-dom';

const NavigationCard = ({ icon, title, description, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div className="nav-card" onClick={handleClick}>
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default NavigationCard;
