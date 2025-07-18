import React, { useState } from 'react';
import { 
  Search, 
  Image, 
  MapPin, 
  Paperclip, 
  Mic, 
  Send,
  Brain,
  Wrench,
  Heart,
  GraduationCap,
  CheckCircle
} from 'lucide-react';
import ResponseInterface from './ResponseInterface';

const MainChatInterface = () => {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState('');

  // Suggested action buttons matching Perplexity
  const suggestedActions = [
    { icon: Brain, label: 'Parenting', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { icon: Wrench, label: 'Troubleshoot', color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { icon: Heart, label: 'Health', color: 'bg-red-50 text-red-700 border-red-200' },
    { icon: GraduationCap, label: 'Learn', color: 'bg-green-50 text-green-700 border-green-200' },
    { icon: CheckCircle, label: 'Fact Check', color: 'bg-purple-50 text-purple-700 border-purple-200' }
  ];

  const handleSubmit = () => {
    if (query.trim()) {
      setSubmittedQuery(query);
      setShowResponse(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSuggestedActionClick = (label) => {
    setQuery(label);
    setIsActive(true);
  };

  const handleBackToSearch = () => {
    setShowResponse(false);
    setQuery('');
    setSubmittedQuery('');
    setIsActive(false);
  };

  // If showing response, render the ResponseInterface
  if (showResponse) {
    return (
      <ResponseInterface 
        query={submittedQuery} 
        onClose={handleBackToSearch}
      />
    );
  }

  // Otherwise, show the main search interface
  return (
    <div className="flex-1 min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {/* Main Logo/Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-normal text-gray-900 mb-3">
            Convo Analytics
          </h1>
          <p className="text-gray-500 text-lg">
            Ask anything or @mention a Space
          </p>
        </div>

        {/* Main Search Input */}
        <div className="mb-8">
          <div className="relative">
            {/* Input Field */}
            <div className={`
              relative rounded-xl border transition-all duration-200 bg-white
              ${isActive || query ? 'border-gray-300 shadow-lg' : 'border-gray-200 shadow-sm'}
            `}>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsActive(true);
                }}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything or @mention a Space"
                className="w-full px-4 py-4 text-gray-900 placeholder-gray-500 bg-transparent border-0 rounded-xl focus:outline-none focus:ring-0 pr-16"
              />
              
              {/* Send Button */}
              <button
                onClick={handleSubmit}
                disabled={!query.trim()}
                className={`
                  absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200
                  ${query.trim() 
                    ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Toolbar */}
            <div className="flex items-center justify-between mt-3 px-2">
              {/* Left Side Icons */}
              <div className="flex items-center space-x-2">
                <button 
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Attach Image"
                >
                  <Image className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Location"
                >
                  <MapPin className="w-4 h-4" />
                </button>
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center space-x-2">
                <button 
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Attach File"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Voice Input"
                >
                  <Mic className="w-4 h-4" />
                </button>
                {/* Audio Visualizer */}
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center space-x-1">
                  <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
                  <div className="w-1 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {suggestedActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleSuggestedActionClick(action.label)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 hover:shadow-sm
                  ${action.color}
                `}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>

        {/* Optional: Footer Text */}
        <div className="text-center mt-12 text-xs text-gray-400">
          <p>Conversational AI can make mistakes. Please verify important information.</p>
        </div>
      </div>
    </div>
  );
};

export default MainChatInterface;