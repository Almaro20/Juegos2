import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublisherData } from '../redux/thunks'; // Asegúrate de importar el thunk necesario
import { Link, useParams } from 'react-router-dom';
import './PublisherPage.css';

const PublisherPage = () => {
  const { id } = useParams(); // Obtenemos el id del publisher desde los parámetros de la URL
  const dispatch = useDispatch();
  
  // Obtener publisher y juegos desde el estado de Redux
  const { publisher, games, loading, error } = useSelector(state => state.publishers);

  // Depurar: Verificar si el id está siendo recibido correctamente
  console.log("Publisher ID:", id);

  // Depurar: Verificar los datos en Redux
  console.log("Estado del publisher:", publisher);
  console.log("Estado de los juegos:", games);

  // Cargar los datos del publisher cuando el componente se monta
  useEffect(() => {
    if (id) {
      dispatch(fetchPublisherData(id)); // Despachamos el thunk con el id del publisher
    }
  }, [dispatch, id]);

  // Mostrar estado de carga o error
  if (loading) return <p className="loading">Cargando...</p>;
  if (error) return <p className="error">{error}</p>;

  // Si no se encuentra el publisher, mostramos un mensaje
  if (!publisher) return <p className="error">Publisher no encontrado.</p>;

  return (
    <div className="publisher-page">
      <h1>{publisher.name}</h1>
      <p>{publisher.description || <em>Sin descripción disponible.</em>}</p>

      <h2>Juegos Publicados</h2>
      {games && games.length > 0 ? (
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

      <div className="button-container">
        <Link to="/">
          <button className="back-btn">Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default PublisherPage;
