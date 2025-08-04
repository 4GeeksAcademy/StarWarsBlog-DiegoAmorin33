import { Link } from 'react-router-dom';
import { useFavorites } from '../context/favorites';

function CartaDeVehiculo({ vehicle }) {
  const vehicleId = vehicle.url.split('/').filter(Boolean).pop();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  const isFavorite = favorites.some(v => v.id === vehicleId);
  
  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(vehicleId);
    } else {
      addFavorite({
        id: vehicleId,
        name: vehicle.name,
        type: 'vehicle',
        url: vehicle.url
      });
    }
  };

  return (
    <div className="card ToModifyCard">
      <div className="card-img-top d-flex align-items-center justify-content-center bg-light text-white">Image cap</div>
      <div className="card-body">
        <h5 className="card-title">{vehicle.name}</h5>
        <p className="card-text">
          <strong>Modelo:</strong> {vehicle.model}<br />
          <strong>Fabricante:</strong> {vehicle.manufacturer}<br />
          <strong>Clase:</strong> {vehicle.vehicle_class}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Link to={`/vehicle/${vehicleId}`} className="btn btn-primary">Ver Detalles</Link>
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

export default CartaDeVehiculo;