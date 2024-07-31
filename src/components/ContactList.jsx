import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getContacts, getMessages } from '../localStorage'; // Asegúrate de la ruta correcta
import '../styles/ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const loadedContacts = getContacts();
        console.log('Loaded contacts:', loadedContacts);

        const allMessages = getMessages();
        console.log('All messages:', allMessages);

        const updatedContacts = loadedContacts.map(contact => {
          const contactMessages = allMessages[contact.id] || [];
          const lastMessage = contactMessages.length > 0 
            ? contactMessages[contactMessages.length - 1].texto 
            : 'No hay mensajes';
          const lastMessageDate = contactMessages.length > 0 
            ? new Date(contactMessages[contactMessages.length - 1].timestamp).toLocaleDateString() 
            : '';

          return {
            ...contact,
            lastMessage,
            lastMessageDate,
          };
        });

        console.log('Updated contacts with last messages:', updatedContacts);
        setContacts(updatedContacts);
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };

    loadContacts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="contact-list">
      <header className="header">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Buscar contactos..." 
            className="search-input" 
            value={searchText} 
            onChange={handleSearchChange} 
          />
          <img 
            src="/src/images/search_24dp_5F6368_FILL0_wght400_GRAD0_opz24.svg" 
            alt="Buscar" 
            className="search-icon" 
          />
        </div>
        <h1>Contactos</h1>
      </header>
      <div className="add-contact-container">
        <Link to="/new-contact" className="add-contact-button">Añadir Contacto</Link>
      </div>
      <div className="contact-list-container">
        {filteredContacts.length === 0 ? (
          <p>No hay contactos disponibles.</p>
        ) : (
          filteredContacts.map(contact => (
            <Link to={`/chat/${contact.id}`} key={contact.id} className="contact-item">
              <img src={`/src/images/${contact.avatar}`} alt={contact.name} className="avatar" />
              <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="last-message">{contact.lastMessage || 'No hay mensajes'}</div>
                <span className="last-message-date">{contact.lastMessageDate || ''}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;
