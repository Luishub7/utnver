// src/components/ChatScreen.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, TextField, IconButton, List, ListItem, ListItemText, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function ChatScreen() {
  const { contactId } = useParams();
  const [contact, setContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Cargar el contacto y los mensajes desde LocalStorage
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const selectedContact = contacts.find(contact => contact.id === contactId);
    setContact(selectedContact);

    const contactMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(contactMessages.filter(msg => msg.contactId === contactId));
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
      setNewMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{contact ? contact.name : 'Chat'}</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: '16px' }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{contact ? contact.name[0] : '?'}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={msg.text}
                secondary={msg.time}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <IconButton color="primary" onClick={handleSendMessage} sx={{ marginLeft: '8px' }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ChatScreen;
