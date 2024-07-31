import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Contacts from './pages/Contacts';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import NewContactForm from './components/NewContactForm';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/chat/:contactId" element={<Chat />} />
        <Route path="/settings/:contactId" element={<Settings />} />
        <Route path="/new-contact" element={<NewContactForm />} />
      </Routes>
    </div>
  );
};

export default App;
