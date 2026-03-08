/**
 * Company by ID API Routes
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/companies/[id] - Get company by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        agents: {
          include: {
            _count: { select: { tasks: true, reports: true } }
          }
        },
        goals: { where: { parentId: null } },
        _count: {
          select: { agents: true, tasks: true, goals: true, sessions: true }
        }
      }
    })
    
    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ company })
  } catch (error) {
    console.error('Failed to fetch company:', error)
    return NextResponse.json(
      { error: 'Failed to fetch company' },
      { status: 500 }
    )
  }
}

// PUT /api/companies/[id] - Update company
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name } = body
    
    const company = await prisma.company.update({
      where: { id },
      data: { name }
    })
    
    return NextResponse.json({ company })
  } catch (error) {
    console.error('Failed to update company:', error)
    return NextResponse.json(
      { error: 'Failed to update company' },
      { status: 500 }
    )
  }
}

// DELETE /api/companies/[id] - Delete company
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Cascade delete handled by Prisma schema
    await prisma.company.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete company:', error)
    return NextResponse.json(
      { error: 'Failed to delete company' },
      { status: 500 }
    )
  }
}
