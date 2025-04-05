import React, { useState, useRef, useEffect } from 'react';

// Sample testimonial data
const testimonialsData = [
  {
    id: 1,
    name: 'Emma Wilson',
    role: 'Product Designer',
    quote: 'The attention to detail and the quality of the design elements exceeded my expectations. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    company: 'Dribbble'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CEO',
    quote: 'This solution transformed our approach to user engagement. The results have been outstanding!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    company: 'TechFlow'
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    role: 'Marketing Director',
    quote: 'The implementation was flawless. Our conversion rates have improved by 40% since we started using this.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    company: 'MarketEdge'
  },
  {
    id: 4,
    name: 'James Taylor',
    role: 'Lead Developer',
    quote: "The most intuitive and elegant solution I've worked with. It simplified our development process considerably.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    company: 'CodeCraft'
  },
  {
    id: 5,
    name: 'Olivia Park',
    role: 'UX Researcher',
    quote: 'User testing revealed overwhelmingly positive feedback. This design language resonates with our audience perfectly.',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56',
    company: 'UXperts'
  },
  {
    id: 6,
    name: 'Daniel Johnson',
    role: 'Startup Founder',
    quote: 'Implementing this component library helped us launch our MVP two months ahead of schedule. Game-changer!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    company: 'LaunchPad'
  }
];

const ParallaxTestimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isClicked, setIsClicked] = useState(null);
  const [testimonials, setTestimonials] = useState([...testimonialsData]);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle card click animation
  const handleClick = (index) => {
    setIsClicked(index);
    setTimeout(() => setIsClicked(null), 600); // Reset after animation completes
  };

  // Shuffle the testimonials
  const shuffleTestimonials = () => {
    const shuffled = [...testimonials];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setTestimonials(shuffled);
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
    shuffleTestimonials();
  }, []);

  return (
    <div className="flex flex-col items-center p-8 w-full">
      <button 
        onClick={shuffleTestimonials} 
        className="mb-8 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium text-lg"
      >
        Shuffle Testimonials
      </button>
      
      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {testimonials.map((testimonial, index) => {
          // Calculate parallax shift based on mouse position
          const isHovered = hoveredIndex === index;
          
          // Calculate the parallax effect (more pronounced when hovered)
          const baseShiftX = isHovered ? 10 : 5;
          const baseShiftY = isHovered ? 10 : 5;
          
          const cardCenterX = 180; // Increased card width / 2
          const cardCenterY = 150; // Increased card height / 2
          
          // Calculate shift relative to card center
          const shiftX = isHovered
            ? ((mousePosition.x - cardCenterX) / cardCenterX) * baseShiftX
            : 0;
            
          const shiftY = isHovered
            ? ((mousePosition.y - cardCenterY) / cardCenterY) * baseShiftY
            : 0;
            
          return (
            <div
              key={testimonial.id}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 ease-out shadow-lg w-full h-80 bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm border border-purple-500/30
                ${isHovered ? 'shadow-xl scale-105 z-10' : ''}
                ${isClicked === index ? 'animate-pulse' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => handleClick(index)}
            >
              {/* Floating background shapes with parallax effect */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  transform: `translateX(${shiftX * 1.5}px) translateY(${shiftY * 1.5}px)`,
                }}
              >
                <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-purple-400 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-indigo-400 translate-x-1/4 translate-y-1/4" />
                <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-pink-400 translate-y-1/2" />
              </div>
              
              {/* Card content with parallax effect */}
              <div 
                className="absolute inset-0 p-8 flex flex-col justify-between z-10"
                style={{
                  transform: `translateX(${-shiftX * 0.5}px) translateY(${-shiftY * 0.5}px)`,
                }}
              >
                {/* Quote mark */}
                <div className="text-6xl text-white/20 font-serif">"</div>
                
                {/* Testimonial quote */}
                <div 
                  className="mb-5"
                  style={{
                    transform: `translateX(${-shiftX * 0.8}px) translateY(${-shiftY * 0.8}px)`,
                  }}
                >
                  <p className="text-white/90 italic mb-4 text-lg font-light leading-relaxed line-clamp-3">{testimonial.quote}</p>
                </div>
                
                {/* Testimonial author info */}
                <div 
                  className="flex items-center"
                  style={{
                    transform: `translateX(${-shiftX * 1.2}px) translateY(${-shiftY * 1.2}px)`,
                  }}
                >
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/30"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-white text-lg">{testimonial.name}</h3>
                    <div className="flex items-center text-sm text-white/70">
                      <span>{testimonial.role}</span>
                      <span className="mx-1">•</span>
                      <span>{testimonial.company}</span>
                    </div>
                  </div>
                </div>
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

export default ParallaxTestimonials; 