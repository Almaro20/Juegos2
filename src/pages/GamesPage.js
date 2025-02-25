import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './GamesPage.css';

const GamesPage = () => {
  const [allGames, setAllGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const apiKey = process.env.REACT_APP_RAWG_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError('No se encontró la clave de API.');
      setLoading(false);
      return;
    }

    axios
      .get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=${pageSize}&page=${currentPage}`)
      .then((response) => {
        setAllGames(response.data.results);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al obtener todos los juegos');
        setLoading(false);
      });
  }, [apiKey, currentPage]);

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
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage}</span>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>Siguiente</button>
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