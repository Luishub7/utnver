// src/components/NewContactForm.jsx
import React, { useState } from 'react';
import '../styles/NewContactForm.css';
import { addContact } from '../data/localStorage';

const imageNames = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
];

const NewContactForm = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(imageNames[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newContact = {
      id: Date.now(),
      name,
      avatar,
    };

    console.log('Nuevo contacto a agregar:', newContact);

    addContact(newContact);

    setName('');
    setAvatar(imageNames[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="new-contact-form">
      <label htmlFor="name">Nombre:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="avatar">Selecciona un avatar:</label>
      <select
        id="avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      >
        {imageNames.map((imageName) => (
          <option key={imageName} value={imageName}>
            {imageName}
          </option>
        ))}
      </select>

      <button type="submit">Crear Contacto</button>
    </form>
  );
};

export default NewContactForm;
