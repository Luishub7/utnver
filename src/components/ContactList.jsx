import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../data/Context';
import '../styles/Contacts.css';

const ContactList = () => {
  const { contacts } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="contact-list">
      <header className="header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar contactos"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <Link to="/new-contact" className="add-contact-button">Agregar Contacto</Link>
      </header>
      <main>
        {filteredContacts.map(contact => (
          <Link to={`/chat/${contact.id}`} key={contact.id} className="contact-item">
            <img src={`../images/${contact.avatar}`} alt={contact.name} className="avatar" />
            <div className="contact-info">
              <span className="contact-name">{contact.name}</span>
              <span className="last-message">{contact.lastMessage}</span>
              <span className="message-time">{contact.messageTime}</span>
              <span className={`message-status ${contact.status}`}>
                {contact.status}
              </span>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default ContactList;
