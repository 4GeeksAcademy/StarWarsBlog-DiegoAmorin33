import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPlanet } from '../store'

function DetallePlaneta() {
  const { id } = useParams()
  const [planet, setPlanet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPlanetDetail = async () => {
      try {
        setLoading(true)
        const data = await getPlanet(id)
        setPlanet(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar los detalles del planeta. Por favor, intenta de nuevo más tarde.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlanetDetail()
  }, [id])

  if (loading) {
    return <div className="text-center my-4">Cargando detalles del planeta...</div>
  }

  if (error || !planet) {
    return <div className="text-danger text-center my-4">{error || 'No se encontró el planeta'}</div>
  }

  return (
    <div className="container my-5">
      <div className="card mb-4">
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '300px' }}>
            <span className="text-muted">Image</span>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">{planet.name}</h1>
              <p className="card-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="table-responsive">
        <table className="table text-center">
          <thead className="table-borderless">
            <tr className="text-danger fw-bold">
              <th>Nombre</th>
              <th>Clima</th>
              <th>Población</th>
              <th>Diámetro</th>
              <th>Terreno</th>
              <th>Periodo Orbital</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{planet.name}</td>
              <td>{planet.climate}</td>
              <td>{planet.population}</td>
              <td>{planet.diameter !== 'unknown' ? `${planet.diameter} km` : 'Desconocido'}</td>
              <td>{planet.terrain}</td>
              <td>{planet.orbital_period} días</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <Link to="/planets" className="btn btn-primary">
          Volver a la lista
        </Link>
      </div>
    </div>
  )
}

export default DetallePlaneta