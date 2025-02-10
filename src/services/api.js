import axios from "axios";

const API_KEY = "TU_API_KEY"; // Reemplaza con tu clave de RAWG
const BASE_URL = "https://api.rawg.io/api";

export const getPopularGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener juegos populares", error);
    return [];
  }
};
