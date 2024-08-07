// src/components/Contact/Contact.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = ({ contact }) => {
    const navigate = useNavigate();

    console.log('Contact Component Rendered');
    console.log('Contact Props:', contact);

    const { id, name, avatar } = contact;

    // Asegúrate de que la ruta sea correcta
    const avatarSrc = `/${avatar}`;

    // Función para manejar el clic y redirigir a la pantalla de configuración del contacto
    const handleClick = () => {
        navigate(`/contact-settings/${id}`);
    };

    return (
        <div className="contact" onClick={handleClick}>
            <img 
                src={avatarSrc} 
                alt={name} 
                className="contact-avatar"
                onError={() => console.log(`Error loading image at ${avatarSrc}`)} 
            />
            <h2>{name}</h2>
        </div>
    );
};

export default Contact;
