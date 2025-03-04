import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./GameDetailPage.css";

const GameDetailPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_RAWG_API_KEY;

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
        setGame(response.data);
      } catch (err) {
        setError("Error al cargar los detalles del juego.");
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id, apiKey]); // Se agrega apiKey para evitar warning en Netlify

  if (loading) return <p className="loading">Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!game) return <p>Juego no encontrado</p>;

  return (
    <div className="game-detail">
      <h1>{game.name || "Nombre no disponible"}</h1>
      {game.background_image && <img src={game.background_image} alt={game.name} />}

      {game.description_raw ? <p>{game.description_raw}</p> : <p>No hay descripción disponible.</p>}

      {game.publishers?.length > 0 && (
        <p>
          <strong>Publisher:</strong> 
          <Link to={`/publisher/${game.publishers[0].id}`}>
            {game.publishers[0].name}
          </Link>
        </p>
      )}

      {game.platforms?.length > 0 && (
        <p><strong>Plataformas:</strong> {game.platforms.map(p => p.platform.name).join(", ")}</p>
      )}

      {game.tags?.length > 0 && (
        <p>
          <strong>Tags:</strong> {" "}
          {game.tags.map(tag => (
            <Link key={tag.id} to={`/tag/${tag.id}`}>{tag.name}</Link>
          )).reduce((prev, curr) => [prev, ", ", curr])}
        </p>
      )}
    </div>
  );
};

export default GameDetailPage;
