// src/components/ChatWindow.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChatWindow = () => {
  const { contactId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log("Loading messages for contactId:", contactId);
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
    console.log("Stored messages:", storedMessages);
    if (storedMessages[contactId]) {
      setMessages(storedMessages[contactId]);
    }
  }, [contactId]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessages = [...messages, { text: newMessage, sender: 'user' }];
    setMessages(newMessages);

    // Guardar en localStorage
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
    storedMessages[contactId] = newMessages;
    localStorage.setItem('messages', JSON.stringify(storedMessages));

    console.log("Messages updated in localStorage:", storedMessages);

    // Limpiar el input
    setNewMessage('');
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="footer">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribir mensaje"
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatWindow;
