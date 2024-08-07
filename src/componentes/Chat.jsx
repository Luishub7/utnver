// src/componentes/Chat.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MESSAGES } from '../data/messages';
import Message from './Message';
import MessageInput from './MessageInput';
import '../estilos/Chat.css';
import { CONTACTS } from '../data/contacts';

const Chat = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(MESSAGES);

  const contactMessages = messages.filter(
    message =>
      message.authorId == contactId ||
      (message.authorId == 'yo' && message.recipientId == contactId)
  );
  const contact = CONTACTS.find(c => c.id == contactId);

  const handleContactClick = () => {
    navigate(`/settings/${contactId}`);
  };

  const handleSendMessage = (newMessageContent) => {
    const newMessage = {
      id: messages.length + 1,
      authorId: 'yo',
      recipientId: contactId,
      content: newMessageContent,
      date: new Date(),
      status: 'pending',
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ←
        </button>
        <div className="contact-info" onClick={handleContactClick}>
          <img src={contact.avatar} alt={`${contact.name} avatar`} className="contact-avatar" />
          <div className="contact-name">{contact.name}</div>
        </div>
      </div>
      <div className="messages-container">
        {contactMessages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
