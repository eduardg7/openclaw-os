import Link from 'next/link'
import { Bot, AlertCircle, RefreshCw, Activity, Calendar, MessageSquare } from 'lucide-react'
import { getOpenClawConfig } from '@/lib/openclaw-config'

interface Agent {
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

async function getAgents(): Promise<Agent[]> {
  try {
    // Fetch from OpenClaw Gateway API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/openclaw/agents`, {
      cache: 'no-store' // Always fetch fresh data
    })
    
    if (!res.ok) {
      console.error('Failed to fetch agents:', res.status, res.statusText)
      return []
    }
    
    const data = await res.json()
    return data.agents || []
  } catch (error) {
    console.error('Error fetching agents:', error)
    return []
  }
}

export default async function AgentsPage() {
  const config = await getOpenClawConfig()
  const agents = await getAgents()

  if (!config.configured) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Configuration Required</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Configure OpenClaw OS to view and manage your agents.
          </p>
          <Link
            href="/onboarding"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Configure Now
          </Link>
        </div>
      </div>
    )
  }

  const enabledCount = agents.filter(a => a.enabled !== false).length
  const heartbeatCount = agents.filter(a => a.heartbeat?.enabled).length
  const totalSessions = agents.reduce((sum, a) => sum + (a.sessions?.count || 0), 0)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Agents</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {agents.length} total · {enabledCount} enabled · {heartbeatCount} with heartbeat · {totalSessions} active sessions
              </p>
            </div>
            <nav className="flex gap-4">
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Dashboard
              </Link>
              <Link href="/tasks" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Tasks
              </Link>
              <Link href="/settings" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-600 dark:text-slate-300">
            Manage your AI agents
          </p>
          <form action={async () => {
            'use server'
            // Force revalidation by re-fetching
            // In a real app, you'd use revalidatePath() from next/cache
          }}>
            <button 
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </form>
        </div>

        {agents.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-12 text-center">
            <Bot className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No agents found</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              No agents returned from OpenClaw Gateway.
            </p>
            <div className="text-sm text-slate-500 dark:text-slate-400 space-y-2">
              <p>Possible reasons:</p>
              <ul className="text-left max-w-md mx-auto space-y-1">
                <li>• OpenClaw Gateway is not running</li>
                <li>• No agents configured in <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">~/.openclaw/agents/</code></li>
                <li>• Gateway connection failed</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div 
                key={agent.agentId} 
                className="bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      agent.enabled !== false 
                        ? 'bg-blue-100 dark:bg-blue-900' 
                        : 'bg-slate-100 dark:bg-slate-700'
                    }`}>
                      <Bot className={`w-5 h-5 ${
                        agent.enabled !== false 
                          ? 'text-blue-500' 
                          : 'text-slate-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {agent.name}
                        {agent.isDefault && (
                          <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                            Default
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {agent.agentId}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    agent.enabled !== false 
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    {agent.enabled !== false ? 'Enabled' : 'Disabled'}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {agent.heartbeat?.enabled && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Activity className="w-4 h-4" />
                      <span>Heartbeat: every {agent.heartbeat.every}</span>
                    </div>
                  )}
                  
                  {agent.sessions && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <MessageSquare className="w-4 h-4" />
                      <span>{agent.sessions.count} active session{agent.sessions.count !== 1 ? 's' : ''}</span>
                    </div>
                  )}

                  {!agent.heartbeat?.enabled && !agent.sessions && (
                    <div className="text-slate-500 dark:text-slate-500 text-xs">
                      No active heartbeat or sessions
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
