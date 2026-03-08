/**
 * Seed script - Creates default company and agents
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create default company
  const company = await prisma.company.upsert({
    where: { id: 'default-company' },
    update: {},
    create: {
      id: 'default-company',
      name: 'Faintech Solutions'
    }
  })
  console.log('✅ Created company:', company.name)

  // Create CEO agent
  const ceo = await prisma.agent.upsert({
    where: { id: 'default-ceo' },
    update: {},
    create: {
      id: 'default-ceo',
      companyId: company.id,
      name: 'Faintech CEO',
      title: 'Chief Executive Officer',
      role: 'ceo',
      enabled: true,
      heartbeatEnabled: true,
      heartbeatIntervalMs: 300000, // 5 minutes
      adapterType: 'openclaw'
    }
  })
  console.log('✅ Created agent:', ceo.name)

  // Create CTO agent
  const cto = await prisma.agent.upsert({
    where: { id: 'default-cto' },
    update: {},
    create: {
      id: 'default-cto',
      companyId: company.id,
      name: 'Faintech CTO',
      title: 'Chief Technology Officer',
      role: 'cto',
      enabled: true,
      reportsToId: ceo.id,
      heartbeatEnabled: true,
      heartbeatIntervalMs: 300000,
      adapterType: 'openclaw'
    }
  })
  console.log('✅ Created agent:', cto.name)

  // Create Dev agent
  const dev = await prisma.agent.upsert({
    where: { id: 'default-dev' },
    update: {},
    create: {
      id: 'default-dev',
      companyId: company.id,
      name: 'Faintech Dev',
      title: 'Senior Developer',
      role: 'dev',
      enabled: true,
      reportsToId: cto.id,
      heartbeatEnabled: true,
      heartbeatIntervalMs: 60000, // 1 minute
      adapterType: 'openclaw'
    }
  })
  console.log('✅ Created agent:', dev.name)

  // Create sample goal
  const goal = await prisma.goal.upsert({
    where: { id: 'sample-goal' },
    update: {},
    create: {
      id: 'sample-goal',
      companyId: company.id,
      title: 'Integrate Multi-Company Features',
      description: 'Multi-company, org charts, heartbeats, goals',
      level: 'initiative',
      status: 'active'
    }
  })
  console.log('✅ Created goal:', goal.title)

  // Create sample task
  const task = await prisma.task.upsert({
    where: { id: 'sample-task' },
    update: {},
    create: {
      id: 'sample-task',
      companyId: company.id,
      goalId: goal.id,
      title: 'Multi-company schema implementation',
      description: 'Add Company model with full isolation',
      status: 'in_progress',
      priority: 'P0',
      area: 'backend',
      ownerId: cto.id
    }
  })
  console.log('✅ Created task:', task.title)

  console.log('🎉 Seed complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
