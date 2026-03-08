import { NextResponse, NextRequest } from 'next/server'
import { getTasks, isGatewayAvailable } from '@/lib/gateway'

export const dynamic = 'force-dynamic'

/**
 * GET /api/openclaw/tasks
 * 
 * Fetch tasks from TASK_DB.json
 * 
 * Query params:
 * - status: Filter by status (todo, in_progress, review, approved, done)
 * - project_id: Filter by project ID
 * - severity: Filter by severity (P0, P1, P2)
 * 
 * Response:
 * - 200: List of tasks
 * - 503: Gateway not available (or task DB not found)
 */
export async function GET(request: NextRequest) {
  try {
    // Check if Gateway is available (optional for tasks, but good health check)
    const available = await isGatewayAvailable()
    
    // Get all tasks
    let tasks = await getTasks()
    
    // Parse query params for filtering
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const projectId = searchParams.get('project_id')
    const severity = searchParams.get('severity')
    
    // Apply filters
    if (status) {
      tasks = tasks.filter((task: any) => task.status === status)
    }
    
    if (projectId) {
      tasks = tasks.filter((task: any) => task.metadata?.project_id === projectId)
    }
    
    if (severity) {
      tasks = tasks.filter((task: any) => task.severity === severity)
    }
    
    // If no tasks and Gateway not available, return 503
    if (tasks.length === 0 && !available) {
      return NextResponse.json(
        { 
          error: 'Gateway not available',
          message: 'OpenClaw Gateway is not running and no task database found'
        },
        { status: 503 }
      )
    }
    
    return NextResponse.json({
      success: true,
      count: tasks.length,
      filters: {
        status: status || null,
        project_id: projectId || null,
        severity: severity || null
      },
      tasks
    })
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch tasks',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
