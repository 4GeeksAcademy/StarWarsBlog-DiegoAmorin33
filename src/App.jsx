import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import DetallesPersonaje from './Views/DetallePersonaje';
import ListaDePersonajes from './Views/ListaDePersonajes';
import ListaDePlanetas from './Views/ListaDePlanetas';
import DetallePlaneta from './Views/DetallePlanetas';
import DetalleVehiculo from './Views/DetalleVehiculo';
import ListaDeVehiculos from './Views/ListaDeVehiculos';
import { FavoritesProvider } from './context/favorites';

function App() {
  return (
    <FavoritesProvider>
      <>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={
              <div className="main-content">
                <ListaDePersonajes />
                <ListaDePlanetas />
                <ListaDeVehiculos />
              </div>
            } />
            <Route path='/character/:id' element={<DetallesPersonaje />} />
            <Route path='/planet/:id' element={<DetallePlaneta />} />
            <Route path='/vehicle/:id' element={<DetalleVehiculo />} />
          </Routes>
        </div>
      </>
    </FavoritesProvider>
  );
}

export default App;