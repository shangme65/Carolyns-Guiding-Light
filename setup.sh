#!/bin/bash

echo "🌟 Carolyn's Guiding Light - Setup Script 🌟"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm --version) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Check for .env.local
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  IMPORTANT: Please update .env.local with your actual values:"
    echo "   - DATABASE_URL (from Neon)"
    echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
    echo ""
else
    echo "✅ .env.local already exists"
    echo ""
fi

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo "✅ Prisma Client generated"
echo ""

# Ask about database setup
read -p "Do you want to push the database schema to your database now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "🗄️  Pushing database schema..."
    npm run db:push
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to push database schema"
        echo "   Make sure your DATABASE_URL is correct in .env.local"
        exit 1
    fi
    
    echo "✅ Database schema pushed successfully"
    echo ""
    
    # Ask about seeding
    read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        echo "🌱 Seeding database..."
        npm run db:seed
        
        if [ $? -ne 0 ]; then
            echo "❌ Failed to seed database"
            exit 1
        fi
        
        echo "✅ Database seeded successfully"
        echo ""
        echo "📝 Default login credentials:"
        echo "   Admin: admin@carolynsguidinglight.com / admin123"
        echo "   Demo: demo@example.com / demo123"
        echo ""
    fi
fi

echo "============================================"
echo "✨ Setup completed successfully! ✨"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm run dev"
echo ""
echo "📖 For deployment instructions, see DEPLOYMENT.md"
echo ""
echo "⚠️  Don't forget to:"
echo "   1. Update your .env.local with real credentials"
echo "   2. Change default passwords in production"
echo "   3. Review the README.md for more information"
echo ""
echo "============================================"
