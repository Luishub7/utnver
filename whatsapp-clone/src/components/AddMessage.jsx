// src/components/AddMessage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const AddMessage = () => {
  const { contactId } = useParams();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        contactId,
        text: newMessage,
        time: new Date().toLocaleTimeString()
      };

      const existingMessages = JSON.parse(localStorage.getItem('messages')) || [];
      localStorage.setItem('messages', JSON.stringify([...existingMessages, message]));

      // Debugging: Verificar si el mensaje se guarda correctamente
      console.log('New Message Added:', message);

      // Limpiar el campo de entrada
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Enviar Mensaje</h2>
      <TextField
        label="Mensaje"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        fullWidth
        margin="normal"
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Enviar
      </Button>
    </div>
  );
};

export default AddMessage;
