// src/redux/thunks.js

import { fetchGames } from './slices/gamesSlice';  // Importamos la acción de obtener juegos
import { fetchPublishers } from './slices/publishersSlice';  // Importamos la acción de obtener publishers

// Thunk para obtener juegos populares
export const fetchPopularGames = () => async (dispatch) => {
  try {
    const response = await fetch('https://api.example.com/popular-games');  // Reemplaza por la URL real
    const data = await response.json();
    dispatch(fetchGames(data));  // Despacha la acción fetchGames con los datos obtenidos
  } catch (error) {
    console.error(error);  // Manejo de errores
  }
};

// Thunk para obtener datos de un publisher
export const fetchPublisherData = (searchTerm) => async (dispatch) => {
  try {
    dispatch(fetchPublishers(searchTerm));  // Despacha la acción fetchPublishers con el término de búsqueda
  } catch (error) {
    console.error(error);  // Manejo de errores
  }
};
