'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Circle, Loader2 } from 'lucide-react'

const steps = [
  { id: 'welcome', title: 'Welcome', description: 'Get started with OpenClaw OS' },
  { id: 'detect', title: 'Detect OpenClaw', description: 'Find your OpenClaw installation' },
  { id: 'agents', title: 'Configure Agents', description: 'Set up your AI agents' },
  { id: 'complete', title: 'Complete', description: 'Ready to go!' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [openclawPath, setOpenclawPath] = useState('')
  const [detected, setDetected] = useState(false)

  const handleNext = async () => {
    setLoading(true)

    // Simulate detection
    if (currentStep === 1) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setDetected(true)
      setOpenclawPath('~/.openclaw')
    }

    setLoading(false)

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save config and redirect
      await fetch('/api/config', {
        method: 'POST',
        body: JSON.stringify({ openclawPath }),
      })
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-2xl p-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index < currentStep
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs mt-2 text-slate-600 dark:text-slate-400">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          {currentStep === 0 && (
            <div>
              <h1 className="text-3xl font-bold mb-4">Welcome to OpenClaw OS 👋</h1>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Your personal operating system for AI agents. Let's get you set up in just a few steps.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Manage all your AI agents in one place</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Track tasks across projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Real-time mission control dashboard</span>
                </li>
              </ul>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h1 className="text-3xl font-bold mb-4">Detecting OpenClaw</h1>
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  <span>Scanning for OpenClaw installation...</span>
                </div>
              ) : detected ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">OpenClaw detected!</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                    Path: <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{openclawPath}</code>
                  </p>
                </div>
              ) : (
                <p className="text-slate-600 dark:text-slate-300">
                  Click "Next" to automatically detect your OpenClaw installation.
                </p>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h1 className="text-3xl font-bold mb-4">Configure Agents</h1>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Your agents will be automatically synced from OpenClaw. You can customize them later in Settings.
              </p>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Agents will be loaded from: <code className="bg-slate-100 dark:bg-slate-600 px-2 py-1 rounded">~/.openclaw/agents/</code>
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h1 className="text-3xl font-bold mb-4">All Set! 🎉</h1>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                OpenClaw OS is ready to use. Click "Launch" to open your Mission Control dashboard.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8">
            {currentStep > 0 && currentStep < 3 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {currentStep === 3 ? 'Launch' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
