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
    '/images/1.webp',
    '/images/2.webp',
    '/images/3.webp',
    '/images/4.webp',
    '/images/4.webp',
    '/images/5.webp',
    '/images/6.webp',
    '/images/7.webp',
    '/images/8.webp', 
    '/images/9.webp',
    '/images/10.webp',
  ];

  const handleAddContact = () => {
    if (name && avatar) {
      const contacts = loadFromLocalStorage('contacts') || [];
      const newContact = {
        id: contacts.length + 1,
        name: name,
        avatar: avatar,
      };
      const updatedContacts = [...contacts, newContact];
      saveToLocalStorage('contacts', updatedContacts);
      navigate('/'); // Redirige a la lista de contactos
    }
  };

  return (
    <div className="new-contact-container">
      <h2>Nuevo Contacto</h2>
      <input
        type="text"
        placeholder="Nombre del contacto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={avatar} onChange={(e) => setAvatar(e.target.value)}>
        <option value="">Seleccionar Avatar</option>
        {avatarOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={handleAddContact}>Guardar Contacto</button>
    </div>
  );
};

export default NewContact;
