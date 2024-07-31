// Ruta relativa: src/components/NewContactForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Lista de avatares disponibles
const avatarOptions = Array.from({ length: 10 }, (_, i) => `${i + 1}.jpg`);

const NewContactForm = () => {
  const [nombre, setNombre] = useState('');
  const [avatar, setAvatar] = useState(avatarOptions[0]); // Valor predeterminado
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: new Date().toISOString(),
      key: new Date().toISOString(),
      nombre,
      avatar,
      estadoMensaje: 'Pendiente'
    };
    const contacts = JSON.parse(localStorage.getItem('contactos')) || [];
    contacts.push(newContact);
    localStorage.setItem('contactos', JSON.stringify(contacts));
    navigate('/');
  };

  return (
    <div className="new-contact-form">
      <h2>Agregar Nuevo Contacto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <label>
          Avatar:
          <select
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          >
            {avatarOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default NewContactForm;
