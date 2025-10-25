# Carolyn's Guiding Light

A modern, immersive spiritual guidance and healing platform built with Next.js 14, featuring 3D animations, responsive design, and comprehensive appointment booking.

## 🌟 Features

- **Immersive 3D Hero Section** with Three.js and Framer Motion animations
- **Multi-slide Homepage** with automatic transitions
- **Professional Authentication** using NextAuth.js and Neon PostgreSQL
- **Appointment Booking System** with calendar integration
- **User Dashboard** for managing appointments
- **Fully Responsive Design** optimized for all screen sizes
- **Continuous Animations** on all interactive elements
- **SEO Optimized** with comprehensive metadata
- **Production Ready** for Vercel deployment

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, Three.js, React Three Fiber
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **UI Components:** Radix UI
- **Deployment:** Vercel

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/shangme65/Carolyns-Guiding-Light.git
cd Carolyns-Guiding-Light
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory and add:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Production Domain
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

To generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

4. **Set up the database:**

```bash
# Push Prisma schema to database
npm run db:push

# Optional: Seed the database with sample data
npm run db:seed
```

## 🛠️ Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## 📊 Database Management

Open Prisma Studio to manage your database:

```bash
npm run db:studio
```

## 🌐 Deployment to Vercel

1. **Connect to GitHub:**
   - Push your code to GitHub
   - Import the repository in Vercel

2. **Configure Environment Variables:**
   
   In your Vercel project settings, add:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `NEXTAUTH_URL`: Your production domain (e.g., https://carolynsguidinglight.com)
   - `NEXTAUTH_SECRET`: Your secret key
   - `NEXT_PUBLIC_APP_URL`: Your production domain

3. **Deploy:**
   - Vercel will automatically build and deploy
   - Run migrations on first deploy

## 🗄️ Database Schema

The application includes:
- **Users** with authentication
- **Appointments** with booking details
- **Sessions** for NextAuth
- **Contact Messages** for inquiries

## 🎨 Customization

- **Colors:** Edit `tailwind.config.ts` to customize the color scheme
- **Animations:** Modify animation parameters in components
- **Content:** Update text and images in page components
- **Services:** Add or modify services in the appointments page

## 📝 Default Login Credentials (After Seeding)

**Admin:**
- Email: admin@carolynsguidinglight.com
- Password: admin123

**Demo User:**
- Email: demo@example.com
- Password: demo123

**⚠️ Change these credentials in production!**

## 🔐 Security

- Passwords are hashed using bcryptjs
- Environment variables for sensitive data
- NextAuth.js for secure authentication
- Protected API routes

## 📱 Pages

- **/** - Immersive 3D homepage with slides
- **/auth/signin** - Professional login page
- **/auth/signup** - User registration
- **/appointments** - Book appointments
- **/dashboard** - User dashboard
- **/about** - About the services
- **/services** - Service offerings
- **/contact** - Contact form

## 🎯 Performance

- Optimized images
- Code splitting
- Server components where possible
- Lazy loading for 3D components

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for Carolyn's Guiding Light

## 🤝 Support

For support, email contact@carolynsguidinglight.com

---

**Ready for production!** Deploy to Vercel and start your spiritual guidance platform today. ✨
