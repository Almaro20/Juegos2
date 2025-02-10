import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';  // La página de inicio
import GamesPage from './pages/GamesPage';  // La página de juegos
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de inicio */}
        <Route path="/" element={<HomePage />} />
        
        {/* Ruta de todos los juegos */}
        <Route path="/games" element={<GamesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
