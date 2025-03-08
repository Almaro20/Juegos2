import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularGames, fetchPublisherData } from '../redux/thunks'; 
import { setSearchTerm } from '../redux/slices/gamesSlice';  
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { popularGames, publishers, searchTerm, loading, error, user } = useSelector(state => state.games);

  useEffect(() => {
    dispatch(fetchPopularGames()); // Cargar juegos populares
    if (searchTerm) {
      dispatch(fetchPublisherData(searchTerm)); // Buscar publishers si hay término de búsqueda
    }
  }, [dispatch, searchTerm]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="homepage-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/games">Juegos</Link></li>
          <li><Link to="/publishers">Publishers</Link></li> 
        </ul>

        {/* Si el usuario está logueado, muestra el nombre del usuario y el botón de cerrar sesión */}
        {user ? (
          <div className="user-info">
            <p>Bienvenido, {user.username}!</p>
            <Link to="/profile">Ver perfil</Link>
            <button onClick={() => dispatch({ type: 'LOGOUT' })}>Cerrar sesión</button>
          </div>
        ) : (
          // Aquí no mostramos los enlaces de login ni registro
          <div></div>
        )}
      </nav>

      {/* Título */}
      <h1>Juegos Populares</h1>

      {/* Barra de búsqueda */}
      <div className="search-publishers">
        <input
          type="text"
          placeholder="Buscar publishers..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      {/* Imagen destacada de un juego */}
      {popularGames.length > 0 && (
        <div className="game-highlight">
          <img 
            src={popularGames[0].background_image} 
            alt={popularGames[0].name} 
            className="game-image"
          />
          <div className="game-info">
            <h2>{popularGames[0].name}</h2>
            <p>{popularGames[0].description}</p>
            <Link to={`/game/${popularGames[0].id}`} className="game-link">
              Ver detalles
            </Link>
          </div>
        </div>
      )}

      {/* Ver todos los juegos */}
      <div className="navigation">
        <Link to="/games" className="games-link">Ver todos los juegos</Link>
      </div>

      {/* Resultados de publishers */}
      {Array.isArray(publishers) && publishers.length > 0 && (
        <div className="publisher-results">
          <h2>Resultados</h2>
          <ul>
            {publishers.map((publisher) => (
              <li key={publisher.id}>
                <Link to={`/publisher/${publisher.id}`}>{publisher.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
