import { NextResponse } from 'next/server'
import { getAgents, isGatewayAvailable } from '@/lib/gateway'

export const dynamic = 'force-dynamic'

/**
 * GET /api/openclaw/agents
 * 
 * Fetch all agents from OpenClaw Gateway
 * 
 * Response:
 * - 200: List of agents
 * - 503: Gateway not available
 */
export async function GET() {
  try {
    // Check if Gateway is available first
    const available = await isGatewayAvailable()
    
    if (!available) {
      return NextResponse.json(
        { 
          error: 'Gateway not available',
          message: 'OpenClaw Gateway is not running or not accessible'
        },
        { status: 503 }
      )
    }
    
    const agents = await getAgents()
    
    return NextResponse.json({
      success: true,
      count: agents.length,
      agents
    })
  } catch (error) {
    console.error('Failed to fetch agents:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch agents',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
