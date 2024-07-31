// src/components/NewContactForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Contacts.css';

const NewContactForm = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      // Obtener contactos desde localStorage
      const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
      // Agregar nuevo contacto
      const newContact = {
        id: Date.now(), // Usar un ID único
        name,
      };
      savedContacts.push(newContact);
      // Guardar contactos en localStorage
      localStorage.setItem('contacts', JSON.stringify(savedContacts));
      navigate('/');
    }
  };

  return (
    <div className="new-contact-form">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Contact Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default NewContactForm;
