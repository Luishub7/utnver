// src/components/NewContactForm.jsx
import React, { useState } from 'react';

// Importar las imágenes usando import.meta.globEager
const images = import.meta.globEager('../images/*.jpg');
const imageNames = Object.keys(images).map((path) => path.split('/').pop());

const NewContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(imageNames[0] || ''); // Estado para el avatar

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: Date.now(),
      name,
      phone,
      avatar, // Guardar el nombre del avatar seleccionado
    };

    const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    localStorage.setItem('contacts', JSON.stringify([...existingContacts, newContact]));

    console.log('Nuevo contacto creado:', newContact);

    // Limpiar el formulario después de la creación
    setName('');
    setPhone('');
    setAvatar(imageNames[0] || '');
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

      <label htmlFor="phone">Teléfono:</label>
      <input
        type="tel"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
