import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@carolynsguidinglight.com' },
    update: {},
    create: {
      email: 'admin@carolynsguidinglight.com',
      name: 'Carolyn Administrator',
      password: hashedPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Created admin user:', admin.email)

  // Create demo user
  const demoHashedPassword = await bcrypt.hash('demo123', 10)
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: demoHashedPassword,
      role: 'user',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Created demo user:', demoUser.email)

  // Create sample appointments
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const nextWeek = new Date(now)
  nextWeek.setDate(nextWeek.getDate() + 7)

  const appointment1 = await prisma.appointment.create({
    data: {
      userId: demoUser.id,
      date: tomorrow,
      time: '10:00 AM',
      type: 'reading',
      status: 'confirmed',
      notes: 'First spiritual reading session',
    },
  })

  const appointment2 = await prisma.appointment.create({
    data: {
      userId: demoUser.id,
      date: nextWeek,
      time: '2:00 PM',
      type: 'consultation',
      status: 'pending',
      notes: 'Life path consultation',
    },
  })

  console.log('✅ Created sample appointments')

  // Create sample contact messages
  await prisma.contactMessage.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Inquiry about services',
      message: 'I would like to know more about your spiritual guidance services.',
      status: 'new',
    },
  })

  console.log('✅ Created sample contact messages')

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📝 Login credentials:')
  console.log('Admin: admin@carolynsguidinglight.com / admin123')
  console.log('Demo: demo@example.com / demo123')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
