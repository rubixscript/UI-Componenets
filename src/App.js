import React, { useState } from 'react';
import './App.css';
import { AnimatedDock, ParallaxStoryCards, ParallaxTestimonials } from './ui-components';

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
  // More components can be added here as they're created
];

function App() {
  const [activeComponent, setActiveComponent] = useState(UI_COMPONENTS[0].id);

  // Get the currently active component data
  const currentComponent = UI_COMPONENTS.find(comp => comp.id === activeComponent);

  return (
    <div className="App flex h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-white overflow-hidden">
      {/* Left Navigation Sidebar */}
      <div className="w-64 h-full border-r border-white/10 flex flex-col overflow-auto">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">UI Components</h1>
          <p className="text-sm text-gray-400 mt-1">Interactive React components</p>
        </div>

        {/* Component Navigation Links */}
        <div className="flex-1 overflow-auto py-2">
          {UI_COMPONENTS.map((component) => (
            <button
              key={component.id}
              onClick={() => setActiveComponent(component.id)}
              className={`w-full text-left p-4 transition-colors duration-200 ${
                activeComponent === component.id
                  ? 'bg-white/10 border-l-4 border-purple-500'
                  : 'hover:bg-white/5 border-l-4 border-transparent'
              }`}
            >
              <span className="block font-medium">{component.name}</span>
              <span className="block text-xs text-gray-400 mt-1 line-clamp-1">
                {component.description}
              </span>
            </button>
          ))}
        </div>

        {/* Footer with info */}
        <div className="p-4 text-xs text-gray-500 border-t border-white/10">
          React UI Components Library
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="h-full flex flex-col">
          {/* Component Header */}
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold">{currentComponent.name}</h2>
            <p className="text-gray-400">{currentComponent.description}</p>
          </div>

          {/* Component Preview */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="glass-effect rounded-lg p-8 shadow-lg max-w-6xl mx-auto">
              <div className={`preview-container relative bg-gradient-to-b from-gray-700/20 to-gray-900/20 rounded-xl p-6 min-h-[500px] mb-4 flex ${
                activeComponent === 'animated-dock' ? 'items-end justify-center' : ''
              } border border-white/10`}>
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
