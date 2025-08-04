import { Link } from 'react-router-dom';
import { useFavorites } from '../context/favorites';
import './Navbar.css';

function Navbar() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-logo">
          <h1>Star Wars</h1>
        </Link>
        
        <div className="dropdown favorites-dropdown">
          <button className="btn dropdown-toggle" type="button" id="favoritesDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            Favorites {favorites.length > 0 && `(${favorites.length})`}
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
            {favorites.length > 0 ? (
              favorites.map((item) => (
                <li key={`${item.type}-${item.id}`} className="d-flex justify-content-between align-items-center px-3 py-2">
                  <Link to={`/${item.type}/${item.id}`} className="Atext-decoration text-decoration-none flex-grow-1">
                    {item.name} <small className="text-danger">({item.type})</small>
                  </Link>
                  <button onClick={() => removeFavorite(item.id, item.type)} className="trash-erase-btn" aria-label="Remove favorite">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-light">(No favorites yet)</li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;