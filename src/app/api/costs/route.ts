/**
 * Cost Tracking API - Report and query costs
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/costs/report - Report cost from agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { agentId, taskId, inputTokens, outputTokens, costUsd } = body
    
    if (!agentId) {
      return NextResponse.json(
        { error: 'agentId is required' },
        { status: 400 }
      )
    }
    
    // Update agent spend
    const agent = await prisma.agent.update({
      where: { id: agentId },
      data: {
        spentUsd: { increment: costUsd || 0 }
      }
    })
    
    // Update task cost if provided
    if (taskId) {
      await prisma.task.update({
        where: { id: taskId },
        data: {
          inputTokens: { increment: inputTokens || 0 },
          outputTokens: { increment: outputTokens || 0 },
          costUsd: { increment: costUsd || 0 }
        }
      })
    }
    
    return NextResponse.json({ success: true, agent })
  } catch (error) {
    console.error('Failed to report cost:', error)
    return NextResponse.json(
      { error: 'Failed to report cost' },
      { status: 500 }
    )
  }
}

// GET /api/costs - Get cost summary
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('companyId')
    
    const where: any = {}
    if (companyId) where.companyId = companyId
    
    // Get all agents with costs
    const agents = await prisma.agent.findMany({
      where,
      select: {
        id: true,
        name: true,
        monthlyBudgetUsd: true,
        spentUsd: true,
        tasks: {
          select: {
            id: true,
            title: true,
            costUsd: true,
            inputTokens: true,
            outputTokens: true
          },
          where: { costUsd: { gt: 0 } }
        }
      }
    })
    
    // Calculate totals
    const totalBudget = agents.reduce((sum, a) => sum + (a.monthlyBudgetUsd || 0), 0)
    const totalSpent = agents.reduce((sum, a) => sum + a.spentUsd, 0)
    
    return NextResponse.json({
      agents,
      summary: {
        totalBudget,
        totalSpent,
        budgetUtilization: totalBudget > 0 ? (totalSpent / totalBudget * 100).toFixed(1) : 0
      }
    })
  } catch (error) {
    console.error('Failed to fetch costs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch costs' },
      { status: 500 }
    )
  }
}
