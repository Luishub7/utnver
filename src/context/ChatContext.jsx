import React, { createContext, useContext, useState, useEffect } from 'react';
import localStorageService from '../utils/localStorageService';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setContacts(localStorageService.load('contacts'));
    setMessages(localStorageService.load('messages'));
  }, []);

  const addMessage = (newMessage) => {
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorageService.save('messages', updatedMessages);
  };

  return (
    <ChatContext.Provider value={{ contacts, messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export  const useChat = () => useContext(ChatContext);
