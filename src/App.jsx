import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contacts from './pages/Contacts';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import NewContactForm from './components/NewContactForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/chat/:contactId" element={<Chat />} />
        <Route path="/settings/:contactId" element={<Settings />} />
        <Route path="/new-contact" element={<NewContactForm />} />
      </Routes>
    </Router>
  );
};

export default App;
