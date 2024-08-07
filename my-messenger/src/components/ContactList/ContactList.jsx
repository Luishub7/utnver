// src/components/ContactList/ContactList.jsx
import React, { useState, useEffect } from 'react';
import ContactItem from './ContactItem';
import { getContacts, getMessages, setContacts } from '../../utils/storage';

const ContactList = () => {
  const [contacts, setContactsState] = useState([]);

  // Función para obtener el último mensaje para un contacto
  const getLastMessage = (contactId) => {
    const messages = getMessages();
    const lastMessage = messages
      .filter(msg => msg.contactId === contactId)
      .slice(-1)[0]; // Tomar el último mensaje

    return lastMessage ? lastMessage.text : '';
  };

  // Función para cargar los contactos desde localStorage y actualizar con el último mensaje
  const loadContacts = () => {
    const storedContacts = getContacts();
    const updatedContacts = storedContacts.map(contact => ({
      ...contact,
      lastMessage: getLastMessage(contact.id),
      lastMessageTime: new Date().toISOString() // Actualizar el tiempo a la hora actual
    }));
    console.log('Contacts loaded:', updatedContacts); // Depuración
    setContactsState(updatedContacts);
  };

  // Función para guardar los contactos en localStorage
  const saveContacts = () => {
    setContacts(contacts);
  };

  // Cargar los contactos al inicio del componente
  useEffect(() => {
    loadContacts();
  }, []);

  // Actualizar la lista de contactos en localStorage cuando se cambie la lista
  useEffect(() => {
    saveContacts();
  }, [contacts]);

  return (
    <div className="contact-list">
      <h2>Contactos</h2>
      <ul>
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
