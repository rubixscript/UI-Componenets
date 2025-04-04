import React from 'react';
import './App.css';
import { AnimatedDock } from './ui-components';

function App() {
  return (
    <div className="App">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex flex-col items-center justify-center">
        <div className="text-white text-center mb-10 px-4">
          <h1 className="text-4xl font-bold mb-2">Animated Dock Component</h1>
          <p className="text-xl text-gray-300">Inspired by classic Apple desktop dock</p>
        </div>
        
        <div className="w-full max-w-3xl px-4 mb-20">
          <div className="glass-effect rounded-lg p-8 shadow-lg">        
            
            <div className="preview-container relative bg-gradient-to-b from-gray-700/20 to-gray-900/20 rounded-xl p-6 h-64 mb-4 flex items-end justify-center border border-white/10">
              {/* Place the dock at the bottom of the preview */}
              <AnimatedDock />
            </div>
  
          </div>
        </div>
    
      </div>
    </div>
  );
}

export default App;
