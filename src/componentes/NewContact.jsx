// src/componentes/NewContact.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/NewContact.css';
import { loadFromLocalStorage, saveToLocalStorage } from '../data/localStorage';

const avatarOptions = [
  "/imagenes/avatar1.png",
  "/imagenes/avatar2.png",
  "/imagenes/avatar3.png",
  "/imagenes/avatar4.png"
];

const NewContact = () => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setSelectedAvatar(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === '') return;

    const contacts = loadFromLocalStorage('contacts') || [];
    const newContact = {
      id: contacts.length + 1,
      name,
      avatar: selectedAvatar,
    };
    saveToLocalStorage('contacts', [...contacts, newContact]);
    navigate('/');
  };

  return (
    <div className="new-contact-container">
      <form className="new-contact-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={name} onChange={handleNameChange} className="contact-name-input" />
        </label>
        <label>
          Avatar:
          <select value={selectedAvatar} onChange={handleAvatarChange} className="contact-avatar-select">
            {avatarOptions.map((avatar, index) => (
              <option key={index} value={avatar}>
                <img src={avatar} alt={`Avatar ${index + 1}`} className="avatar-option-image" />
                Avatar {index + 1}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="submit-button">Añadir Contacto</button>
      </form>
    </div>
  );
};

export default NewContact;
