# Interactive Graph

A beautiful, responsive graph component with smooth animations, interactive data points, and glass morphic styling.

## Features

- Animated line graphs with smooth transitions and curve interpolation
- Interactive data points with tooltips on hover
- Customizable colors and styling options
- Dual-line support for comparing multiple data sets
- Gradient-filled backgrounds for visual appeal
- Responsive design that adapts to container width
- "Refresh Data" button that demonstrates smooth data transitions
- Glass-morphic design with subtle backdrop blur effects

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | Array | (sample data) | Array of data points with month, value, and secondaryValue properties |
| `height` | Number | 300 | Height of the graph in pixels |
| `mainLineColor` | String | 'rgba(111, 66, 193, 0.8)' | Color of the primary line |
| `secondaryLineColor` | String | 'rgba(59, 130, 246, 0.7)' | Color of the secondary line |
| `bgFrom` | String | 'rgba(139, 92, 246, 0.1)' | Starting color for background gradient |
| `bgTo` | String | 'rgba(59, 130, 246, 0.05)' | Ending color for background gradient |
| `showSecondaryLine` | Boolean | true | Whether to show the secondary data line |
| `title` | String | 'Interactive Graph' | Title displayed in the header |
| `subtitle` | String | 'Performance Metrics' | Subtitle displayed in the header |
| `animationDuration` | Number | 1500 | Duration of animations in milliseconds |
| `showGridLines` | Boolean | true | Whether to show horizontal grid lines |
| `enableDataHover` | Boolean | true | Whether to enable hover effects on data points |
| `showBgGradient` | Boolean | true | Whether to show gradient background under lines |

## Data Format

The component expects data in the following format:

```js
const data = [
  { month: 'Jan', value: 32, secondaryValue: 20 },
  { month: 'Feb', value: 56, secondaryValue: 32 },
  // ... more data points
];
```

## Usage Example

```jsx
import { InteractiveGraph } from '@your-org/ui-components';

const MyPage = () => {
  // Custom data (optional)
  const salesData = [
    { month: 'Jan', value: 42, secondaryValue: 28 },
    { month: 'Feb', value: 53, secondaryValue: 32 },
    { month: 'Mar', value: 67, secondaryValue: 41 },
    // ... more data
  ];

  return (
    <div className="p-4 bg-slate-900">
      <InteractiveGraph 
        data={salesData}
        title="Sales Performance"
        subtitle="Current vs. Previous Year"
        mainLineColor="rgba(99, 102, 241, 0.8)"
        secondaryLineColor="rgba(244, 114, 182, 0.8)"
      />
    </div>
  );
};
```

## Animations

The graph includes several animations:
- Line drawing animation on initial render
- Gradient fade-in for the background areas
- Scale and fade-in effects for data points
- Smooth transitions when data changes
- Hover animations for interactive elements 