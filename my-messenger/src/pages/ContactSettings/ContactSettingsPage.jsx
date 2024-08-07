// src/pages/ContactSettings/ContactSettingsPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/ContactSettingsPage.css';

const ContactSettingsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Función para volver a la página de chat
  const handleBack = () => {
    navigate(`/chat/${id}`);
  };

  // Obtener contacto desde localStorage
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const contact = contacts.find(c => c.id === parseInt(id, 10)) || {};

  return (
    <div className="contact-settings-page">
      <header className="settings-header">
        <button onClick={handleBack} className="back-button">
          <i className="fas fa-arrow-left"></i> {/* Asegúrate de tener FontAwesome o reemplázalo con un ícono adecuado */}
        </button>
        {/* <img src={contact.avatar || 'images/default-avatar.jpg'} alt="Avatar" className="contact-avatar" /> */}
        <img src={`/${contact.avatar}` || 'images/default-avatar.jpg'} alt="Avatar" className="contact-avatar" />

        <h1 className="contact-name">{contact.name || 'Nombre del Contacto'}</h1>
      </header>
      <section className="settings-options">
        <button className="option-button">Notificaciones</button>
        <button className="option-button">Mensajes temporales</button>
        <button className="option-button">Grupos</button>
        <button className="option-button">Añadir a Favoritos</button>
      </section>
    </div>
  );
};

export default ContactSettingsPage;
