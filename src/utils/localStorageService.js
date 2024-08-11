const localStorageService = {
    load(key) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    },
    save(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    addMessage(newMessage) {
      const messages = this.load('messages');
      messages.push(newMessage);
      this.save('messages', messages);
    },
    generateMessageId() {
      const messages = this.load('messages');
      const lastMessage = messages[messages.length - 1];
      return lastMessage ? lastMessage.id + 1 : 1;
    },
    initialize() {
      if (!this.load('contacts').length) {
        const contacts = [
          { id: 1, name: 'Pepe', avatar: '/imagenes/1.webp' },
          { id: 2, name: 'Ana', avatar: '/imagenes/2.webp' },
          { id: 3, name: 'Monica', avatar: '/imagenes/3.webp' },
          { id: 4, name: 'María', avatar: '/imagenes/4.webp' },
          { id: 5, name: 'Carlos', avatar: '/imagenes/5.webp' },
          { id: 6, name: 'Laura', avatar: '/imagenes/6.webp' },
          { id: 7, name: 'José', avatar: '/imagenes/7.webp' },
          { id: 8, name: 'Elena', avatar: '/imagenes/8.webp' }
        ];
        this.save('contacts', contacts);
      }
  
      if (!this.load('messages').length) {
        const messages = [
          { id: 1, authorId: 1, recipientId: 2, content: 'Hola, ¿cómo estás?', date: new Date().toISOString(), status: 'Leído' },
          { id: 2, authorId: 2, recipientId: 1, content: '¡Hola! Todo bien, ¿y tú?', date: new Date().toISOString(), status: 'Entregado' },
          { id: 3, authorId: 0, recipientId: 1, content: '¡Hola, Pepe!', date: new Date().toISOString(), status: 'Pendiente' },
        ];
        this.save('messages', messages);
      }
    }
  };
  
  export default localStorageService;
  