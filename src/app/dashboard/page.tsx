import Link from 'next/link'
import { Activity, Bot, CheckCircle2, Clock, ListTodo, TrendingUp, AlertCircle } from 'lucide-react'
import { getConfig } from '@/lib/onboarding'

async function getStats() {
  const config = await getConfig()

  if (!config || !config.onboardingComplete) {
    return null
  }

  // TODO: Fetch real stats from OpenClaw when API is ready
  return {
    agents: 0,
    activeTasks: 0,
    completedToday: 0,
    avgResponseTime: '-',
    configured: true,
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Configuration Required</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            OpenClaw OS needs to connect to your OpenClaw installation to display data.
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
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Mission Control</h1>
            <nav className="flex gap-4">
              <Link href="/agents" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Agents
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Agents</p>
                <p className="text-3xl font-bold">{stats.agents}</p>
              </div>
              <Bot className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Tasks</p>
                <p className="text-3xl font-bold">{stats.activeTasks}</p>
              </div>
              <ListTodo className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Completed Today</p>
                <p className="text-3xl font-bold">{stats.completedToday}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Avg Response</p>
                <p className="text-3xl font-bold">{stats.avgResponseTime}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <Activity className="w-5 h-5 text-slate-400" />
            </div>
            <div className="space-y-3">
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                No activity yet. Activity will appear here when your agents start working.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
              <TrendingUp className="w-5 h-5 text-slate-400" />
            </div>
            <div className="space-y-3">
              <Link
                href="/settings"
                className="block p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600"
              >
                <span className="font-medium">Settings</span>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Configure your OS
                </p>
              </Link>
              <a
                href="https://docs.openclaw.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600"
              >
                <span className="font-medium">Documentation</span>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Learn how to use OpenClaw OS
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
