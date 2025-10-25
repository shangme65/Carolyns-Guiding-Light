# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your values:
# - DATABASE_URL: Your Neon PostgreSQL connection string
# - NEXTAUTH_SECRET: Generate with: openssl rand -base64 32
```

### 3. Set Up Database

```bash
# Push the schema to your database
npm run db:push

# Seed with sample data (optional)
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🎯 What's Included

- ✅ Immersive 3D hero section
- ✅ Multi-slide homepage
- ✅ Authentication system
- ✅ Appointment booking
- ✅ User dashboard
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Production ready

## 📝 Default Credentials (After Seeding)

**Admin:**

- Email: admin@carolynsguidinglight.com
- Password: admin123

**Demo User:**

- Email: demo@example.com
- Password: demo123

⚠️ **Change these in production!**

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

## 🌐 Deploy to Vercel

```bash
# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📚 Documentation

- [README.md](./README.md) - Full documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide

## 🆘 Need Help?

1. Check the README.md
2. Review DEPLOYMENT.md
3. Check the code comments
4. Review Next.js documentation

---

**Ready to start your spiritual guidance platform!** ✨
