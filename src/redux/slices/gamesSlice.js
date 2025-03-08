// src/redux/slices/gameSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.REACT_APP_RAWG_API_KEY;

// Estado inicial para los juegos
const initialState = {
  allGames: [],
  popularGames: [],
  selectedGame: null,  // Agregamos el estado para un solo juego
  loading: false,
  error: null,
  currentPage: 1,
  searchTerm: '',
  favorites: [],  // Agregamos el estado de favoritos
};

// Thunk para obtener todos los juegos
export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (page) => {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${page}`);
    return response.data.results;
  }
);

// Thunk para obtener juegos populares
export const fetchPopularGames = createAsyncThunk(
  'games/fetchPopularGames',
  async () => {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=5&ordering=-added`);
    return response.data.results;
  }
);

// Thunk para obtener detalles de un juego específico
export const fetchGameDetails = createAsyncThunk(
  'games/fetchGameDetails',
  async (gameId) => {
    const response = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
    return response.data;  // Retorna todos los detalles del juego
  }
);

// Slice de los juegos
const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // Acción para agregar o quitar favoritos
    toggleFavorite: (state, action) => {
      const gameId = action.payload;
      if (state.favorites.includes(gameId)) {
        state.favorites = state.favorites.filter(id => id !== gameId); // Eliminar de favoritos
      } else {
        state.favorites.push(gameId); // Agregar a favoritos
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchGames
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.allGames = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // fetchPopularGames
      .addCase(fetchPopularGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularGames.fulfilled, (state, action) => {
        state.loading = false;
        state.popularGames = action.payload;
      })
      .addCase(fetchPopularGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetchGameDetails
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGame = action.payload; // Guarda el juego detallado en el estado
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Exportamos las acciones para el search term, la página y los favoritos
export const { setSearchTerm, setPage, toggleFavorite } = gameSlice.actions;

export default gameSlice.reducer;
