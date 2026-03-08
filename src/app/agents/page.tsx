import Link from 'next/link'
import { Bot, Plus, AlertCircle } from 'lucide-react'
import { getOpenClawConfig } from '@/lib/openclaw-config'

async function getAgents() {
  // TODO: Fetch from OpenClaw when API is ready
  return []
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Agents</h1>
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
        </div>

        {agents.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-12 text-center">
            <Bot className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No agents configured</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Your agents from OpenClaw will appear here once configured.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Configure agents in your OpenClaw installation at <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">~/.openclaw/agents/</code>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent: any) => (
              <div key={agent.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{agent.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{agent.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
