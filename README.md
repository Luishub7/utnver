// src/componentes/Chat.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MESSAGES } from '../data/messages';
import Message from './Message';
import MessageInput from './MessageInput';
import '../estilos/Chat.css';

const Chat = () => {
  const { contactId } = useParams();
  const contactMessages = MESSAGES.filter(message => message.authorId == contactId || message.authorId == 'yo' && message.recipientId == contactId);

  return (
    <div className="chat-container">
      <div className="messages-container">
        {contactMessages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <MessageInput contactId={contactId} />
    </div>
  );
};

export default Chat;


// src/componentes/ContactList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACTS } from '../data/contacts';
import { MESSAGES } from '../data/messages';
import '../estilos/ContactList.css';

const getLastMessage = (contactId) => {
  const contactMessages = MESSAGES.filter(message => message.authorId === contactId || message.authorId === 'yo' && message.recipientId === contactId);
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

const ContactList = () => {
  return (
    <div className="contact-list-container">
      <h1>Contactos</h1>
      <ul className="contact-list">
        {CONTACTS.map(contact => {
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
                        <span className={`contact-status ${lastMessage.status}`}>{lastMessage.status}</span>
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
import { useParams } from 'react-router-dom';
import { CONTACTS } from '../data/contacts';
import '../estilos/ContactSettings.css';

const ContactSettings = () => {
  const { contactId } = useParams();
  const contact = CONTACTS.find(c => c.id == contactId);

  return (
    <div className="settings-container">
      <h1>Configuraciones de {contact.name}</h1>
      <ul>
        <li>Notificaciones</li>
        <li>Bloquear contacto</li>
        <li>Ver historias</li>
      </ul>
    </div>
  );
};

export default ContactSettings;

// src/componentes/Mensaje.jsx
import React from 'react';
import '../estilos/Mensaje.css';

const Mensaje = ({ author, content, fecha, estado }) => {
  const mensajeClase = author === 'yo' ? 'mensaje yo' : 'mensaje otro';
  return (
    <div className={mensajeClase}>
      <div className="mensaje-content">{content}</div>
      <div className="mensaje-info">
        <span className="mensaje-fecha">{fecha}</span>
        <span className={`mensaje-estado ${estado}`}>{estado}</span>
      </div>
    </div>
  );
};

export default Mensaje;


// src/componentes/Message.jsx
import React from 'react';
import '../estilos/Message.css';

const Message = ({ message }) => {
  const isMyMessage = message.authorId === 'yo';

  return (
    <div className={`message-container ${isMyMessage ? 'my-message' : 'their-message'}`}>
      <div className="message-content">
        {message.content}
      </div>
      <div className="message-info">
        <span className="message-date">{new Date(message.date).toLocaleString()}</span>
        <span className={`message-status ${message.status}`}>{message.status}</span>
      </div>
    </div>
  );
};

export default Message;


// src/componentes/MessageInput.jsx
import React, { useState } from 'react';



const MessageInput = ({ contactId }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    // Lógica para enviar el mensaje
    console.log(`Enviar mensaje: ${message} a contacto ${contactId}`);
    setMessage('');
  };

  return (
    <div className="message-input-container">
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Escribe un mensaje" 
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default MessageInput;


// src/data/contacts.js
export const CONTACTS = [
  { id: 1, name: 'Pepe', avatar: '/src/imagenes/1.webp' },
  { id: 2, name: 'Ana', avatar: '/src/imagenes/2.webp' },
  { id: 3, name: 'Luis', avatar: '/src/imagenes/3.webp' },
  { id: 4, name: 'María', avatar: '/src/imagenes/4.webp' },
  { id: 5, name: 'Carlos', avatar: '/src/imagenes/5.webp' },
  { id: 6, name: 'Laura', avatar: '/src/imagenes/6.webp' },
  { id: 7, name: 'José', avatar: '/src/imagenes/7.webp' },
  { id: 8, name: 'Elena', avatar: '/src/imagenes/8.webp' },
  { id: 9, name: 'Fernando', avatar: '/src/imagenes/9.webp' },
  { id: 10, name: 'Clara', avatar: '/src/imagenes/10.webp' },
];

// src/data/messages.js
export const MESSAGES = [
  { id: 1, authorId: 1, recipientId: 'yo', content: 'Hola?', date: new Date(), status: 'read' },
  { id: 2, authorId: 'yo', recipientId: 1, content: 'Sos real OMG', date: new Date(), status: 'read' },
  { id: 3, authorId: 1, recipientId: 'yo', content: 'Obviamente, acaso lo dudaste?', date: new Date(), status: 'read' },
  { id: 4, authorId: 'yo', recipientId: 1, content: 'Jamás.', date: new Date(), status: 'delivered' },
  { id: 5, authorId: 1, recipientId: 'yo', content: 'Qué bueno!', date: new Date(), status: 'delivered' },
  { id: 6, authorId: 'yo', recipientId: 1, content: 'Sí!', date: new Date(), status: 'pending' },
  // Mensajes ficticios para otros contactos
  { id: 7, authorId: 2, recipientId: 'yo', content: 'Hola Ana', date: new Date(), status: 'read' },
  { id: 8, authorId: 'yo', recipientId: 2, content: 'Hola', date: new Date(), status: 'read' },
  { id: 9, authorId: 2, recipientId: 'yo', content: 'Cómo estás?', date: new Date(), status: 'read' },
  { id: 10, authorId: 'yo', recipientId: 2, content: 'Bien, y tú?', date: new Date(), status: 'delivered' },
  { id: 11, authorId: 2, recipientId: 'yo', content: 'Todo bien', date: new Date(), status: 'delivered' },
  { id: 12, authorId: 'yo', recipientId: 2, content: 'Qué bueno!', date: new Date(), status: 'pending' },
  // Repite para otros contactos...
];

/* src/estilos/Chat.css */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
}

.messages-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.message-input-container {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.message-input-container input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 10px;
}

.message-input-container button {
  padding: 10px 20px;
  border: none;
  background-color: #4CAF50;
  color: white;
  border-radius: 10px;
}

/* src/estilos/ContactList.css */
.contact-list-container {
  padding: 20px;
}

h1 {
  text-align: center;
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

/* src/estilos/ContactSettings.css */
.settings-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  background-color: white;
}

h1 {
  margin-bottom: 20px;
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
    width: 300px;
    display: flex;
    flex-direction: column;
}

.chat {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    max-height: 60vh;
}

.input-container {
    display: flex;
    margin-top: 10px;
}

.input-container input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
}

.input-container button {
    padding: 10px 15px;
    border: none;
    background-color: #28a745;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.input-container button:hover {
    background-color: #218838;
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
/* App.jsx  */
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

/* src/index.css */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

* {
  box-sizing: border-box;
}


// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

