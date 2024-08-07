// src/localStorage.js

// Función para cargar datos desde localStorage
export const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  console.log(`Cargando ${key} desde localStorage:`, data);
  return data ? JSON.parse(data) : null;
};
  
// Función para guardar datos en localStorage
export const saveToLocalStorage = (key, data) => {
  console.log(`Guardando ${key} en localStorage:`, data);
  localStorage.setItem(key, JSON.stringify(data));
};
  
// Función para agregar un nuevo mensaje
export const addMessageToLocalStorage = (newMessage) => {
  const messages = loadFromLocalStorage('messages') || [];
  console.log('Mensajes actuales en localStorage:', messages);
  const updatedMessages = [...messages, newMessage];
  console.log('Mensajes actualizados:', updatedMessages);
  saveToLocalStorage('messages', updatedMessages);
};
  
  // Función para inicializar contactos y mensajes si no existen en localStorage
  export const initializeLocalStorage = () => {
    if (!loadFromLocalStorage('contacts')) {
      const contacts = [
        { id: 1, name: 'Pepe', avatar: '/imagenes/1.webp' },
        { id: 2, name: 'Ana', avatar: '/imagenes/2.webp' },
        { id: 3, name: 'Luis', avatar: '/imagenes/3.webp' },
        { id: 4, name: 'María', avatar: '/imagenes/4.webp' },
        { id: 5, name: 'Carlos', avatar: '/imagenes/5.webp' },
        { id: 6, name: 'Laura', avatar: '/imagenes/6.webp' },
        { id: 7, name: 'José', avatar: '/imagenes/7.webp' },
        { id: 8, name: 'Elena', avatar: '/imagenes/8.webp' },
        { id: 9, name: 'Fernando', avatar: '/imagenes/9.webp' },
        { id: 10, name: 'Clara', avatar: '/imagenes/10.webp' },
      ];
      saveToLocalStorage('contacts', contacts);
    }
  
    if (!loadFromLocalStorage('messages')) {
      const messages = [
        { id: 1, authorId: 1, recipientId: 'yo', content: 'Hola Pepe!', date: new Date(), status: 'leído' },
        { id: 2, authorId: 'yo', recipientId: 1, content: 'Hola, ¿cómo estás?', date: new Date(), status: 'leído' },
        { id: 3, authorId: 2, recipientId: 'yo', content: '¡Hola Ana!', date: new Date(), status: 'leído' },
        { id: 4, authorId: 'yo', recipientId: 2, content: 'Hola Ana, ¿qué tal?', date: new Date(), status: 'leído' },
        // Otros mensajes
      ];
      saveToLocalStorage('messages', messages);
    }
  };
  