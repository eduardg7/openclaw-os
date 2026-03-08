import { NextResponse, NextRequest } from 'next/server'
import { getSessions, isGatewayAvailable } from '@/lib/gateway'

export const dynamic = 'force-dynamic'

/**
 * GET /api/openclaw/sessions
 * 
 * Fetch recent sessions from OpenClaw Gateway
 * 
 * Query params:
 * - limit: Number of sessions to return (default: 20, max: 100)
 * 
 * Response:
 * - 200: List of sessions
 * - 503: Gateway not available
 */
export async function GET(request: NextRequest) {
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
    
    // Parse limit from query params
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const limit = limitParam 
      ? Math.min(Math.max(parseInt(limitParam, 10) || 20, 1), 100)
      : 20
    
    const sessions = await getSessions(limit)
    
    return NextResponse.json({
      success: true,
      count: sessions.length,
      limit,
      sessions
    })
  } catch (error) {
    console.error('Failed to fetch sessions:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch sessions',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
