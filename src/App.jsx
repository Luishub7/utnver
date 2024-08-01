// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './components/ContactList'; // Asegúrate de que este nombre coincide con el archivo real
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import NewContactForm from './components/NewContactForm';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/chat/:contactId" element={<Chat />} />
        <Route path="/settings/:contactId" element={<Settings />} />
        <Route path="/new-contact" element={<NewContactForm />} />
      </Routes>
    </Router>
  );
};

export default App;
