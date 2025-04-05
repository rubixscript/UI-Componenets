import React, { useState, useRef, useEffect } from 'react';

// Sample story data with images and content
const storyCardsData = [
  {
    id: 1,
    title: 'Mountain Adventure',
    excerpt: 'Exploring the highest peaks of the Himalayas',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    category: 'Travel'
  },
  {
    id: 2,
    title: 'Ocean Depths',
    excerpt: 'Discovering hidden treasures beneath the waves',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    category: 'Nature'
  },
  {
    id: 3,
    title: 'Urban Photography',
    excerpt: 'Capturing the essence of city life',
    coverImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390',
    category: 'Photography'
  },
  {
    id: 4,
    title: 'Culinary Journeys',
    excerpt: 'Tasting flavors from around the world',
    coverImage: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65',
    category: 'Food'
  },
  {
    id: 5,
    title: 'Historical Wonders',
    excerpt: 'Walking through the corridors of time',
    coverImage: 'https://images.unsplash.com/photo-1459087704190-b3e4c121a40a',
    category: 'History'
  },
  {
    id: 6,
    title: 'Wildlife Safari',
    excerpt: 'Encountering majestic animals in their natural habitat',
    coverImage: 'https://images.unsplash.com/photo-1521651201144-634f700b36ef',
    category: 'Wildlife'
  }
];

const ParallaxStoryCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isClicked, setIsClicked] = useState(null);
  const [cards, setCards] = useState([...storyCardsData]);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle card click animation
  const handleClick = (index) => {
    setIsClicked(index);
    setTimeout(() => setIsClicked(null), 600); // Reset after animation completes
  };

  // Shuffle the cards
  const shuffleCards = () => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCards(shuffled);
  };

  // Track mouse position for parallax effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    setMousePosition({ x, y });
  };

  // Initial shuffle on component mount
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="flex flex-col items-center p-8">
      <button 
        onClick={shuffleCards} 
        className="mb-8 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
      >
        Shuffle Stories
      </button>
      
      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {cards.map((card, index) => {
          // Calculate parallax shift based on mouse position
          const isHovered = hoveredIndex === index;
          
          // Calculate the parallax effect (more pronounced when hovered)
          const baseShiftX = isHovered ? 10 : 5;
          const baseShiftY = isHovered ? 10 : 5;
          
          const cardCenterX = 150; // Approximate card width / 2
          const cardCenterY = 125; // Approximate card height / 2
          
          // Calculate shift relative to card center
          const shiftX = isHovered
            ? ((mousePosition.x - cardCenterX) / cardCenterX) * baseShiftX
            : 0;
            
          const shiftY = isHovered
            ? ((mousePosition.y - cardCenterY) / cardCenterY) * baseShiftY
            : 0;
            
          return (
            <div
              key={card.id}
              className={`relative h-64 rounded-xl overflow-hidden transition-all duration-300 ease-out shadow-lg w-full min-w-[250px]
                ${isHovered ? 'shadow-xl scale-105 z-10' : ''}
                ${isClicked === index ? 'animate-pulse' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                whiteSpace: 'normal', // Ensure text wraps normally
                display: 'block',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => handleClick(index)}
            >
              {/* Card background image with parallax effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-200 ease-out"
                style={{
                  backgroundImage: `url(${card.coverImage})`,
                  transform: `translateX(${shiftX}px) translateY(${shiftY}px) scale(${isHovered ? 1.1 : 1.05})`,
                  filter: `brightness(${isHovered ? 0.7 : 0.6})`,
                }}
              />
              
              {/* Card category badge */}
              <div 
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-xs font-bold py-1 px-2 rounded-full transition-transform duration-200 ease-out"
                style={{
                  transform: `translateX(${-shiftX * 0.5}px) translateY(${-shiftY * 0.5}px)`,
                  whiteSpace: 'nowrap', // Prevent category text from wrapping
                }}
              >
                {card.category}
              </div>
              
              {/* Card content */}
              <div 
                className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent text-white transition-transform duration-200 ease-out"
                style={{
                  transform: `translateX(${-shiftX * 0.8}px) translateY(${-shiftY * 0.8}px)`,
                  whiteSpace: 'normal', // Ensure text wraps normally
                  textOrientation: 'mixed',
                  writingMode: 'horizontal-tb',
                }}
              >
                <h3 
                  className="text-xl font-bold mb-2 transition-transform duration-200 ease-out"
                  style={{
                    transform: `translateX(${-shiftX * 1.2}px) translateY(${-shiftY * 1.2}px)`,
                    whiteSpace: 'normal', // Ensure text wraps normally
                    width: '100%', // Ensure full width
                    textOrientation: 'mixed',
                    writingMode: 'horizontal-tb',
                  }}
                >
                  {card.title}
                </h3>
                <p 
                  className="text-sm opacity-90 transition-transform duration-200 ease-out"
                  style={{
                    transform: `translateX(${-shiftX * 1.4}px) translateY(${-shiftY * 1.4}px)`,
                    whiteSpace: 'normal', // Ensure text wraps normally
                    width: '100%', // Ensure full width
                    textOrientation: 'mixed',
                    writingMode: 'horizontal-tb',
                  }}
                >
                  {card.excerpt}
                </p>
              </div>
              
              {/* Hover indicator */}
              {isHovered && (
                <div className="absolute inset-0 border-2 border-white/30 rounded-xl pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParallaxStoryCards; 