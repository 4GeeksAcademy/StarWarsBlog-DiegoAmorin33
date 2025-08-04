import { useEffect, useState } from "react";
import { getCharacters } from "../store";
import CartaDePersonaje from "../components/CartaDePersonaje";

function ListaDePersonajes() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await getCharacters(currentPage);
        setCharacters(data.results);
        setPageInfo({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los personajes. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  if (loading) {
    return <div className="loading">Cargando personajes..</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <h1>Personajes de Star Wars</h1>
      <div className="card-deck-scroll">
        {characters.map((character) => (
          <CartaDePersonaje key={character.url} character={character} /> ))}
      </div>
    </div>
  );
}

export default ListaDePersonajes;