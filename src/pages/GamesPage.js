import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, fetchPopularGames, setPage, toggleFavorite } from '../redux/slices/gamesSlice';  
import { Link } from 'react-router-dom';
import './GamesPage.css';

const GamesPage = () => {
  const dispatch = useDispatch();
  const { allGames, popularGames, loading, error, currentPage, favorites } = useSelector(state => state.games);

  useEffect(() => {
    dispatch(fetchGames(currentPage)); 
    dispatch(fetchPopularGames());  // Cargar juegos populares
  }, [dispatch, currentPage]);

  const handleFavoriteClick = (gameId) => {
    dispatch(toggleFavorite(gameId));
  };

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
            
            {/* Solo agregar el corazón si el juego está en popularGames */}
            {popularGames.length > 0 && popularGames.some(popularGame => popularGame.id === game.id) && (
              <button
                className={`favorite-btn ${favorites.includes(game.id) ? 'favorito' : ''}`}
                onClick={() => handleFavoriteClick(game.id)}
              >
                ❤️
              </button>
            )}
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
