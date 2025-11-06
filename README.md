# 🍕 FEASTO - Food & Grocery Delivery Platform 🛒

A modern, full-featured food and grocery delivery application built with React and Firebase.

## ✨ Features

### 🔐 Authentication
- Email/Password authentication
- Google Sign-In integration
- Email verification
- Password reset functionality
- Secure user profiles

### 🍽️ Food & Grocery
- Browse food delivery options
- Shop for groceries
- Category-based filtering
- Search functionality
- Grid and list view modes
- Professional item cards with detailed information

### 🛒 Shopping Experience
- Add items to cart
- Quantity management
- Separate food and grocery carts
- Real-time price calculation
- Taxes and delivery fee calculation
- Smooth checkout process

### 👤 User Features
- Personal profile management
- Order history tracking
- Delivery address management
- Email verification status
- Order status tracking (In Transit/Delivered)

### 🎨 UI/UX
- Professional gradient design (Mustard Yellow theme)
- Animated headers with floating elements
- FontAwesome icons throughout
- Responsive design for all devices
- Smooth transitions and hover effects
- Clean, modern interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd feasto
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Run the development server**
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📦 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

## 🌐 Deployment to Vercel

### Quick Deploy (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Configure environment variables
   - Click "Deploy"

3. **Update Firebase authorized domains**
   - Add your Vercel domain to Firebase Console
   - Authentication → Settings → Authorized domains

**For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Using Deployment Scripts

**Windows:**
```bash
deploy.bat
```

**Mac/Linux:**
```bash
./deploy.sh
```

## 📁 Project Structure

```
feasto/
├── public/               # Static files
├── src/
│   ├── assets/          # Images and icons
│   ├── components/      # Reusable components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── ItemCard.js
│   │   ├── FilterSortBar.js
│   │   └── ...
│   ├── context/         # React Context providers
│   │   ├── AuthContext.js
│   │   └── CartContext.js
│   ├── pages/           # Page components
│   │   ├── Food.js
│   │   ├── Grocery.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── Orders.js
│   │   ├── Profile.js
│   │   ├── AuthPage.js
│   │   └── Inventory.js
│   ├── services/        # API and service functions
│   │   ├── mockApi.js
│   │   └── usersService.js
│   ├── firebase.js      # Firebase configuration
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
├── vercel.json          # Vercel configuration
├── .vercelignore        # Vercel ignore file
├── DEPLOYMENT.md        # Deployment guide
└── package.json         # Dependencies and scripts
```

## 🔧 Configuration Files

- **`vercel.json`** - Vercel deployment configuration
- **`.env.local`** - Local environment variables (not committed)
- **`.env.example`** - Environment variables template
- **`firebase.js`** - Firebase initialization

## 🔐 Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database
4. Set up security rules
5. Copy your Firebase config to `.env.local`

### Required Firebase Services
- ✅ Authentication (Email/Password + Google)
- ✅ Firestore Database
- ✅ Analytics (optional)

## 🎯 Environment Variables

| Variable | Description |
|----------|-------------|
| `REACT_APP_FIREBASE_API_KEY` | Firebase API Key |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `REACT_APP_FIREBASE_APP_ID` | Firebase App ID |
| `REACT_APP_FIREBASE_MEASUREMENT_ID` | Firebase Measurement ID |

## 🛠️ Built With

- **React 19.2** - UI Framework
- **React Router 6** - Navigation
- **Firebase 10** - Backend services
- **FontAwesome** - Icons
- **Vercel** - Deployment platform

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Complete deployment instructions
- [Vercel Configuration](./VERCEL_CONFIG.md) - Vercel setup details
- [Pre-Deployment Checklist](./PRE_DEPLOYMENT_CHECKLIST.md) - Deployment checklist

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Firebase Connection Issues
- Check environment variables
- Verify Firebase project is active
- Check authorized domains in Firebase Console

### Routing Issues (404 on refresh)
- Already configured in `vercel.json`
- For other platforms, configure SPA routing

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

### Code Style
- Use functional components
- Follow React best practices
- Use hooks for state management
- Keep components modular

### Adding New Features
1. Create feature branch
2. Implement changes
3. Test locally
4. Create pull request
5. Deploy preview on Vercel

## 🎉 Acknowledgments

- Create React App for project scaffolding
- Firebase for backend services
- Vercel for hosting platform
- FontAwesome for icons

---

**Made with ❤️ for food and grocery delivery**

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
