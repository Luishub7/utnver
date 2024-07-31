import React from 'react';
import ReactDOM from 'react-dom/client'; // Usa 'react-dom/client' en lugar de 'react-dom'
import App from './App';
import '../src/styles/index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

