// src/services/gamesService.js
export const fetchGamesAPI = async () => {
    // Aquí simulas una llamada a la API de juegos
    const games = [
      { id: 1, title: 'Game 1', isFavorite: false },
      { id: 2, title: 'Game 2', isFavorite: false },
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(games);
      }, 500); // Simula un retraso de 500 ms
    });
  };
  