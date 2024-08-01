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
      <div className="contacts-header">
        <p>Contacts</p>
        <Link to="/new-contact">
          <button className="add-contact-btn">Add New Contact</button>
        </Link>
      </div>
      <ul>
        {contacts.length > 0 ? (
          contacts.map(contact => (
            <li key={contact.id}>
              <div>{contact.name}</div>
              <Link to={`/chat/${contact.id}`}>Chat</Link>
            </li>
          ))
        ) : (
          <li>No contacts found</li>
        )}
      </ul>
    </div>
  );
};

export default Contacts;
