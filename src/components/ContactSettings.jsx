import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ContactSettings = () => {
  const { contactId } = useParams();

  return (
    <div className="contact-settings">
      <div className="header">
        <Link to={`/chat/${contactId}`} className="back-button">←</Link>
        <div className="contact-info">
          <h2>Contact Name</h2>
        </div>
      </div>
      <div className="settings-options">
        <button>Notificaciones</button>
        <button>Mensajes Temporales</button>
        <button>Grupos</button>
        <button>Añadir a Favoritos</button>
      </div>
    </div>
  );
};

export default ContactSettings;
