// src/pages/HomePage.js

import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularGames, fetchPublisherData } from '../redux/thunks';  // IMPORTA LA ACCIÓN CORRECTA
import { setSearchTerm } from '../redux/slices/gameSlice';  // No olvides importar setSearchTerm también
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { popularGames, publishers, searchTerm, loading, error } = useSelector(state => state.games);

  // Cargar juegos populares y publishers cuando el componente se monta
  useEffect(() => {
    dispatch(fetchPopularGames()); // Cargar juegos populares
    if (searchTerm) {
      dispatch(fetchPublisherData(searchTerm)); // Buscar publishers si hay término de búsqueda
    }
  }, [dispatch, searchTerm]);  // Dependemos de searchTerm para obtener publishers

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="homepage-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/games">Juegos</Link></li>
          <li><Link to="/publisher/:id">Publishers</Link></li>
        </ul>
      </nav>

      <h1>Juegos Populares</h1>
      <Slider>
        {popularGames.map((game) => (
          <div key={game.id} className="carousel-item">
            <Link to={`/game/${game.id}`}>
              <img src={game.background_image} alt={game.name} />
              <h3>{game.name}</h3>
            </Link>
          </div>
        ))}
      </Slider>

      <div className="navigation">
        <Link to="/games" className="games-link">Ver todos los juegos</Link>
      </div>

      <div className="search-publishers">
        <h2>Buscar Publishers</h2>
        <input
          type="text"
          placeholder="Ingresa el nombre del publisher"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}  // Actualiza el término de búsqueda
        />
      </div>

      {publishers.length > 0 && (
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
