import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import { formatDate } from '../utils/dateUtils';
import '../estilos/ContactList.css';

const getLastMessage = (messages, contactId) => {
  const contactMessages = messages
    .filter(message => message.authorId === contactId || (message.authorId === 0 && message.recipientId === contactId))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return contactMessages.length > 0 ? contactMessages[0] : null;
};

const ContactList = () => {
  const { contacts, messages } = useChat();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredContacts = contacts
    .filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const lastMessageA = getLastMessage(messages, a.id);
      const lastMessageB = getLastMessage(messages, b.id);

      if (lastMessageA && lastMessageB) {
        return new Date(lastMessageB.date) - new Date(lastMessageA.date);
      } else if (lastMessageA) {
        return -1;
      } else if (lastMessageB) {
        return 1;
      } else {
        return 0;
      }
    });

  const handleAddContactClick = () => {
    navigate('/new-contact');
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
