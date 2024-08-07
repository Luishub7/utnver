// src/componentes/ContactSettings.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../estilos/ContactSettings.css';
import { loadFromLocalStorage } from '../data/localStorage';

const ContactSettings = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const contact = loadFromLocalStorage('contacts').find(c => c.id == contactId);

  return (
    <div className="settings-container">
      <div className="settings-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <img src={contact.avatar} alt={`${contact.name} avatar`} className="contact-avatar" />
        <h1>Configuraciones de {contact.name}</h1>
      </div>
      <ul>
        <li>Notificaciones</li>
        <li>Bloquear contacto</li>
        <li>Ver historias</li>
      </ul>
    </div>
  );
};

export default ContactSettings;
