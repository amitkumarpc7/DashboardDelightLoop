# Dashboard Builder

A powerful no-code dashboard builder with real-time collaboration, dynamic layouts, custom widgets, and theme switching — all in the browser.

## 🚀 Features

### Component-Based Canvas System

- **Drag & Drop Interface**: Intuitive widget placement with visual feedback
- **Resizable Widgets**: 8-directional resize handles for precise sizing
- **Widget Registry**: Extensible system for adding new widget types
- **Schema-Driven Rendering**: Widgets render based on configuration schemas

### Real-Time Multiplayer Editing

- **WebRTC Collaboration**: Built with Yjs and WebRTC for real-time sync
- **User Presence**: See who's currently editing the dashboard
- **Conflict Resolution**: Automatic conflict resolution for concurrent edits
- **Offline Support**: Works offline with sync when connection returns

### State + Data Flow Management

- **Zustand Store**: Centralized state management with Immer for immutability
- **Undo/Redo**: Full history management with undo/redo capabilities
- **Data Fetching**: Configurable data sources with caching and error handling
- **Widget Data Binding**: Dynamic data binding for real-time updates

### Dynamic Theming

- **Theme Switching**: Light, Dark, and Custom theme modes
- **CSS Variables**: Theme-aware styling with CSS custom properties
- **Responsive Design**: Mobile-friendly interface with adaptive layouts

## 📦 Available Widgets

### 📊 Chart Widget

- Line, bar, and area chart support
- Configurable data sources
- Real-time data updates
- Customizable styling

### 📝 Text Widget

- Rich text formatting
- Configurable font sizes and weights
- Text alignment options
- Markdown support (planned)

### 🔢 Metric Widget

- Single value display
- Trend indicators (up/down/neutral)
- Unit display
- Color-coded trends

### 📋 Table Widget

- Sortable columns
- Pagination support
- Custom styling
- Export functionality

### 🖼️ Image Widget

- Multiple fit modes (cover, contain, fill, none)
- Error handling with fallback images
- Responsive sizing
- Alt text support

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **State Management**: Zustand + Immer
- **Real-time Collaboration**: Yjs + WebRTC
- **Build Tool**: Vite
- **Styling**: CSS with CSS Variables
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd DashboardBuilder
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

### Adding Widgets

1. **Drag & Drop**: Drag widgets from the left panel onto the canvas
2. **Click to Add**: Click on any widget in the panel to add it to the canvas
3. **Positioning**: Widgets are placed at the drop location or default position

### Editing Widgets

1. **Resize**: Hover over a widget to see resize handles, drag to resize
2. **Remove**: Hover over a widget and click the ✕ button in the header
3. **Configure**: Widget configuration is handled through the widget registry

### Collaboration

1. **Real-time Editing**: Multiple users can edit simultaneously
2. **User Presence**: See active collaborators in the right panel
3. **Automatic Sync**: Changes are automatically synchronized across users

### Themes

1. **Theme Selector**: Use the theme dropdown in the toolbar
2. **Light Mode**: Clean, professional appearance
3. **Dark Mode**: Easy on the eyes for extended use
4. **Custom Theme**: Amber/orange theme for variety

## 🏗️ Architecture

### Core Components

```
src/
├── components/          # React components
│   ├── DashboardCanvas.tsx    # Main canvas area
│   ├── WidgetRenderer.tsx     # Widget rendering engine
│   ├── WidgetPanel.tsx        # Widget selection panel
│   ├── Toolbar.tsx            # Top toolbar with controls
│   └── UserList.tsx           # Collaboration user list
├── context/            # React contexts
│   ├── ThemeContext.tsx       # Theme management
│   └── CollaborationContext.tsx # Real-time collaboration
├── hooks/              # Custom React hooks
│   ├── useYMap.ts             # Yjs shared data
│   ├── useWidgetData.ts       # Data fetching
│   └── useResize.ts           # Widget resizing
├── store/              # State management
│   └── dashboardStore.ts      # Zustand store
├── widgets/            # Widget implementations
│   ├── widgetRegistry.ts      # Widget registry
│   ├── ChartWidget.tsx        # Chart widget
│   ├── TextWidget.tsx         # Text widget
│   ├── MetricWidget.tsx       # Metric widget
│   ├── TableWidget.tsx        # Table widget
│   └── ImageWidget.tsx        # Image widget
└── types/              # TypeScript type definitions
    └── widget.ts              # Widget interfaces
```

### Data Flow

1. **Widget Selection**: User selects widget from panel
2. **Widget Creation**: Widget is added to store with default config
3. **Rendering**: WidgetRenderer renders widget based on type
4. **Data Fetching**: useWidgetData hook fetches data if configured
5. **Collaboration**: Changes are synced via Yjs
6. **Persistence**: Dashboard state is saved to store

## 🔧 Development

### Adding New Widgets

1. Create widget component in `src/widgets/`:

```typescript
import React from "react";

interface MyWidgetProps {
  config: {
    // Your widget config
  };
  data?: any;
  loading?: boolean;
  error?: string;
}

const MyWidget: React.FC<MyWidgetProps> = ({
  config,
  data,
  loading,
  error,
}) => {
  // Your widget implementation
  return <div>My Widget</div>;
};

export default MyWidget;
```

2. Register widget in `src/widgets/widgetRegistry.ts`:

```typescript
import MyWidget from "./MyWidget";

export const widgetDefinitions: Record<string, WidgetDefinition> = {
  // ... existing widgets
  myWidget: {
    type: "myWidget",
    name: "My Widget",
    description: "Description of my widget",
    icon: "🎯",
    defaultConfig: {
      // Default configuration
    },
    defaultLayout: {
      width: 300,
      height: 200,
    },
    component: MyWidget,
  },
};
```

### Custom Themes

Add new themes in `src/styles/canvas.css`:

```css
.theme-mytheme {
  --bg-primary: #your-color;
  --bg-secondary: #your-color;
  --text-primary: #your-color;
  --text-secondary: #your-color;
  --border-color: #your-color;
  --accent-color: #your-color;
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Yjs](https://github.com/yjs/yjs) for real-time collaboration
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [React](https://reactjs.org/) for the UI framework
- [Vite](https://vitejs.dev/) for the build tool

## 🐛 Known Issues

- WebRTC connections may require STUN/TURN servers for production
- Large dashboards may experience performance issues with many widgets
- Mobile drag-and-drop support is limited

## 🔮 Roadmap

- [ ] Advanced chart types (scatter, pie, radar)
- [ ] Custom CSS injection for widgets
- [ ] Widget templates and presets
- [ ] Export to PDF/PNG
- [ ] Dashboard sharing and embedding
- [ ] Advanced data connectors (APIs, databases)
- [ ] Widget animations and transitions
- [ ] Mobile app support
