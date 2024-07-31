// src/data/localStorage.js

export const saveContacts = (contacts) => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

export const getContacts = () => {
  return JSON.parse(localStorage.getItem('contacts')) || [];
};

export const saveMessages = (contactId, messages) => {
  const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
  storedMessages[contactId] = messages;
  localStorage.setItem('messages', JSON.stringify(storedMessages));
};

export const getMessages = (contactId) => {
  const storedMessages = JSON.parse(localStorage.getItem('messages')) || {};
  return storedMessages[contactId] || [];
};
