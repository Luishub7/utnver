// src/components/ContactForm/ContactForm.jsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(''); // Variable para la ruta del avatar

  const handleSubmit = (event) => {
    event.preventDefault();
    // Obtener los contactos actuales desde localStorage
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Generar un ID único para el nuevo contacto
    const newId = contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1;

    // Crear el nuevo contacto
    const newContact = { id: newId, name, avatar: `images/${avatar}`, lastMessage: '', lastMessageTime: '' }; // Agregar "images/" a la ruta del avatar

    // Agregar el nuevo contacto a la lista
    contacts.push(newContact);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Limpiar el formulario
    setName('');
    setAvatar('');
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0].name); // Guardar el nombre del archivo
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Agregar Contacto</h2>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="avatar">Avatar:</label>
        <input
          type="file"
          id="avatar"
          accept="image/*" // Aceptar solo imágenes
          onChange={handleAvatarChange}
          required
        />
      </div>
      <button type="submit">Agregar Contacto</button>
    </form>
  );
};

export default ContactForm;