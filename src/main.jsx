// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeLocalStorage } from './data/localStorage';

initializeLocalStorage(); // Inicializa localStorage con datos por defecto si no existen

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
