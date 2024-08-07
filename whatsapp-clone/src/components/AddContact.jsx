// src/components/AddContact.jsx
import React, { useState } from 'react';

const AddContact = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = { id: Date.now(), name, image };
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    localStorage.setItem('contacts', JSON.stringify([...storedContacts, newContact]));
    setName('');
    setImage('');
  };

  return (
    <div>
      <h1>Agregar Contacto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div>
          {image && <img src={image} alt="Contacto" style={{ width: '100px', height: '100px' }} />}
        </div>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddContact;
