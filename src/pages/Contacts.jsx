import React, { useState, useEffect } from 'react';
import ContactList from '../components/ContactList';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contactos')) || [];
    setContacts(storedContacts);
  }, []);

  return (
    <div className="contacts-page">
      <h1>Contactos</h1>
      <ContactList contacts={contacts} />
      <button onClick={() => window.location.href = '/new-contact'}>Agregar Contacto</button>
    </div>
  );
};

export default Contacts;
