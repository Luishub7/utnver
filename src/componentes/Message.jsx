// src/componentes/Message.jsx

import React from 'react';
import '../estilos/Message.css';

const Message = ({ message }) => {
  const isMyMessage = message.authorId === 'yo';

  return (
    <div className={`message-container ${isMyMessage ? 'my-message' : 'their-message'}`}>
      <div className="message-content">
        {message.content}
      </div>
      <div className="message-info">
        <span className="message-date">{new Date(message.date).toLocaleString()}</span>
        <span className={`message-status ${message.status}`}>{message.status}</span>
      </div>
    </div>
  );
};

export default Message;
