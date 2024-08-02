// src/data/localStorage.js
const CONTACTS_KEY = 'contacts';

export const getContacts = () => {
  try {
    const contacts = JSON.parse(localStorage.getItem(CONTACTS_KEY)) || [];
    console.log('Obteniendo contactos:', contacts);
    return contacts;
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    return [];
  }
};

export const addContact = (contact) => {
  try {
    const contacts = getContacts();
    contacts.push(contact);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    console.log('Contacto agregado:', contact);
  } catch (error) {
    console.error("Error al agregar el contacto:", error);
  }
};
