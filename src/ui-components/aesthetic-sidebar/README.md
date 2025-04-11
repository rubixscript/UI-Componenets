# Aesthetic Sidebar

A modern, glass-morphic sidebar component with smooth animations and responsive design. The sidebar features a collapsible design, hover effects, and customizable styling.

## Features

- Glass-morphic design with semi-transparent backgrounds and blur effects
- Smooth animations for hover, selection, and expand/collapse transitions
- Responsive layout that collapses to an icon-only sidebar
- Customizable colors, icons, and menu items
- Tooltips when hovering over icons in collapsed state
- Selection indicators with subtle animations
- Custom scrollbar styling

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSelectItem` | Function | - | Callback function when a menu item is selected |
| `backgroundColor` | String | 'rgba(255, 255, 255, 0.05)' | Background color of the sidebar |
| `accentColor` | String | 'rgba(138, 43, 226, 0.6)' | Accent color for selected items |
| `expanded` | Boolean | true | Initial expanded state of the sidebar |
| `initialSelectedId` | String | 'dashboard' | ID of the initially selected menu item |
| `showIcons` | Boolean | true | Whether to show icons in the menu items |
| `customMenuItems` | Array | - | Custom menu items array to override defaults |

## Custom Menu Items

You can provide custom menu items with the following structure:

```js
const customItems = [
  { 
    id: 'item-id', 
    name: 'Item Name', 
    icon: '🔍',  // Can be emoji or any React component
  },
  // ...more items
];
```

## Usage Example

```jsx
import { AestheticSidebar } from '@your-org/ui-components';

const MyPage = () => {
  const handleNavigation = (itemId) => {
    console.log(`Navigated to: ${itemId}`);
    // Handle navigation or other actions
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-purple-900">
      <AestheticSidebar 
        onSelectItem={handleNavigation}
        accentColor="rgba(59, 130, 246, 0.7)"
        expanded={true}
      />
      <div className="flex-1 p-4">
        {/* Your page content here */}
      </div>
    </div>
  );
};
```

## Animations

The sidebar includes the following animations:
- Smooth expansion and collapse with adjustable timing
- Subtle hover effects with elevation and background changes
- Selection indicator that grows with animation
- Fade-in tooltips when hovering over icons in collapsed mode 