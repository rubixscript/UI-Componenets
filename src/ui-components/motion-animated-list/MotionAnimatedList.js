import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Demo list items data
const defaultItems = [
  { id: 'item-1', title: 'Smart Automation', description: 'Set up automated workflows and smart triggers', icon: '⚡', colorClass: 'from-purple-500/20 to-indigo-600/20' },
  { id: 'item-2', title: 'Task Management', description: 'Organize and prioritize your tasks efficiently', icon: '✓', colorClass: 'from-blue-500/20 to-teal-400/20' },
  { id: 'item-3', title: 'Team Collaboration', description: 'Work together seamlessly with your team', icon: '👥', colorClass: 'from-indigo-500/20 to-sky-400/20' },
  { id: 'item-4', title: 'Analytics Dashboard', description: 'Visualize and track key performance metrics', icon: '📊', colorClass: 'from-violet-500/20 to-fuchsia-400/20' },
  { id: 'item-5', title: 'Cloud Storage', description: 'Securely store and access your files anywhere', icon: '☁️', colorClass: 'from-sky-500/20 to-blue-400/20' },
];

// Animation variants for the list items
const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    }
  }),
  hover: { 
    y: -8,
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  tap: { 
    scale: 0.98,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.2 }
  },
  remove: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.4, ease: 'backIn' }
  },
  dragStart: {
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    scale: 1.05,
    zIndex: 10,
    background: 'rgba(255, 255, 255, 0.1)',
    transition: { duration: 0.2 }
  }
};

// Animation for the list content
const listContentVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: 'auto', opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }
};

// Animation for the "Add Item" button
const addButtonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.2, ease: 'easeOut' } },
  tap: { scale: 0.95, transition: { duration: 0.1 } }
};

