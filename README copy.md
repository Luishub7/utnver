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
//src\componentes\ContactList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACTS } from '../data/contacts';
import { MESSAGES } from '../data/messages';
import '../estilos/ContactList.css';

const getLastMessage = (contactId) => {
  const contactMessages = MESSAGES.filter(message =>
    message.authorId === contactId || (message.authorId === 'yo' && message.recipientId === contactId)
  );
  return contactMessages[contactMessages.length - 1];
};

const formatDate = (date) => {
  const messageDate = new Date(date);
  const now = new Date();
  const timeDifference = now - messageDate;
  const oneDay = 24 * 60 * 60 * 1000;
  const twoDays = 48 * 60 * 60 * 1000;

  if (timeDifference < oneDay) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (timeDifference < twoDays) {
    return 'ayer';
  } else {
    return messageDate.toLocaleDateString();
  }
};

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

const ContactList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra los contactos según el término de búsqueda
  const filteredContacts = CONTACTS.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contact-list-container">
      <input
        type="text"
        placeholder="Buscar contactos"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="contact-list">
        {filteredContacts.map(contact => {
          const lastMessage = getLastMessage(contact.id);
          return (
            <li key={contact.id} className="contact-item">
              <Link to={`/chat/${contact.id}`} className="contact-link">
                <img src={contact.avatar} alt={`${contact.name} avatar`} className="contact-avatar" />
                <div className="contact-info">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-lastMessage">{lastMessage ? lastMessage.content : 'No hay mensajes'}</div>
                  <div className="contact-date-status">
                    {lastMessage && (
                      <>
                        <span className="contact-date">{formatDate(lastMessage.date)}</span>
                        <span className={`contact-status ${lastMessage.status}`}>{getStatusText(lastMessage.status)}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactList;
// src/componentes/ContactSettings.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CONTACTS } from '../data/contacts';
import '../estilos/ContactSettings.css';

const ContactSettings = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const contact = CONTACTS.find(c => c.id == contactId);

  return (
    <div className="settings-container">
      <div className="settings-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <img src={contact.avatar} alt={`${contact.name} avatar`} className="contact-avatar" />
        <h1>Configuraciones de {contact.name}</h1>
      </div>
      <ul>
        <li>Notificaciones</li>
        <li>Bloquear contacto</li>
        <li>Ver historias</li>
      </ul>
    </div>
  );
};

export default ContactSettings;
//src\componentes\Message.jsx
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
// src/componentes/MessageInput.jsx
import React, { useState } from 'react';
import '../estilos/MessageInput.css';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() === '') return;
    onSendMessage(message);
    setMessage('');
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Escribe un mensaje..."
        className="message-input"
      />
      <button type="submit" className="send-button">Enviar</button>
    </form>
  );
};

export default MessageInput;
/* src/estilos/Chat.css */

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: white;
}

.back-button {
  font-size: 1.5em;
  background: none;
  border: none;
  cursor: pointer;
}

.contact-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-grow: 1;
}

.contact-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 10px;
}

.contact-name {
  font-size: 1.2em;
  font-weight: bold;
}

.messages-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}

.message-input-container {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: white;
}

.message-input-container input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.message-input-container button {
  padding: 10px 15px;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.message-input-container button:hover {
  background-color: #218838;
}

@media (max-width: 768px) {
  .contact-avatar {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }

  .contact-name {
    font-size: 1em;
  }

  .back-button {
    font-size: 1.2em;
  }
}
/* src/estilos/ContactList.css */

.contact-list-container {
  padding: 20px;
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
}

.search-icon {
  font-size: 20px;
  color: #888;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-item {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: white;
}

.contact-link {
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  width: 100%;
}

.contact-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 10px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.contact-name {
  font-weight: bold;
}

.contact-lastMessage {
  font-size: 0.9em;
}

.contact-date-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-date {
  font-size: 0.8em;
  color: gray;
}

.contact-status {
  font-size: 0.8em;
  margin-left: 10px;
}

.contact-status.read {
  color: green;
}

.contact-status.delivered {
  color: blue;
}

.contact-status.pending {
  color: orange;
}

@media (max-width: 768px) {
  .contact-item {
    padding: 5px;
  }

  .contact-avatar {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }

  .contact-name {
    font-size: 1em;
  }

  .contact-lastMessage {
    font-size: 0.8em;
  }

  .contact-date {
    font-size: 0.7em;
  }

  .contact-status {
    font-size: 0.7em;
  }
}
/* src/estilos/ContactSettings.css */
.settings-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  background-color: white;
}

.settings-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  font-size: 1.5em;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}

.contact-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 10px;
}

h1 {
  margin: 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}

@media (max-width: 768px) {
  .settings-container {
    padding: 10px;
    margin: 5px;
  }

  .back-button {
    font-size: 1.2em;
  }

  .contact-avatar {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }

  h1 {
    font-size: 1.2em;
  }

  li {
    padding: 5px;
    font-size: 0.9em;
  }
}
/* src/estilos/main.css */

body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.App {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .App {
    padding: 10px;
    max-width: 100%;
  }
}
/* src/estilos/Mensaje.css */
.mensaje {
    border: 1px solid #ccc;
    padding: 8px 12px;
    margin: 5px 0;
    border-radius: 15px;
    max-width: 60%;
    display: flex;
    flex-direction: column;
}

.mensaje-content {
    margin: 5px 0;
    word-wrap: break-word;
}

.mensaje-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.8em;
    color: gray;
}

.mensaje-estado.visto {
    color: green;
}

.mensaje-estado.entregado {
    color: orange;
}

.mensaje-estado.no_entregado {
    color: red;
}

.mensaje.yo {
    background-color: lightgreen;
    align-self: flex-end;
    text-align: right;
}

.mensaje.otro {
    background-color: white;
    align-self: flex-start;
    text-align: left;
}
/* src/estilos/Message.css */

.message-container {
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
}

.my-message {
  align-self: flex-end;
  background-color: #e0f7e9;
}

.their-message {
  align-self: flex-start;
  background-color: #f0f0f0;
}

.message-content {
  padding: 10px;
  border-radius: 10px;
}

.message-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8em;
  margin-top: 5px;
}

.message-status {
  margin-left: 10px;
}

.message-status.read {
  color: green;
}

.message-status.delivered {
  color: blue;
}

.message-status.pending {
  color: orange;
}

@media (max-width: 768px) {
  .message-content {
    font-size: 0.9em;
  }

  .message-info {
    font-size: 0.7em;
  }
}
/* src/estilos/MessageInput.css */
.message-input-container {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: white;
}

.message-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
  outline: none;
}

.send-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0056b3;
}
//src\App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactList from './componentes/ContactList';
import Chat from './componentes/Chat';
import ContactSettings from './componentes/ContactSettings';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/chat/:contactId" element={<Chat />} />
        <Route path="/settings/:contactId" element={<ContactSettings />} />
      </Routes>
    </Router>
  );
};

export default App;
//src\App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactList from './componentes/ContactList';
import Chat from './componentes/Chat';
import ContactSettings from './componentes/ContactSettings';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/chat/:contactId" element={<Chat />} />
        <Route path="/settings/:contactId" element={<ContactSettings />} />
      </Routes>
    </Router>
  );
};

export default App;
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
<!-- chatmsg\index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="src/style.css" />
  </head>
  <body>
    <div id="root"></div>

    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
