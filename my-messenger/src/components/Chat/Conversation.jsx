// src/components/Chat/Conversation.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Contact from '../Contact/Contact';

const Conversation = () => {
    const { contactId } = useParams();
    const [newMessage, setNewMessage] = useState('');
    
    console.log('Conversation Component Rendered');
    console.log('Contact ID from URL:', contactId);

    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    console.log('Contacts from localStorage:', contacts);

    const contact = contacts.find((c) => c.id === parseInt(contactId, 10));
    console.log('Selected Contact:', contact);

    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const filteredMessages = messages.filter(
        (message) => message.contactId === parseInt(contactId, 10)
    );
    console.log('Filtered Messages:', filteredMessages);

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const updatedMessages = [
                ...messages,
                {
                    contactId: parseInt(contactId, 10),
                    text: newMessage,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ];
            localStorage.setItem('messages', JSON.stringify(updatedMessages));
            setNewMessage('');
        }
    };

    return (
        <div className="conversation">
            {contact ? (
                <>
                    <Contact contact={contact} />
                    <div className="messages">
                        {filteredMessages.length > 0 ? (
                            filteredMessages.map((message, index) => (
                                <div key={index} className={`message ${message.contactId === parseInt(contactId, 10) ? 'contact-message' : 'user-message'}`}>
                                    <p className="message-content">{message.text}</p>
                                    <span className="message-time">{message.time}</span>
                                </div>
                            ))
                        ) : (
                            <p>No hay mensajes</p>
                        )}
                    </div>
                    <div className="message-input">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                        />
                        <button onClick={handleSendMessage}>Enviar</button>
                    </div>
                </>
            ) : (
                <p>Contact not found</p>
            )}
        </div>
    );
};

export default Conversation;
