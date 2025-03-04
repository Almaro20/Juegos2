import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./PublisherPage.css";

const PublisherPage = () => {
  const { id } = useParams();
  const [publisher, setPublisher] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_RAWG_API_KEY;

  useEffect(() => {
    const fetchPublisherData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Obtener información del publisher
        const publisherResponse = await axios.get(`https://api.rawg.io/api/publishers/${id}?key=${apiKey}`);
        
        if (!publisherResponse.data || Object.keys(publisherResponse.data).length === 0) {
          throw new Error("No se encontró el publisher.");
        }
        
        setPublisher(publisherResponse.data);

        // Obtener juegos del publisher
        const gamesResponse = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&publishers=${id}`);
        setGames(gamesResponse.data.results || []);
      } catch (err) {
        setError("Error al cargar los datos del publisher.");
        setPublisher(null);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublisherData();
  }, [id]);

  if (loading) return <p className="loading">Cargando...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="publisher-page">
      {/* Si no hay publisher, mostrar error */}
      {!publisher ? (
        <p className="error">Publisher no encontrado.</p>
      ) : (
        <>
          <h1>{publisher.name}</h1>
          {publisher.description ? (
            <p>{publisher.description}</p>
          ) : (
            <p><em>Sin descripción disponible.</em></p>
          )}

          <h2>Juegos Publicados</h2>
          {games.length > 0 ? (
            <ul>
              {games.map((game) => (
                <li key={game.id}>
                  <Link to={`/game/${game.id}`}>{game.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay juegos disponibles para este publisher.</p>
          )}
        </>
      )}

      <div className="button-container">
        <Link to="/">
          <button className="back-btn">Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default PublisherPage;
