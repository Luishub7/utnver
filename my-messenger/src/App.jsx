// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat/Chat';
import ContactListPage from './pages/ContactList/ContactListPage';
import ContactFormPage from './pages/ContactForm/ContactFormPage';
import HomePage from './pages/Home/HomePage';
import Navbar from './components/Navbar/Navbar'; 
import Conversation from './components/Chat/Conversation';
import ContactSettingsPage from './pages/ContactSettings/ContactSettingsPage'; 
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container"> 
        <Navbar /> 
        <Routes>
          {/* Establecer la página de contactos como la página inicial */}
          <Route path="/" element={<ContactListPage />} />
          <Route path="/contacts" element={<ContactListPage />} />
          <Route path="/chat/:contactId" element={<Chat />} />
          <Route path="/add-contact" element={<ContactFormPage />} />
          <Route path="/contact-settings/:id" element={<ContactSettingsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
