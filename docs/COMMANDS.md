# Command Summary

This file summarizes common commands and quick steps to get the project running.

## STEP 1: INSTALL DEPENDENCIES

```bash
cd c:/Users/HP/Desktop/Carolyns-Guiding-Light
npm install
```

## STEP 2: SET UP NEON DATABASE

1. Go to: https://neon.tech
2. Sign up/Login
3. Create a new project
4. Copy your connection string

## STEP 3: GENERATE NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## STEP 4: UPDATE .env.local

Edit the file: .env.local

Replace with your actual values:

```
DATABASE_URL="your-neon-connection-string-here"
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## STEP 5: SET UP DATABASE

```bash
npx prisma generate
npm run db:push
npm run db:seed
```

## STEP 6: START DEVELOPMENT

```bash
npm run dev
```

Then open: http://localhost:3000

## STEP 7: TEST LOGIN (after seeding)

Admin Login:
Email: admin@carolynsguidinglight.com
Password: admin123

Demo Login:
Email: demo@example.com
Password: demo123

## STEP 8: PUSH TO GITHUB

```bash
git push -u origin main
```

## STEP 9: DEPLOY TO VERCEL

Option 1 - Dashboard:

1. Go to: https://vercel.com
2. Import repository: shangme65/Carolyns-Guiding-Light
3. Add environment variables
4. Deploy

Option 2 - CLI:

```bash
npm install -g vercel
vercel login
vercel --prod
```

## QUICK SETUP (Automated)

Windows:
./setup.bat

Mac/Linux:
chmod +x setup.sh
./setup.sh

## TROUBLESHOOTING

Port in use:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

Clear cache:
rm -rf node_modules .next
npm install

Database issues:

- Check DATABASE_URL format
- Ensure Neon database is active
- Verify connection string

## FILES TO READ

- GET-STARTED.md - Complete guide (READ THIS FIRST!)
- README.md - Full documentation
- INSTALLATION.md - Detailed installation
- DEPLOYMENT.md - Deployment guide
- QUICKSTART.md - Quick reference
