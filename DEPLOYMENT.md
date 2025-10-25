# Deployment Guide for Carolyn's Guiding Light

## Prerequisites

1. **Neon Database Account**
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy your PostgreSQL connection string

2. **Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)
   - Install Vercel CLI: `npm i -g vercel`

3. **GitHub Repository**
   - Your code should be pushed to GitHub

## Step-by-Step Deployment

### 1. Database Setup (Neon)

```bash
# Set your DATABASE_URL in .env.local
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require"

# Push schema to database
npm run db:push

# Seed the database (optional)
npm run db:seed
```

### 2. Prepare Environment Variables

Create these secrets in Vercel:

```env
DATABASE_URL=your_neon_connection_string
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 3. Deploy to Vercel

**Option A: Via Vercel Dashboard**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
4. Add environment variables
5. Click "Deploy"

**Option B: Via CLI**

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked

# Deploy to production
vercel --prod
```

### 4. Post-Deployment

1. **Custom Domain** (if using):
   - Go to your project settings in Vercel
   - Navigate to "Domains"
   - Add your custom domain
   - Update DNS records as instructed

2. **Verify Deployment**:
   - Visit your deployed URL
   - Test authentication (sign up/sign in)
   - Test appointment booking
   - Check database connections

3. **Update Environment Variables**:
   - Update `NEXTAUTH_URL` to your production domain
   - Update `NEXT_PUBLIC_APP_URL` to your production domain

### 5. Database Migrations

For future schema changes:

```bash
# After updating prisma/schema.prisma
npm run db:push

# Or create migrations
npx prisma migrate dev --name your_migration_name
npx prisma migrate deploy
```

## Environment Variables Checklist

- [ ] `DATABASE_URL` - Neon PostgreSQL connection string
- [ ] `NEXTAUTH_URL` - Production domain URL
- [ ] `NEXTAUTH_SECRET` - Generated secret key
- [ ] `NEXT_PUBLIC_APP_URL` - Public-facing domain

## Vercel Configuration

The `vercel.json` file is already configured with:
- Automatic builds
- Environment variable references
- Optimal regions

## Troubleshooting

### Build Failures

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify environment variables are set

### Database Connection Issues

1. Check DATABASE_URL format
2. Ensure Neon database is active
3. Verify IP whitelisting (Neon allows all by default)

### Authentication Issues

1. Verify NEXTAUTH_URL matches your domain
2. Check NEXTAUTH_SECRET is set
3. Clear browser cookies and try again

## Performance Optimization

Already implemented:
- Image optimization
- Code splitting
- Server-side rendering
- Static generation where possible

## Security Checklist

- [ ] Change default admin password
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Enable Vercel security headers
- [ ] Configure CORS if needed
- [ ] Set up monitoring

## Monitoring

Use Vercel Analytics:
- Enable in project settings
- Monitor performance
- Track errors
- View usage statistics

## Continuous Deployment

Vercel automatically deploys:
- `main` branch → Production
- Other branches → Preview deployments

## Rollback

If issues occur:
```bash
vercel rollback
```

Or use Vercel dashboard to select a previous deployment.

## Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- Next.js Docs: https://nextjs.org/docs

---

**Your app is now live! 🎉**
