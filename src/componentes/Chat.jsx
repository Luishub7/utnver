import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import { formatDate } from '../utils/dateUtils';
import Message from './Message';
import MessageInput from './MessageInput';
import ErrorBoundary from './ErrorBoundary';
import localStorageService from '../utils/localStorageService';
import '../estilos/Chat.css';

const Chat = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const { contacts, messages, addMessage } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const contactMessages = messages.filter(
    message =>
      message.authorId === Number(contactId) ||
      (message.authorId === 0 && message.recipientId === Number(contactId))
  );

  const contact = contacts.find(c => c.id === Number(contactId));

  const handleSendMessage = (newMessageContent) => {
    const newMessage = {
      id: localStorageService.generateMessageId(),
      authorId: 0,
      recipientId: Number(contactId),
      content: newMessageContent,
      date: new Date().toISOString(),
      status: 'Pendiente',
    };

    addMessage(newMessage); // Usar addMessage para actualizar el estado y localStorage
    scrollToBottom();
  };

  if (!contact) {
    return <div>El contacto no fue encontrado.</div>;
  }

  return (
    <ErrorBoundary>
      <div className="chat-container">
        <div className="chat-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <img src="/imagenes/arrow_back.svg" alt="Back" />
          </button>
          <button className="home-button" onClick={() => navigate('/')}>
            <img src="/imagenes/home.svg" alt="Home" />
          </button>
          <div className="contact-info-chat" onClick={() => navigate(`/settings/${contactId}`)}>
            <img src={contact.avatar} alt={`${contact.name} avatar`} className="contact-avatar" />
            <div className="contact-name">{contact.name}</div>
          </div>
        </div>
        <div className="messages-container">
          {contactMessages.map(message => (
            <Message 
              key={message.id} 
              message={message} 
              formattedDate={formatDate(message.date)}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </ErrorBoundary>
  );
};

export default Chat;
