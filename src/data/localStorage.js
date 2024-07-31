// localStorage.js

// Función para guardar contactos en localStorage
export const saveContacts = (contacts) => {
  localStorage.setItem('contactos', JSON.stringify(contacts));
  console.log('Contacts saved:', contacts); // Console.log para depuración
};

// Función para recuperar contactos desde localStorage
export const getContacts = () => {
  const contacts = JSON.parse(localStorage.getItem('contactos')) || [];
  console.log('Contacts loaded:', contacts); // Console.log para depuración
  return contacts;
};

// Función para guardar mensajes en localStorage
export const saveMessages = (contactId, messages) => {
  const existingMessages = JSON.parse(localStorage.getItem('mensajes')) || {};
  existingMessages[contactId] = messages;
  localStorage.setItem('mensajes', JSON.stringify(existingMessages));
  console.log('Messages saved for contact', contactId, ':', messages); // Console.log para depuración
};

// Función para recuperar mensajes desde localStorage para un contacto específico
export const getMessages = (contactId) => {
  const messages = JSON.parse(localStorage.getItem('mensajes')) || {};
  const contactMessages = messages[contactId] || [];
  console.log('Messages loaded for contact', contactId, ':', contactMessages); // Console.log para depuración
  return contactMessages;
};
