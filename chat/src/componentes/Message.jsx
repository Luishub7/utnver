import React from 'react';
import '../estilos/Message.css';

const Message = ({ message }) => {
  const isMyMessage = message.authorId === 'yo';

  // Función para traducir el estado al español
  const getStatusText = (status) => {
    switch (status) {
      case 'read':
        return 'leído';
      case 'delivered':
        return 'entregado';
      case 'pending':
        return 'pendiente';
      default:
        return status;
    }
  };

  return (
    <div className={`message-container ${isMyMessage ? 'my-message' : 'their-message'}`}>
      <div className="message-content">
        {message.content}
      </div>
      <div className="message-info">
        <span className="message-date">{new Date(message.date).toLocaleString()}</span>
        <span className={`message-status ${message.status}`}>{getStatusText(message.status)}</span>
      </div>
    </div>
  );
};

export default Message;
