import React, { useState, useEffect } from 'react';
import { getContacts, saveContacts } from '../utils/localStorageUtils';
//import '../styles/';

function ContactList() {
  const [contacts, setContacts] = useState(getContacts());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    saveContacts(contacts);
  }, [contacts]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contact-list">
      <input
        type="text"
        placeholder="Buscar contactos"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <img src={`/images/${contact.image}`} alt={contact.name} />
            <div>
              {contact.name}
              <p>{contact.messages[contact.messages.length - 1]?.text}</p>
              <p>{/* Mostrar hora o fecha del último mensaje */}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
