import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getContacts, saveContacts } from '../utils/localStorageUtils';

function ChatScreen() {
  const { contactId } = useParams();
  const [contacts, setContacts] = useState(getContacts());
  const [newMessage, setNewMessage] = useState('');

  const currentContact = contacts.find(contact => contact.id === contactId);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const updatedContacts = contacts.map(contact => {
        if (contact.id === contactId) {
          return {
            ...contact,
            messages: [...contact.messages, {
              text: newMessage,
              timestamp: new Date().getTime(),
              sender: true,
              status: 'pending',
            }],
          };
        }
        return contact;
      });
      setContacts(updatedContacts);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-screen">
      {/* Mostrar el historial de chat */}
      <ul>
        {currentContact?.messages.map((message, index) => (
          <li key={index} className={message.sender ? 'sent' : 'received'}>
            {message.text}
            {/* Mostrar hora y estado del mensaje */}
          </li>
        ))}
      </ul>

      {/* Input para escribir mensajes */}
      <input
        type="text"
        placeholder="Escribe un mensaje"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />

      {/* Botón para enviar mensajes */}
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
}

export default ChatScreen;
