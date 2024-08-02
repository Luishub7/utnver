import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const AddContact = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleAddContact = () => {
    if (name && image) {
      const newContact = {
        id: Date.now().toString(), // Genera un ID único basado en el timestamp
        name,
        image
      };

      const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
      localStorage.setItem('contacts', JSON.stringify([...existingContacts, newContact]));

      // Redirigir a la pantalla de contactos después de agregar
      navigate('/contacts');
    }
  };

  return (
    <div>
      <h2>Agregar Contacto</h2>
      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Imagen (URL)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddContact}>
        Agregar Contacto
      </Button>
    </div>
  );
};

export default AddContact;
