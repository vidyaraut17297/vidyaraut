#!/bin/bash

# Deployment script for multiple platforms
# Usage: ./deploy.sh [vercel|github]

PLATFORM=${1:-vercel}

echo "🚀 Deploying Vidya Raut Portfolio to $PLATFORM"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

case $PLATFORM in
    "vercel")
        echo -e "${YELLOW}📦 Building for Vercel...${NC}"
        npm run build:vercel

        echo -e "${GREEN}✅ Build complete!${NC}"
        echo -e "${YELLOW}🌐 Deploy to Vercel:${NC}"
        echo "1. Push to your Git repository"
        echo "2. Connect your repo to Vercel (vercel.com)"
        echo "3. Vercel will auto-deploy using the vercel.json config"
        echo "4. Your site will be available at: https://your-project.vercel.app"
        ;;

    "github")
        echo -e "${YELLOW}📦 Building for GitHub Pages...${NC}"
        npm run build:github

        echo -e "${GREEN}✅ Build complete!${NC}"
        echo -e "${YELLOW}🌐 Deploy to GitHub Pages:${NC}"
        echo "1. Push the dist/ folder to gh-pages branch OR"
        echo "2. Use GitHub Actions (automatically deploys on push to main)"
        echo "3. Your site will be available at: https://yourusername.github.io/vidyaraut"
        ;;

    "both")
        echo -e "${YELLOW}📦 Building for both platforms...${NC}"

        echo "Building for Vercel..."
        npm run build:vercel
        mkdir -p deploy/vercel
        cp -r dist/* deploy/vercel/

        echo "Building for GitHub Pages..."
        npm run build:github
        mkdir -p deploy/github
        cp -r dist/* deploy/github/

        echo -e "${GREEN}✅ Builds complete!${NC}"
        echo "Deploy 'deploy/vercel/' to Vercel"
        echo "Deploy 'deploy/github/' to GitHub Pages"
        ;;

    *)
        echo -e "${RED}❌ Invalid platform. Use: vercel, github, or both${NC}"
        exit 1
        ;;
esac

echo -e "${GREEN}🎉 Deployment preparation complete!${NC}"