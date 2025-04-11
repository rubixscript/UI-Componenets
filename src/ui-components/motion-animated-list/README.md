# Motion Animated List

A beautiful, interactive list component with smooth animations, drag-and-drop reordering, and collapsible items.

## Features

- Staggered entrance animations for list items
- Smooth expand/collapse animations for item details
- Drag-and-drop reordering with visual feedback
- Add/remove items with animated transitions
- Glass-morphic design with gradient backgrounds
- Responsive layout with customizable styling
- Empty state handling
- Hover and tap animations

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | Array | (sample data) | Array of list items with id, title, description, icon, and colorClass properties |
| `allowAddRemove` | Boolean | true | Whether to allow adding and removing items |
| `allowCollapse` | Boolean | true | Whether to allow expanding/collapsing item details |
| `allowDrag` | Boolean | true | Whether to allow drag-and-drop reordering |
| `title` | String | 'Animated Task List' | Title displayed in the header |
| `maxItems` | Number | 8 | Maximum number of items allowed in the list |
| `listBgColor` | String | 'rgba(15, 23, 42, 0.4)' | Background color of the list container |
| `itemBgBase` | String | 'rgba(30, 41, 59, 0.3)' | Base background color for list items |
| `itemBorderColor` | String | 'rgba(255, 255, 255, 0.1)' | Border color for list items |
| `iconBgColor` | String | 'rgba(139, 92, 246, 0.2)' | Background color for item icons |
| `onItemsChange` | Function | null | Callback function triggered when items are added, removed, or reordered |

## Item Format

The component expects items in the following format:

```js
const items = [
  { 
    id: 'unique-id', 
    title: 'Item Title', 
    description: 'Item description text...', 
    icon: '✨', // Can be an emoji or any React component
    colorClass: 'from-purple-500/20 to-indigo-600/20' // Tailwind gradient classes
  },
  // More items...
];
```

## Usage Example

```jsx
import { MotionAnimatedList } from '@your-org/ui-components';

const MyPage = () => {
  const taskItems = [
    { 
      id: 'task-1', 
      title: 'Implement Feature', 
      description: 'Add the new analytics dashboard feature', 
      icon: '📋', 
      colorClass: 'from-blue-500/20 to-cyan-400/20' 
    },
    // More tasks...
  ];

  const handleItemsChange = (updatedItems) => {
    console.log('Items changed:', updatedItems);
    // Handle updated items (e.g., save to state or backend)
  };

  return (
    <div className="p-6 bg-slate-900">
      <MotionAnimatedList 
        items={taskItems}
        title="Project Tasks"
        onItemsChange={handleItemsChange}
        allowDrag={true}
      />
    </div>
  );
};
```

## Animations

The component includes several animations powered by Framer Motion:
- Staggered entrance animations for items
- Smooth height transitions for expanding/collapsing content
- Scale and elevation changes on hover
- Enhanced visual feedback during dragging
- Exit animations when removing items
- Button animations for interaction feedback 