import React from "react";
import ReactDOM from "react-dom/client";  // Asegúrate de importar desde 'react-dom/client'
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store"; 

import 'slick-carousel/slick/slick.css';  // Importa el estilo básico de Slick Carousel
import 'slick-carousel/slick/slick-theme.css';  // Importa el tema de Slick Carousel

// Usamos createRoot en lugar de ReactDOM.render para React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 🔹 Aquí envolvemos la App con el Provider de Redux */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Si deseas empezar a medir el rendimiento en tu app, pasa una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o envíalos a un endpoint de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();
