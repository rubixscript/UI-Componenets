import React, { useState } from 'react';

// Sample tab data with expanded content
const tabsData = [
  {
    id: 1,
    title: 'Dashboard',
    icon: '📊',
    content: 'Main dashboard overview with key metrics and performance indicators.',
    cards: [
      { title: 'Active Users', value: '2,845', change: '+12.5%', trend: 'up', color: 'blue' },
      { title: 'Revenue', value: '$18,927', change: '+8.3%', trend: 'up', color: 'green' },
      { title: 'Conversion', value: '3.6%', change: '-0.8%', trend: 'down', color: 'red' }
    ]
  },
  {
    id: 2,
    title: 'Analytics',
    icon: '📈',
    content: 'Detailed analytics and reporting tools to track your progress.',
    cards: [
      { title: 'Page Views', value: '148,327', change: '+24.5%', trend: 'up', color: 'blue' },
      { title: 'Avg. Session', value: '4m 23s', change: '+1.2%', trend: 'up', color: 'green' },
      { title: 'Bounce Rate', value: '32.4%', change: '-2.8%', trend: 'down', color: 'green' }
    ]
  },
  {
    id: 3,
    title: 'Projects',
    icon: '📁',
    content: 'Manage and organize all your ongoing and completed projects.',
    cards: [
      { title: 'Active Projects', value: '12', change: '+3', trend: 'up', color: 'blue' },
      { title: 'Completed', value: '24', change: '+5', trend: 'up', color: 'green' },
      { title: 'Overdue', value: '3', change: '-2', trend: 'down', color: 'green' }
    ]
  },
  {
    id: 4,
    title: 'Calendar',
    icon: '📅',
    content: 'Schedule and view upcoming events, deadlines, and appointments.',
    cards: [
      { title: 'Events Today', value: '4', change: '', trend: 'none', color: 'blue' },
      { title: 'Upcoming', value: '12', change: '+2', trend: 'up', color: 'purple' },
      { title: 'Completed', value: '28', change: '', trend: 'none', color: 'green' }
    ]
  },
  {
    id: 5,
    title: 'Messages',
    icon: '💬',
    content: 'Communication hub for all your conversations and notifications.',
    cards: [
      { title: 'Unread', value: '8', change: '+2', trend: 'up', color: 'blue' },
      { title: 'Replied', value: '24', change: '+18', trend: 'up', color: 'green' },
      { title: 'Drafts', value: '3', change: '', trend: 'none', color: 'yellow' }
    ]
  }
];

const ModernTabCards = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Function to get trend icon
  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '';
    }
  };

  // Function to get color classes based on color prop
  const getColorClasses = (color, isBackground = false) => {
    const baseClasses = isBackground ? 'bg-gradient-to-br' : 'text';
    
    switch(color) {
      case 'blue':
        return isBackground 
          ? `${baseClasses} from-blue-500/40 to-blue-700/40 border-blue-400/40` 
          : `${baseClasses}-blue-700`;
      case 'green':
        return isBackground 
          ? `${baseClasses} from-green-500/40 to-green-700/40 border-green-400/40` 
          : `${baseClasses}-green-700`;
      case 'red':
        return isBackground 
          ? `${baseClasses} from-red-500/40 to-red-700/40 border-red-400/40` 
          : `${baseClasses}-red-700`;
      case 'purple':
        return isBackground 
          ? `${baseClasses} from-purple-500/40 to-purple-700/40 border-purple-400/40` 
          : `${baseClasses}-purple-700`;
      case 'yellow':
        return isBackground 
          ? `${baseClasses} from-yellow-500/40 to-yellow-700/40 border-yellow-400/40` 
          : `${baseClasses}-yellow-700`;
      default:
        return isBackground 
          ? `${baseClasses} from-gray-500/40 to-gray-700/40 border-gray-400/40` 
          : `${baseClasses}-gray-700`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col">
        {/* Tab navigation */}
        <div className="flex items-center justify-center mb-6 relative">
          {/* Animated background highlight */}
          <div 
            className="absolute h-14 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 ease-out"
            style={{
              width: `${100 / tabsData.length}%`,
              left: `${(activeTab - 1) * (100 / tabsData.length)}%`,
              zIndex: 0,
              transform: 'translateZ(0)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}
          ></div>
          
          {/* Tab buttons */}
          {tabsData.map((tab) => {
            const isActive = activeTab === tab.id;
            const isHovered = hoveredTab === tab.id;
            
            return (
              <button
                key={tab.id}
                className={`relative z-10 flex flex-1 items-center justify-center h-14 px-4 transition-all duration-300 ${
                  isActive ? 'text-blue-700 font-semibold' : 'text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  transform: isHovered && !isActive ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                <div className="flex items-center space-x-2">
                  <span className={`text-xl transition-transform duration-300 ${
                    isActive || isHovered ? 'scale-125' : 'scale-100'
                  }`}>
                    {tab.icon}
                  </span>
                  <span className={`transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-90'
                  }`}>
                    {tab.title}
                  </span>
                </div>
                
                {/* Bottom indicator line for active tab */}
                <div 
                  className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-700 transform -translate-x-1/2 transition-all duration-300 ${
                    isActive ? 'w-2/3' : '0'
                  }`}
                ></div>
              </button>
            );
          })}
        </div>
        
        {/* Tab content area */}
        <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 min-h-[200px] shadow-xl border border-white/30">
          {tabsData.map((tab) => (
            <div 
              key={tab.id}
              className={`transition-all duration-500 ${
                activeTab === tab.id 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 absolute -z-10 transform translate-y-4'
              }`}
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{tab.icon}</span>
                <h2 className="text-xl font-semibold text-gray-900">{tab.title}</h2>
              </div>
              <p className="text-gray-700 mb-6">{tab.content}</p>
              
              {/* Cards with actual content */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {tab.cards.map((card, idx) => (
                  <div 
                    key={idx}
                    className={`
                      p-5 rounded-lg border shadow-md transition-all duration-300
                      bg-gradient-to-br from-white/80 to-white/60
                      border-white/50 hover:border-white/70
                    `}
                    onMouseEnter={() => setHoveredCard(`${tab.id}-${idx}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      transform: hoveredCard === `${tab.id}-${idx}` ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow: hoveredCard === `${tab.id}-${idx}` 
                        ? '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.15)' 
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* Card content */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-gray-700 font-medium text-sm">{card.title}</h3>
                      <div className={`rounded-full w-8 h-8 ${getColorClasses(card.color, true)} flex items-center justify-center text-xs text-white font-medium`}>
                        {card.title.charAt(0)}{card.title.split(' ')[1]?.charAt(0) || ''}
                      </div>
                    </div>
                    
                    {/* Main value */}
                    <div className="mb-2">
                      <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                    </div>
                    
                    {/* Trend indicator */}
                    {card.change && (
                      <div className="flex items-center mt-2">
                        <span className={`text-sm font-medium ${card.trend === 'up' ? 'text-green-700' : (card.trend === 'down' ? 'text-red-700' : 'text-gray-700')}`}>
                          {card.change} {getTrendIcon(card.trend)}
                        </span>
                      </div>
                    )}
                    
                    {/* Visual indicator */}
                    <div className="mt-4 pt-3 border-t border-gray-300/50">
                      <div className="w-full bg-gray-300/50 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getColorClasses(card.color, true)}`}
                          style={{ width: `${Math.random() * 60 + 40}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add some custom CSS for animations */}
      <style jsx>{`
        @keyframes pulse-subtle {
          0% { opacity: 0.7; }
          50% { opacity: 0.9; }
          100% { opacity: 0.7; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default ModernTabCards; 