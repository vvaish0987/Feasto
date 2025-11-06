#!/bin/bash

# FEASTO Quick Deploy Script
# This script helps you deploy to Vercel quickly

echo "🍕 FEASTO Deployment Helper 🛒"
echo "================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "⚠️  Vercel CLI not found!"
    echo "Installing Vercel CLI globally..."
    npm install -g vercel
    echo "✅ Vercel CLI installed!"
    echo ""
fi

# Check if logged in to Vercel
echo "🔐 Checking Vercel login status..."
vercel whoami &> /dev/null

if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Vercel"
    echo "Please login to Vercel:"
    vercel login
else
    echo "✅ Already logged in to Vercel"
fi

echo ""
echo "📦 Building project locally first..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Ready to deploy!"
    echo ""
    echo "Choose deployment option:"
    echo "1) Deploy to preview"
    echo "2) Deploy to production"
    echo "3) Cancel"
    read -p "Enter choice (1-3): " choice

    case $choice in
        1)
            echo "🌐 Deploying to preview environment..."
            vercel
            ;;
        2)
            echo "🚀 Deploying to production..."
            vercel --prod
            ;;
        3)
            echo "❌ Deployment cancelled"
            exit 0
            ;;
        *)
            echo "❌ Invalid choice"
            exit 1
            ;;
    esac
else
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo ""
echo "✅ Deployment complete!"
echo "🌍 Don't forget to update Firebase authorized domains!"
