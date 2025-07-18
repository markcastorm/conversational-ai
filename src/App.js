import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import MainChatInterface from './components/chat/MainChatInterface';
import './App.css';

// Simple page components for demonstration
const HomePage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Home</h1>
    <p className="text-gray-600">Welcome to your conversational AI dashboard</p>
  </div>
);

const DiscoverPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover</h1>
    <p className="text-gray-600">Explore trending topics and conversations</p>
  </div>
);

const SpacesPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Spaces</h1>
    <p className="text-gray-600">Manage your conversation spaces</p>
  </div>
);

// Main Perplexity-style interface for new conversations
const NewThreadPage = () => <MainChatInterface />;

// Dynamic page component that shows the current route
const DynamicPage = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const pageName = pathSegments[pathSegments.length - 1] || 'home';
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 capitalize">
        {pageName.replace('-', ' ')}
      </h1>
      <p className="text-gray-600 mb-4">
        Current path: <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code>
      </p>
      <p className="text-gray-500">
        This is a dynamic page that updates based on your navigation. 
        You can replace this with actual page content.
      </p>
    </div>
  );
};

function AppContent() {
  return (
    <div className="App flex">
      <Sidebar />
      {/* Main content area - adjust margin for sidebar */}
      <main className="ml-14 flex-1 min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<NewThreadPage />} />
          <Route path="/new" element={<NewThreadPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/spaces" element={<SpacesPage />} />
          {/* Catch-all route for dynamic pages */}
          <Route path="*" element={<DynamicPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;