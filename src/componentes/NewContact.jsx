import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import '../estilos/NewContact.css';

const NewContact = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const { addContact } = useChat();
  const navigate = useNavigate();

  const avatarOptions = [
    '/imagenes/1.webp',
    '/imagenes/2.webp',
    '/imagenes/3.webp',
    '/imagenes/4.webp',
    '/imagenes/5.webp',
    '/imagenes/6.webp',
    '/imagenes/7.webp',
    '/imagenes/8.webp'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: Date.now(),
      name,
      avatar
    };

    addContact(newContact); // Usar addContact para actualizar el estado y localStorage
    navigate('/');
  };

  return (
    <div className="new-contact-container">
      <div className="new-contact-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src="/imagenes/arrow_back.svg" alt="Back" />
        </button>
      </div>
      <h2>Nuevo Contacto</h2>
      <form className="new-contact-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Avatar:
          <div className="avatar-select">
            <select 
              value={avatar} 
              onChange={(e) => setAvatar(e.target.value)} 
              required
            >
              <option value="">Seleccionar avatar</option>
              {avatarOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ul className="avatar-options">
              {avatarOptions.map((option) => (
                <li 
                  key={option} 
                  onClick={() => setAvatar(option)} 
                  className={avatar === option ? 'selected' : ''}
                >
                  <img src={option} alt="Avatar opción" className="avatar-option" />
                </li>
              ))}
            </ul>
          </div>
        </label>
        <button type="submit" className="new-contact-submit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default NewContact;
