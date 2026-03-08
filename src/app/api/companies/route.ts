/**
 * Company API Routes - Multi-tenant CRUD
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/companies - List all companies
export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: { agents: true, tasks: true, goals: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({ companies })
  } catch (error) {
    console.error('Failed to fetch companies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    )
  }
}

// POST /api/companies - Create company
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name } = body
    
    if (!name) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      )
    }
    
    const company = await prisma.company.create({
      data: { name }
    })
    
    return NextResponse.json({ company }, { status: 201 })
  } catch (error) {
    console.error('Failed to create company:', error)
    return NextResponse.json(
      { error: 'Failed to create company' },
      { status: 500 }
    )
  }
}
