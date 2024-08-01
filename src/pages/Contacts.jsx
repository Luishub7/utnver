// src/pages/Contacts.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(savedContacts);
  }, []);

  return (
    <div className="contacts-page">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <span>{contact.name}</span>
            <Link to={`/chat/${contact.id}`}>Chat</Link>
          </li>
        ))}
      </ul>
      <Link to="/new-contact">
        <button className="add-contact-btn">Add New Contact</button>
      </Link>
    </div>
  );
};

export default Contacts;
