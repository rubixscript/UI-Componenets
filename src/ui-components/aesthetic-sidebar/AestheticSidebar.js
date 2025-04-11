import React, { useState } from 'react';

const menuItems = [
  { 
    id: 'dashboard', 
    name: 'Dashboard', 
    icon: '📊',
  },
  { 
    id: 'profile', 
    name: 'Profile', 
    icon: '👤',
  },
  { 
    id: 'analytics', 
    name: 'Analytics', 
    icon: '📈',
  },
  { 
    id: 'settings', 
    name: 'Settings', 
    icon: '⚙️',
  },
  { 
    id: 'messages', 
    name: 'Messages', 
    icon: '💬',
  },
  { 
    id: 'calendar', 
    name: 'Calendar', 
    icon: '📅',
  },
  { 
    id: 'tasks', 
    name: 'Tasks', 
    icon: '✓',
  },
];

const AestheticSidebar = ({ 
  onSelectItem, 
  backgroundColor = 'rgba(255, 255, 255, 0.05)',
  accentColor = 'rgba(138, 43, 226, 0.6)',
  expanded = true,
  initialSelectedId = 'dashboard',
  showIcons = true,
  customMenuItems
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const [hoveredId, setHoveredId] = useState(null);
  
  // Use custom menu items if provided, otherwise use default
  const items = customMenuItems || menuItems;

  const handleItemClick = (id) => {
    setSelectedId(id);
    if (onSelectItem) {
      onSelectItem(id);
    }
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`relative h-screen transition-all duration-500 ease-out ${
        isExpanded ? 'w-60' : 'w-20'
      }`}
    >
      {/* Sidebar container with glass effect */}
      <div 
        className="h-full rounded-r-2xl shadow-xl overflow-hidden flex flex-col"
        style={{
          backgroundColor,
          backdropFilter: 'blur(12px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Top logo area */}
        <div className="p-4 flex items-center justify-center border-b border-white/10">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/80 to-blue-500/80 flex items-center justify-center text-white text-xl shadow-lg">
              {showIcons ? '✨' : ''}
            </div>
            {isExpanded && (
              <div className="ml-3 text-white font-semibold transition-all duration-300 opacity-100">
                SideNav
              </div>
            )}
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
          {items.map((item) => {
            const isSelected = item.id === selectedId;
            const isHovered = item.id === hoveredId;
            return (
              <div
                key={item.id}
                className={`
                  relative flex items-center cursor-pointer rounded-xl p-3 transition-all duration-300
                  ${isSelected ? 'text-white' : 'text-white/70 hover:text-white'}
                  ${isExpanded ? 'justify-start' : 'justify-center'}
                `}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleItemClick(item.id)}
                style={{
                  background: isSelected 
                    ? `linear-gradient(135deg, ${accentColor}, rgba(77, 26, 127, 0.3))` 
                    : isHovered 
                      ? 'rgba(255, 255, 255, 0.08)' 
                      : 'transparent',
                  transform: isHovered || isSelected ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: isSelected 
                    ? '0 4px 20px rgba(123, 104, 238, 0.25)' 
                    : isHovered 
                      ? '0 4px 10px rgba(0, 0, 0, 0.1)' 
                      : 'none'
                }}
              >
                {/* Icon */}
                <div 
                  className={`
                    flex items-center justify-center text-xl
                    transition-all duration-300
                    ${isSelected ? 'scale-110' : ''}
                  `}
                >
                  {showIcons && item.icon}
                </div>
                
                {/* Label with fade effect */}
                {isExpanded && (
                  <span 
                    className="ml-3 font-medium transition-all duration-300 whitespace-nowrap overflow-hidden"
                    style={{
                      maxWidth: isExpanded ? '180px' : '0',
                      opacity: isExpanded ? 1 : 0
                    }}
                  >
                    {item.name}
                  </span>
                )}
                
                {/* Selection indicator line */}
                {isSelected && (
                  <div 
                    className="absolute right-0 top-0 h-full w-1 bg-white rounded-l-lg"
                    style={{animation: 'growIn 0.3s ease-out'}}
                  />
                )}
                
                {/* Hover tooltip for collapsed state */}
                {!isExpanded && isHovered && !isSelected && (
                  <div 
                    className="absolute left-full ml-3 px-3 py-1 rounded-lg whitespace-nowrap bg-gray-800/90 text-white text-sm"
                    style={{
                      backdropFilter: 'blur(8px)',
                      animation: 'fadeIn 0.2s ease-out',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      zIndex: 50
                    }}
                  >
                    {item.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Toggle button */}
        <div className="p-4 border-t border-white/10">
          <div 
            onClick={toggleSidebar}
            className="cursor-pointer flex items-center justify-center rounded-xl p-3 transition-all duration-300 bg-white/10 hover:bg-white/15 text-white/80 hover:text-white"
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <span className="text-lg">
              {isExpanded ? '◀' : '▶'}
            </span>
            {isExpanded && (
              <span className="ml-2">Collapse</span>
            )}
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes growIn {
          from { height: 0; opacity: 0; }
          to { height: 100%; opacity: 1; }
        }
        
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AestheticSidebar; 