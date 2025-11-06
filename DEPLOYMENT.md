# 🚀 Deploying FEASTO to Vercel

This guide will help you deploy your FEASTO food delivery app to Vercel.

## Prerequisites

1. ✅ A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
2. ✅ [Vercel CLI](https://vercel.com/cli) installed (optional, but recommended)
3. ✅ Your Firebase project configured
4. ✅ Git repository (GitHub, GitLab, or Bitbucket)

## 📋 Step-by-Step Deployment Guide

### Option 1: Deploy via Vercel Dashboard (Easiest)

#### Step 1: Push Your Code to Git
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

#### Step 2: Import Project to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your Git repository (authorize GitHub/GitLab/Bitbucket if needed)
4. Select the `feasto` repository

#### Step 3: Configure Build Settings
Vercel should auto-detect these settings:
- **Framework Preset**: `Create React App`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

#### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:

```
REACT_APP_FIREBASE_API_KEY = AIzaSyB1_3xFa1d2-uZqcfhZCAzD5-Y_tXB1JhY
REACT_APP_FIREBASE_AUTH_DOMAIN = feasto-b9e9d.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID = feasto-b9e9d
REACT_APP_FIREBASE_STORAGE_BUCKET = feasto-b9e9d.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 282876161953
REACT_APP_FIREBASE_APP_ID = 1:282876161953:web:d6cb2bda17aaaf4e5ce5e0
REACT_APP_FIREBASE_MEASUREMENT_ID = G-76860MN3QX
```

**Note**: These are your current Firebase credentials. For production, consider creating a separate Firebase project.

#### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll get a deployment URL like: `https://feasto-xxxxx.vercel.app`

---

### Option 2: Deploy via Vercel CLI (Advanced)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
# Navigate to your project directory
cd e:\akasha\feasto

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? feasto
# - Directory? ./
# - Want to override settings? No
```

#### Step 4: Add Environment Variables
```bash
vercel env add REACT_APP_FIREBASE_API_KEY
vercel env add REACT_APP_FIREBASE_AUTH_DOMAIN
vercel env add REACT_APP_FIREBASE_PROJECT_ID
vercel env add REACT_APP_FIREBASE_STORAGE_BUCKET
vercel env add REACT_APP_FIREBASE_MESSAGING_SENDER_ID
vercel env add REACT_APP_FIREBASE_APP_ID
vercel env add REACT_APP_FIREBASE_MEASUREMENT_ID
```

#### Step 5: Deploy to Production
```bash
vercel --prod
```

---

## 🔧 Post-Deployment Configuration

### 1. Update Firebase Authorized Domains
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (`feasto-b9e9d`)
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Click **"Add domain"**
5. Add your Vercel domain: `feasto-xxxxx.vercel.app`

### 2. Configure Custom Domain (Optional)
1. In Vercel Dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Update DNS records as instructed
5. Don't forget to add the custom domain to Firebase authorized domains too!

### 3. Enable HTTPS (Automatic)
Vercel automatically provides SSL certificates. All deployments are served over HTTPS.

---

## 🔄 Continuous Deployment

Once deployed, Vercel automatically:
- ✅ Rebuilds on every push to `main` branch
- ✅ Creates preview deployments for pull requests
- ✅ Provides deployment previews for each commit

### To Deploy Updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically detect changes and redeploy!

---

## 🐛 Troubleshooting

### Build Fails
**Problem**: Build command fails on Vercel

**Solution**:
1. Check build logs in Vercel Dashboard
2. Ensure all dependencies are in `package.json`
3. Test build locally: `npm run build`
4. Check for environment variable issues

### Routes Not Working (404 on Refresh)
**Problem**: Direct navigation to routes shows 404

**Solution**: Already fixed! The `vercel.json` file configures SPA routing correctly.

### Firebase Connection Issues
**Problem**: App can't connect to Firebase

**Solution**:
1. Verify environment variables are set correctly in Vercel
2. Check Firebase authorized domains
3. Ensure Firebase rules allow your domain

### Google Sign-In Not Working
**Problem**: Google authentication fails on deployed site

**Solution**:
1. Add Vercel domain to Firebase authorized domains
2. Add Vercel domain to Google OAuth consent screen
3. Go to Google Cloud Console → APIs & Services → Credentials
4. Add authorized JavaScript origins and redirect URIs

---

## 📊 Monitoring & Analytics

### Vercel Analytics
1. Go to your project in Vercel Dashboard
2. Click **"Analytics"** tab
3. View real-time performance metrics

### Firebase Analytics
Already configured! Check Firebase Console for:
- User engagement
- Events tracking
- User demographics

---

## 🔒 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env.local` to Git (already in `.gitignore`)
- ✅ Use Vercel environment variables for secrets
- ✅ Regenerate API keys if accidentally exposed

### 2. Firebase Security Rules
Ensure your Firestore rules are production-ready:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /users_uid/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /catalog/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /orders/{orderId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

### 3. CORS Configuration
If needed, configure CORS in Firebase Storage rules.

---

## 📱 Testing Your Deployment

After deployment, test these features:
- [ ] Home page loads correctly
- [ ] Navigation works (all routes)
- [ ] Food & Grocery pages display items
- [ ] User registration/login works
- [ ] Google Sign-In works
- [ ] Email verification sends
- [ ] Forgot password works
- [ ] Cart functionality
- [ ] Checkout process
- [ ] Profile updates save
- [ ] Orders display correctly

---

## 🎯 Performance Optimization

### Already Implemented:
- ✅ Static asset caching (via `vercel.json`)
- ✅ Code splitting (React lazy loading)
- ✅ Image optimization ready

### Recommended:
1. **Enable Vercel Image Optimization** (if using images)
2. **Set up Vercel Edge Functions** (for API routes)
3. **Monitor Core Web Vitals** in Vercel Analytics

---

## 📞 Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

---

## 🎉 Success Checklist

After successful deployment:
- [ ] App accessible at Vercel URL
- [ ] All pages load correctly
- [ ] Authentication works (email & Google)
- [ ] Firebase connection established
- [ ] Cart and checkout functional
- [ ] Environment variables set
- [ ] Custom domain configured (optional)
- [ ] Firebase authorized domains updated
- [ ] SSL certificate active (automatic)
- [ ] Continuous deployment enabled

---

**Your FEASTO app is now live! 🍕🛒**

Share your Vercel URL and start serving customers! 🚀
