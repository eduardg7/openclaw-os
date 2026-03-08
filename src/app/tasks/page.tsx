import Link from 'next/link'
import { ListTodo, AlertCircle } from 'lucide-react'
import { getOpenClawConfig } from '@/lib/openclaw-config'

async function getTasks() {
  // TODO: Fetch from OpenClaw when API is ready
  return []
}

export default async function TasksPage() {
  const config = await getOpenClawConfig()
  const tasks = await getTasks()

  if (!config.configured) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Configuration Required</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Configure OpenClaw OS to view and manage tasks.
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
            <h1 className="text-2xl font-bold">Tasks</h1>
            <nav className="flex gap-4">
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Dashboard
              </Link>
              <Link href="/agents" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Agents
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
            Track tasks across all projects
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-12 text-center">
            <ListTodo className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Tasks will appear here when your agents start working.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Task data will be synced from your OpenClaw installation automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task: any) => (
              <div key={task.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{task.status}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
