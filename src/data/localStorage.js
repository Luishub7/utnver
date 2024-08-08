// src/data/localStorage.js

// Función para cargar datos desde localStorage
export const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Función para guardar datos en localStorage
export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Función para agregar un nuevo mensaje
export const addMessageToLocalStorage = (newMessage) => {
  const messages = loadFromLocalStorage('messages');
  messages.push(newMessage);
  saveToLocalStorage('messages', messages);
};

// Generar un nuevo ID único para los mensajes
export const generateMessageId = () => {
  const messages = loadFromLocalStorage('messages');
  const lastMessage = messages[messages.length - 1];
  return lastMessage ? lastMessage.id + 1 : 1; // Si no hay mensajes, comienza desde 1
};

// Función para inicializar contactos y mensajes si no existen en localStorage
export const initializeLocalStorage = () => {
  if (!loadFromLocalStorage('contacts').length) {
    const contacts = [
      { id: 1, name: 'Pepe', avatar: '/imagenes/1.webp' },
      { id: 2, name: 'Ana', avatar: '/imagenes/2.webp' },
      { id: 3, name: 'Luis', avatar: '/imagenes/3.webp' },
      { id: 4, name: 'María', avatar: '/imagenes/4.webp' },
      { id: 5, name: 'Carlos', avatar: '/imagenes/5.webp' },
      { id: 6, name: 'Laura', avatar: '/imagenes/6.webp' },
      { id: 7, name: 'José', avatar: '/imagenes/7.webp' },
      { id: 8, name: 'Elena', avatar: '/imagenes/8.webp' }
    ];
    saveToLocalStorage('contacts', contacts);
  }

  if (!loadFromLocalStorage('messages').length) {
    const messages = [
      { id: 1, authorId: 1, recipientId: 2, content: 'Hola, ¿cómo estás?', date: new Date().toISOString(), status: 'Leído' },
      { id: 2, authorId: 2, recipientId: 1, content: '¡Hola! Todo bien, ¿y tú?', date: new Date().toISOString(), status: 'Entregado' },
      { id: 3, authorId: 0, recipientId: 1, content: '¡Hola, Pepe!', date: new Date().toISOString(), status: 'Pendiente' },
    ];
    saveToLocalStorage('messages', messages);
  }
};
