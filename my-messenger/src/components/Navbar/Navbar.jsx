// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          Messenger
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/contacts">Contactos</Link>
          </li>
          <li>
            <Link to="/add-contact">Agregar Contacto</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;