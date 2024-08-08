// src/componentes/NewContact.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage, loadFromLocalStorage } from '../data/localStorage';
import '../estilos/NewContact.css';

const NewContact = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

  const avatarOptions = [
    '/imagenes/1.webp',
    '/imagenes/2.webp',
    '/imagenes/3.webp',
    '/imagenes/4.webp',
    '/imagenes/4.webp',
    '/imagenes/5.webp',
    '/imagenes/6.webp',
    '/imagenes/7.webp',
    '/imagenes/8.webp'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: Date.now(),
      name,
      avatar
    };

    const contacts = loadFromLocalStorage('contacts') || [];
    contacts.push(newContact);
    saveToLocalStorage('contacts', contacts);

    navigate('/');
  };

  return (
    <div className="new-contact-container">
      <div className="new-contact-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src="/imagenes/arrow_back.svg" alt="Back" />
        </button>
        <button className="home-button" onClick={() => navigate('/')}>
          <img src="/imagenes/home.svg" alt="Home" />
        </button>
      </div>
      <h2>Nuevo Contacto</h2>
      <form className="new-contact-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Avatar:
          <select value={avatar} onChange={(e) => setAvatar(e.target.value)} required>
            <option value="">Seleccionar avatar</option>
            {avatarOptions.map((option) => (
              <option key={option} value={option}>
                <img src={option} alt="Avatar opción" className="avatar-option" />
                {option}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="new-contact-submit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default NewContact;
