import React, { useState, useEffect } from 'react';
import './App.css';
import { AnimatedDock, ParallaxStoryCards, ParallaxTestimonials, ModernTabCards, AestheticSidebar, InteractiveGraph, MotionAnimatedList } from './ui-components';

// Define all UI components with their metadata
const UI_COMPONENTS = [
  {
    id: 'animated-dock',
    name: 'Animated Dock',
    description: 'Inspired by classic Apple desktop dock',
    component: AnimatedDock,
  },
  {
    id: 'parallax-story-cards',
    name: 'Parallax Story Cards',
    description: 'Cards with dynamic parallax effects on mouse movement',
    component: ParallaxStoryCards,
  },
  {
    id: 'parallax-testimonials',
    name: 'Parallax Testimonials',
    description: 'Beautiful testimonial cards with dynamic parallax effects',
    component: ParallaxTestimonials,
  },
  {
    id: 'modern-tab-cards',
    name: 'Modern Tab Cards',
    description: 'Aesthetic tab interface with smooth animations and hover effects',
    component: ModernTabCards,
  },
  {
    id: 'aesthetic-sidebar',
    name: 'Aesthetic Sidebar',
    description: 'Glass-morphic sidebar with smooth animations and responsive collapsible design',
    component: AestheticSidebar,
  },
  {
    id: 'interactive-graph',
    name: 'Interactive Graph',
    description: 'Beautiful animated graph with interactive data points and glass morphic styling',
    component: InteractiveGraph,
  },
  {
    id: 'motion-animated-list',
    name: 'Motion Animated List',
    description: 'Interactive list with animations, drag-and-drop reordering, and expandable items',
    component: MotionAnimatedList,
  },
  // More components can be added here as they're created
];

function App() {
  const [activeComponent, setActiveComponent] = useState(UI_COMPONENTS[0].id);
  const [mounted, setMounted] = useState(false);

  // Get the currently active component data
  const currentComponent = UI_COMPONENTS.find(comp => comp.id === activeComponent);

  // Add animation on mount
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="App flex h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-gray-900 text-white overflow-hidden">
      {/* Ambient background light effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[80%] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-40%] right-[-10%] w-[60%] h-[70%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Left Navigation Sidebar */}
      <div className="w-72 h-full border-r border-white/10 flex flex-col overflow-auto backdrop-blur-sm bg-black/20 z-10 transition-all duration-300 shadow-[5px_0_30px_rgba(0,0,0,0.2)]">
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-indigo-800/20 to-transparent">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">UI Components</h1>
          <p className="text-sm text-blue-200/80 mt-2">Interactive React components</p>
        </div>

        {/* Component Navigation Links */}
        <div className="flex-1 overflow-auto py-4 px-2">
          {UI_COMPONENTS.map((component) => (
            <button
              key={component.id}
              onClick={() => setActiveComponent(component.id)}
              className={`w-full text-left p-4 rounded-xl mb-2 transition-all duration-300 ${
                activeComponent === component.id
                  ? 'bg-gradient-to-r from-indigo-600/40 to-purple-600/20 shadow-lg shadow-indigo-900/30 border-l-4 border-indigo-400'
                  : 'hover:bg-white/5 border-l-4 border-transparent hover:translate-x-1'
              }`}
            >
              <span className={`block font-medium ${activeComponent === component.id ? 'text-blue-200' : 'text-gray-300'}`}>
                {component.name}
              </span>
              <span className={`block text-xs mt-1 line-clamp-1 ${activeComponent === component.id ? 'text-blue-200/70' : 'text-gray-400'}`}>
                {component.description}
              </span>
            </button>
          ))}
        </div>

        {/* Footer with info */}
        <div className="p-5 text-xs text-indigo-300/60 border-t border-white/10 bg-gradient-to-r from-transparent to-indigo-900/20 backdrop-blur-sm">
          React UI Components Library
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto z-10">
        <div className="h-full flex flex-col">
          {/* Component Header */}
          <div className="p-6 border-b border-white/10 bg-black/20 backdrop-blur-md">
            <div className={`transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0 transform translate-y-4'}`}>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                {currentComponent.name}
              </h2>
              <p className="text-blue-200/80 mt-2 text-lg">{currentComponent.description}</p>
            </div>
          </div>

          {/* Component Preview */}
          <div className="flex-1 p-8 overflow-auto">
            <div className={`glass-effect rounded-2xl p-8 shadow-[0_10px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl bg-gradient-to-br from-white/5 to-black/20 max-w-6xl mx-auto border border-white/10 transition-all duration-700 ${mounted ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              <div className={`preview-container relative bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-gray-900/30 rounded-xl p-8 min-h-[500px] mb-4 flex ${
                activeComponent === 'animated-dock' ? 'items-end justify-center' : ''
              } border border-white/10 shadow-inner`}>
                {/* Render the selected component */}
                {React.createElement(currentComponent.component)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
