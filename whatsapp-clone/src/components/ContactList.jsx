import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ContactList = () => {
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Buscar contactos"
          InputProps={{
            endAdornment: <SearchIcon />
          }}
          style={{ flex: 1, marginRight: '16px' }}
        />
        <Link to="/add-contact">
          <IconButton color="primary">
            Agregar Contacto
          </IconButton>
        </Link>
      </div>
      <List>
        {contacts.map((contact) => (
          <ListItem button component={Link} to={`/chat/${contact.id}`} key={contact.id}>
            <ListItemAvatar>
              <Avatar src={contact.image} />
            </ListItemAvatar>
            <ListItemText primary={contact.name} secondary={contact.lastMessage?.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ContactList;
