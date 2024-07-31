// src/components/ContactList.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const ContactList = ({ contacts }) => {
  return (
    <div className="contact-list">
      {contacts.map(contact => (
        <div key={contact.id} className="contact-item">
          <img
            src={`/src/images/${contact.avatar}.jpg`}  // Referencia a las imágenes en la carpeta src/images
            alt={contact.nombre}
            className="avatar"
          />
          <div className="contact-info">
            <h3>{contact.nombre}</h3>
            <p>{contact.estadoMensaje}</p>
          </div>
          <Link to={`/chat/${contact.id}`} className="chat-link">
            <button>Chat</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
