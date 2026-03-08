/**
 * OpenClaw Gateway API Client
 * 
 * Communicates with the OpenClaw Gateway via WebSocket RPC
 * to fetch agents, sessions, and task data.
 */

import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

export interface GatewayConfig {
  url: string
  token?: string
}

export interface AgentInfo {
  agentId: string
  name: string
  isDefault?: boolean
  enabled?: boolean
  heartbeat?: {
    enabled: boolean
    every: string
    everyMs: number
  }
  sessions?: {
    path: string
    count: number
  }
}

export interface SessionInfo {
  agentId: string
  key: string
  kind?: string
  sessionId?: string
  updatedAt: number
  age: number
  systemSent?: boolean
  abortedLastRun?: boolean
  inputTokens?: number
  outputTokens?: number
}

export interface GatewayStatus {
  defaultAgentId: string
  agents: AgentInfo[]
  sessions: {
    paths: string[]
    count: number
    defaults: {
      model: string
      contextTokens: number
    }
    recent: SessionInfo[]
  }
  channelSummary: string[]
  queuedSystemEvents: unknown[]
}

export interface HealthStatus {
  ok: boolean
  ts: number
  durationMs: number
  channels: Record<string, unknown>
  defaultAgentId: string
  agents: AgentInfo[]
}

/**
 * Get Gateway configuration from environment or OpenClaw config file
 */
export function getGatewayConfig(): GatewayConfig {
  // Check environment variables first
  const envUrl = process.env.OPENCLAW_GATEWAY_URL
  const envToken = process.env.OPENCLAW_GATEWAY_TOKEN
  
  if (envUrl) {
    return {
      url: envUrl,
      token: envToken
    }
  }
  
  // Try to read from OpenClaw config
  const configPath = join(homedir(), '.openclaw', 'openclaw.json')
  
  if (existsSync(configPath)) {
    try {
      const config = JSON.parse(readFileSync(configPath, 'utf-8'))
      const port = config.gateway?.port || 18789
      const token = config.gateway?.auth?.token
      
      return {
        url: `http://127.0.0.1:${port}`,
        token
      }
    } catch (error) {
      console.error('Failed to read OpenClaw config:', error)
    }
  }
  
  // Default to standard Gateway URL
  return {
    url: 'http://127.0.0.1:18789'
  }
}

/**
 * Call OpenClaw Gateway RPC method via CLI
 * Falls back to direct HTTP if available
 */
export async function callGatewayMethod<T>(
  method: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  const config = getGatewayConfig()
  
  try {
    // Use openclaw CLI to call gateway method
    const tokenArg = config.token ? `--token ${config.token}` : ''
    const paramsArg = Object.keys(params).length > 0 
      ? `--params '${JSON.stringify(params)}'` 
      : ''
    
    const command = `openclaw gateway call ${method} --json ${tokenArg} ${paramsArg}`.trim()
    
    const result = execSync(command, {
      encoding: 'utf-8',
      timeout: 10000,
      env: {
        ...process.env,
        // Ensure we're not in dev mode
        OPENCLAW_DEV: undefined
      }
    })
    
    return JSON.parse(result) as T
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Gateway call failed: ${error.message}`)
    }
    throw error
  }
}

/**
 * Check if Gateway is available
 */
export async function isGatewayAvailable(): Promise<boolean> {
  try {
    const health = await callGatewayMethod<HealthStatus>('health')
    return health.ok === true
  } catch {
    return false
  }
}

/**
 * Get Gateway status including agents and sessions
 */
export async function getGatewayStatus(): Promise<GatewayStatus | null> {
  try {
    const result = await callGatewayMethod<any>('status')
    
    // Normalize the response - status has agents nested under heartbeat
    return {
      defaultAgentId: result.heartbeat?.defaultAgentId || result.defaultAgentId || '',
      agents: result.heartbeat?.agents || result.agents || [],
      sessions: result.sessions || { paths: [], count: 0, defaults: { model: '', contextTokens: 0 }, recent: [] },
      channelSummary: result.channelSummary || [],
      queuedSystemEvents: result.queuedSystemEvents || []
    }
  } catch (error) {
    console.error('Failed to get Gateway status:', error)
    return null
  }
}

/**
 * Get Gateway health
 */
export async function getGatewayHealth(): Promise<HealthStatus | null> {
  try {
    return await callGatewayMethod<HealthStatus>('health')
  } catch (error) {
    console.error('Failed to get Gateway health:', error)
    return null
  }
}

/**
 * Get list of all agents from Gateway
 */
export async function getAgents(): Promise<AgentInfo[]> {
  try {
    const status = await getGatewayStatus()
    return status?.agents || []
  } catch (error) {
    console.error('Failed to get agents:', error)
    return []
  }
}

/**
 * Get recent sessions from Gateway
 */
export async function getSessions(limit: number = 20): Promise<SessionInfo[]> {
  try {
    const status = await getGatewayStatus()
    return status?.sessions?.recent?.slice(0, limit) || []
  } catch (error) {
    console.error('Failed to get sessions:', error)
    return []
  }
}

/**
 * Get task data from TASK_DB.json
 */
export async function getTasks(): Promise<unknown[]> {
  try {
    const config = getGatewayConfig()
    
    // Try common task database locations
    const taskDbPaths = [
      join(homedir(), 'faintech-os', 'data', 'ops', 'TASK_DB.json'),
      join(homedir(), '.openclaw', 'tasks', 'TASK_DB.json'),
    ]
    
    for (const path of taskDbPaths) {
      if (existsSync(path)) {
        const content = readFileSync(path, 'utf-8')
        const data = JSON.parse(content)
        return data.tasks || []
      }
    }
    
    return []
  } catch (error) {
    console.error('Failed to get tasks:', error)
    return []
  }
}
