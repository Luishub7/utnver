// src/components/ContactSettings.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Settings.css';

const ContactSettings = () => {
  const { contactId } = useParams();

  return (
    <div className="contact-settings">
      <header className="header">
        <Link to={`/chat/${contactId}`} className="back-button">←</Link>
        <span className="contact-name">Nombre del Contacto</span>
      </header>
      <main>
        <ul>
          <li>Notificaciones</li>
          <li>Mensajes temporales</li>
          <li>Grupos</li>
          <li>Añadir a Favoritos</li>
        </ul>
      </main>
    </div>
  );
};

export default ContactSettings;
