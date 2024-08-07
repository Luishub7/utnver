// src/pages/Chat/Chat.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Conversation from '../../components/Chat/Conversation';
import { getContacts } from '../../utils/storage';
import '../../styles/Chat.css';

const Chat = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  // Verifica el contactId recibido
  console.log('Contact ID from URL:', contactId);

  // Obtener los contactos desde el localStorage
  const contacts = getContacts();
  console.log('Contacts:', contacts);

  // Buscar el contacto correspondiente
  const contact = contacts.find(c => c.id === parseInt(contactId));
  console.log('Selected Contact:', contact);

  // Función para navegar a la página de configuración del contacto
  const goToContactSettings = () => {
    if (contact) {
      console.log('Navigating to contact settings for contact ID:', contact.id);
      navigate(`/contact-settings/${contact.id}`);
    } else {
      console.error('Contact not found');
    }
  };

  return (
    <div className="chat-page">
{/*       <div className="contact" onClick={goToContactSettings}>
        {contact && (
          <>
            <img src={contact.avatar || 'images/default-avatar.jpg'} alt="Avatar" className="contact-avatar" />
            <h1>{contact.name}</h1>
          </>
        )}
      </div> */}
      <Conversation />
    </div>
  );
};

export default Chat;
