// src/components/ContactList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Loading contacts from localStorage");
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    console.log("Stored contacts:", storedContacts);
    setContacts(storedContacts);
  }, []);

  const handleContactClick = (contactId) => {
    navigate(`/chat/${contactId}`);
  };

  return (
    <div className="contact-list">
      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        contacts.map(contact => (
          <div
            key={contact.id}
            className="contact-item"
            onClick={() => handleContactClick(contact.id)}
          >
            <img src={contact.avatar} alt={contact.name} className="avatar" />
            <div className="contact-info">
              <span className="contact-name">{contact.name}</span>
              <span className="last-message">{contact.lastMessage || 'No hay mensajes aún'}</span>
              <span className="message-time">{contact.lastMessageTime}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactList;
