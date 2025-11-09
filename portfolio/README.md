# Vidya Raut - Portfolio

A modern, responsive portfolio website built with React and Vite. This portfolio showcases my professional experience, skills, projects, and certifications with smooth animations and an Apple-inspired design aesthetic.

## Features

- **Modern React Architecture**: Built with React 18+ and Vite for fast development
- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations
- **Smooth Animations**: GSAP-powered scroll-triggered animations
- **Reusable Components**: Card-based architecture with CSS Modules
- **Performance Optimized**: Code splitting, lazy loading, efficient animations
- **Accessibility Focused**: Semantic HTML, ARIA attributes, keyboard navigation
- **Clean Code**: ESLint and Prettier configured for code consistency

## Tech Stack

- **Frontend**: React 18.2+, Vite 4.4+
- **Styling**: CSS Modules, CSS Variables, Responsive Design
- **Animations**: GSAP 3.12+ with ScrollTrigger
- **Icons**: Custom SVG Icons
- **Build Tool**: Vite
- **Linting**: ESLint, Prettier

## Project Structure

```
portfolio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Card/
│   │   ├── Hero/
│   │   ├── Navigation/
│   │   └── Footer/
│   ├── sections/            # Page sections
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Education.jsx
│   │   ├── Projects.jsx
│   │   ├── Certifications.jsx
│   │   └── Contact.jsx
│   ├── styles/              # Global styles
│   │   ├── variables.css    # CSS custom properties
│   │   ├── global.css       # Reset & base styles
│   │   ├── animations.css
│   │   └── card-layouts.css # Card grid layouts
│   ├── hooks/               # Custom React hooks
│   │   ├── useScrollAnimation.js
│   │   └── useIntersectionObserver.js
│   ├── utils/               # Utilities
│   │   ├── constants.js
│   │   └── animations.js
│   ├── data/                # Content data (JSON/JS)
│   │   ├── experience.js
│   │   ├── education.js
│   │   ├── skills.js
│   │   ├── projects.js
│   │   └── certifications.js
│   ├── App.jsx
│   └── main.jsx
├── public/                  # Static assets
├── package.json
├── vite.config.js
├── .eslintrc.json
└── .prettierrc
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues
- `npm run format` - Format code with Prettier

## Development

The project uses a component-based architecture with clear separation of concerns:

- **Data** is separated from UI components
- **CSS Variables** provide consistent theming
- **CSS Modules** ensure scoped styling without conflicts
- **Custom Hooks** encapsulate reusable logic
- **Reusable Card Component** eliminates CSS duplication

## Browser Support

The application is tested on modern browsers including Chrome, Firefox, Safari, and Edge.

## Performance

- Production build optimized with code splitting
- GSAP animations for smooth 60fps transitions
- Efficient memory usage with proper cleanup
- Tree-shaking for smaller bundle sizes

## Deployment

The application is optimized for deployment to static hosting services like Vercel, Netlify, or GitHub Pages.

## License

This project is open source and available under the MIT License.