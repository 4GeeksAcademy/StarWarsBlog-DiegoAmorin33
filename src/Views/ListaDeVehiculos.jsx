import { useEffect, useState } from "react";
import { getVehicles } from "../store";
import CartaDeVehiculo from "../components/CartadeVehiculo";

function ListaDeVehiculos() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const data = await getVehicles(1);
        setVehicles(data.results);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los vehículos. Por favor, intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return <div className="loading">Cargando vehículos..</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="mt-5">
      <h1>Vehículos de Star Wars</h1>
      <div className="card-deck-scroll">
        {vehicles.map((vehicle) => (
          <CartaDeVehiculo key={vehicle.url} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}

export default ListaDeVehiculos;