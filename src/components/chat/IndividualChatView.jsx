import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChatContext } from '../../context/ChatContext';
import { 
  ArrowLeft, 
  Send, 
  Search, 
  Image, 
  Paperclip, 
  Mic, 
  MoreHorizontal,
  Star,
  Users,
  Share,
  Copy,
  Bookmark,
  Clock,
  User,
  Bot,
  Home,
  Plus,
  Globe,
  Layers,
  ExternalLink,
  Download,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Code,
  FileText,
  Database,
  Zap,
  CheckCircle,
  Eye,
  Calendar,
  MapPin
} from 'lucide-react';

const IndividualChatView = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { conversations, updateChat, addNewChat } = useChatContext();
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('answer');
  const [responses, setResponses] = useState([]);
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const messagesEndRef = useRef(null);

  // Find the current chat
  useEffect(() => {
    const chat = conversations.find(conv => conv.id === chatId);
    if (chat) {
      setCurrentChat(chat);
      // Initialize with the first response if not already present
      if (!chat.responses || chat.responses.length === 0) {
        const initialResponse = generateInitialResponse(chat.title, chat.category);
        const newResponses = [initialResponse];
        setResponses(newResponses);
        updateChat(chatId, { responses: newResponses });
      } else {
        setResponses(chat.responses);
        setCurrentResponseIndex(chat.responses.length - 1);
      }
    } else {
      navigate('/home/recent');
    }
  }, [chatId, conversations, updateChat, navigate]);

  // Auto-scroll to bottom when processing or new response
  useEffect(() => {
    if (isProcessing || responses.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isProcessing, responses.length]);

  // Generate comprehensive response with multiple sections
  const generateInitialResponse = (title, category) => {
    const timestamp = Date.now();
    return {
      id: `response_${timestamp}`,
      query: title,
      timestamp,
      category,
      answer: generateAnswerContent(title, category),
      sources: generateSources(title, category),
      steps: generateSteps(title),
      charts: generateCharts(title, category),
      relatedQuestions: generateRelatedQuestions(title, category)
    };
  };

  const generateAnswerContent = (title, category) => {
    const responses = {
      'analysis': `
# ${title}

Data analysis reveals significant insights into market behavior and performance patterns. Based on comprehensive analysis of historical data, we can identify several key trends and correlations.

## Key Findings

The analysis shows significant patterns in market behavior with notable trends in recent periods. Data visualization reveals important correlations and performance indicators for informed decision-making.

### Market Performance Overview

Recent data indicates strong performance across multiple metrics, with particular strength in:

• **Growth trajectory**: Consistent upward trend over the analysis period
• **Volume patterns**: Increasing trading volume and market participation  
• **Volatility metrics**: Stabilizing volatility within acceptable ranges
• **Technical indicators**: Multiple bullish signals across timeframes

### Statistical Analysis

The statistical analysis reveals:

1. **Correlation coefficients** showing strong positive relationships between key variables
2. **Regression analysis** indicating predictable patterns in market movements
3. **Standard deviation** measurements within normal historical ranges
4. **Moving averages** confirming directional bias and momentum

## Methodology

Our analysis employs multiple statistical techniques including time series analysis, correlation studies, and predictive modeling to ensure comprehensive coverage of all relevant factors.

### Data Sources

Analysis incorporates data from multiple authoritative sources to ensure accuracy and completeness of findings.
      `,
      'technical': `
# ${title}

Technical implementation strategy focused on scalable architecture and optimal performance. This comprehensive approach addresses system requirements, performance optimization, and best practices implementation.

## Architecture Overview

The technical solution implements a robust, scalable architecture designed for high performance and reliability:

### Core Components

• **Backend Infrastructure**: Microservices architecture with containerized deployment
• **Database Layer**: Optimized database design with proper indexing and caching
• **API Gateway**: Centralized API management with rate limiting and security
• **Monitoring Stack**: Comprehensive logging, metrics, and alerting systems

### Performance Optimization

Key optimization strategies include:

1. **Caching Strategy**: Multi-layer caching with Redis and CDN integration
2. **Database Optimization**: Query optimization and connection pooling
3. **Load Balancing**: Intelligent traffic distribution across instances
4. **Code Optimization**: Efficient algorithms and memory management

## Implementation Details

\`\`\`javascript
// Example implementation structure
class SystemOptimizer {
  constructor(config) {
    this.cache = new CacheManager(config.cache);
    this.database = new DatabaseManager(config.db);
    this.monitoring = new MonitoringService(config.monitoring);
  }

  async optimize() {
    // Core optimization logic
    await this.cache.initialize();
    await this.database.optimize();
    this.monitoring.start();
  }
}
\`\`\`

### Security Considerations

Implementation includes comprehensive security measures:
• Authentication and authorization systems
• Data encryption at rest and in transit
• Input validation and sanitization
• Regular security audits and updates
      `,
      'JTMD': `
# ${title}

JTMD project analysis focusing on market data processing, trading algorithms, and system optimization. This comprehensive approach addresses data pipeline efficiency and real-time processing requirements.

## Market Data Analysis

Current market conditions show significant opportunities for optimization:

### Data Processing Pipeline

• **Real-time Data Ingestion**: High-frequency market data processing with sub-millisecond latency
• **Data Validation**: Multi-layer validation ensuring data integrity and accuracy
• **Storage Optimization**: Efficient data storage with compression and indexing
• **API Integration**: Seamless integration with multiple market data providers

### Trading Algorithm Performance

Algorithm performance metrics indicate:

1. **Execution Speed**: Average execution time under 50ms
2. **Accuracy Rate**: 94.2% successful trade execution rate
3. **Risk Management**: Automated risk controls with real-time monitoring
4. **Profitability**: Consistent positive returns across market conditions

## System Optimization

\`\`\`python
# Trading algorithm optimization
class TradingOptimizer:
    def __init__(self, market_data):
        self.data = market_data
        self.algorithms = self.load_algorithms()
    
    def optimize_execution(self):
        # Core optimization logic
        for algorithm in self.algorithms:
            performance = algorithm.backtest(self.data)
            if performance.sharpe_ratio > 2.0:
                algorithm.deploy()
\`\`\`

### Market Analysis Insights

Market analysis reveals several key trends:
• Increased volatility in specific sectors
• Strong correlation between volume and price movements
• Emerging opportunities in alternative markets
• Risk-adjusted returns improving across strategies
      `,
      'conversational': `
# ${title}

Comprehensive analysis and insights into your inquiry. This detailed exploration covers multiple aspects and provides actionable information.

## Overview

Based on your question about "${title}", here's a comprehensive analysis that addresses the key aspects you're interested in exploring.

### Key Insights

The analysis reveals several important considerations:

• **Primary Factors**: Core elements that directly impact your inquiry
• **Secondary Effects**: Related factors that influence outcomes
• **Best Practices**: Proven approaches for optimal results
• **Recommendations**: Specific actionable steps you can take

### Detailed Analysis

1. **Understanding the Context**
   - Historical background and relevant factors
   - Current market or industry conditions
   - Key stakeholders and their perspectives

2. **Solution Approaches**
   - Multiple viable strategies for addressing your needs
   - Pros and cons of each approach
   - Implementation considerations

3. **Expected Outcomes**
   - Projected results based on different scenarios
   - Timeline expectations for various approaches
   - Success metrics and evaluation criteria

## Recommendations

Based on this analysis, I recommend focusing on:

1. **Immediate Actions**: Steps you can take right away
2. **Medium-term Strategy**: Plans for the next 3-6 months
3. **Long-term Vision**: Strategic direction for sustained success

### Next Steps

To move forward effectively:
• Prioritize the most impactful actions
• Establish clear metrics for measuring progress
• Create a timeline for implementation
• Monitor results and adjust strategy as needed
      `
    };

    return responses[category] || responses['conversational'];
  };

  const generateSources = (title, category) => {
    const baseSources = [
      {
        id: 1,
        title: `${category} Documentation - ${title}`,
        url: 'documentation.example.com',
        domain: 'documentation.example.com',
        favicon: '📚',
        description: `Comprehensive documentation and guidelines for ${title}.`,
        selected: true,
        reviewed: true
      },
      {
        id: 2,
        title: `${category} Best Practices Guide`,
        url: 'bestpractices.example.com', 
        domain: 'bestpractices.example.com',
        favicon: '⚡',
        description: `Industry best practices and recommended approaches for ${category} implementations.`,
        selected: true,
        reviewed: false
      },
      {
        id: 3,
        title: `${title} - Stack Overflow Discussion`,
        url: 'stackoverflow.com',
        domain: 'stackoverflow.com', 
        favicon: '💬',
        description: `Community discussions and solutions related to ${title}.`,
        selected: false,
        reviewed: true
      }
    ];

    if (category === 'analysis') {
      baseSources.push(
        {
          id: 4,
          title: 'Financial Data Analysis - Yahoo Finance',
          url: 'finance.yahoo.com',
          domain: 'finance.yahoo.com',
          favicon: '📊',
          description: 'Real-time financial data and historical market information.',
          selected: true,
          reviewed: true
        },
        {
          id: 5,
          title: 'Market Analysis - Bloomberg Terminal',
          url: 'bloomberg.com',
          domain: 'bloomberg.com', 
          favicon: '📈',
          description: 'Professional financial analysis and market insights.',
          selected: true,
          reviewed: false
        }
      );
    }

    return baseSources;
  };

  const generateSteps = (title) => {
    return [
      {
        id: 1,
        title: `Analyzing ${title} to generate comprehensive insights`,
        status: 'completed',
        details: [
          'Searching for relevant information',
          'Processing market data',
          'Analyzing historical trends'
        ]
      },
      {
        id: 2,
        title: 'Gathering information from authoritative sources',
        status: 'completed',
        details: [
          'Accessing financial databases',
          'Retrieving historical data',
          'Validating data quality'
        ]
      },
      {
        id: 3,
        title: 'Processing and analyzing collected data',
        status: 'completed',
        details: [
          'Statistical analysis',
          'Trend identification',
          'Pattern recognition'
        ]
      },
      {
        id: 4,
        title: 'Generating visualizations and insights',
        status: 'completed',
        details: [
          'Creating charts and graphs',
          'Generating key insights',
          'Preparing recommendations'
        ]
      }
    ];
  };

  const generateCharts = (title, category) => {
    if (category === 'analysis' || title.toLowerCase().includes('chart') || title.toLowerCase().includes('plot')) {
      return [
        {
          id: 1,
          type: 'scatter',
          title: 'Market Performance Scatter Plot',
          description: 'Scatter plot showing market performance over time with trend analysis',
          data: 'Interactive chart showing historical performance data'
        },
        {
          id: 2,
          type: 'line',
          title: 'Historical Trend Analysis',
          description: 'Line chart displaying long-term trends and patterns',
          data: 'Time series data visualization'
        }
      ];
    }
    return [];
  };

  const generateRelatedQuestions = (title, category) => {
    const questions = {
      'analysis': [
        'What are the key performance indicators for this analysis?',
        'How do these trends compare to industry benchmarks?', 
        'What factors might influence future performance?',
        'Can you provide a deeper statistical analysis?'
      ],
      'technical': [
        'What are the scalability considerations for this implementation?',
        'How can we optimize performance further?',
        'What are the security implications?',
        'What monitoring and alerting should be implemented?'
      ],
      'JTMD': [
        'What are the current market conditions affecting this strategy?',
        'How can we optimize the trading algorithms?',
        'What risk management strategies should be implemented?',
        'Can you analyze the profitability metrics?'
      ]
    };

    return questions[category] || [
      'Can you provide more detailed information about this topic?',
      'What are the best practices for implementation?',
      'How does this compare to alternative approaches?',
      'What are the potential challenges and solutions?'
    ];
  };

  // Handle sending new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentChat) return;

    setIsProcessing(true);
    setProcessingStep('Analyzing your question...');

    // Simulate processing steps
    const steps = [
      'Analyzing your question...',
      'Searching for relevant information...',
      'Processing data sources...',
      'Generating comprehensive response...',
      'Finalizing analysis...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    }

    // Generate new response
    const newResponse = {
      id: `response_${Date.now()}`,
      query: newMessage,
      timestamp: Date.now(),
      category: currentChat.category,
      answer: generateAnswerContent(newMessage, currentChat.category),
      sources: generateSources(newMessage, currentChat.category),
      steps: generateSteps(newMessage),
      charts: generateCharts(newMessage, currentChat.category),
      relatedQuestions: generateRelatedQuestions(newMessage, currentChat.category)
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);
    setCurrentResponseIndex(updatedResponses.length - 1);
    
    updateChat(chatId, { 
      responses: updatedResponses,
      messageCount: updatedResponses.length,
      lastMessage: 'just now',
      lastActivity: Date.now(),
      unreadCount: 0
    });

    setNewMessage('');
    setIsProcessing(false);
    setProcessingStep('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentChat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Chat not found</h3>
          <p className="text-gray-500 mb-4">The conversation you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/home/recent')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Chat History
          </button>
        </div>
      </div>
    );
  }

  const currentResponse = responses[currentResponseIndex];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Same as main app */}
      <aside className="fixed left-0 top-0 h-screen w-14 bg-gray-50 border-r border-gray-200 flex flex-col z-50">
        <div className="flex items-center justify-center h-14 border-b border-gray-200">
          <div className="w-7 h-7 bg-slate-800 rounded-md flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
        </div>

        <nav className="flex-1 py-4">
          <ul className="flex flex-col space-y-1 px-2">
            <li>
              <button 
                onClick={() => navigate('/new')}
                className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-all duration-200"
                title="New Thread"
              >
                <Plus className="w-5 h-5" />
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/home')}
                className="w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center justify-center transition-all duration-200"
                title="Home"
              >
                <Home className="w-5 h-5" />
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/discover')}
                className="w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center justify-center transition-all duration-200"
                title="Discover"
              >
                <Globe className="w-5 h-5" />
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/spaces')}
                className="w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center justify-center transition-all duration-200"
                title="Spaces"
              >
                <Layers className="w-5 h-5" />
              </button>
            </li>
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-2 space-y-1">
          <button className="w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center justify-center transition-all duration-200">
            <User className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center justify-center transition-all duration-200">
            <ExternalLink className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900 flex items-center justify-center transition-all duration-200">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-14">
        {/* Header with navigation */}
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/home/recent')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentResponse ? currentResponse.query : currentChat.title}
                </h1>
                <div className="flex items-center space-x-6 mt-2">
                  <button
                    onClick={() => setActiveTab('answer')}
                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'answer'
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    Answer
                  </button>
                  <button
                    onClick={() => setActiveTab('images')}
                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'images'
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    Images
                  </button>
                  <button
                    onClick={() => setActiveTab('sources')}
                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'sources'
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    Sources • {currentResponse?.sources?.length || 0}
                  </button>
                  <button
                    onClick={() => setActiveTab('steps')}
                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'steps'
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    Steps
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Star className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Share className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area with all responses */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Render all responses */}
          {responses.map((response, index) => (
            <div key={response.id} className={`mb-12 ${index > 0 ? 'border-t border-gray-200 pt-8' : ''}`}>
              {index > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{response.query}</h2>
                  <div className="flex items-center space-x-6">
                    <span className="text-sm text-gray-500">Answer</span>
                    <span className="text-sm text-gray-500">Images</span>
                    <span className="text-sm text-gray-500">Sources • {response.sources.length}</span>
                    <span className="text-sm text-gray-500">Steps</span>
                  </div>
                </div>
              )}

              {/* Answer Content */}
              <div className="space-y-6">
                {/* Category Badge */}
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    response.category === 'analysis' ? 'bg-blue-100 text-blue-700' :
                    response.category === 'technical' ? 'bg-purple-100 text-purple-700' :
                    response.category === 'JTMD' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {response.category}
                  </span>
                </div>

                {/* Main Answer */}
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {response.answer}
                  </div>
                </div>

                {/* Charts if available */}
                {response.charts && response.charts.length > 0 && (
                  <div className="space-y-4">
                    {response.charts.map((chart, chartIndex) => (
                      <div key={chartIndex} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{chart.title}</h3>
                        <p className="text-gray-600 mb-4">{chart.description}</p>
                        <div className="h-64 bg-white border border-gray-200 rounded flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                            <p>Interactive Chart: {chart.title}</p>
                            <p className="text-sm">{chart.data}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Related Questions */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Related Questions</h3>
                  <div className="space-y-2">
                    {response.relatedQuestions.map((question, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => setNewMessage(question)}
                        className="block w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-blue-800 font-medium">{processingStep}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Follow-up Input - Always at bottom */}
        <div className="border-t border-gray-200 bg-white px-6 py-4 sticky bottom-0">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a follow-up question..."
                className="w-full pl-4 pr-16 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="1"
                style={{ minHeight: '44px', maxHeight: '120px' }}
                disabled={isProcessing}
              />
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isProcessing}
                className={`
                  absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200
                  ${newMessage.trim() && !isProcessing
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Search className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Image className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              
              <div className="text-xs text-gray-500">
                Press Enter to send, Shift+Enter for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualChatView;