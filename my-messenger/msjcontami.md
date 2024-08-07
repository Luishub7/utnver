// Función para mostrar los contactos y permitir la selección
function chooseContact() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    console.log('Lista de contactos:');
    contacts.forEach(contact => {
        console.log(`${contact.id}. ${contact.name}`);
    });

    const contactId = parseInt(prompt('Elige el ID del contacto a quien enviar el mensaje:'));

    const selectedContact = contacts.find(contact => contact.id === contactId);
    if (selectedContact) {
        console.log(`Has elegido: ${selectedContact.name}`);
        sendMessage(selectedContact.id);
    } else {
        console.log('ID de contacto no válido.');
    }

    return 'Proceso completado'; // Retorna un mensaje para evitar 'undefined'
}

// Función para enviar un mensaje al contacto seleccionado
function sendMessage(contactId) {
    const messageText = prompt('Escribe tu mensaje:');
    if (messageText) {
        const messages = JSON.parse(localStorage.getItem('messages'));
        const newMessage = {
            contactId: contactId,
            text: messageText,
            time: new Date().toISOString()
        };
        messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(messages));
        console.log(`Mensaje enviado: "${messageText}"`);
    } else {
        console.log('El mensaje no puede estar vacío.');
    }
}

// Ejecuta la función principal
chooseContact();
