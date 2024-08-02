// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './components/ContactList';
import NewContactForm from './components/NewContactForm';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/new-contact" element={<NewContactForm />} />
      </Routes>
    </Router>
  );
};

export default App;
