import React, { useState } from 'react';

// App icon data with labels and colors
const appIcons = [
  { id: 1, name: 'Notion', color: 'bg-gray-900', textColor: 'text-white', label: 'N' },
  { id: 2, name: 'Adobe AE', color: 'bg-purple-700', textColor: 'text-white', label: 'Ae' },
  { id: 3, name: 'Figma', color: 'bg-pink-500', textColor: 'text-white', label: 'F' },
  { id: 4, name: 'Slack', color: 'bg-green-500', textColor: 'text-white', label: 'S' },
  { id: 5, name: 'Spotify', color: 'bg-green-600', textColor: 'text-white', label: 'S' },
  { id: 6, name: 'VSCode', color: 'bg-blue-500', textColor: 'text-white', label: 'VS' },
  { id: 7, name: 'Photoshop', color: 'bg-blue-800', textColor: 'text-white', label: 'Ps' },
  { id: 8, name: 'Discord', color: 'bg-indigo-600', textColor: 'text-white', label: 'D' },
  { id: 9, name: 'Chrome', color: 'bg-red-500', textColor: 'text-white', label: 'C' },
];

const AnimatedDock = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isClicked, setIsClicked] = useState(null);

  // Trigger bounce animation when clicked
  const handleClick = (index) => {
    setIsClicked(index);
    setTimeout(() => setIsClicked(null), 600); // Reset after animation completes
  };

  return (
    <div className="flex justify-center items-end h-24 w-full p-2">
      <div className="relative flex items-end h-full glass-effect rounded-2xl p-2 shadow-lg">
        {/* Add shine effect at the top */}
        <div className="dock-shine"></div>
        
        {appIcons.map((app, index) => {
          // Calculate scale based on distance from hovered item
          const isHovered = hoveredIndex === index;
          const distanceFromHovered = hoveredIndex !== null ? Math.abs(hoveredIndex - index) : 0;
          let scale = 1;
          
          if (hoveredIndex !== null) {
            if (isHovered) {
              scale = 1.5; // Max scale for hovered item
            } else if (distanceFromHovered === 1) {
              scale = 1.25; // Scale for items adjacent to hovered
            } else if (distanceFromHovered === 2) {
              scale = 1.1; // Smaller scale for items 2 steps away
            }
          }
          
          return (
            <div
              key={app.id}
              className={`relative mx-1 transition-all duration-300 ease-in-out ${isClicked === index ? 'animate-bounce-light' : ''}`}
              style={{
                transform: `scale(${scale})`,
                zIndex: isHovered ? 50 : 10,
                transformOrigin: 'bottom center'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(index)}
            >
              <div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out shadow-md
                  ${isHovered ? 'shadow-xl ring-2 ring-white/30' : ''}`}
              >
                <div className={`w-full h-full ${app.color} flex items-center justify-center ${app.textColor} font-bold text-sm`}>
                  {app.label}
                </div>
              </div>
              
              {/* Label that appears on hover */}
              {isHovered && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap shadow-lg animate-fade-in backdrop-blur-sm">
                  {app.name}
                </div>
              )}
              
              {/* Reflection effect */}
              <div 
                className="w-12 h-3 mt-1 rounded-full bg-black/10 mx-auto blur-sm transition-all duration-300 ease-in-out"
                style={{ transform: `scale(${isHovered ? 1.2 : 1}, 0.3)` }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedDock; 