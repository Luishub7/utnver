import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../data/Context';
import '../styles/Contacts.css';

const NewContactForm = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();
  const { addContact } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact({ name, avatar });
    navigate('/contacts');
  };

  return (
    <div className="new-contact-form">
      <header className="header">
        <button onClick={() => navigate('/contacts')} className="back-button">←</button>
        <span>Nuevo Contacto</span>
      </header>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          placeholder="Nombre del contacto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          accept=".jpg,.png"
          onChange={(e) => setAvatar(e.target.files[0].name)}
        />
        <button type="submit">Agregar contacto</button>
      </form>
    </div>
  );
};

export default NewContactForm;
