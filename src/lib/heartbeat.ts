/**
 * Heartbeat Scheduler Service
 * Manages autonomous agent wake-up cycles
 */

import { prisma } from '@/lib/db'

export interface HeartbeatResult {
  agentId: string
  status: 'success' | 'error' | 'timeout'
  startedAt: Date
  endedAt: Date
  durationMs: number
  error?: string
  inputTokens?: number
  outputTokens?: number
  costUsd?: number
}

export interface AdapterInterface {
  invoke(agentConfig: any, context?: any): Promise<void>
  status(agentConfig: any): Promise<'idle' | 'running' | 'error'>
  cancel(agentConfig: any): Promise<void>
}

/**
 * Check which agents need heartbeat and execute
 */
export async function runHeartbeatCycle(): Promise<HeartbeatResult[]> {
  const now = new Date()
  const results: HeartbeatResult[] = []

  // Find agents due for heartbeat
  const dueAgents = await prisma.agent.findMany({
    where: {
      enabled: true,
      heartbeatEnabled: true,
      OR: [
        { lastHeartbeatAt: null },
        {
          lastHeartbeatAt: {
            lt: new Date(now.getTime() - 60000) // Simple 1min check
          }
        }
      ]
    },
    include: { company: true }
  })

  for (const agent of dueAgents) {
    const result = await executeHeartbeat(agent)
    results.push(result)

    // Update agent's last heartbeat time
    await prisma.agent.update({
      where: { id: agent.id },
      data: {
        lastHeartbeatAt: now,
        heartbeatStatus: result.status === 'success' ? 'idle' : 'error'
      }
    })
  }

  return results
}

/**
 * Execute heartbeat for a single agent
 */
async function executeHeartbeat(agent: any): Promise<HeartbeatResult> {
  const startedAt = new Date()
  
  try {
    const adapter = getAdapter(agent.adapterType)
    const config = agent.adapterConfig ? JSON.parse(agent.adapterConfig) : {}
    
    // Invoke the agent
    await adapter.invoke(config, {
      agentId: agent.id,
      companyId: agent.companyId,
      agentName: agent.name,
      timestamp: startedAt.toISOString()
    })

    const endedAt = new Date()
    
    return {
      agentId: agent.id,
      status: 'success',
      startedAt,
      endedAt,
      durationMs: endedAt.getTime() - startedAt.getTime()
    }
  } catch (error) {
    const endedAt = new Date()
    
    return {
      agentId: agent.id,
      status: 'error',
      startedAt,
      endedAt,
      durationMs: endedAt.getTime() - startedAt.getTime(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Get adapter implementation by type
 */
function getAdapter(type: string): AdapterInterface {
  switch (type) {
    case 'process':
      return processAdapter
    case 'http':
      return httpAdapter
    case 'openclaw':
    default:
      return openclawAdapter
  }
}

/**
 * OpenClaw Adapter - Calls OpenClaw Gateway
 */
const openclawAdapter: AdapterInterface = {
  async invoke(agentConfig: any, context: any) {
    // TODO: Implement actual OpenClaw Gateway call
    // For now, just log
    console.log(`[Heartbeat] OpenClaw agent: ${context.agentName} (${context.agentId})`)
    
    // Simulate work
    await new Promise(resolve => setTimeout(resolve, 100))
  },

  async status(agentConfig: any) {
    return 'idle'
  },

  async cancel(agentConfig: any) {
    console.log('[Heartbeat] Cancel requested')
  }
}

/**
 * Process Adapter - Executes child process
 */
const processAdapter: AdapterInterface = {
  async invoke(agentConfig: any, context: any) {
    const { command, cwd, env } = agentConfig
    
    if (!command) {
      throw new Error('Process adapter requires "command" in config')
    }

    // In production, use child_process.spawn
    // For now, simulate
    console.log(`[Heartbeat] Process: ${command}`)
    await new Promise(resolve => setTimeout(resolve, 100))
  },

  async status(agentConfig: any) {
    return 'idle'
  },

  async cancel(agentConfig: any) {
    console.log('[Heartbeat] Process cancel')
  }
}

/**
 * HTTP Adapter - Sends HTTP request
 */
const httpAdapter: AdapterInterface = {
  async invoke(agentConfig: any, context: any) {
    const { url, method = 'POST', headers = {} } = agentConfig
    
    if (!url) {
      throw new Error('HTTP adapter requires "url" in config')
    }

    // In production, make actual HTTP request
    // For now, simulate
    console.log(`[Heartbeat] HTTP: ${method} ${url}`)
    await new Promise(resolve => setTimeout(resolve, 100))
  },

  async status(agentConfig: any) {
    return 'idle'
  },

  async cancel(agentConfig: any) {
    console.log('[Heartbeat] HTTP cancel')
  }
}
