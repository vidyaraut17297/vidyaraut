# 🚀 Vidya Raut - Portfolio

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-FF6B35?style=for-the-badge)](https://openrouter.ai/)

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-FF6B35?style=for-the-badge&logo=firefox)](https://vidyaraut.vercel.app)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-222222?style=for-the-badge&logo=github)](https://vidyaraut17297.github.io/vidyaraut/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/vidyaraut17)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/vidyaraut17297)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail)](mailto:vidyaraut17297@gmail.com)

> **M.Tech in Energy Technology | Market Analyst | Energy Storage & Power Markets**
> *Physics (MSc) | B.Ed (Science & Maths) | 2+ Years Energy Sector Experience*

A modern, responsive portfolio website showcasing professional expertise in energy markets, battery R&D, and data analysis. Features an AI-powered chatbot and Apple-inspired design aesthetics.

## ✨ Features

### 🎨 **Modern UI/UX**
- **Apple-Inspired Design**: Clean, minimalist interface with smooth transitions
- **Responsive Design**: Mobile-first approach supporting all device sizes
- **Dark/Light Mode Ready**: CSS Variables for easy theme switching
- **Accessibility First**: WCAG compliant with semantic HTML and ARIA attributes

### 🤖 **AI-Powered Chatbot**
- **OpenRouter Integration**: Multiple AI models with intelligent fallbacks
- **Real-time Responses**: Live AI conversations about expertise and general topics
- **Smart Pattern Matching**: Intelligent responses when AI is unavailable
- **System Status Monitoring**: Live backend and AI service status indicators
- **Rate Limiting**: Built-in protection against abuse

### 📊 **Portfolio Sections**
- **🏠 About**: Professional summary and value proposition
- **💼 Experience**: 2+ years in energy sector (Customized Energy Solutions)
- **🎓 Education**: M.Tech (in progress), B.Ed, MSc Physics, BSc Physics
- **🔬 Projects**: Battery R&D and physics research projects
- **📜 Certifications**: MS-CIT, NCC Cadet, MHMEE-2020 Conference
- **⚡ Skills**: Excel (Advanced), Battery Management, Laboratory Safety
- **🌱 Energy Insights**: Market analysis and industry expertise
- **🎯 Fun Crossword**: Interactive puzzle showcasing technical knowledge

### ⚡ **Performance & Technical**
- **CSS Card Borders**: Red theme (#ef4444, #dc2626, #fca5a5) implemented
- **Deployment**: Automated deployment to both Vercel and GitHub Pages
- **AI Chat**: OpenRouter API integration with fallback models
- **Responsive**: Mobile-first design with dark/light theme toggle
- **Performance**: Optimized bundles with Vite build system
- **Lightning Fast**: Vite-powered build with code splitting and tree-shaking
- **Optimized Bundle**: Efficient chunking and lazy loading
- **SEO Ready**: Meta tags and structured data
- **PWA Ready**: Service worker and manifest ready

## 🛠️ Tech Stack

### **Frontend**
```json
{
  "React": "18.2.0",
  "Vite": "7.1.7",
  "Lucide React": "0.553.0",
  "CSS Modules": "Latest",
  "ESLint": "9.39.1",
  "Prettier": "3.6.2"
}
```

### **Backend**
```json
{
  "Node.js": ">=22.0.0",
  "Express.js": "4.18.2",
  "OpenRouter AI": "Latest",
  "CORS": "2.8.5",
  "Express Rate Limit": "7.0.0",
  "Redis": "4.6.7 (optional)"
}
```

### **Deployment**
- **🚀 Vercel**: Recommended for full-stack deployment
- **📄 GitHub Pages**: Static frontend deployment option
- **🔄 CI/CD**: Automated builds and deployments

## 📁 Project Structure

```
vidyaraut/
├── 📁 src/                          # React frontend source
│   ├── 📁 components/               # Reusable UI components
│   │   ├── AIChatbot/              # AI-powered chat widget
│   │   │   ├── AIChatbot.jsx       # Main chatbot component
│   │   │   └── AIChatbot.module.css # Chatbot styles
│   │   ├── Card.jsx                # Unified card component (red borders)
│   │   ├── ErrorBoundary/          # Error boundary component
│   │   ├── Footer/                 # Site footer
│   │   ├── Hero/                   # Landing section
│   │   ├── MarketVisualization/    # Market data visualization
│   │   ├── Navigation/             # Responsive navbar
│   │   ├── SkillIcons/             # Skill icon components
│   │   └── ThemeToggle/            # Dark/light mode toggle
│   ├── 📁 sections/                # Portfolio sections
│   │   ├── About.jsx               # Professional summary
│   │   ├── Certifications.jsx      # Professional certifications
│   │   ├── Contact.jsx             # Contact information
│   │   ├── Education.jsx           # Academic background
│   │   ├── EnergyInsights.jsx      # Market analysis
│   │   ├── Experience.jsx          # Work experience
│   │   ├── FunCrossword.jsx        # Interactive puzzle
│   │   ├── Projects.jsx            # Research projects
│   │   └── Skills.jsx              # Technical skills
│   ├── 📁 styles/                  # Global styles (red theme)
│   │   ├── animations.css          # GSAP animations
│   │   ├── global.css              # Reset & base styles
│   │   ├── gradients.css           # Background gradients
│   │   ├── mobile-friendly.css     # Mobile optimizations
│   │   └── variables.css           # CSS custom properties
│   ├── 📁 hooks/                   # Custom React hooks
│   │   ├── useIntersectionObserver.js # Intersection observer
│   │   └── useScrollAnimation.js   # Scroll animations
│   ├── 📁 utils/                   # Utilities & constants
│   │   ├── animations.js           # Animation utilities
│   │   ├── chatApi.js              # Chat API client
│   │   ├── constants.js            # App constants
│   │   └── icons.js                # Icon definitions
│   ├── 📁 data/                    # Static content data
│   │   ├── certifications.js       # Certification data
│   │   ├── education.js            # Education data
│   │   ├── experience.js           # Experience data
│   │   ├── projects.js             # Project data
│   │   └── skills.js               # Skills data
│   ├── App.jsx                     # Main app component
│   └── main.jsx                    # React entry point
├── 📁 backend/                     # Express.js API server
│   ├── 📁 middleware/              # Custom middleware
│   │   └── ratelimit.js            # Rate limiting middleware
│   ├── 📁 routes/                  # API routes
│   │   └── chat.js                 # Chat endpoints
│   ├── server.js                   # Express server setup
│   ├── .env                        # Backend environment vars
│   └── package.json                # Backend dependencies
├── 📁 public/                      # Static assets
│   ├── _redirects                  # Netlify/Vercel redirects
│   ├── .nojekyll                  # GitHub Pages config
│   ├── 404.html                   # 404 error page
│   ├── home picture.jpeg          # Hero image
│   ├── logo.png                   # Site logo
│   ├── Vidya Raut Resume.docx     # Resume document
│   └── vite.svg                   # Vite logo
├── 📁 api/                        # Vercel serverless functions
│   ├── chat.js                    # Chat API endpoint
│   └── health.js                  # Health check endpoint
├── 📁 assets/                     # Build assets (auto-generated)
├── 📁 .github/workflows/          # GitHub Actions
│   └── deploy.yml                 # GitHub Pages deployment
├── 📁 dist/                       # Build output (auto-generated)
├── .env                           # Frontend environment vars
├── .gitignore                     # Git ignore rules
├── README.md                      # Project documentation
├── deploy.sh                      # Deployment script
├── eslint.config.js              # ESLint configuration
├── package.json                   # Frontend dependencies
├── package-lock.json              # Lock file
├── vercel.json                    # Vercel deployment config
├── vite.config.js                 # Vite configuration
└── vite.svg                       # Vite logo
```

## 🎨 Customization

### Card Border Colors (Red Theme)
The project uses a red color scheme for all card borders:
- **Primary Red**: `#ef4444` (light theme)
- **Dark Red**: `#dc2626` (dark theme)
- **Light Red**: `#fca5a5` (accents)

To customize colors, update `src/styles/variables.css`:
```css
:root {
  --color-primary: #ef4444;      /* Change main red */
  --color-primary-dark: #dc2626; /* Change dark red */
  --color-primary-light: #fca5a5; /* Change light red */
}
```

### Base URL Configuration
Set `VITE_BASE_URL` in `.env`:
- Local dev: `VITE_BASE_URL=/`
- Vercel: `VITE_BASE_URL=/`
- GitHub Pages: `VITE_BASE_URL=/vidyaraut/`

### Content
Edit content in `src/utils/constants.js` and section components.

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start frontend dev server (port 5173)
npm run dev:full         # Start both frontend and backend servers

# Building
npm run build            # Production build for Vercel
npm run build:vercel     # Build for Vercel deployment
npm run build:github     # Build for GitHub Pages deployment

# Quality Assurance
npm run lint             # Run ESLint code quality checks
npm run format           # Format code with Prettier

# Preview & Deployment
npm run preview          # Preview production build locally
npm run start:full       # Start production servers (frontend + backend)

# Deployment Scripts
./deploy.sh vercel       # Deploy to Vercel
./deploy.sh github       # Deploy to GitHub Pages
./deploy.sh both         # Deploy to both platforms
```

## 🌐 Live Demo

- **Vercel**: [https://vidyaraut.vercel.app](https://vidyaraut.vercel.app)
- **GitHub Pages**: [https://vidyaraut17297.github.io/vidyaraut](https://vidyaraut17297.github.io/vidyaraut)

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
- **Node.js** (>=16.0.0) - [Download here](https://nodejs.org/)
- **npm** (>=8.0.0) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### Optional (for enhanced development):
- **Redis** (for production caching) - [Download here](https://redis.io/download)

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/vidyaraut17297/vidyaraut.git
cd vidyaraut
npm install
```

### 2. API Setup (Required for AI Chatbot)
```bash
# Get your FREE API key from OpenRouter
# Visit: https://openrouter.ai/keys
# Edit backend/.env and replace:
OPENROUTER_API_KEY=your-actual-api-key-here
```

### 3. Development
```bash
# Start both frontend & backend
npm run dev:full

# Or run separately:
npm run dev              # Frontend only (port 3000)
cd backend && npm run dev # Backend only (port 5001)
```

### 4. Open Browser
Navigate to: **http://localhost:3000**

## 🔑 API Configuration

### OpenRouter AI Setup
1. **Sign up** at [OpenRouter.ai](https://openrouter.ai/)
2. **Create API Key** in your dashboard
3. **Add to backend/.env**:
   ```bash
   OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx
   ```
4. **Test the chatbot** - it will use AI responses when available

### Without API Key
- The chatbot still works with intelligent pattern-based responses
- All portfolio information is available offline
- AI features activate once you add the API key

## 🧪 Testing

```bash
# Run linting
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Configuration

### Frontend Environment Variables

The frontend uses the following environment variables (configured via `VITE_` prefix):

- `VITE_API_URL` - Backend API URL (default: `http://localhost:5001`)
- `VITE_DEBUG` - Enable debug mode (default: `false`)
- `VITE_DEFAULT_THEME` - Default theme (default: `light`)

### Backend Environment Variables

The backend uses the following environment variables (see `backend/.env`):

**Required:**
- `OPENROUTER_API_KEY` - Your OpenRouter API key from https://openrouter.ai/keys
- `PORT` - Server port (default: `5001`)

**For Production:**
- `VERCEL_URL` - Vercel deployment URL (auto-set in production)
- `FRONTEND_URL` - Frontend deployment URL for CORS

**Optional:**
- `AI_MODEL_PRIMARY` - Primary AI model (default: `minimax/minimax-m2:free`)
- `RATE_LIMIT_WINDOW_MS` - Rate limiting window (default: `900000`)
- `REDIS_URL` - Redis connection for caching

## Available Scripts

- `npm run dev` - Start the frontend development server
- `npm run dev:full` - Start both frontend and backend servers
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
- Efficient memory usage with proper cleanup
- Tree-shaking for smaller bundle sizes

## Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**:
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "New Project" and import your GitHub repository

2. **Configure Build Settings**:
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

3. **Set Environment Variables**:
   In Vercel dashboard → Project Settings → Environment Variables:
   ```
   OPENROUTER_API_KEY=your-actual-api-key
   VITE_API_URL=https://your-project-name.vercel.app
   ```

4. **Deploy**: Click "Deploy" - Vercel will handle the rest!

#### Troubleshooting Vercel 404 Errors

If you encounter `NOT_FOUND` errors after deployment:

**✅ Check API Routes:**
- Ensure `api/chat.js` and `api/health.js` exist in the `api/` directory
- Verify the Vercel configuration includes serverless functions

**✅ Verify Environment Variables:**
- Make sure `OPENROUTER_API_KEY` is set in Vercel dashboard
- Check that `VITE_API_URL` points to your Vercel domain

**✅ Test API Endpoints:**
- Visit `https://your-app.vercel.app/api/health` to test health check
- Use browser dev tools to check API calls in Network tab

**✅ Redeploy if Needed:**
- Push changes to trigger automatic redeployment
- Or manually redeploy from Vercel dashboard

### GitHub Pages Deployment

1. **Build for GitHub Pages**:
   ```bash
   # Set environment variable for GitHub Pages build
   export GITHUB_PAGES=true

   # Build the project
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   - Push the `dist` folder to your `gh-pages` branch
   - Or use GitHub Actions for automated deployment

3. **Configure API Proxy**:
   - GitHub Pages serves static files only
   - API calls should proxy to your Vercel backend
   - Update `VITE_API_URL` in production to point to Vercel

### Environment Variables for Production

**For Vercel**:
- Set all backend environment variables in Vercel dashboard
- Frontend variables are automatically available via `VITE_` prefix

**For GitHub Pages**:
- Frontend builds with `GITHUB_PAGES=true` for correct base path
- API calls route through Vercel backend for CORS and functionality

### Deployment Checklist

- [ ] Environment variables configured
- [ ] API keys set in production
- [ ] CORS origins updated for deployment URLs
- [ ] Build tested locally with `npm run build`
- [ ] Preview deployment with `npm run preview`

## 🔧 Troubleshooting

### Common Issues

**❌ "Command not found" errors**
```bash
# Ensure Node.js and npm are installed
node --version  # Should show v16+
npm --version   # Should show 8+
```

**❌ Port already in use**
```bash
# Kill process using port 3000 or 5001
npx kill-port 3000 5001

# Or change ports in configuration
```

**❌ AI Chatbot not responding**
- Check `backend/.env` has valid `OPENROUTER_API_KEY`
- Verify API key hasn't expired
- Check network connectivity
- Fallback pattern responses will work without API key

**❌ Build fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for syntax errors
npm run lint
```

**❌ CORS errors in production**
- Update `FRONTEND_URL` in backend environment variables
- Ensure Vercel environment variables are set correctly

### Debug Mode
```bash
# Enable debug logging
VITE_DEBUG=true npm run dev
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### 1. Fork & Clone
```bash
git clone https://github.com/your-username/vidyaraut.git
cd vidyaraut
```

### 2. Create Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Development Workflow
```bash
npm install
npm run dev:full  # Test your changes
npm run lint      # Ensure code quality
npm run format    # Format your code
npm run build     # Verify production build
```

### 4. Commit & Push
```bash
git add .
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
```

### 5. Create Pull Request
- Go to GitHub and create a Pull Request
- Describe your changes and reference any issues
- Wait for review and approval

### Guidelines
- **Code Style**: Follow ESLint and Prettier configurations
- **Commits**: Use conventional commit format
- **Tests**: Ensure all existing functionality works
- **Documentation**: Update README for new features
- **Security**: Never commit API keys or sensitive data

## 📊 Project Stats

[![GitHub stars](https://img.shields.io/github/stars/vidyaraut17297/vidyaraut?style=social)](https://github.com/vidyaraut17297/vidyaraut)
[![GitHub forks](https://img.shields.io/github/forks/vidyaraut17297/vidyaraut?style=social)](https://github.com/vidyaraut17297/vidyaraut)
[![GitHub issues](https://img.shields.io/github/issues/vidyaraut17297/vidyaraut)](https://github.com/vidyaraut17297/vidyaraut/issues)
[![GitHub PRs](https://img.shields.io/github/issues-pr/vidyaraut17297/vidyaraut)](https://github.com/vidyaraut17297/vidyaraut/pulls)

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the lightning-fast build tool
- **OpenRouter** for AI API access
- **Vercel** for seamless deployment
- **Lucide** for beautiful icons

## 📞 Support

Need help? Reach out:

- **📧 Email**: vidyaraut17297@gmail.com
- **💼 LinkedIn**: [Vidya Raut](https://www.linkedin.com/in/vidyaraut17)
- **🐛 Issues**: [GitHub Issues](https://github.com/vidyaraut17297/vidyaraut/issues)
- **💬 Portfolio**: [Live Demo](https://vidyaraut17297.github.io/vidyaraut/)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by [Vidya Raut](https://github.com/vidyaraut17297)**

⭐ **Star this repo if you found it helpful!**

[⬆️ Back to Top](#-vidya-raut---portfolio)

</div>
