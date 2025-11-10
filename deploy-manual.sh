#!/bin/bash

# Manual GitHub Pages Deployment Script
# Use this if GitHub Actions workflow isn't working

echo "🔧 Manual GitHub Pages Deployment"
echo "================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please run this from the project root."
    exit 1
fi

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "✅ gh-pages branch found"
else
    echo "📝 Creating gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
    echo "# GitHub Pages" > README.md
    git add README.md
    git commit -m "Initialize gh-pages branch"
    git push origin gh-pages
    git checkout main
    echo "✅ gh-pages branch created and pushed"
fi

# Build the project
echo "🏗️ Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

# Deploy to gh-pages branch
echo "🚀 Deploying to GitHub Pages..."

# Create temporary directory for deployment
TEMP_DIR=$(mktemp -d)
cp -r dist/* "$TEMP_DIR/"

# Switch to gh-pages branch
git checkout gh-pages

# Remove existing files (except git)
find . -not -path './.git/*' -not -name '.gitignore' -not -path './.git' -not -name '.git' -delete

# Copy new files
cp -r "$TEMP_DIR"/* .

# Add and commit
git add .
git commit -m "Deploy to GitHub Pages - $(date)"

# Push to GitHub
git push origin gh-pages

# Switch back to main
git checkout main

# Clean up
rm -rf "$TEMP_DIR"

echo "✅ Deployment complete!"
echo "🌐 Your site should be available at: https://vidyaraut17297.github.io/vidyaraut/"
echo "⏰ It may take 1-2 minutes for the changes to propagate."

# Alternative: Create deployment package
echo ""
echo "📦 Alternative: Download deployment files"
echo "The built files are ready in the 'dist' folder."
echo "You can manually upload these files to your GitHub Pages settings."