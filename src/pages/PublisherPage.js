import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PublisherPage = () => {
  let { id } = useParams();
  const [publisher, setPublisher] = useState(null);
  const [games, setGames] = useState([]);
  const apiKey = process.env.REACT_APP_RAWG_API_KEY;

  useEffect(() => {
    axios.get(`https://api.rawg.io/api/publishers/${id}?key=${apiKey}`)
      .then((response) => setPublisher(response.data));
    axios.get(`https://api.rawg.io/api/games?key=${apiKey}&publishers=${id}`)
      .then((response) => setGames(response.data.results));
  }, [id, apiKey]);

  if (!publisher) return <p>Cargando...</p>;

  return (
    <div className="publisher-page">
      <h1>{publisher.name}</h1>
      <p>{publisher.description}</p>
      <h2>Juegos Publicados</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}><Link to={`/game/${game.id}`}>{game.name}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default PublisherPage;
