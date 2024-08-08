// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactList from './componentes/ContactList';
import Chat from './componentes/Chat';
import ContactSettings from './componentes/ContactSettings';
import NewContact from './componentes/NewContact';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/chat/:contactId" element={<Chat />} />
        <Route path="/settings/:contactId" element={<ContactSettings />} />
        <Route path="/new-contact" element={<NewContact />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default App;
