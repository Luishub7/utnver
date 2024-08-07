// src/data/data.js
const exampleContacts = [
  {
    id: '1',
    name: 'John Doe',
    image: '/src/images/contact1.jpg',
    lastMessage: {
      text: 'Hola, ¿cómo estás?',
      time: '10:30 AM'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    image: '/src/images/contact2.jpg',
    lastMessage: {
      text: 'Nos vemos mañana.',
      time: '11:00 AM'
    }
  }
];

const exampleMessages = [
  {
    contactId: '1',
    text: 'Hola, ¿cómo estás?',
    time: '10:30 AM'
  },
  {
    contactId: '2',
    text: 'Nos vemos mañana.',
    time: '11:00 AM'
  }
];

// Guardar datos de ejemplo en LocalStorage para pruebas
localStorage.setItem('contacts', JSON.stringify(exampleContacts));
localStorage.setItem('messages', JSON.stringify(exampleMessages));
