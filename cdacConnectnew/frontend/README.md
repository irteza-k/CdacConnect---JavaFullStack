# CDAC Connect Frontend

A modern React frontend for the CDAC Connect skill sharing platform, built with Vite and Bootstrap 5.

## Features

- ⚡ **Fast Development** - Vite for lightning-fast hot module replacement
- 📱 **Responsive Design** - Mobile-first approach with Bootstrap 5
- 🎨 **Modern UI** - Custom CSS with gradients, shadows, and smooth transitions
- 🔧 **TypeScript Ready** - Configured for TypeScript development
- 🚀 **Production Optimized** - Optimized builds with Vite

## Tech Stack

- **React 18** - Latest React with hooks and concurrent features
- **Vite** - Next-generation frontend tooling
- **Bootstrap 5** - Responsive CSS framework
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── LoginForm.jsx
│   │   ├── MentorRegistrationForm.jsx
│   │   ├── StudentRegistrationForm.jsx
│   │   ├── StudentHomePage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── MeetingSchedulePage.jsx
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

## Responsive Design

The application is built with a mobile-first approach and includes:

- **Breakpoints**: xs (<576px), sm (≥576px), md (≥768px), lg (≥992px), xl (≥1200px)
- **Flexible Grid**: Bootstrap's responsive grid system
- **Touch-Friendly**: Optimized for mobile devices
- **Custom CSS**: Enhanced styling with CSS custom properties

## API Integration

The frontend communicates with the Spring Boot backend via:

- **Base URL**: `http://localhost:8080`
- **Proxy**: Configured in `vite.config.js` for development
- **Endpoints**: 
  - `/api/students` - Student management
  - `/api/mentors` - Mentor management
  - `/api/meetings` - Meeting scheduling
  - `/api/connections` - Student-mentor connections

## Custom Styling

The application uses a comprehensive CSS system with:

- **CSS Custom Properties**: Consistent theming
- **Gradients**: Modern visual effects
- **Shadows**: Depth and elevation
- **Transitions**: Smooth animations
- **Typography**: Responsive text scaling

## Development Tips

1. **Hot Reload**: Vite provides instant hot module replacement
2. **Fast Builds**: Vite's esbuild-based bundling is extremely fast
3. **TypeScript**: Ready for TypeScript migration
4. **ESLint**: Configured for code quality
5. **Proxy**: API calls are proxied to the backend during development

## Production Build

To build for production:

```bash
npm run build
```

The build output will be in the `dist/` directory, optimized for production deployment.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style
2. Use meaningful commit messages
3. Test on multiple screen sizes
4. Ensure accessibility compliance

## License

This project is part of the CDAC Connect platform. 