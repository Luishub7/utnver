// src/data/data.js
const exampleContacts = [
    {
      id: '1',
      name: 'John Doe',
      image: '/src/images/contact1.jpg',
      lastMessage: {
        text: 'Hola, ¿cómo estás?',
        time: '23:25',
      },
    },
    {
      id: '2',
      name: 'Jane Smith',
      image: '/src/images/contact2.jpg',
      lastMessage: {
        text: 'Nos vemos mañana.',
        time: '20/02/2024',
      },
    },
    // Agregar más contactos si es necesario
  ];
  
  export const preloadData = () => {
    const existingContacts = JSON.parse(localStorage.getItem('contacts'));
    if (!existingContacts || existingContacts.length === 0) {
      localStorage.setItem('contacts', JSON.stringify(exampleContacts));
      localStorage.setItem('messages', JSON.stringify([])); // Inicializa mensajes vacíos
    }
  };
  