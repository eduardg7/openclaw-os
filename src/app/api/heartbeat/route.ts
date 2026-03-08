/**
 * Heartbeat API - Manual trigger and status
 */

import { NextRequest, NextResponse } from 'next/server'
import { runHeartbeatCycle } from '@/lib/heartbeat'
import { prisma } from '@/lib/db'

// POST /api/heartbeat/run - Trigger heartbeat cycle
export async function POST() {
  try {
    const results = await runHeartbeatCycle()
    
    return NextResponse.json({
      success: true,
      executed: results.length,
      results
    })
  } catch (error) {
    console.error('Heartbeat cycle failed:', error)
    return NextResponse.json(
      { error: 'Heartbeat cycle failed' },
      { status: 500 }
    )
  }
}

// GET /api/heartbeat/status - Get heartbeat status for all agents
export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      where: { heartbeatEnabled: true },
      select: {
        id: true,
        name: true,
        heartbeatEnabled: true,
        heartbeatIntervalMs: true,
        lastHeartbeatAt: true,
        heartbeatStatus: true
      }
    })
    
    return NextResponse.json({ agents })
  } catch (error) {
    console.error('Failed to fetch heartbeat status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch heartbeat status' },
      { status: 500 }
    )
  }
}
