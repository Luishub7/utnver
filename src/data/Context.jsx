import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState({});

  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, id: `${contacts.length + 1}`, lastMessage: '', messageTime: '', status: 'sent' }]);
  };

  const sendMessage = (contactId, text) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    setMessages({
      ...messages,
      [contactId]: [...(messages[contactId] || []), { text, isSender: true, time }],
    });
    const updatedContacts = contacts.map(contact => 
      contact.id === contactId ? { ...contact, lastMessage: text, messageTime: time } : contact
    );
    setContacts(updatedContacts);
  };

  return (
    <AppContext.Provider value={{ contacts, messages, addContact, sendMessage }}>
      {children}
    </AppContext.Provider>
  );
};
