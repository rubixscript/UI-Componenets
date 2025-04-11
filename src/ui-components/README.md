# UI Components Library

A collection of modern, aesthetic React components with subtle animations and interactive elements.

## Adding a New Component

### Step 1: Create Component Files

1. Create a new directory in `src/ui-components/` with your component name:
   ```
   src/ui-components/your-component-name/
   ```

2. Create two files inside this directory:
   - `YourComponentName.js` - Main component implementation
   - `index.js` - Export file (simply exports your component)

   You can copy the `ComponentTemplate.js` as a starting point and rename it.

### Step 2: Implement Your Component

Follow these guidelines when building your component:

- Use modern glass/neomorphic design elements
- Implement subtle animations and transitions
- Follow the aesthetic principles in COMPONENT_GUIDELINES.md
- Ensure responsive design for all screen sizes

### Step 3: Update Export Files

1. In your component's `index.js`, export your component:
   ```js
   export { default } from './YourComponentName';
   ```

2. Add your component to the main export file (`src/ui-components/index.js`):
   ```js
   export { default as YourComponentName } from './your-component-name/YourComponentName';
   ```

### Step 4: Update App.js

Add your component to the `UI_COMPONENTS` array in `App.js`:

```js
{
  id: 'your-component-name',
  name: 'Your Component Name',
  description: 'Brief description of your component',
  component: YourComponentName,
}
```

### Step 5: Update Documentation

Add your component to the UI components list file:

```
your-component-name
  • Brief description highlighting key features
```

## Component Guidelines

For detailed styling and animation guidelines, see [COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md).

## Available Components

- **AnimatedDock**: A macOS-inspired dock with smooth magnification and bounce effects
- **ParallaxStoryCards**: Multi-layered cards with elements that move at different speeds
- **ParallaxTestimonials**: Beautiful testimonial cards with dynamic parallax effects
- **ModernTabCards**: Aesthetic tab interface with smooth animations and transitions 