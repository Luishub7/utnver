// src/componentes/Chat.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Message from './Message';
import MessageInput from './MessageInput';
import '../estilos/Chat.css';
import { loadFromLocalStorage, addMessageToLocalStorage } from '../data/localStorage';

const Chat = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMessages = loadFromLocalStorage('messages') || [];
    console.log('Cargando mensajes desde localStorage:', storedMessages);
    setMessages(storedMessages);
  }, []);

  const contactMessages = messages.filter(
    message =>
      message.authorId == contactId ||
      (message.authorId == 'yo' && message.recipientId == contactId)
  );

  const contact = loadFromLocalStorage('contacts').find(c => c.id == contactId);

  const handleContactClick = () => {
    navigate(`/settings/${contactId}`);
  };

  const handleSendMessage = (newMessageContent) => {
    console.log('Nuevo mensaje:', newMessageContent);
    const newMessage = {
      id: messages.length + 1,
      authorId: 'yo',
      recipientId: contactId,
      content: newMessageContent,
      date: new Date(),
      status: 'pending',
    };
    console.log('Agregando mensaje al estado local:', newMessage);
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    console.log('Guardando mensajes actualizados en localStorage:', updatedMessages);
    addMessageToLocalStorage(newMessage); // Agregar el mensaje al localStorage
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
