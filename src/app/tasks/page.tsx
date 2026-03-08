import Link from 'next/link'
import { ListTodo, Plus } from 'lucide-react'

async function getTasks() {
  // TODO: Fetch from OpenClaw
  return []
}

export default async function TasksPage() {
  const tasks = await getTasks()

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
              Tasks will appear here when agents are working.
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
