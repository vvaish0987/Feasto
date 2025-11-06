# 🔧 Vercel Configuration Files

This directory contains Vercel-specific configuration files for deploying FEASTO.

## Files Overview

### `vercel.json`
Main Vercel configuration file that defines:
- **Build settings**: How Vercel should build your React app
- **Routes**: SPA routing configuration (prevents 404 on page refresh)
- **Cache headers**: Optimizes static asset caching
- **Output directory**: Points to React's `build` folder

### `.vercelignore`
Specifies files/folders to exclude from deployment:
- `node_modules` - Dependencies (installed fresh on Vercel)
- `.env.local` - Local environment variables
- Log files
- System files

### Environment Variables Required

Set these in Vercel Dashboard or via CLI:

```bash
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID
```

## Quick Deployment Commands

### Deploy to Preview
```bash
vercel
```

### Deploy to Production
```bash
vercel --prod
```

### Set Environment Variable
```bash
vercel env add REACT_APP_FIREBASE_API_KEY
```

### View Deployment Logs
```bash
vercel logs <deployment-url>
```

## Auto-Deploy Setup

Vercel automatically deploys when you:
1. Push to `main` branch → Production deployment
2. Create pull request → Preview deployment
3. Push to other branches → Preview deployment

## Important Notes

1. **First Deployment**: May take 3-5 minutes
2. **Subsequent Deployments**: Usually 1-2 minutes
3. **Build Cache**: Vercel caches dependencies for faster builds
4. **Immutable Deployments**: Each deployment gets a unique URL
5. **Automatic HTTPS**: All deployments are served over HTTPS

## Testing Before Deploy

Always test your build locally before deploying:

```bash
npm run build
npx serve -s build
```

This ensures your production build works correctly.

## Vercel Project Settings

Recommended settings in Vercel Dashboard:

- **Framework Preset**: Create React App
- **Node Version**: 18.x (default)
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`
- **Development Command**: `npm start`

## Troubleshooting

### Build Fails
1. Check `package.json` for missing dependencies
2. Test `npm run build` locally
3. Check Vercel build logs for specific errors

### Environment Variables Not Working
1. Ensure variables start with `REACT_APP_`
2. Redeploy after adding variables
3. Check variable names for typos

### 404 on Page Refresh
Already fixed in `vercel.json` via SPA routing configuration.

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
