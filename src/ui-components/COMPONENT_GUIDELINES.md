# UI Component Guidelines

This document outlines the standards and best practices for creating new UI components in this library. Following these guidelines ensures consistency across all components and makes integration seamless.

## Component Structure

### File Organization

```
src/ui-components/
├── your-component-name/
│   ├── index.js           // Simple export file
│   └── YourComponentName.js  // Main component implementation
```

### Export Pattern

Always use the following pattern in your component's `index.js`:

```js
export { default } from './YourComponentName';
```

And add your component to the main `src/ui-components/index.js`:

```js
export { default as YourComponentName } from './your-component-name/YourComponentName';
```

## Design Principles

### Aesthetics

1. **Glass/Neomorphism**: Use backdrop-blur, subtle gradients, and semi-transparent backgrounds.
2. **Rounded Corners**: Consistently use rounded corners (generally `rounded-lg` or `rounded-xl`).
3. **Subtle Shadows**: Implement layered shadows for depth (`shadow-lg`, custom shadows).
4. **Color Palette**: Use gradients that match the app's theme (blues, purples, slates).

### Animation Standards

1. **Hover Effects**: 
   - Scale transforms: `transform: scale(1.05)`
   - Subtle elevation: `transform: translateY(-2px)`
   - Shadow expansion: `hover:shadow-xl`
   - Timing: 300ms duration with ease-out timing

2. **Transitions**:
   - Use consistent duration: `transition-all duration-300`
   - Prefer ease-out for natural movement: `ease-out`
   - Chain transitions for complex effects

3. **Motion Standards**:
   - Keep animations subtle and purposeful
   - Avoid animations that might cause motion sickness
   - Add `prefers-reduced-motion` media query support

### CSS Structure

Use Tailwind CSS for styling with the following pattern:

```jsx
<div 
  className="base-styles responsive-styles state-specific-styles"
  style={{
    // Only for dynamic styles that can't be handled by Tailwind
  }}
>
```

## Animation Examples

### Subtle Pulse Animation

```jsx
<style jsx>{`
  @keyframes pulse-subtle {
    0% { opacity: 0.7; }
    50% { opacity: 0.9; }
    100% { opacity: 0.7; }
  }
  .animate-pulse-subtle {
    animation: pulse-subtle 3s infinite;
  }
`}</style>
```

### Hover Magnification

```jsx
<div 
  className="transition-transform duration-300"
  style={{
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
  }}
>
```

### Content Transition

```jsx
<div 
  className={`transition-all duration-500 ${
    isActive 
      ? 'opacity-100 transform translate-y-0' 
      : 'opacity-0 absolute -z-10 transform translate-y-4'
  }`}
>
```

## Integration with App.js

After creating your component, add it to `App.js`:

1. Import your component at the top:
   ```js
   import { YourComponentName } from './ui-components';
   ```

2. Add it to the UI_COMPONENTS array:
   ```js
   {
     id: 'your-component-name',
     name: 'Your Component Name',
     description: 'Brief description of your component',
     component: YourComponentName,
   }
   ```

3. Update the UI components documentation file:
   ```
   your-component-name
     • Brief description highlighting key features
   ```

## Update README.md

After creating and integrating your component, make sure to update the main README.md file:

1. Add your component to the "Featured Components" section:
   ```md
   ### X. Your Component Name
   Brief, compelling description of your component highlighting its unique features and use cases.
   ```

2. Update the usage example if your component should be showcased:
   ```jsx
   import { 
     // ... existing components, 
     YourComponentName 
   } from '@your-org/ui-components';

   // In your example code
   <YourComponentName yourProp={yourValue} />
   ```

3. Ensure any special usage instructions or requirements are documented in the README if needed.

## Best Practices

1. **Responsiveness**: Ensure all components work on different screen sizes
2. **Performance**: Optimize animations using transform and opacity
3. **Accessibility**: Add appropriate ARIA attributes
4. **Code Cleanliness**: Use meaningful variable names and add comments
5. **State Management**: Keep state logic clean and maintainable

## Examples

See existing components for implementation examples:
- AnimatedDock - For hover effects and animations
- ParallaxStoryCards - For layering and motion effects
- ModernTabCards - For transition animations and tab interfaces 