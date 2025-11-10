# GitHub Pages Deployment Setup Guide

## Issue: Website showing blank on GitHub Pages

If your website at https://vidyaraut17297.github.io/vidyaraut/ is showing blank, follow these steps:

## 1. Repository Settings Configuration

### Enable GitHub Pages
1. Go to your repository: `https://github.com/vidyaraut17297/vidyaraut`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### Verify Branch
1. Make sure the repository is set to deploy from the `main` branch
2. The workflow will build and deploy automatically

## 2. Manual Deployment Test

If automatic deployment isn't working, you can trigger it manually:

### Method 1: Trigger GitHub Actions
1. Go to the **Actions** tab in your repository
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select branch: `main`
5. Click "Run workflow"

### Method 2: Re-push to main branch
1. Make a small change in any file
2. Commit and push to main branch
3. This will trigger the GitHub Actions workflow

## 3. Build Verification

Check if the build is working by looking at the Actions tab:
- Green checkmark = successful deployment
- Red X = failed deployment (check logs for errors)

## 4. Common Issues and Solutions

### Blank Page After Deployment
**Cause**: JavaScript files not loading
**Solution**: 
1. Check if base path is correct in `vite.config.js` (should be `/vidyaraut/`)
2. Verify the deployed site has the correct folder structure

### 404 Errors
**Cause**: Incorrect paths or missing files
**Solution**:
1. Check `_redirects` file is in the dist folder
2. Verify all assets are uploaded correctly

### CSS Not Loading
**Cause**: Base path issues
**Solution**:
1. Ensure `vite.config.js` has correct `base: '/vidyaraut/'`
2. Check that assets paths in `index.html` include `/vidyaraut/`

## 5. Quick Test Commands

To test locally with the correct base path:
```bash
# Build for production
npm run build

# Preview the build
npm run preview

# Check built files
ls -la dist/
```

## 6. Environment Variables

Make sure these are set in your GitHub repository:
- `OPENROUTER_API_KEY` (in repository secrets)
- `GITHUB_PAGES: true` (set in workflow)

## 7. Fallback Solution

If GitHub Actions still doesn't work, you can:
1. Download the `dist` folder locally
2. Upload contents to the `gh-pages` branch manually
3. Or use GitHub Desktop to push the `dist` folder contents to `gh-pages` branch

The website should be accessible at: https://vidyaraut17297.github.io/vidyaraut/