# 🌟 Carolyn's Guiding Light - Installation Commands

## Complete Installation & Setup

Follow these commands in order to get your project running:

### Step 1: Navigate to Project Directory
```bash
cd c:/Users/HP/Desktop/Carolyns-Guilding-Light
```

### Step 2: Install All Dependencies
```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js & React Three Fiber
- NextAuth.js
- Prisma
- And all other dependencies

### Step 3: Set Up Environment Variables

**Option A: Copy the example file**
```bash
# On Windows (PowerShell)
Copy-Item .env.example .env.local

# On Windows (CMD)
copy .env.example .env.local

# On Mac/Linux
cp .env.example .env.local
```

**Option B: Manually create .env.local and add:**
```env
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 4: Generate NEXTAUTH_SECRET

**Option A: Using OpenSSL (Recommended)**
```bash
openssl rand -base64 32
```

**Option B: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and paste it as your NEXTAUTH_SECRET in .env.local

### Step 5: Set Up Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up/login
2. Create a new project
3. Copy your connection string
4. Paste it as DATABASE_URL in .env.local

### Step 6: Generate Prisma Client
```bash
npx prisma generate
```

### Step 7: Push Database Schema
```bash
npm run db:push
```

### Step 8: Seed Database (Optional but Recommended)
```bash
npm run db:seed
```

This creates:
- Admin user: admin@carolynsguidinglight.com / admin123
- Demo user: demo@example.com / demo123

### Step 9: Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Quick Setup (Windows)

Run the automated setup script:
```bash
./setup.bat
```

## Quick Setup (Mac/Linux)

Run the automated setup script:
```bash
chmod +x setup.sh
./setup.sh
```

---

## Build for Production

```bash
npm run build
npm start
```

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues
1. Check DATABASE_URL format
2. Ensure Neon database is active
3. Verify connection string is correct

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

---

## Project Structure

```
Carolyns-Guilding-Light/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── appointments/      # Appointment booking
│   ├── dashboard/         # User dashboard
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   └── providers.tsx      # Context providers
├── components/            # React components
│   ├── ui/               # UI components
│   ├── Navbar.tsx        # Navigation
│   ├── Footer.tsx        # Footer
│   ├── HeroSection.tsx   # Hero with 3D
│   └── Scene3D.tsx       # Three.js scene
├── lib/                   # Utilities
│   ├── auth.ts           # Auth config
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/               # Database
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
├── public/               # Static files
├── types/                # TypeScript types
├── .env.local            # Environment variables
├── package.json          # Dependencies
├── next.config.js        # Next.js config
├── tailwind.config.ts    # Tailwind config
├── tsconfig.json         # TypeScript config
└── README.md             # Documentation
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with data |
| `npm run db:studio` | Open Prisma Studio |

---

## Features Checklist

- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Framer Motion animations
- ✅ Three.js 3D graphics
- ✅ NextAuth.js authentication
- ✅ Prisma ORM
- ✅ PostgreSQL (Neon)
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Production ready
- ✅ Vercel deployment config

---

## Need Help?

- 📖 [README.md](./README.md) - Full documentation
- 🚀 [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- 🌐 [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide

---

**You're all set! Happy coding! ✨**
