// src/components/ContactList.jsx
import React, { useEffect, useState } from 'react';
import '../styles/ContactList.css';
import { getContacts } from '../data/localStorage';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = () => {
      const fetchedContacts = getContacts();
      console.log('Contactos obtenidos:', fetchedContacts);
      setContacts(fetchedContacts);
    };

    fetchContacts();
  }, []);

  return (
    <div className="contact-list">
      <header>
        <h1>Pantalla Principal</h1>
      </header>
      <div className="contact-list-container">
        {contacts.length > 0 ? (
          <ul>
            {contacts.map(contact => (
              <li key={contact.id}>
                <img
                  src={`/src/images/${contact.avatar}`}
                  alt={`Avatar de ${contact.name}`}
                  className="contact-avatar"
                />
                <span>{contact.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay contactos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ContactList;
