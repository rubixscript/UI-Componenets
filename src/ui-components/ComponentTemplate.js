import React, { useState } from 'react';

/**
 * Component Template
 * 
 * This is a starter template for creating new UI components.
 * It includes examples of animations, hover effects, and styling
 * that follow the project's aesthetic guidelines.
 * 
 * To use:
 * 1. Copy this file to your component directory
 * 2. Rename the file and component name
 * 3. Customize the content and functionality
 * 4. Create an index.js file to export it
 * 5. Add it to the main ui-components/index.js
 * 6. Add it to App.js UI_COMPONENTS array
 */

// Sample data - replace with your component's data
const sampleItems = [
  { id: 1, title: 'Item One', description: 'First item description' },
  { id: 2, title: 'Item Two', description: 'Second item description' },
  { id: 3, title: 'Item Three', description: 'Third item description' },
];

const ComponentTemplate = () => {
  // State examples
  const [activeItem, setActiveItem] = useState(1);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Container with glass effect */}
      <div className="bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/30">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Component Title</h2>

        {/* Interactive elements with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {sampleItems.map((item) => {
            const isActive = activeItem === item.id;
            const isHovered = hoveredItem === item.id;
            
            return (
              <div
                key={item.id}
                className={`relative p-6 rounded-lg transition-all duration-300 cursor-pointer
                  ${isActive 
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg border border-white/40' 
                    : 'bg-white/10 border border-white/20 hover:bg-white/20'
                  }`}
                onClick={() => setActiveItem(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: isHovered 
                    ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' 
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                
                {/* Animated indicator dot */}
                {isActive && (
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500 animate-pulse-subtle"></div>
                )}
                
                {/* Interactive visual element example */}
                <div 
                  className="w-full h-1 mt-4 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-opacity duration-500"
                  style={{ opacity: isHovered ? 0.8 : 0.3 }}
                ></div>
              </div>
            );
          })}
        </div>
        
        {/* Feature section with animated elements */}
        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-4">Featured Content</h3>
          
          {/* Content that changes based on active item */}
          {sampleItems.map((item) => (
            <div 
              key={item.id}
              className={`transition-all duration-500 ${
                activeItem === item.id 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 absolute transform translate-y-4 pointer-events-none'
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400/30 to-purple-500/30 flex items-center justify-center text-xl">
                  {item.id}
                </div>
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              
              {/* Placeholder content - replace with your component's specific features */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="h-24 rounded-lg bg-gradient-to-br from-white/20 to-white/5 animate-pulse-subtle"></div>
                <div className="h-24 rounded-lg bg-gradient-to-br from-white/20 to-white/5" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Custom animations */}
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

export default ComponentTemplate; 