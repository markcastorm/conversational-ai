// src/components/chat/ResponseInterface.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Image, 
  ExternalLink, 
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  LineChart,
  Share,
  Copy,
  Bookmark
} from 'lucide-react';

const ResponseInterface = ({ query, onClose }) => {
  const [currentPhase, setCurrentPhase] = useState('searching');
  const [activeTab, setActiveTab] = useState('answer');
  const [sourcesFound, setSourcesFound] = useState(0);
  const [showResponse, setShowResponse] = useState(false);

  // Simulate loading phases
  useEffect(() => {
    const phases = [
      { phase: 'searching', duration: 2000 },
      { phase: 'reading', duration: 3000 },
      { phase: 'analyzing', duration: 2000 },
      { phase: 'generating', duration: 1500 }
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < phases.length - 1) {
        currentIndex++;
        setCurrentPhase(phases[currentIndex].phase);
        setSourcesFound(Math.floor(Math.random() * 5) + 15); // 15-20 sources
      } else {
        setShowResponse(true);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Mock data for financial example
  const stockData = {
    symbol: 'NVDA',
    price: 173.00,
    change: '+$1.63',
    changePercent: '+0.95%',
    afterHours: '+$0.92',
    afterHoursPercent: '+0.53%'
  };

  const mockSources = [
    {
      id: 1,
      title: 'NVIDIA Corporation (NVDA) Stock Historical Prices & Data',
      url: 'finance.yahoo.com',
      favicon: '🟣',
      description: 'Historical daily share price chart and data for NVIDIA since 1999 adjusted for splits and dividends.'
    },
    {
      id: 2,
      title: 'NVIDIA - 26 Year Stock Price History | NVDA - Macrotrends',
      url: 'macrotrends.net',
      favicon: '📊',
      description: '26 year stock price history for NVIDIA with interactive charts and historical data.'
    },
    {
      id: 3,
      title: 'Stock Info - Historical Price Lookup - NVIDIA Corporation',
      url: 'investor.nvidia.com',
      favicon: '🟢',
      description: 'Official NVIDIA investor relations with comprehensive financial data and reports.'
    }
  ];

  const searchQueries = [
    'Nvidia stock price history',
    'Nvidia stock financial data',
    'Nvidia stock market scatter plot data'
  ];

  const LoadingPhase = () => (
    <div className="max-w-4xl mx-auto p-8">
      {/* Query Display */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{query}</h1>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2 text-blue-600">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="capitalize font-medium">{currentPhase}</span>
          </div>
        </div>
      </div>

      {/* Loading Steps */}
      <div className="space-y-6">
        {/* Searching Phase */}
        {currentPhase === 'searching' && (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Search className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Searching</span>
            </div>
            <div className="space-y-2">
              {searchQueries.map((searchQuery, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                  <Search className="w-4 h-4" />
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">{searchQuery}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reading Sources Phase */}
        {currentPhase === 'reading' && (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <ExternalLink className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Reading sources • {sourcesFound}</span>
            </div>
            <div className="space-y-3">
              {mockSources.map((source, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg animate-pulse">
                  <span className="text-lg">{source.favicon}</span>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analyzing Phase */}
        {currentPhase === 'analyzing' && (
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Analyzing financial data to generate a scatter plot of market performance</span>
            </div>
          </div>
        )}

        {/* Generating Phase */}
        {currentPhase === 'generating' && (
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <LineChart className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Gathering historical stock data to prepare a financial scatter plot</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const ResponseContent = () => (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">{query}</h1>
        
        {/* Tab Navigation */}
        <div className="flex items-center space-x-8 border-b border-gray-200">
          {['Answer', 'Images', 'Sources', 'Steps'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === tab.toLowerCase()
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {tab === 'Sources' && <span className="ml-1 text-xs">• 21</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'answer' && (
        <div className="space-y-8">
          {/* Main Chart Area */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Financial Scatter Plot Analysis
            </h3>
            <p className="text-gray-600 mb-6">
              Below is a financial scatter plot illustrating market performance by displaying historical data 
              with comprehensive analysis of trends and patterns over time.
            </p>
            
            {/* Chart Placeholder */}
            <div className="bg-gray-50 rounded-lg h-96 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
              <TrendingUp className="w-24 h-24 text-teal-500 mb-4" />
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                Interactive Financial Chart
              </h4>
              <p className="text-gray-500 text-center max-w-md mb-4">
                Dynamic scatter plot visualization showing financial performance data with interactive features
              </p>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-400 ml-2">Real-time data visualization</span>
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Key Insights:</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  Analysis shows significant patterns in market behavior with notable trends in recent periods.
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  Data visualization reveals important correlations and performance indicators for informed decision-making.
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Sources Tab */}
      {activeTab === 'sources' && (
        <div className="space-y-4">
          {mockSources.map((source, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start space-x-3">
                <span className="text-lg">{source.favicon}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                    {source.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{source.description}</p>
                  <span className="text-xs text-gray-500 mt-2 block">{source.url}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Follow-up Input */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask a follow-up..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {!showResponse ? <LoadingPhase /> : <ResponseContent />}
    </div>
  );
};

export default ResponseInterface;