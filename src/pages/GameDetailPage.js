import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameDetails } from "../redux/slices/gamesSlice";
import "./GameDetailPage.css";

const GameDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Usamos 'selectedGame' en lugar de 'game' para coincidir con el estado de Redux
  const { selectedGame, loading, error } = useSelector((state) => state.games); // Asegúrate de usar 'games' y 'selectedGame'

  useEffect(() => {
    // Solo realizamos la solicitud si el juego no existe o el ID no coincide
    if (!selectedGame || selectedGame.id !== parseInt(id)) {
      dispatch(fetchGameDetails(id));
    }
  }, [id, dispatch, selectedGame]); // Dependencias del useEffect

  if (loading) return <p className="loading">Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!selectedGame) return <p>Juego no encontrado</p>;

  return (
    <div className="game-detail">
      <h1>{selectedGame.name || "Nombre no disponible"}</h1>
      {selectedGame.background_image && <img src={selectedGame.background_image} alt={selectedGame.name} />}
      <p>{selectedGame.description_raw ? selectedGame.description_raw : "No hay descripción disponible."}</p>

      {selectedGame.publishers?.length > 0 && (
        <p>
          <strong>Publisher:</strong>
          <Link to={`/publisher/${selectedGame.publishers[0].id}`}>{selectedGame.publishers[0].name}</Link>
        </p>
      )}

      {selectedGame.platforms?.length > 0 && (
        <p>
          <strong>Plataformas:</strong> {selectedGame.platforms.map((p) => p.platform.name).join(", ")}
        </p>
      )}

      {selectedGame.tags?.length > 0 && (
        <p>
          <strong>Tags:</strong> {selectedGame.tags.map((tag) => <Link key={tag.id} to={`/tag/${tag.id}`}>{tag.name}</Link>).reduce((prev, curr) => [prev, ", ", curr])}
        </p>
      )}
    </div>
  );
};

export default GameDetailPage;
