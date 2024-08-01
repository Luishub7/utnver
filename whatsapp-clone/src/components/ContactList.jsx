// src/components/ContactList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, TextField, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Cargar contactos desde LocalStorage
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(savedContacts);
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: '16px' }}>
      {/* Cabecera con campo de búsqueda y botón de agregar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <TextField
          variant="outlined"
          placeholder="Buscar contactos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          sx={{ flexGrow: 1, marginRight: '8px' }}
        />
        <IconButton color="primary" component={Link} to="/add-contact">
          <AddIcon />
        </IconButton>
      </Box>

      {/* Lista de contactos */}
      <List>
        {filteredContacts.map(contact => (
          <ListItem key={contact.id} button component={Link} to={`/chat/${contact.id}`}>
            <ListItemAvatar>
              <Avatar src={contact.image} alt={contact.name} />
            </ListItemAvatar>
            <ListItemText
              primary={contact.name}
              secondary={contact.lastMessage ? `${contact.lastMessage.text} - ${contact.lastMessage.time}` : 'No hay mensajes'}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ContactList;
