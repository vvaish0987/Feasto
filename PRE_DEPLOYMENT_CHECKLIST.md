# ✅ Pre-Deployment Checklist for FEASTO

Complete this checklist before deploying to Vercel to ensure a smooth deployment.

## 📋 Essential Checks

### 1. Code Quality
- [ ] All console.errors removed or handled
- [ ] No console.log statements in production code
- [ ] All TypeScript/ESLint errors fixed
- [ ] Build command runs successfully: `npm run build`
- [ ] No warnings in build output

### 2. Dependencies
- [ ] All dependencies listed in `package.json`
- [ ] No deprecated packages
- [ ] Dependencies versions are compatible
- [ ] `package-lock.json` is committed

### 3. Environment Variables
- [ ] All Firebase config variables ready
- [ ] No hardcoded API keys in code
- [ ] `.env.example` file created for reference
- [ ] `.env.local` is in `.gitignore`

### 4. Firebase Configuration
- [ ] Firebase project created and active
- [ ] Authentication enabled (Email/Password + Google)
- [ ] Firestore database initialized
- [ ] Security rules configured
- [ ] Test data populated (optional)

### 5. Git Repository
- [ ] Latest changes committed
- [ ] Repository pushed to GitHub/GitLab/Bitbucket
- [ ] `.gitignore` configured properly
- [ ] No sensitive data in commit history

### 6. Build Files
- [ ] `vercel.json` present in root
- [ ] `.vercelignore` present in root
- [ ] `public/index.html` exists
- [ ] `public/manifest.json` configured
- [ ] Favicon added

## 🧪 Testing Checklist

### Local Testing
- [ ] App runs locally: `npm start`
- [ ] Production build works: `npm run build && npx serve -s build`
- [ ] All routes accessible
- [ ] No console errors in browser

### Feature Testing
- [ ] Home page loads
- [ ] Food page displays items
- [ ] Grocery page displays items
- [ ] User registration works
- [ ] User login works
- [ ] Google Sign-In configured (will test after deployment)
- [ ] Password reset flow works
- [ ] Email verification sends
- [ ] Cart add/remove works
- [ ] Checkout process completes
- [ ] Profile updates save
- [ ] Orders display correctly

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile responsive

## 🔐 Security Checklist

- [ ] Firebase API keys not exposed in client code (they're okay in React env vars)
- [ ] Firestore security rules configured
- [ ] Authentication required for sensitive operations
- [ ] CORS configured if needed
- [ ] No sensitive data in localStorage/sessionStorage

## 📱 Vercel Account Setup

- [ ] Vercel account created
- [ ] GitHub/GitLab/Bitbucket connected
- [ ] Payment method added (optional, free tier is fine)
- [ ] Vercel CLI installed (optional): `npm install -g vercel`

## 🚀 Deployment Preparation

### Option 1: Dashboard Deployment
- [ ] Repository accessible to Vercel
- [ ] Ready to import project
- [ ] Environment variables prepared (copy-paste ready)

### Option 2: CLI Deployment
- [ ] Vercel CLI installed
- [ ] Logged in: `vercel login`
- [ ] Project directory ready

## 📊 Post-Deployment Checklist

After deployment, verify:

### Immediate Checks
- [ ] Deployment successful (check Vercel dashboard)
- [ ] Site accessible at Vercel URL
- [ ] HTTPS working (automatic)
- [ ] All pages load correctly

### Firebase Configuration
- [ ] Add Vercel domain to Firebase authorized domains
- [ ] Test authentication on deployed site
- [ ] Test Google Sign-In on deployed site
- [ ] Verify database connectivity

### Functionality Testing
- [ ] Complete user registration
- [ ] Login/logout works
- [ ] Google Sign-In works
- [ ] Password reset email received
- [ ] Email verification sent
- [ ] Add items to cart
- [ ] Complete checkout
- [ ] View orders
- [ ] Update profile

### Performance Checks
- [ ] Page load speed acceptable (< 3 seconds)
- [ ] Images load properly
- [ ] No 404 errors in console
- [ ] Mobile responsiveness

### Analytics & Monitoring
- [ ] Vercel Analytics enabled (optional)
- [ ] Firebase Analytics receiving data
- [ ] Error tracking configured (optional)

## 🔧 Common Issues & Solutions

### Build Fails
**Check:**
- Build logs in Vercel
- Local build: `npm run build`
- Missing dependencies
- Node version compatibility

### Routes Don't Work
**Check:**
- `vercel.json` routing configuration
- React Router setup
- `BrowserRouter` vs `HashRouter`

### Firebase Connection Fails
**Check:**
- Environment variables set correctly
- Firebase authorized domains
- Firebase project active
- Network/CORS issues

### Authentication Fails
**Check:**
- Google Sign-In enabled in Firebase
- Authorized domains updated
- OAuth consent screen configured
- Redirect URIs correct

## 📞 Getting Help

If you encounter issues:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Review Firebase Console for auth issues
4. Check this checklist again
5. Consult deployment documentation
6. Contact Vercel support or Firebase support

## ✨ Success Criteria

Your deployment is successful when:
- ✅ All pages load without errors
- ✅ Authentication works (email + Google)
- ✅ Database operations function
- ✅ Cart and checkout work
- ✅ Orders are saved
- ✅ Profile updates persist
- ✅ Mobile view is responsive
- ✅ Performance is acceptable

## 🎉 Final Step

Once everything is checked and working:
1. Share your app URL
2. Gather user feedback
3. Monitor analytics
4. Iterate and improve

**Good luck with your deployment! 🚀**
