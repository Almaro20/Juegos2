import axios from "axios";

const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
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
