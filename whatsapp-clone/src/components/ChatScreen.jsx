import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

const ChatScreen = () => {
  const { contactId } = useParams();
  const [contact, setContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log('Loading contact and messages...');
    
    // Cargar el contacto y los mensajes desde LocalStorage
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const selectedContact = contacts.find(contact => contact.id === contactId);
    setContact(selectedContact);
    console.log('Selected Contact:', selectedContact);

    const contactMessages = JSON.parse(localStorage.getItem('messages')) || [];
    console.log('All Messages:', contactMessages);

    const filteredMessages = contactMessages.filter(msg => msg.contactId === contactId);
    setMessages(filteredMessages);
    console.log('Filtered Messages:', filteredMessages);
  }, [contactId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        contactId,
        text: newMessage,
        time: new Date().toLocaleTimeString(),
      };
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      console.log('Messages Saved:', updatedMessages);
      setNewMessage('');
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2>{contact?.name || 'Chat'}</h2>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={contact?.image} />
            </ListItemAvatar>
            <ListItemText primary={msg.text} secondary={msg.time} />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Escribe un mensaje"
        variant="outlined"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <Button onClick={handleSendMessage} variant="contained" color="primary">
        Enviar
      </Button>
    </div>
  );
};

export default ChatScreen;
