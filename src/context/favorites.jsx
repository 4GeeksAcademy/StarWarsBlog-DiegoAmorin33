import { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('starwars-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('starwars-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.some(fav => fav.id === item.id);
      return exists ? prev : [...prev, item];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter(fav => fav.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}