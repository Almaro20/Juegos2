import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './GameDetailPage.css';


const GameDetailPage = () => {
  let { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_RAWG_API_KEY;

  useEffect(() => {
    axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
      .then((response) => {
        setGame(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, apiKey]);

  if (loading) return <p>Cargando...</p>;
  if (!game) return <p>Juego no encontrado</p>;

  return (
    <div className="game-detail">
      <h1>{game.name}</h1>
      <img src={game.background_image} alt={game.name} />
      <p>{game.description_raw}</p>
      <p><strong>Publisher:</strong> <Link to={`/publisher/${game.publishers[0]?.id}`}>{game.publishers[0]?.name}</Link></p>
      <p><strong>Plataformas:</strong> {game.platforms.map(p => p.platform.name).join(", ")}</p>
      <p><strong>Tags:</strong> {game.tags.map(tag => <Link key={tag.id} to={`/tag/${tag.id}`}>{tag.name}</Link>)}</p>
    </div>
  );
};

export default GameDetailPage;
