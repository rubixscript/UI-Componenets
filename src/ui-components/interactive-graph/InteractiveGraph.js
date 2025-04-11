import React, { useState, useEffect, useRef } from 'react';

// Sample data structure for the graph
const sampleData = [
  { month: 'Jan', value: 32, secondaryValue: 20 },
  { month: 'Feb', value: 56, secondaryValue: 32 },
  { month: 'Mar', value: 42, secondaryValue: 38 },
  { month: 'Apr', value: 78, secondaryValue: 45 },
  { month: 'May', value: 63, secondaryValue: 58 },
  { month: 'Jun', value: 90, secondaryValue: 66 },
  { month: 'Jul', value: 84, secondaryValue: 70 },
  { month: 'Aug', value: 96, secondaryValue: 80 },
  { month: 'Sep', value: 88, secondaryValue: 74 },
  { month: 'Oct', value: 75, secondaryValue: 62 },
  { month: 'Nov', value: 83, secondaryValue: 58 },
  { month: 'Dec', value: 92, secondaryValue: 76 },
];

const InteractiveGraph = ({
  data = sampleData,
  height = 300,
  mainLineColor = 'rgba(111, 66, 193, 0.8)',
  secondaryLineColor = 'rgba(59, 130, 246, 0.7)',
  bgFrom = 'rgba(139, 92, 246, 0.1)',
  bgTo = 'rgba(59, 130, 246, 0.05)',
  showSecondaryLine = true,
  title = 'Interactive Graph',
  subtitle = 'Performance Metrics',
  animationDuration = 1500,
  showGridLines = true,
  enableDataHover = true,
  showBgGradient = true,
}) => {
  const [graphData, setGraphData] = useState(data);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0 });
  const graphRef = useRef(null);

  // Calculate highest value for scaling purposes
  const maxValue = Math.max(...graphData.map(item => Math.max(item.value, item.secondaryValue || 0)));

  // Randomize data points for a cool effect
  const randomizeData = () => {
    const newData = graphData.map(item => ({
      ...item,
      value: Math.floor(Math.random() * 100) + 20,
      secondaryValue: Math.floor(Math.random() * 80) + 10,
    }));
    setGraphData(newData);
  };

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (graphRef.current) {
        setDimensions({
          width: graphRef.current.offsetWidth,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Trigger animation after a short delay
    setTimeout(() => {
      setIsAnimated(true);
    }, 300);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Points calculation for SVG path
  const calculatePoints = (dataPoints, valueKey, asPercent = false) => {
    if (!dimensions.width || dataPoints.length === 0) return '';
    
    const segmentWidth = dimensions.width / (dataPoints.length - 1);
    
    return dataPoints.map((item, index) => {
      const x = index * segmentWidth;
      const y = height - (item[valueKey] / maxValue) * height;
      
      // Format differently for SVG path vs. individual percentages
      return asPercent ? `${x / dimensions.width * 100}% ${y / height * 100}%` : `${x},${y}`;
    }).join(' ');
  };

  // Create SVG path from points
  const createPath = (points) => {
    if (!points) return '';
    const pointsArray = points.split(' ');
    
    if (pointsArray.length < 2) return '';
    
    let path = `M ${pointsArray[0]}`;
    
    for (let i = 1; i < pointsArray.length; i++) {
      // Add curve between points for smooth lines
      const prevPoint = pointsArray[i-1].split(',');
      const currPoint = pointsArray[i].split(',');
      
      // Control point calculation for smooth curves
      const cp1x = parseFloat(prevPoint[0]) + (parseFloat(currPoint[0]) - parseFloat(prevPoint[0])) / 3;
      const cp2x = parseFloat(prevPoint[0]) + (parseFloat(currPoint[0]) - parseFloat(prevPoint[0])) * 2 / 3;
      
      path += ` C ${cp1x},${prevPoint[1]} ${cp2x},${currPoint[1]} ${currPoint[0]},${currPoint[1]}`;
    }
    
    return path;
  };

  // Create a closed path for the background gradient area
  const createAreaPath = (points) => {
    if (!points) return '';
    const path = createPath(points);
    
    // Get the last point's x coordinate
    const lastX = dimensions.width;
    
    // Close the path by extending to the bottom right and then bottom left
    return `${path} L ${lastX},${height} L 0,${height} Z`;
  };

  // Main line points
  const mainLinePoints = calculatePoints(graphData, 'value');
  // Secondary line points
  const secondaryLinePoints = calculatePoints(graphData, 'secondaryValue');

  // Convert to paths
  const mainLinePath = createPath(mainLinePoints);
  const secondaryLinePath = createPath(secondaryLinePoints);
  
  // Area paths for gradient backgrounds
  const mainAreaPath = createAreaPath(mainLinePoints);
  const secondaryAreaPath = createAreaPath(secondaryLinePoints);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Graph component with backdrop blur */}
      <div 
        className="rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl overflow-hidden"
        style={{
          background: 'rgba(15, 23, 42, 0.4)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Header with title and controls */}
        <div className="pt-5 px-6 flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-sm text-blue-200/70">{subtitle}</p>
          </div>
          
          <button
            onClick={randomizeData}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/40 hover:shadow-lg hover:shadow-indigo-900/20 active:transform active:scale-95"
          >
            Refresh Data
          </button>
        </div>
        
        {/* Graph container */}
        <div className="p-6 pt-4" ref={graphRef}>
          {/* Graph SVG */}
          {dimensions.width > 0 && (
            <div className="relative h-[300px]">
              {/* Grid lines */}
              {showGridLines && (
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3].map((i) => (
                    <div 
                      key={`grid-line-${i}`} 
                      className="w-full border-t border-white/5 absolute"
                      style={{ top: `${i * 25}%` }}
                    />
                  ))}
                </div>
              )}
              
              {/* SVG Graph */}
              <svg width="100%" height={height} className="z-10">
                {/* Background gradient for main line */}
                {showBgGradient && isAnimated && (
                  <defs>
                    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={bgFrom} />
                      <stop offset="100%" stopColor={bgTo} stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={secondaryLineColor} stopOpacity="0.1" />
                      <stop offset="100%" stopColor={secondaryLineColor} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                )}
                
                {/* Background fill */}
                {showBgGradient && (
                  <>
                    <path
                      d={mainAreaPath}
                      fill="url(#mainGradient)"
                      className={`transition-opacity duration-1000 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {showSecondaryLine && (
                      <path
                        d={secondaryAreaPath}
                        fill="url(#secondaryGradient)"
                        className={`transition-opacity duration-1000 ${isAnimated ? 'opacity-70' : 'opacity-0'}`}
                      />
                    )}
                  </>
                )}
                
                {/* Main line */}
                <path
                  d={mainLinePath}
                  fill="none"
                  stroke={mainLineColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 1000,
                    strokeDashoffset: isAnimated ? 0 : 1000,
                    transition: `stroke-dashoffset ${animationDuration}ms ease-out`
                  }}
                />
                
                {/* Secondary line */}
                {showSecondaryLine && (
                  <path
                    d={secondaryLinePath}
                    fill="none"
                    stroke={secondaryLineColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 1000,
                      strokeDashoffset: isAnimated ? 0 : 1000,
                      transition: `stroke-dashoffset ${animationDuration}ms ease-out`,
                      transitionDelay: '300ms'
                    }}
                  />
                )}
                
                {/* Data points for main line */}
                {isAnimated && graphData.map((item, index) => {
                  // Calculate position
                  const segmentWidth = dimensions.width / (graphData.length - 1);
                  const x = index * segmentWidth;
                  const y = height - (item.value / maxValue) * height;
                  
                  const isHovered = index === hoverIndex;
                  
                  return (
                    <g key={`point-${index}`} className="cursor-pointer">
                      {/* Larger interaction area (invisible) */}
                      <circle
                        cx={x}
                        cy={y}
                        r="15"
                        fill="transparent"
                        onMouseEnter={() => enableDataHover && setHoverIndex(index)}
                        onMouseLeave={() => enableDataHover && setHoverIndex(null)}
                      />
                      
                      {/* Visible point */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 6 : 4}
                        fill={isHovered ? 'white' : mainLineColor}
                        stroke={isHovered ? mainLineColor : 'white'}
                        strokeWidth="2"
                        className="transition-all duration-300"
                        style={{
                          filter: isHovered ? 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.5))' : 'none',
                          opacity: isAnimated ? 1 : 0,
                          transform: `scale(${isAnimated ? 1 : 0})`,
                          transition: `opacity 500ms ease-out ${300 + index * 50}ms, transform 500ms ease-out ${300 + index * 50}ms, r 200ms ease-out`
                        }}
                      />
                      
                      {/* Secondary line point */}
                      {showSecondaryLine && (
                        <circle
                          cx={x}
                          cy={height - (item.secondaryValue / maxValue) * height}
                          r={isHovered ? 5 : 3}
                          fill={isHovered ? 'white' : secondaryLineColor}
                          stroke={isHovered ? secondaryLineColor : 'white'}
                          strokeWidth="1.5"
                          className="transition-all duration-300"
                          style={{
                            opacity: isAnimated ? 0.9 : 0,
                            transform: `scale(${isAnimated ? 1 : 0})`,
                            transition: `opacity 500ms ease-out ${600 + index * 50}ms, transform 500ms ease-out ${600 + index * 50}ms, r 200ms ease-out`
                          }}
                        />
                      )}
                      
                      {/* Tooltip on hover */}
                      {isHovered && enableDataHover && (
                        <g>
                          {/* Tooltip background */}
                          <rect
                            x={x - 45}
                            y={y - 60}
                            width="90"
                            height={showSecondaryLine ? "60" : "38"}
                            rx="6"
                            ry="6"
                            fill="rgba(15, 23, 42, 0.9)"
                            className="backdrop-blur-md"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="1"
                          />
                          
                          {/* Month label */}
                          <text
                            x={x}
                            y={y - 40}
                            textAnchor="middle"
                            className="fill-white text-xs font-medium"
                          >
                            {item.month}
                          </text>
                          
                          {/* Main value */}
                          <text
                            x={x}
                            y={y - 22}
                            textAnchor="middle"
                            className="fill-white text-xs font-semibold"
                          >
                            <tspan fill={mainLineColor}>●</tspan> {item.value}
                          </text>
                          
                          {/* Secondary value */}
                          {showSecondaryLine && (
                            <text
                              x={x}
                              y={y - 8}
                              textAnchor="middle"
                              className="fill-white text-xs font-semibold"
                            >
                              <tspan fill={secondaryLineColor}>●</tspan> {item.secondaryValue}
                            </text>
                          )}
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
              
              {/* Month labels at bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-2">
                {graphData.filter((_, index) => index % 2 === 0 || graphData.length <= 6).map((item, index) => (
                  <div 
                    key={`label-${index}`}
                    className={`transition-all duration-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                    style={{ transitionDelay: `${800 + index * 30}ms` }}
                  >
                    {item.month}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Legend */}
        <div className="px-6 pb-5 pt-2 flex items-center justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: mainLineColor }}></div>
            <span className="text-sm text-gray-300">Primary</span>
          </div>
          
          {showSecondaryLine && (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: secondaryLineColor }}></div>
              <span className="text-sm text-gray-300">Secondary</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveGraph; 