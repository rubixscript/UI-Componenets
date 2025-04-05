import React, { useState, useEffect } from 'react';

// App icon data with logo URLs
const appIconsData = [
  { 
    id: 1, 
    name: 'Notion', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png'
  },
  { 
    id: 2, 
    name: 'Adobe AE', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg'
  },
  { 
    id: 3, 
    name: 'Figma', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'
  },
  { 
    id: 4, 
    name: 'Slack', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg'
  },
  { 
    id: 5, 
    name: 'Spotify', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg'
  },
  { 
    id: 6, 
    name: 'VSCode', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg'
  },
  { 
    id: 7, 
    name: 'Photoshop', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg'
  },
  { 
    id: 8, 
    name: 'Discord', 
    logo: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png'
  },
  { 
    id: 9, 
    name: 'Chrome', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg'
  },
];

const AnimatedDock = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isClicked, setIsClicked] = useState(null);
  const [appIcons, setAppIcons] = useState([...appIconsData]);

  // Trigger bounce animation when clicked
  const handleClick = (index) => {
    setIsClicked(index);
    setTimeout(() => setIsClicked(null), 600); // Reset after animation completes
  };

  // Shuffle the icons
  const shuffleIcons = () => {
    const shuffled = [...appIcons];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setAppIcons(shuffled);
  };

  // Initial shuffle on component mount
  useEffect(() => {
    shuffleIcons();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* <button 
        onClick={shuffleIcons} 
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Shuffle Icons
      </button> */}
      
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
                    ${isHovered ? 'shadow-xl ring-2 ring-white/30' : ''} bg-white`}
                >
                  <img 
                    src={app.logo} 
                    alt={app.name} 
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/128?text=' + app.name.charAt(0);
                    }}
                  />
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
    </div>
  );
};

export default AnimatedDock; 