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
          { id: 10, authorId: 0, recipientId: 1, content: '¡Hola Pepe! ¿Cómo va todo?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 11, authorId: 1, recipientId: 0, content: '¡Hola Luis! Todo bien, ¿y tú?', date: new Date().toISOString(), status: 'Leído' },
          { id: 12, authorId: 0, recipientId: 1, content: 'Todo bien por aquí, gracias. ¿Tienes planes para el fin de semana?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 13, authorId: 1, recipientId: 0, content: 'Sí, voy a salir a caminar por el parque. ¿Y tú?', date: new Date().toISOString(), status: 'Leído' },
          { id: 14, authorId: 0, recipientId: 1, content: 'Voy a visitar a unos amigos. ¿Quieres unirte?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 15, authorId: 1, recipientId: 0, content: 'Claro, suena bien. ¿A qué hora te viene bien?', date: new Date().toISOString(), status: 'Leído' },
          { id: 16, authorId: 0, recipientId: 1, content: 'A las 4 de la tarde estaría bien. ¿Te parece?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 17, authorId: 1, recipientId: 0, content: 'Perfecto, ahí estaré. ¿Dónde nos vemos?', date: new Date().toISOString(), status: 'Leído' },
          { id: 18, authorId: 0, recipientId: 1, content: 'En el café cerca de mi casa. ¡Nos vemos allí!', date: new Date().toISOString(), status: 'Leído' },
        
          // Conversación con Ana (id: 2)
          { id: 19, authorId: 0, recipientId: 2, content: 'Hola Ana, ¿cómo estás?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 20, authorId: 2, recipientId: 0, content: '¡Hola Luis! Estoy bien, gracias. ¿Y tú?', date: new Date().toISOString(), status: 'Leído' },
          { id: 21, authorId: 0, recipientId: 2, content: 'Todo bien por aquí. ¿Qué planes tienes para hoy?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 22, authorId: 2, recipientId: 0, content: 'Voy a ir al gimnasio por la tarde. ¿Te gustaría venir?', date: new Date().toISOString(), status: 'Leído' },
          { id: 23, authorId: 0, recipientId: 2, content: 'Me encantaría, pero tengo una reunión. ¿Qué tal si vamos a cenar después?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 24, authorId: 2, recipientId: 0, content: '¡Perfecto! ¿A qué hora te viene bien?', date: new Date().toISOString(), status: 'Leído' },
          { id: 25, authorId: 0, recipientId: 2, content: 'A las 8 de la noche. ¿Dónde te gustaría ir?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 26, authorId: 2, recipientId: 0, content: 'Podemos ir al nuevo restaurante italiano. Dicen que es muy bueno.', date: new Date().toISOString(), status: 'Leído' },
          { id: 27, authorId: 0, recipientId: 2, content: 'Suena genial. ¡Nos vemos a las 8!', date: new Date().toISOString(), status: 'Leído' },
        
          // Conversación con Monica (id: 3)
          { id: 28, authorId: 0, recipientId: 3, content: '¡Hola Monica! ¿Qué tal?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 29, authorId: 3, recipientId: 0, content: '¡Hola Luis! Todo bien, ¿y tú?', date: new Date().toISOString(), status: 'Leído' },
          { id: 30, authorId: 0, recipientId: 3, content: 'Estoy bien. ¿Has visto la nueva serie en Netflix?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 31, authorId: 3, recipientId: 0, content: 'Sí, la estoy viendo. ¿Qué te parece?', date: new Date().toISOString(), status: 'Leído' },
          { id: 32, authorId: 0, recipientId: 3, content: 'Me está gustando bastante. ¿Quieres hablar de eso por teléfono?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 33, authorId: 3, recipientId: 0, content: 'Claro, me parece bien. ¿A qué hora te viene bien?', date: new Date().toISOString(), status: 'Leído' },
          { id: 34, authorId: 0, recipientId: 3, content: '¿Qué tal si lo hacemos en una hora? Así tenemos tiempo para verlo.', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 35, authorId: 3, recipientId: 0, content: 'Perfecto, te llamo en una hora. ¡Hablamos entonces!', date: new Date().toISOString(), status: 'Leído' },
          { id: 36, authorId: 0, recipientId: 3, content: '¡Perfecto! Hasta luego.', date: new Date().toISOString(), status: 'Leído' },
        
          // Conversación con María (id: 4)
          { id: 37, authorId: 0, recipientId: 4, content: 'Hola María, ¿cómo estás?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 38, authorId: 4, recipientId: 0, content: '¡Hola Luis! Estoy bien, gracias. ¿Y tú?', date: new Date().toISOString(), status: 'Leído' },
          { id: 39, authorId: 0, recipientId: 4, content: 'Todo en orden. ¿Qué planes tienes para el fin de semana?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 40, authorId: 4, recipientId: 0, content: 'Voy a visitar a mi familia. ¿Y tú?', date: new Date().toISOString(), status: 'Leído' },
          { id: 41, authorId: 0, recipientId: 4, content: 'Voy a hacer una escapada a la playa. ¿Te gustaría acompañarme algún día?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 42, authorId: 4, recipientId: 0, content: '¡Me encantaría! ¿Qué días tienes libre?', date: new Date().toISOString(), status: 'Leído' },
          { id: 43, authorId: 0, recipientId: 4, content: 'Tengo libre el sábado. ¿Te vendría bien?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 44, authorId: 4, recipientId: 0, content: 'Sí, suena genial. Nos vemos el sábado.', date: new Date().toISOString(), status: 'Leído' },
          { id: 45, authorId: 0, recipientId: 4, content: '¡Perfecto! Estoy deseando que llegue.', date: new Date().toISOString(), status: 'Leído' },
        
          // Conversación con Carlos (id: 5)
          { id: 46, authorId: 0, recipientId: 5, content: 'Hola Carlos, ¿qué tal?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 47, authorId: 5, recipientId: 0, content: '¡Hola Luis! Bien, gracias. ¿Y tú?', date: new Date().toISOString(), status: 'Leído' },
          { id: 48, authorId: 0, recipientId: 5, content: 'Todo bien. ¿Has visto el partido de fútbol de anoche?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 49, authorId: 5, recipientId: 0, content: 'Sí, estuvo increíble. ¿Qué te pareció?', date: new Date().toISOString(), status: 'Leído' },
          { id: 50, authorId: 0, recipientId: 5, content: 'Fue un gran partido. ¿Vamos a ver el próximo juntos?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 51, authorId: 5, recipientId: 0, content: '¡Claro! Sería genial. ¿Qué día te viene bien?', date: new Date().toISOString(), status: 'Leído' },
          { id: 52, authorId: 0, recipientId: 5, content: 'El sábado que viene estaría bien. ¿Te parece?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 53, authorId: 5, recipientId: 0, content: 'Sí, perfecto. ¡Nos vemos el sábado entonces!', date: new Date().toISOString(), status: 'Leído' },
          { id: 54, authorId: 0, recipientId: 5, content: '¡Genial! Hasta el sábado.', date: new Date().toISOString(), status: 'Leído' },
        
          // Conversación con Laura (id: 6)
          { id: 55, authorId: 0, recipientId: 6, content: 'Hola Laura, ¿cómo estás?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 56, authorId: 6, recipientId: 0, content: '¡Hola Luis! Todo bien, gracias. ¿Y tú?', date: new Date().toISOString(), status: 'Leído' },
          { id: 57, authorId: 0, recipientId: 6, content: 'Estoy bien. ¿Qué planes tienes para la semana?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 58, authorId: 6, recipientId: 0, content: 'Voy a estar ocupada con trabajo, pero me gustaría salir el viernes.', date: new Date().toISOString(), status: 'Leído' },
          { id: 59, authorId: 0, recipientId: 6, content: 'Perfecto, ¿qué te parece si vamos a cenar?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 60, authorId: 6, recipientId: 0, content: '¡Me parece genial! ¿A qué hora te viene bien?', date: new Date().toISOString(), status: 'Leído' },
          { id: 61, authorId: 0, recipientId: 6, content: 'A las 8 estaría bien. ¿Te parece?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 62, authorId: 6, recipientId: 0, content: 'Sí, perfecto. ¿Dónde vamos?', date: new Date().toISOString(), status: 'Leído' },
          { id: 63, authorId: 0, recipientId: 6, content: 'Conozco un buen restaurante nuevo cerca de aquí. ¡Nos vemos allí!', date: new Date().toISOString(), status: 'Leído' },
        
          // Conversación con José (id: 7)
          { id: 64, authorId: 0, recipientId: 7, content: 'Hola José, ¿cómo estás?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 65, authorId: 7, recipientId: 0, content: '¡Hola Luis! Estoy bien, gracias. ¿Y tú?', date: new Date().toISOString(), status: 'Leído' },
          { id: 66, authorId: 0, recipientId: 7, content: 'Todo bien por aquí. ¿Te gustaría hacer algo este fin de semana?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 67, authorId: 7, recipientId: 0, content: 'Sí, me encantaría. ¿Qué tienes en mente?', date: new Date().toISOString(), status: 'Leído' },
          { id: 68, authorId: 0, recipientId: 7, content: 'Podríamos ir a una exposición de arte. ¿Te interesa?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 69, authorId: 7, recipientId: 0, content: '¡Claro! Suena interesante. ¿Cuándo es?', date: new Date().toISOString(), status: 'Leído' },
          { id: 70, authorId: 0, recipientId: 7, content: 'Es el sábado por la tarde. ¿Te va bien?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 71, authorId: 7, recipientId: 0, content: 'Sí, me viene bien. ¡Nos vemos el sábado entonces!', date: new Date().toISOString(), status: 'Leído' },
          { id: 72, authorId: 0, recipientId: 7, content: '¡Perfecto! Hasta el sábado.', date: new Date().toISOString(), status: 'Leído' },
        
          // Conversación con Elena (id: 8)
          { id: 73, authorId: 0, recipientId: 8, content: 'Hola Elena, ¿cómo estás?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 74, authorId: 8, recipientId: 0, content: '¡Hola Luis! Todo bien, gracias. ¿Y tú?', date: new Date().toISOString(), status: 'Leído' },
          { id: 75, authorId: 0, recipientId: 8, content: 'Estoy bien. ¿Te gustaría ir a una película esta semana?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 76, authorId: 8, recipientId: 0, content: '¡Claro! Me encantaría. ¿Qué día te viene bien?', date: new Date().toISOString(), status: 'Leído' },
          { id: 77, authorId: 0, recipientId: 8, content: '¿Qué tal el jueves por la noche?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 78, authorId: 8, recipientId: 0, content: 'Sí, el jueves está bien. ¿Qué película quieres ver?', date: new Date().toISOString(), status: 'Leído' },
          { id: 79, authorId: 0, recipientId: 8, content: 'Podemos ver la nueva película de ciencia ficción que salió. ¿Te parece?', date: new Date().toISOString(), status: 'Pendiente' },
          { id: 80, authorId: 8, recipientId: 0, content: '¡Perfecto! Me gusta la idea. Nos vemos el jueves.', date: new Date().toISOString(), status: 'Leído' },
          { id: 81, authorId: 0, recipientId: 8, content: '¡Genial! Hasta el jueves.', date: new Date().toISOString(), status: 'Leído' },
        ];
        this.save('messages', messages);
      }
    }
  };
  
  export default localStorageService;
  