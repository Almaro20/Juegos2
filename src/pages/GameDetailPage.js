import React from "react";
import { useParams } from "react-router-dom";

const GameDetailPage = () => {
  let { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Detalles del Juego (ID: {id})</h1>
      <p>Aquí irán los detalles del videojuego.</p>
    </div>
  );
};

export default GameDetailPage;
