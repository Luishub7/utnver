// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ContactList from './components/ContactList';
import ChatScreen from './components/ChatScreen';
import { preloadData } from './data/data';

function App() {
  useEffect(() => {
    preloadData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ContactList />} />
      <Route path="/chat/:contactId" element={<ChatScreen />} />
      {/* Puedes agregar más rutas aquí */}
    </Routes>
  );
}

export default App;
