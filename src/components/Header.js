import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">Juegos RAWG</h1>
        <div>
          <Link to="/" className="mr-4">Inicio</Link>
          <Link to="/games">Juegos</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
