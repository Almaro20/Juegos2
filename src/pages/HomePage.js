import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [popularGames, setPopularGames] = useState([]);

  useEffect(() => {
    // Reemplaza tu API key aquí
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://api.rawg.io/api/games', {
          params: {
            key: 'b15934a1e9be431783f36275b23ab043',
            page_size: 5,  // Solo obtenemos 5 juegos populares
            ordering: 'rating',
          },
        });
        setPopularGames(response.data.results);
      } catch (error) {
        console.error("Error fetching the games:", error);
      }
    };
    fetchGames();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="homepage-container" style={{ minHeight: '100vh' }}>
      <h2>Juegos Populares</h2>
      <Slider {...settings}>
        {popularGames.map((game) => (
          <div key={game.id} className="carousel-item">
            <img src={game.background_image} alt={game.name} />
            <h3>{game.name}</h3>
          </div>
        ))}
      </Slider>

      <button className="btn-view-all">
        <a href="/games">Ver todos los juegos</a>
      </button>
    </div>
  );
};

export default HomePage;

