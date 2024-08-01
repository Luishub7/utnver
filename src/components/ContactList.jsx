import React, { useState, useEffect } from 'react';
import './ContactList.css';

const ContactList = () => {
  // ... (resto del código sin cambios)

  return (
    <div className="contact-list">
      <header>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar contactos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-contact-button">Nuevo Contacto</button>
        </div>
      </header>
      <div className="contact-list-container">
        {/* ... (resto del código sin cambios) */}
        <div className="contact-item">
          <img src={contact.avatar} alt={contact.name} className="avatar" />
          <div className="contact-info">
            <span className="contact-name">{contact.name}</span>
            <span className="last-message">{contact.lastMessage || 'No hay mensajes aún'}</span>
          </div>
        </div>
        {/* ... (resto del código sin cambios) */}
      </div>
    </div>
  );
};

export default ContactList;
