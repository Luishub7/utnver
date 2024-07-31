import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../data/Context';
import '../styles/Chat.css';

const ChatWindow = () => {
  const { contactId } = useParams();
  const { contacts, messages, sendMessage } = useContext(AppContext);
  const [message, setMessage] = useState('');

  const contact = contacts.find(c => c.id === contactId);
  const contactMessages = messages[contactId] || [];

  const handleSend = () => {
    sendMessage(contactId, message);
    setMessage('');
  };

  return (
    <div className="chat-window">
      <header className="header">
        <Link to="/contacts" className="back-button">←</Link>
        <img src={`../images/${contact.avatar}`} alt={contact.name} className="avatar" />
        <span className="contact-name">{contact.name}</span>
        <Link to={`/settings/${contactId}`} className="settings-button">⚙️</Link>
      </header>
      <main>
        {contactMessages.map((msg, index) => (
          <div key={index} className={msg.isSender ? 'message user' : 'message contact'}>
            {msg.text}
          </div>
        ))}
      </main>
      <footer className="footer">
        <input
          type="text"
          placeholder="Escribir mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend}>Enviar</button>
      </footer>
    </div>
  );
};

export default ChatWindow;
