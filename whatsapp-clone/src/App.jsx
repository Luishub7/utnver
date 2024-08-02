import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import ChatScreen from './components/ChatScreen';
import AddMessage from './components/AddMessage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/chat/:contactId" element={<ChatScreen />} />
        <Route path="/add-message/:contactId" element={<AddMessage />} />
      </Routes>
    </Router>
  );
};

export default App;
