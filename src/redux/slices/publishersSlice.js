// src/redux/slices/publishersSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Tu API KEY desde el archivo .env
const apiKey = process.env.REACT_APP_RAWG_API_KEY;

// Thunk para obtener los publishers, que usará searchTerm como parámetro
export const fetchPublishers = createAsyncThunk(
  'publishers/fetchPublishers', // Nombre de la acción
  async (searchTerm) => {
    // Realizamos la solicitud a la API usando el término de búsqueda
    const response = await axios.get(`https://api.rawg.io/api/publishers?key=${apiKey}&search=${searchTerm}`);
    return response.data.results; // Retorna los resultados de publishers
  }
);

// Slice de publishers
const publishersSlice = createSlice({
  name: 'publishers', // Nombre del slice
  initialState: {
    publishers: [],  // Lista de publishers
    loading: false,   // Estado de carga
    error: null,      // Posible error en la carga
  },
  reducers: {},  // Aquí podrías agregar reducers adicionales si es necesario
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublishers.pending, (state) => {
        state.loading = true;  // Cambia el estado a 'loading' cuando la solicitud esté pendiente
      })
      .addCase(fetchPublishers.fulfilled, (state, action) => {
        state.loading = false;  // Cambia el estado a 'no loading' cuando se resuelva correctamente
        state.publishers = action.payload;  // Almacena los publishers en el estado
      })
      .addCase(fetchPublishers.rejected, (state, action) => {
        state.loading = false;  // Cambia el estado a 'no loading' si ocurre un error
        state.error = action.error.message;  // Almacena el mensaje de error
      });
  },
});

// Exportamos el reducer para usarlo en el store
export default publishersSlice.reducer;
