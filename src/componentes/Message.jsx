import React from 'react';
import '../estilos/Message.css';

const Message = ({ message, formattedDate }) => {
  const isMyMessage = message.authorId === 0;

  return (
    <div className={`message-container ${isMyMessage ? 'my-message' : 'their-message'}`}>
      <div className="message-content">
        {message.content}
      </div>
      <div className="message-info">
        <span className="message-date">{formattedDate}</span>
        <span className={`message-status ${message.status}`}>{message.status}</span>
      </div>
    </div>
  );
};

export default Message;
