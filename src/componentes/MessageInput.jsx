// src/componentes/MessageInput.jsx

import React, { useState } from 'react';
import '../estilos/MessageInput.css';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() === '') return;
    onSendMessage(message);
    setMessage('');
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Escribe un mensaje..."
        className="message-input"
      />
      <button type="submit" className="send-button">Enviar</button>
    </form>
  );
};

export default MessageInput;
