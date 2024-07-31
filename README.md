import React, { useState } from 'react';

const ChatWindow = ({ contactId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
    if (storedMessages[contactId]) {
      setMessages(storedMessages[contactId]);
    }
  }, [contactId]);

  const sendMessage = () => {
    const newMessages = [...messages, { text: newMessage, sender: 'user' }];
    setMessages(newMessages);

    // Save to localStorage
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
    storedMessages[contactId] = newMessages;
    localStorage.setItem('messages', JSON.stringify(storedMessages));

    setNewMessage('');
  };

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          {msg.text}
        </div>
      ))}
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