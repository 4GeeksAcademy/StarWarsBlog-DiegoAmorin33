import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getVehicle } from '../store'

function DetalleVehiculo() {
  const { id } = useParams()
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVehicleDetail = async () => {
      try {
        setLoading(true)
        const data = await getVehicle(id)
        setVehicle(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar los detalles del vehículo. Por favor, intenta de nuevo más tarde.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicleDetail()
  }, [id])

  if (loading) {
    return <div className="text-center my-4">Cargando detalles del vehículo...</div>
  }

  if (error || !vehicle) {
    return <div className="text-danger text-center my-4">{error || 'No se encontró el vehículo'}</div>
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
              <h1 className="card-title">{vehicle.name}</h1>
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
              <th>Modelo</th>
              <th>Fabricante</th>
              <th>Costo</th>
              <th>Longitud</th>
              <th>Velocidad Máxima</th>
              <th>Tripulación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{vehicle.model}</td>
              <td>{vehicle.manufacturer}</td>
              <td>{vehicle.cost_in_credits} créditos</td>
              <td>{vehicle.length} metros</td>
              <td>{vehicle.max_atmosphering_speed} km/h</td>
              <td>{vehicle.crew}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-primary">
          Volver a la lista
        </Link>
      </div>
    </div>
  )
}

export default DetalleVehiculo