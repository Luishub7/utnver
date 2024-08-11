import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import '../estilos/ContactSettings.css';

const ContactSettings = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const { contacts } = useChat();
  const contact = contacts.find(c => c.id === Number(contactId));

  if (!contact) {
    return <div>El contacto no fue encontrado.</div>;
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src="/imagenes/arrow_back.svg" alt="Back" />
        </button>
        <button className="home-button" onClick={() => navigate('/')}>
          <img src="/imagenes/home.svg" alt="Home" />
        </button>
        <img src={contact.avatar} alt={`${contact.name} avatar`} className="contact-avatar" />
        <div><h1>Configuraciones de {contact.name}</h1></div>
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
