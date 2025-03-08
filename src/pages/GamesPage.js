import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, setPage } from '../redux/slices/gamesSlice';  // Importamos las acciones
import { Link } from 'react-router-dom';

import './GamesPage.css';

const GamesPage = () => {
  const dispatch = useDispatch();
  const { allGames, loading, error, currentPage } = useSelector(state => state.games);
  
  // Efecto para cargar los juegos cuando la página cambie
  useEffect(() => {
    dispatch(fetchGames(currentPage)); // Usamos el currentPage del estado global
  }, [dispatch, currentPage]);

  if (loading) return <p>Cargando juegos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="games-container">
      <h1>Todos los Juegos</h1>
      <div className="all-games">
        {allGames.map((game) => (
          <div key={game.id} className="game-card">
            <img src={game.background_image} alt={game.name} />
            <h3><Link to={`/game/${game.id}`}>{game.name}</Link></h3>
            <p>Fecha de lanzamiento: {game.released}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => dispatch(setPage(currentPage - 1))} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage}</span>
        <button onClick={() => dispatch(setPage(currentPage + 1))}>Siguiente</button>
      </div>
      <div className="button-container">
        <Link to="/">
          <button className="back-btn">Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default GamesPage;
