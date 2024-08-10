// Cargar contactos desde localStorage
const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Verificar que haya contactos disponibles
if (contacts.length === 0) {
  alert("No hay contactos disponibles en el localStorage.");
} else {
  // Crear una lista de contactos para seleccionar
  const contactNames = contacts.map(contact => `${contact.id}: ${contact.name}`).join("\n");
  
  // Pedir al usuario que seleccione un contacto por su ID
  const contactId = prompt(`Selecciona el ID del contacto que enviará el mensaje:\n${contactNames}`);
  
  // Validar si el contacto existe
  const selectedContact = contacts.find(contact => contact.id === Number(contactId));
  
  if (!selectedContact) {
    alert("ID de contacto inválido.");
  } else {
    // Pedir al usuario que ingrese el contenido del mensaje
    const messageContent = prompt(`Ingresa el mensaje que ${selectedContact.name} enviará a ti:`);

    if (messageContent) {
      // Crear el nuevo mensaje
      const messages = JSON.parse(localStorage.getItem('messages')) || [];
      const newMessage = {
        id: messages.length > 0 ? messages[messages.length - 1].id + 1 : 1,
        authorId: selectedContact.id,
        recipientId: 0, // Enviar el mensaje al authorId 0
        content: messageContent,
        date: new Date().toISOString(),
        status: 'Pendiente',
      };

      // Guardar el mensaje en localStorage
      messages.push(newMessage);
      localStorage.setItem('messages', JSON.stringify(messages));

      alert(`Mensaje enviado por ${selectedContact.name} a ti: "${messageContent}"`);
    } else {
      alert("El mensaje no puede estar vacío.");
    }
  }
}
