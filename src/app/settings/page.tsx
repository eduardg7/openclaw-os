import Link from 'next/link'
import { Save, Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Settings</h1>
            <nav className="flex gap-4">
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Dashboard
              </Link>
              <Link href="/agents" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Agents
              </Link>
              <Link href="/tasks" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Tasks
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Configuration</h2>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">OpenClaw Path</label>
              <input
                type="text"
                defaultValue="~/.openclaw"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
              />
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Path to your OpenClaw installation
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gateway URL</label>
              <input
                type="text"
                defaultValue="http://localhost:3100"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
              />
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                OpenClaw Gateway API endpoint
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p><strong>OpenClaw OS</strong> v0.1.0</p>
            <p>Personal Operating System for AI Agents</p>
            <p>
              <a href="https://github.com/eduardg7/openclaw-os" className="text-blue-500 hover:underline">
                GitHub Repository
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
