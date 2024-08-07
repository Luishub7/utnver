// src/componentes/Chat.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Message from './Message';
import MessageInput from './MessageInput';
import '../estilos/Chat.css';
import { loadFromLocalStorage, addMessageToLocalStorage, generateMessageId } from '../data/localStorage';

const Chat = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMessages = loadFromLocalStorage('messages') || [];
    setMessages(storedMessages);
  }, []);

  const contactMessages = messages.filter(
    message =>
      message.authorId === Number(contactId) ||
      (message.authorId === 0 && message.recipientId === Number(contactId))
  );

  const contact = loadFromLocalStorage('contacts').find(c => c.id === Number(contactId));

  const handleContactClick = () => {
    navigate(`/settings/${contactId}`);
  };

  const handleSendMessage = (newMessageContent) => {
    const newMessage = {
      id: generateMessageId(),
      authorId: 0,
      recipientId: Number(contactId),
      content: newMessageContent,
      date: new Date().toISOString(),
      status: 'pending',
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    addMessageToLocalStorage(newMessage);

    window.dispatchEvent(new Event('storage')); // Disparar evento de almacenamiento
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