const MotionAnimatedList = ({
  items = defaultItems,
  allowAddRemove = true,
  allowCollapse = true,
  allowDrag = true,
  title = 'Animated Task List',
  maxItems = 8,
  listBgColor = 'rgba(15, 23, 42, 0.4)',
  itemBgBase = 'rgba(30, 41, 59, 0.3)',
  itemBorderColor = 'rgba(255, 255, 255, 0.1)',
  iconBgColor = 'rgba(139, 92, 246, 0.2)',
  onItemsChange = null,
}) => {
  const [listItems, setListItems] = useState(items);
  const [draggingItem, setDraggingItem] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const constraintsRef = useRef(null);
  
  // Handle item removal
  const removeItem = (id) => {
    const updatedItems = listItems.filter(item => item.id !== id);
    setListItems(updatedItems);
    if (onItemsChange) onItemsChange(updatedItems);
  };
  
  // Handle adding a new item
  const addItem = () => {
    if (listItems.length >= maxItems) return;
    
    const newId = `item-${Date.now()}`;
    const newItem = {
      id: newId,
      title: 'New Task',
      description: 'Describe your new task here...',
      icon: '✨',
      colorClass: 'from-blue-500/20 to-purple-400/20'
    };
    
    const updatedItems = [...listItems, newItem];
    setListItems(updatedItems);
    
    // Auto-expand the new item
    setExpandedItems(prev => ({ ...prev, [newId]: true }));
    
    if (onItemsChange) onItemsChange(updatedItems);
  };
  
  // Toggle item expanded state
  const toggleExpand = (id) => {
    if (!allowCollapse) return;
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Drag handling
  const onDragStart = (id) => {
    setDraggingItem(id);
  };
  
  const onDragEnd = (event, info, id) => {
    setDraggingItem(null);
    
    // Find the drop position by y-coordinate
    const mouseY = info.point.y;
    const items = document.querySelectorAll('.list-item');
    let dropIndex = listItems.length - 1;
    
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemY = rect.top + rect.height / 2;
      if (mouseY < itemY && index < dropIndex) {
        dropIndex = index;
      }
    });
    
    // Find the dragged item index
    const draggedIndex = listItems.findIndex(item => item.id === id);
    
    // Reorder the list
    if (draggedIndex !== dropIndex) {
      const newItems = [...listItems];
      const [removed] = newItems.splice(draggedIndex, 1);
      newItems.splice(dropIndex, 0, removed);
      setListItems(newItems);
      if (onItemsChange) onItemsChange(newItems);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        className="rounded-xl backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden"
        style={{ background: listBgColor }}
      >
        {/* Header */}
        <div className="py-4 px-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          
          {allowAddRemove && (
            <motion.button
              variants={addButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={addItem}
              disabled={listItems.length >= maxItems}
              className="w-8 h-8 rounded-full bg-indigo-600/70 text-white flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-lg leading-none">+</span>
            </motion.button>
          )}
        </div>
        
        {/* List container */}
        <div 
          className="py-4 px-4 overflow-hidden"
          ref={constraintsRef}
        >
          <AnimatePresence>
            {listItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-400"
              >
                No items in the list
              </motion.div>
            ) : (
              <ul className="space-y-3">
                <AnimatePresence>
                  {listItems.map((item, index) => (
                    <motion.li
                      key={item.id}
                      className="list-item"
                      custom={index}
                      variants={listItemVariants}
                      initial="hidden"
                      animate={draggingItem === item.id ? "dragStart" : "visible"}
                      exit="remove"
                      whileHover={allowDrag ? {} : "hover"}
                      whileTap={allowDrag ? {} : "tap"}
                      drag={allowDrag ? "y" : false}
                      dragElastic={0.1}
                      dragConstraints={constraintsRef}
                      onDragStart={() => onDragStart(item.id)}
                      onDragEnd={(e, info) => onDragEnd(e, info, item.id)}
                      style={{ marginTop: draggingItem === item.id ? 0 : undefined }}
                    >
                      <div 
                        className={`rounded-lg border overflow-hidden`}
                        style={{ 
                          background: itemBgBase,
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.1)',
                          borderColor: itemBorderColor
                        }}
                      >
                        {/* Item header - always visible */}
                        <div 
                          className={`p-4 cursor-pointer flex items-center bg-gradient-to-r ${item.colorClass}`}
                          onClick={() => toggleExpand(item.id)}
                        >
                          {/* Icon */}
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                            style={{ background: iconBgColor, backdropFilter: 'blur(4px)' }}
                          >
                            {item.icon}
                          </div>
                          
                          {/* Title */}
                          <div className="ml-3 flex-1">
                            <h4 className="text-base font-medium text-white">{item.title}</h4>
                          </div>
                          
                          {/* Controls */}
                          <div className="flex items-center space-x-2">
                            {allowCollapse && (
                              <motion.div 
                                className="text-white/70 w-6 h-6 flex items-center justify-center"
                                initial={false}
                                animate={{ rotate: expandedItems[item.id] ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                ▼
                              </motion.div>
                            )}
                            
                            {allowAddRemove && (
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeItem(item.id);
                                }}
                                className="text-white/70 hover:text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10"
                              >
                                ✕
                              </motion.button>
                            )}
                          </div>
                        </div>
                        
                        {/* Expandable content */}
                        <AnimatePresence>
                          {(expandedItems[item.id] || !allowCollapse) && (
                            <motion.div
                              variants={listContentVariants}
                              initial="collapsed"
                              animate="expanded"
                              exit="collapsed"
                              className="overflow-hidden border-t border-white/10"
                            >
                              <div className="p-4 text-gray-300 text-sm">
                                {item.description}
                              </div>
                              
                              {/* Item actions */}
                              <div className="px-4 pb-4 flex justify-end space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="px-3 py-1 rounded-md text-xs bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/40"
                                >
                                  Edit
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="px-3 py-1 rounded-md text-xs bg-purple-600/30 text-purple-200 hover:bg-purple-600/40"
                                >
                                  View
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer */}
        <div className="py-3 px-6 border-t border-white/10 bg-black/10">
          <div className="text-xs text-gray-400">
            {listItems.length} {listItems.length === 1 ? 'item' : 'items'} 
            {allowDrag && listItems.length > 1 && " (drag to reorder)"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotionAnimatedList; 