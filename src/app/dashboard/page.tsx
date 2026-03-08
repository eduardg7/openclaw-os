import Link from 'next/link'
import { Activity, Bot, CheckCircle2, Clock, ListTodo, TrendingUp } from 'lucide-react'

async function getStats() {
  // TODO: Fetch from OpenClaw
  return {
    agents: 0,
    activeTasks: 0,
    completedToday: 0,
    avgResponseTime: '0ms',
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

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
                No recent activity. Connect your agents to see updates here.
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
                href="/agents/new"
                className="block p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600"
              >
                <span className="font-medium">Add New Agent</span>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Configure a new AI agent
                </p>
              </Link>
              <Link
                href="/settings"
                className="block p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600"
              >
                <span className="font-medium">Settings</span>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Customize your OS configuration
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
