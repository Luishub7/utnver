// src/components/ContactList/ContactItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ContactItem = ({ contact }) => {
  const { id, name, avatar, lastMessage, lastMessageTime } = contact;

  const formattedTime = lastMessageTime
    ? formatTime(lastMessageTime)
    : 'Sin mensajes';

  return (
    <li className="contact-item">
      <Link to={`/chat/${id}`}>
        <img src={avatar} alt={name} className="contact-avatar" />
        <div className="contact-info">
          <h3>{name}</h3>
          {lastMessage && <p>{lastMessage}</p>}
          <span className="contact-time">{formattedTime}</span>
        </div>
      </Link>
    </li>
  );
};

// Función para formatear la hora o la fecha
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 24) {
    // Si han pasado menos de 24 horas, mostrar la hora
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  } else {
    // Si han pasado más de 24 horas, mostrar la fecha
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
};

export default ContactItem;
