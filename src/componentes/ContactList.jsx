// src/componentes/ContactList.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../estilos/ContactList.css';
import { loadFromLocalStorage, saveToLocalStorage } from '../data/localStorage';

const getLastMessage = (messages, contactId) => {
  const contactMessages = messages
    .filter(message => message.authorId === contactId || (message.authorId === 0 && message.recipientId === contactId))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return contactMessages.length > 0 ? contactMessages[0] : null;
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
    return 'Ayer';
  } else {
    return messageDate.toLocaleDateString();
  }
};

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadedContacts = loadFromLocalStorage('contacts');
    const loadedMessages = loadFromLocalStorage('messages');
    setContacts(loadedContacts);
    setMessages(loadedMessages);
  }, []);

  const filteredContacts = contacts
    .filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const lastMessageA = getLastMessage(messages, a.id);
      const lastMessageB = getLastMessage(messages, b.id);

      if (lastMessageA && lastMessageB) {
        return new Date(lastMessageB.date) - new Date(lastMessageA.date); // Ordenar por fecha de último mensaje
      } else if (lastMessageA) {
        return -1; // Contacto A tiene mensaje, B no
      } else if (lastMessageB) {
        return 1; // Contacto B tiene mensaje, A no
      } else {
        return 0; // Ninguno tiene mensajes, mantener orden actual
      }
    });

  const handleAddContactClick = () => {
    navigate('/new-contact'); // Redirigir a la pantalla de nuevo contacto
  };

  return (
    <div className="contact-list-container">
      <div className="contact-search">
        <input
          type="text"
          placeholder="Buscar contacto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="add-contact-button" onClick={handleAddContactClick}>
          Nuevo Contacto
        </button>
      </div>

      <ul className="contact-list">
        {filteredContacts.map((contact) => {
          const lastMessage = getLastMessage(messages, contact.id);
          return (
            <li key={contact.id} className="contact-item">
              <Link to={`/chat/${contact.id}`} className="contact-link">
                <img src={contact.avatar} alt={contact.name} className="contact-avatar" />
                <div className="contact-info-main">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-lastMessage">
                    {lastMessage ? lastMessage.content : 'Sin mensajes'}
                  </span>
                </div>
                <div className="contact-date-status">
                  <span className="contact-date">
                    {lastMessage ? formatDate(lastMessage.date) : ''}
                  </span>
                  <span className={`contact-status ${lastMessage ? lastMessage.status : ''}`}>
                    {lastMessage ? lastMessage.status : ''}
                  </span>
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
