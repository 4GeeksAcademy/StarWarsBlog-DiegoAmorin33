import { useEffect, useState } from "react";
import { getPlanets } from "../store";
import CartaDePlaneta from "../components/CartaDePlaneta";

function ListaDePlanetas() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        const data = await getPlanets(currentPage);
        setPlanets(data.results);
        setPageInfo({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los planetas. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, [currentPage]);

  if (loading) {
    return <div className="loading">Cargando planetas..</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <h1>Planetas de Star Wars</h1>
      <div className="card-deck-scroll">
        {planets.map((planet) => (
          <CartaDePlaneta key={planet.url} planet={planet} />
        ))}
      </div>
    </div>
  );
}

export default ListaDePlanetas;