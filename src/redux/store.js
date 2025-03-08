import { configureStore } from '@reduxjs/toolkit';
import gamesSlice from './slices/gamesSlice';
import eventsSlice from './slices/eventsSlice';
import publishersSlice from './slices/publishersSlice';


const store = configureStore({
  reducer: {
    games: gamesSlice,
    events: eventsSlice,
    publishers: publishersSlice,
  },
});

export default store;
