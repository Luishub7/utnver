import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import ContactList from './componentes/ContactList';
import Chat from './componentes/Chat';
import ContactSettings from './componentes/ContactSettings';
import NewContact from './componentes/NewContact';
import './index.css';

const App = () => {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/chat/:contactId" element={<Chat />} />
          <Route path="/settings/:contactId" element={<ContactSettings />} />
          <Route path="/new-contact" element={<NewContact />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
};

export default App;
