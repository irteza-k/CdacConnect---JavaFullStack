# CDAC Connect - Styling Guide

## 1. Styling Framework
The project uses Bootstrap as the main styling framework with custom CSS for specific needs.

### Bootstrap Integration
```javascript
// In App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
```

## 2. Styling Components

### Layout Classes
```jsx
<div className="container">
<div className="row">
<div className="col-md-6">
```

### Component Classes
```jsx
<div className="card">
<div className="navbar">
<div className="modal">
```

### Utility Classes
```jsx
<div className="d-flex">
<div className="text-center">
<div className="mb-3">
```

### Icon Classes
```jsx
<i className="bi bi-person-fill">
<i className="bi bi-house-fill">
```

## 3. Responsive Design
- Mobile-first approach
- Bootstrap breakpoints
- Responsive utilities

### Responsive Classes
```jsx
// Hide on mobile, show on medium screens
<div className="d-none d-md-block">

// Different column sizes for different screens
<div className="col-md-6 col-lg-4">

// Show inline on small screens
<div className="d-sm-inline">
```

## 4. Component Styling

### StudentHomePage
- Bootstrap classes for layout
- Custom component styling
- Responsive grid system

### MentorHomePage
- Custom CSS file
- Bootstrap integration
- Responsive design

### ProfilePage
- Bootstrap components
- Custom styling
- Form layouts

## 5. Interactive Elements

### Buttons
```jsx
<button className="btn btn-primary">
<button className="btn btn-outline-light">
```

### Forms
```jsx
<input className="form-control">
<select className="form-select">
```

## 6. Status Indicators

### Alerts
```jsx
<div className="alert alert-success">
<div className="alert alert-danger">
```

### Badges
```jsx
<span className="badge bg-primary">
<span className="badge bg-success">
```

## 7. Custom Styling Features

### Hover Effects
```css
.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
```

### Custom Features
- Custom colors
- Custom spacing
- Responsive adjustments
- Animation effects

## 8. Not Used
The project does NOT use:
- Tailwind CSS
- Styled Components
- CSS Modules
- CSS-in-JS solutions

## 9. Benefits of Current Approach
- Consistent design
- Easy maintenance
- Good performance
- Responsive design
- Rich component library
- Extensive documentation
- Community support

## 10. File Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── MentorHomePage.css
│   │   └── [other component files]
│   ├── index.css
│   └── App.jsx
```

## 11. Best Practices
1. Use Bootstrap classes when possible
2. Custom CSS for specific needs
3. Mobile-first approach
4. Consistent naming conventions
5. Modular component styling
6. Responsive design patterns 