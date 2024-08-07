// src/utils/storage.js

// Función para obtener los contactos del localStorage
export const getContacts = () => {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
  };
  
  // Función para guardar los contactos en el localStorage
  export const setContacts = (contacts) => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };
  
  // Función para obtener los mensajes del localStorage
  export const getMessages = () => {
    const messages = localStorage.getItem('messages');
    return messages ? JSON.parse(messages) : [];
  };
  
  // Función para guardar los mensajes en el localStorage
  export const setMessages = (messages) => {
    localStorage.setItem('messages', JSON.stringify(messages));
  };
  