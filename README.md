# Vidya Raut Portfolio

A modern, responsive portfolio website built with React, Vite, and Node.js backend.

## 🌐 Live Demo

- **Vercel**: [https://vidyaraut.vercel.app](https://vidyaraut.vercel.app)
- **GitHub Pages**: [https://vidyaraut17297.github.io/vidyaraut](https://vidyaraut17297.github.io/vidyaraut)

## 📊 Project Status

- ✅ **CSS Card Borders**: Red theme (#ef4444, #dc2626, #fca5a5) implemented
- ✅ **Deployment**: Automated deployment to both Vercel and GitHub Pages
- ✅ **AI Chat**: OpenRouter API integration with fallback models
- ✅ **Responsive**: Mobile-first design with dark/light theme toggle
- ✅ **Performance**: Optimized bundles with Vite build system

## 🚀 Features

- **Responsive Design**: Works perfectly on all devices (mobile, tablet, desktop)
- **Dark/Light Theme Toggle**: Automatic theme switching with system preference detection
- **AI Chat Integration**: Interactive chatbot powered by OpenRouter API with multiple model fallbacks
- **Smooth Animations**: CSS animations and transitions with GSAP integration
- **SEO Optimized**: Meta tags, structured data, and performance optimizations
- **Fast Performance**: Optimized Vite bundles with code splitting and lazy loading
- **Progressive Web App**: Installable with offline capabilities
- **Accessibility**: WCAG compliant with proper focus management and screen reader support

## 🛠️ Tech Stack

### Frontend
- **React**: 18.2.0 - Modern React with hooks and concurrent features
- **Vite**: 7.1.7 - Fast build tool and development server
- **CSS Modules**: Scoped styling with CSS variables
- **Lucide React**: 0.553.0 - Beautiful icon library

### Backend
- **Node.js**: 22.x (LTS) - Runtime environment
- **Express**: RESTful API server
- **OpenRouter API**: AI model integration with multiple providers

### Development Tools
- **ESLint**: 9.39.1 - Code linting and quality assurance
- **Prettier**: 3.6.2 - Code formatting
- **Vitest**: Testing framework (optional)
- **TypeScript**: Type definitions for React

## 📦 Installation

### Prerequisites
- **Node.js**: 22.x (LTS) - [Download here](https://nodejs.org/)
- **Git**: Latest version - [Download here](https://git-scm.com/)

### Setup Steps

1. **Clone the repository**:
```bash
git clone https://github.com/vidyaraut17297/vidyaraut.git
cd vidyaraut
```

2. **Install dependencies**:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

3. **Create environment files**:
```bash
# .env (root) - Frontend environment
VITE_BASE_URL=/

# backend/.env - Backend environment
OPENROUTER_API_KEY=your_api_key_here
PORT=5001
```

4. **Get OpenRouter API Key**:
   - Visit [OpenRouter.ai/keys](https://openrouter.ai/keys)
   - Sign up for a free account
   - Generate an API key
   - Add it to `backend/.env`

5. **Start development servers**:
```bash
# Start both frontend and backend together
npm run dev:full

# Or start individually:
# Frontend only: npm run dev (port 5173)
# Backend only: cd backend && npm run dev (port 5001)
```

## 🚀 Deployment

### Automated Deployment (Recommended)

The project deploys automatically via GitHub Actions when you push to the `main` branch:

#### Vercel Deployment
- **Status**: Automatic deployment on push to `main`
- **URL**: [vidyaraut.vercel.app](https://vidyaraut.vercel.app)
- **Configuration**: `vercel.json` handles automatic setup

#### GitHub Pages Deployment
- **Status**: Automatic deployment via GitHub Actions
- **URL**: [vidyaraut17297.github.io/vidyaraut](https://vidyaraut17297.github.io/vidyaraut)
- **Workflow**: `.github/workflows/deploy.yml`

### Manual Deployment Options

#### Using Deployment Script
```bash
# Deploy to Vercel only
./deploy.sh vercel

# Deploy to GitHub Pages only
./deploy.sh github

# Deploy to both platforms
./deploy.sh both
```

#### Manual Vercel Deployment
```bash
# Build for Vercel
npm run build:vercel

# Then deploy via Vercel CLI or dashboard
```

#### Manual GitHub Pages Deployment
```bash
# Build for GitHub Pages
npm run build:github

# Push to main branch to trigger GitHub Actions
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Environment Variables Setup

#### For Vercel:
1. Go to Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add: `OPENROUTER_API_KEY`

#### For GitHub Pages:
1. Go to GitHub repository Settings → Secrets and variables → Actions
2. Add: `OPENROUTER_API_KEY` as a repository secret

## 📁 Project Structure

```
vidyaraut/
├── src/                    # React frontend source
│   ├── components/         # Reusable UI components
│   ├── sections/          # Page sections
│   ├── styles/            # CSS files and variables
│   └── utils/             # Helper functions
├── backend/               # Node.js backend
│   ├── routes/           # API routes
│   └── middleware/       # Custom middleware
├── public/               # Static assets
├── dist/                 # Build output (auto-generated)
├── vercel.json          # Vercel deployment config
└── .github/workflows/   # GitHub Actions
```

## 🎨 Customization

### Base URL Configuration
Set `VITE_BASE_URL` in `.env`:
- Local dev: `VITE_BASE_URL=/`
- Vercel: `VITE_BASE_URL=/`
- GitHub Pages: `VITE_BASE_URL=/vidyaraut/`

### Theme Colors
Update `src/styles/variables.css` to customize colors.

### Content
Edit content in `src/utils/constants.js` and section components.

## 🔧 Development Scripts

```bash
npm run dev          # Start frontend dev server
npm run dev:full     # Start both frontend and backend
npm run build        # Production build
npm run build:vercel # Build for Vercel
npm run build:github # Build for GitHub Pages
npm run preview      # Preview production build
npm run lint         # Run ESLint
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
