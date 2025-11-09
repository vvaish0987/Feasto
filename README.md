# FEASTO - Modern Food & Grocery Ordering Platform
VERCEL LINK - https://feasto-git-main-vaishnavi-s-projects-b6843521.vercel.app?_vercel_share=tcEwBAN53BcQtZ1qZBcjj1Nid7kZWuOW
Visit the link to explore the website

[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.x-orange)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

FEASTO is a modern, full-featured food and grocery ordering platform that offers a seamless shopping experience with real-time inventory management and order processing.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Firebase account
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vvaish0987/Feasto.git
   cd feasto
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password and Google Sign-in)
   - Create a Firestore database
   - Add your Firebase configuration to `src/firebase.js`

4. Start the development server:
   ```bash
   npm start
   ```

### Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to hosting platform:
   ```bash
   # Using Firebase Hosting
   firebase deploy

   # Using Vercel
   vercel
   ```

## 🏗️ Architecture

### Tech Stack
- **Frontend:** React.js 
- **Backend:** Firebase (Authentication, Firestore)
- **State Management:** React Context (Cart and Auth)
- **UI:** Custom CSS with responsive design
- **Hosting:** Vercel/Firebase Hosting
## 🔑 Core Features

### 1. User Authentication System
- Secure email/password and Google sign-in options
- Email verification system
- Protected routes and data access
- Session management
- Profile management with location preferences

### 2. Product Catalog & Search
- Categorized food and grocery items
- Advanced search functionality with filters
- Real-time inventory tracking
- Restaurant-wise categorization
- Veg/Non-veg filtering system

### 3. Shopping Cart System
- Real-time stock validation
- Multi-item quantity management
- Session persistence
- Cross-device cart synchronization
- Price calculation with offers

### 4. Checkout & Orders
- Streamlined checkout process
- Order status tracking
- Detailed price breakdown
- Order history
- Real-time inventory updates
- Order confirmation system

### 5. Security Features
- Firebase Security Rules implementation
- Form validation and sanitization
- Protected API endpoints
- Secure payment processing
- Data access control

## 💾 Database Structure

### Firestore Collections
| Collection | Purpose |
|------------|---------|
| users | User profiles and preferences |
| users_uid | UID-based user data access |
| food | Food items catalog |
| grocery | Grocery items catalog |
| inventory | Real-time stock management |
| orders | Order tracking and history |
| carts | Shopping cart data |

## 🔧 API Services

### Core Services
- **usersService.js**: User profile and authentication management
- **catalogService.js**: Product catalog and inventory operations
- **mockApi.js**: Order processing and inventory updates

## 📱 UI/UX Features
- Responsive design for all devices
- Intuitive navigation
- Real-time feedback
- Loading states and animations
- Error handling with user-friendly messages


## 🛠️ Development Guide

### Project Structure
```
feasto/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/       # React Context providers
│   ├── pages/         # Main application pages
│   ├── services/      # API and business logic
│   ├── assets/        # Static assets
│   └── firebase.js    # Firebase configuration
├── public/           # Static files
└── build/           # Production build
```
