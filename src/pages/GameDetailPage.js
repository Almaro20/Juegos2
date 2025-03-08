import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameDetails } from "../redux/slices/gamesSlice";
import "./GameDetailPage.css";

const GameDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Accedemos al estado de Redux para obtener el juego, cargando y el error.
  const { game, loading, error } = useSelector((state) => state.game);

  useEffect(() => {
    // Solo hacer la petición si el juego no está ya cargado (evitar peticiones duplicadas)
    if (!game || game.id !== parseInt(id)) {
      dispatch(fetchGameDetails(id));
    }
  }, [id, dispatch, game]);

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
