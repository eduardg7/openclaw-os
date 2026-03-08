'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Save, Settings, CheckCircle, AlertCircle } from 'lucide-react'

export default function SettingsPage() {
  const [config, setConfig] = useState({
    openclawPath: '~/.openclaw',
    gatewayUrl: 'http://localhost:3100',
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Load existing config
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.configured) {
          setConfig({
            openclawPath: data.openclawPath || '~/.openclaw',
            gatewayUrl: data.gatewayUrl || 'http://localhost:3100',
          })
        }
      })
      .catch(() => {
        // Use defaults
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSaved(false)

    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })

      if (!res.ok) throw new Error('Failed to save')

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError('Failed to save configuration')
    } finally {
      setLoading(false)
    }
  }

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

          {saved && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle className="w-5 h-5" />
              Settings saved successfully
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">OpenClaw Path</label>
              <input
                type="text"
                value={config.openclawPath}
                onChange={(e) => setConfig({ ...config, openclawPath: e.target.value })}
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
                value={config.gatewayUrl}
                onChange={(e) => setConfig({ ...config, gatewayUrl: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
              />
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                OpenClaw Gateway API endpoint
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Changes'}
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
