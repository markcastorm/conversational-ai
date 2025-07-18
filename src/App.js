import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import Sidebar from './components/layout/Sidebar';
import MainChatInterface from './components/chat/MainChatInterface';
import RecentConversationsPage from './components/chat/RecentConversationsPage';
import './App.css';

// Simple page components for demonstration
const HomePage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Home</h1>
    <p className="text-gray-600">Welcome to your conversational AI dashboard</p>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Conversations</h3>
        <p className="text-gray-600 text-sm mb-4">View and manage your chat history</p>
        <button 
          onClick={() => window.location.href = '/home/recent'}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View History
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Favorites</h3>
        <p className="text-gray-600 text-sm mb-4">Your starred conversations</p>
        <button 
          onClick={() => window.location.href = '/home/favorites'}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
        >
          View Favorites
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Shared</h3>
        <p className="text-gray-600 text-sm mb-4">Conversations shared with others</p>
        <button 
          onClick={() => window.location.href = '/home/shared'}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          View Shared
        </button>
      </div>
    </div>
  </div>
);

const FavoritesPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Favorites</h1>
    <p className="text-gray-600 mb-6">Your starred conversations appear here</p>
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
      <p className="text-gray-500">Star conversations to see them here</p>
    </div>
  </div>
);

const SharedPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Shared</h1>
    <p className="text-gray-600 mb-6">Conversations shared with others</p>
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No shared conversations</h3>
      <p className="text-gray-500">Share conversations with others to see them here</p>
    </div>
  </div>
);

const DiscoverPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover</h1>
    <p className="text-gray-600 mb-6">Explore trending topics and conversations</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { title: 'Technology', icon: '💻', description: 'Latest tech trends and innovations' },
        { title: 'Science', icon: '🔬', description: 'Scientific discoveries and research' },
        { title: 'Business', icon: '📊', description: 'Business insights and strategies' },
        { title: 'Health', icon: '🏥', description: 'Health and wellness topics' },
        { title: 'Sports', icon: '⚽', description: 'Sports news and analysis' },
        { title: 'Entertainment', icon: '🎬', description: 'Movies, music, and pop culture' }
      ].map((category, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-3xl mb-4">{category.icon}</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
          <p className="text-gray-600 text-sm">{category.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const SpacesPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Spaces</h1>
    <p className="text-gray-600 mb-6">Manage your conversation spaces</p>
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No spaces yet</h3>
      <p className="text-gray-500 mb-4">Create your first space to organize conversations</p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Create Space
      </button>
    </div>
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
  const location = useLocation();
  
  // Show sidebar on all pages for consistent navigation
  const showSidebar = true;

  return (
    <div className="App flex">
      {showSidebar && <Sidebar />}
      {/* Main content area - always has margin for sidebar */}
      <main className={`${showSidebar ? 'ml-14' : ''} flex-1 min-h-screen bg-white`}>
        <Routes>
          <Route path="/" element={<NewThreadPage />} />
          <Route path="/new" element={<NewThreadPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/recent" element={<RecentConversationsPage />} />
          <Route path="/home/favorites" element={<FavoritesPage />} />
          <Route path="/home/shared" element={<SharedPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/discover/for-you" element={<DynamicPage />} />
          <Route path="/discover/tech" element={<DynamicPage />} />
          <Route path="/discover/science" element={<DynamicPage />} />
          <Route path="/discover/business" element={<DynamicPage />} />
          <Route path="/discover/health" element={<DynamicPage />} />
          <Route path="/discover/sports" element={<DynamicPage />} />
          <Route path="/discover/entertainment" element={<DynamicPage />} />
          <Route path="/spaces" element={<SpacesPage />} />
          <Route path="/spaces/create" element={<DynamicPage />} />
          <Route path="/spaces/my" element={<DynamicPage />} />
          <Route path="/spaces/shared" element={<DynamicPage />} />
          <Route path="/spaces/templates" element={<DynamicPage />} />
          <Route path="/account" element={<DynamicPage />} />
          <Route path="/upgrade" element={<DynamicPage />} />
          <Route path="/install" element={<DynamicPage />} />
          {/* Catch-all route for dynamic pages */}
          <Route path="*" element={<DynamicPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ChatProvider>
      <Router>
        <AppContent />
      </Router>
    </ChatProvider>
  );
}

export default App;