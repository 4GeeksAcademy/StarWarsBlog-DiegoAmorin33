import { Link } from 'react-router-dom';
import { useFavorites } from '../context/favorites';

function CartaDePersonaje({ character }) {
  const characterId = character.url.split('/').filter(Boolean).pop();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  const isFavorite = favorites.some(fav => fav.id === characterId && fav.type === 'character');
  
  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(characterId);
    } else {
      addFavorite({
        id: characterId,
        name: character.name,
        type: 'character',
        url: character.url
      });
    }
  };

  return (
    <div className="card ToModifyCard">
      <div className="card-img-top d-flex align-items-center justify-content-center bg-light text-white">Image</div>
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text text-white">
          <strong>Género:</strong> {character.gender !== 'n/a' ? character.gender : 'No aplicable'}<br />
          <strong>Color de Cabello:</strong> {character.hair_color !== 'unknown' ? character.hair_color : 'Desconocido'}<br />
          <strong>Color de Ojos:</strong> {character.eye_color !== 'unknown' ? character.eye_color : 'Desconocido'}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Link to={`/character/${characterId}`} className="btn btn-primary">Ver Detalles</Link>
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

export default CartaDePersonaje;