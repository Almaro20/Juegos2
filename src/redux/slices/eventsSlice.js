// src/redux/slices/eventSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.REACT_APP_RAWG_API_KEY;

const initialState = {
  events: [],
  loading: false,
  error: null,
};

// Thunk para obtener eventos (puedes modificar la URL de la API si es necesario)
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async () => {
    const response = await axios.get(`https://api.rawg.io/api/events?key=${apiKey}`);
    return response.data.results;
  }
);

// Slice de los eventos
const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
