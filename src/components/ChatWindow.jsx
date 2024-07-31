// Ruta relativa: src/components/ChatWindow.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ChatWindow = () => {
  const { contactId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('mensajes')) || {};
    setMessages(storedMessages[contactId] || []);
  }, [contactId]);

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;

    const newMessage = {
      id: new Date().toISOString(),
      texto: messageText,
      autor: '1', // Assuming '1' is the ID for the current user
      estado: 'Pendiente',
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, newMessage];
    const allMessages = JSON.parse(localStorage.getItem('mensajes')) || {};
    allMessages[contactId] = updatedMessages;
    localStorage.setItem('mensajes', JSON.stringify(allMessages));
    setMessages(updatedMessages);
    setMessageText('');
  };

  return (
    <div className="chat-window">
      <div className="header">
        <Link to={`/settings/${contactId}`} className="back-button">←</Link>
        <div className="contact-info">
          <h2>Contact Name</h2>
        </div>
      </div>
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={msg.autor === '1' ? 'my-message' : 'contact-message'}>
            <p>{msg.texto}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Escribir mensaje"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatWindow;
