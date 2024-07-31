import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './data/Context';
import Contacts from './pages/Contacts';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import NewContactForm from './components/NewContactForm';
import './styles/App.css';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/chat/:contactId" element={<Chat />} />
          <Route path="/settings/:contactId" element={<Settings />} />
          <Route path="/new-contact" element={<NewContactForm />} />
          <Route path="/" element={<Contacts />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
