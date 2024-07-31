// src/pages/Contacts.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  // Cargar contactos desde localStorage
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(savedContacts);
  }, []);

  return (
    <div className="contacts-page">
      {contacts.length === 0 ? (
        <div className="no-contacts">
          <p>No contacts found</p>
          <Link to="/new-contact">
            <button className="add-contact-btn">Add New Contact</button>
          </Link>
        </div>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <span>{contact.name}</span>
              {/* Agrega un enlace a la página de chat */}
              <Link to={`/chat/${contact.id}`}>Chat</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Contacts;
