// src/componentes/ContactList.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../estilos/ContactList.css';
import { loadFromLocalStorage } from '../data/localStorage';

// La función `getLastMessage` va aquí, antes de la declaración del componente `ContactList`
const getLastMessage = (messages, contactId) => {
  const contactMessages = messages
    .filter(message => message.authorId === contactId || (message.authorId === 0 && message.recipientId === contactId))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordenar por fecha descendente

  return contactMessages.length > 0 ? contactMessages[0] : null; // Devolver null si no hay mensajes
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
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedContacts = loadFromLocalStorage('contacts') || [];
    const storedMessages = loadFromLocalStorage('messages') || [];
    setContacts(storedContacts);
    setMessages(storedMessages);
  }, []);

  // Escuchar cambios en el storage
  useEffect(() => {
    const handleStorageChange = () => {
      setMessages(loadFromLocalStorage('messages') || []);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const filteredContacts = contacts.filter(contact =>
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
          const lastMessage = getLastMessage(messages, contact.id);
          return (
            <li key={contact.id} className="contact-item">
              <Link to={`/chat/${contact.id}`} className="contact-link">
                <img src={contact.avatar} alt={`${contact.name} avatar`} className="contact-avatar" />
                <div className="contact-info">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-lastMessage">
                    {lastMessage ? lastMessage.content : 'No hay mensajes'}
                  </div>
                  {lastMessage && (
                    <div className="contact-date-status">
                      <span className="contact-date">{formatDate(lastMessage.date)}</span>
                      <span className={`contact-status ${lastMessage.status}`}>{getStatusText(lastMessage.status)}</span>
                    </div>
                  )}
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
