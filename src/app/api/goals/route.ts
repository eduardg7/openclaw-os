/**
 * Goals API - CRUD with hierarchy support
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/goals - List goals (optionally filtered by company)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('companyId')
    const parentId = searchParams.get('parentId') // null for root goals
    
    const where: any = {}
    if (companyId) where.companyId = companyId
    if (parentId === 'null' || parentId === '') {
      where.parentId = null
    } else if (parentId) {
      where.parentId = parentId
    }

    const goals = await prisma.goal.findMany({
      where,
      include: {
        children: true,
        _count: { select: { tasks: true, children: true } }
      },
      orderBy: { createdAt: 'asc' }
    })
    
    return NextResponse.json({ goals })
  } catch (error) {
    console.error('Failed to fetch goals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch goals' },
      { status: 500 }
    )
  }
}

// POST /api/goals - Create goal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { companyId, parentId, title, description, level } = body
    
    if (!companyId || !title) {
      return NextResponse.json(
        { error: 'companyId and title are required' },
        { status: 400 }
      )
    }
    
    const goal = await prisma.goal.create({
      data: {
        companyId,
        parentId: parentId || null,
        title,
        description,
        level: level || 'project'
      },
      include: {
        parent: true,
        children: true
      }
    })
    
    return NextResponse.json({ goal }, { status: 201 })
  } catch (error) {
    console.error('Failed to create goal:', error)
    return NextResponse.json(
      { error: 'Failed to create goal' },
      { status: 500 }
    )
  }
}
