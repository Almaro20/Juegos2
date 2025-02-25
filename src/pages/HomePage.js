import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [publishers, setPublishers] = useState([]);

  const apiKey = process.env.REACT_APP_RAWG_API_KEY;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://api.rawg.io/api/games', {
          params: {
            key: apiKey,
            page_size: 5,
            ordering: 'rating',
          },
        });
        setPopularGames(response.data.results);
      } catch (error) {
        console.error("Error al obtener juegos populares:", error);
      }
    };
    fetchGames();
  }, [apiKey]);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;
    try {
      const response = await axios.get(`https://api.rawg.io/api/publishers`, {
        params: {
          key: apiKey,
          search: searchTerm,
        },
      });
      setPublishers(response.data.results);
    } catch (error) {
      console.error("Error al buscar publishers:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="homepage-container">
      <h1>Juegos Populares</h1>
      <Slider {...settings}>
        {popularGames.map((game) => (
          <div key={game.id} className="carousel-item">
            <Link to={`/game/${game.id}`}>
              <img src={game.background_image} alt={game.name} />
              <h3>{game.name}</h3>
            </Link>
          </div>
        ))}
      </Slider>

      <div className="search-publishers">
        <h2>Buscar Publishers</h2>
        <input
          type="text"
          placeholder="Ingresa el nombre del publisher"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {publishers.length > 0 && (
        <div className="publisher-results">
          <h2>Resultados</h2>
          <ul>
            {publishers.map((publisher) => (
              <li key={publisher.id}>
                <Link to={`/publisher/${publisher.id}`}>{publisher.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
