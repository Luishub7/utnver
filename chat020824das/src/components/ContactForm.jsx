import React, { useState } from 'react';
import { addContact } from '../utils/localStorageUtils';

function ContactForm({ onAddContact }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = { id: Date.now(), name, image };
    onAddContact(newContact);
    setName('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos para ingresar nombre e imagen */}
      <button type="submit">Agregar Contacto</button>
    </form>
  );
}

export default ContactForm;
