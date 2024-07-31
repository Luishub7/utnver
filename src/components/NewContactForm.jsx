// Ruta relativa: src/components/NewContactForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewContactForm = () => {
  const [nombre, setNombre] = useState('');
  const [avatar, setAvatar] = useState('');
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
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />
        </label>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default NewContactForm;
