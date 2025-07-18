// src/contexts/ChatContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const ChatContext = createContext();

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // Add new chat function
  const addNewChat = useCallback((chatData) => {
    const newConv = {
      id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: chatData.title || 'New Conversation',
      lastMessage: 'just now',
      timestamp: Date.now(),
      category: chatData.category || 'conversational',
      priority: chatData.priority || 'medium',
      isStarred: false,
      isShared: false,
      isLive: true,
      status: 'active',
      messageCount: 1,
      participants: 1,
      lastActivity: Date.now(),
      unreadCount: 0,
      isTyping: false,
      sentiment: 'neutral',
      messages: []
    };
    
    setConversations(prev => [newConv, ...prev]);
    setActiveChat(newConv.id);
    
    return newConv.id;
  }, []);

  // Update chat function
  const updateChat = useCallback((chatId, updates) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === chatId ? { ...conv, ...updates } : conv
      )
    );
  }, []);

  // Delete chat function
  const deleteChat = useCallback((chatId) => {
    setConversations(prev => prev.filter(conv => conv.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(null);
    }
  }, [activeChat]);

  const value = {
    conversations,
    setConversations,
    activeChat,
    setActiveChat,
    addNewChat,
    updateChat,
    deleteChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;