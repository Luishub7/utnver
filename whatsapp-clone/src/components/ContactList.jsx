// src/components/ContactList.jsx
import React, { useEffect, useState } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Obtener los contactos almacenados en LocalStorage
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];

    // Añadir el último mensaje a cada contacto
    const updatedContacts = storedContacts.map(contact => {
      const lastMessage = storedMessages
        .filter(msg => msg.contactId === contact.id)
        .sort((a, b) => new Date(b.time) - new Date(a.time))[0]; // Obtener el mensaje más reciente
      
      return {
        ...contact,
        lastMessage: lastMessage || { text: 'No hay mensajes', time: '' },
      };
    });

    setContacts(updatedContacts);
  }, []);

  return (
    <div>
      <h1>Contactos</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <img
              src={contact.image}
              alt={contact.name}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
            <h2>{contact.name}</h2>
            <p>Último mensaje: {contact.lastMessage.text}</p>
            <p>Hora: {contact.lastMessage.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
