import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCharacter } from '../store'

function DetallesPersonaje() {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        setLoading(true)
        const data = await getCharacter(id)
        setCharacter(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar los detalles del personaje. Por favor, intenta de nuevo más tarde.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacterDetail()
  }, [id])

  if (loading) {
    return <div className="text-center my-4">Cargando detalles del personaje...</div>
  }

  if (error || !character) {
    return <div className="text-danger text-center my-4">{error || 'No se encontró el personaje'}</div>
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
              <h1 className="card-title">{character.name}</h1>
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
              <th>Name</th>
              <th>Birth Year</th>
              <th>Gender</th>
              <th>Height</th>
              <th>Skin Color</th>
              <th>Eye Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{character.name}</td>
              <td>{character.birth_year}</td>
              <td>{character.gender !== 'n/a' ? character.gender : 'No aplicable'}</td>
              <td>{character.height !== 'unknown' ? `${character.height} cm` : 'Desconocida'}</td>
              <td>{character.skin_color}</td>
              <td>{character.eye_color}</td>
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

export default DetallesPersonaje
