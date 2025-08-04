import { Link } from 'react-router-dom';
import { useFavorites } from '../context/favorites';

function CartaDePlaneta({ planet }) {
  const planetId = planet.url.split('/').filter(Boolean).pop();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  const isFavorite = favorites.some(fav => fav.id === planetId && fav.type === 'planet');
  
  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(planetId);
    } else {
      addFavorite({
        id: planetId,
        name: planet.name,
        type: 'planet',
        url: planet.url
      });
    }
  };

  return (
    <div className="card ToModifyCard">
      <div className="card-img-top d-flex align-items-center justify-content-center bg-light text-white">Image cap</div>
      <div className="card-body">
        <h5 className="card-title">{planet.name}</h5>
        <p className="card-text">
          <strong>Clima:</strong> {planet.climate}<br />
          <strong>Terreno:</strong> {planet.terrain}<br />
          <strong>Población:</strong> {planet.population}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Link to={`/planet/${planetId}`} className="btn btn-primary">Ver Detalles</Link>
          <button 
            type="button" 
            className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={handleFavoriteClick}
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartaDePlaneta;