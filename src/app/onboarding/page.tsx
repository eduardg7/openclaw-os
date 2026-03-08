'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Circle, Loader2, Moon, Sun, Monitor, Zap, Users, FolderHeart, ChevronRight, Sparkles } from 'lucide-react'

const steps = [
  { id: 'welcome', title: 'Welcome', description: 'Get started', icon: Sparkles },
  { id: 'theme', title: 'Theme', description: 'Appearance', icon: Sun },
  { id: 'detect', title: 'Detect', description: 'Installation', icon: Monitor },
  { id: 'agents', title: 'Agents', description: 'Preferences', icon: Users },
  { id: 'project', title: 'Project', description: 'Defaults', icon: FolderHeart },
  { id: 'complete', title: 'Complete', description: 'Ready!', icon: CheckCircle2 },
]

const themes = [
  { id: 'light', name: 'Light', description: 'Clean and bright', icon: Sun },
  { id: 'dark', name: 'Dark', description: 'Easy on the eyes', icon: Moon },
  { id: 'system', name: 'System', description: 'Match your device', icon: Monitor },
]

const agentPreferences = [
  { id: 'auto-start', label: 'Auto-start agents on launch', description: 'Automatically activate your agents when OpenClaw OS starts' },
  { id: 'notifications', label: 'Enable notifications', description: 'Get notified when agents complete tasks or need attention' },
  { id: 'sound', label: 'Sound effects', description: 'Play subtle sounds for agent activities' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [openclawPath, setOpenclawPath] = useState('')
  const [detected, setDetected] = useState(false)
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in')
  
  // User preferences
  const [theme, setTheme] = useState('system')
  const [preferences, setPreferences] = useState({
    'auto-start': true,
    'notifications': true,
    'sound': false,
  })
  const [defaultProject, setDefaultProject] = useState('dashboard')

  const handleNext = async () => {
    setFadeState('out')
    await new Promise(resolve => setTimeout(resolve, 200))
    
    setLoading(true)

    // Simulate detection on step 2
    if (currentStep === 2) {
      await new Promise(resolve => setTimeout(resolve, 1200))
      setDetected(true)
      setOpenclawPath('~/.openclaw')
    }

    setLoading(false)
    setFadeState('in')

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save all config and redirect
      await fetch('/api/config', {
        method: 'POST',
        body: JSON.stringify({ 
          openclawPath,
          theme,
          preferences,
          defaultProject,
          onboardingComplete: true,
        }),
      })
      
      // Apply theme
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark')
      }
      
      router.push('/dashboard')
    }
  }

  const handleSkip = async () => {
    // Save with defaults
    await fetch('/api/config', {
      method: 'POST',
      body: JSON.stringify({ 
        openclawPath: '~/.openclaw',
        theme: 'system',
        preferences: {
          'auto-start': true,
          'notifications': true,
          'sound': false,
        },
        defaultProject: 'dashboard',
        onboardingComplete: true,
      }),
    })
    router.push('/dashboard')
  }

  const handlePrevious = () => {
    setFadeState('out')
    setTimeout(() => {
      setCurrentStep(currentStep - 1)
      setFadeState('in')
    }, 200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
            <Zap className="w-8 h-8 text-blue-500" />
            OpenClaw OS
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8 px-4">
          <div className="flex justify-between items-center relative">
            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700" />
            <div 
              className="absolute top-5 left-0 h-0.5 bg-blue-500 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
            
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index < currentStep
                      ? 'bg-green-500 text-white scale-110'
                      : index === currentStep
                      ? 'bg-blue-500 text-white scale-110 ring-4 ring-blue-500/20'
                      : 'bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                  index <= currentStep ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Card */}
        <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 transition-all duration-200 ${
          fadeState === 'in' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to OpenClaw OS
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg">
                  Your personal command center for AI-powered productivity
                </p>
              </div>
              
              <div className="grid gap-4 mt-8">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <div className="p-2 rounded-lg bg-blue-500 text-white">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">Manage All Your Agents</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Coordinate multiple AI agents from one unified interface</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 border border-green-100 dark:border-green-800">
                  <div className="p-2 rounded-lg bg-green-500 text-white">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">Track Tasks in Real-Time</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Monitor progress across projects with live updates</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 border border-purple-100 dark:border-purple-800">
                  <div className="p-2 rounded-lg bg-purple-500 text-white">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">Mission Control Dashboard</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Visualize your entire AI workflow at a glance</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Choose Your Theme</h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Select how OpenClaw OS should look. You can always change this later.
                </p>
              </div>
              
              <div className="grid gap-3">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                      theme === t.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${
                      theme === t.id ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      <t.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-slate-800 dark:text-slate-100">{t.name}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">{t.description}</div>
                    </div>
                    {theme === t.id && <CheckCircle2 className="w-6 h-6 text-blue-500" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Detecting OpenClaw</h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Let&apos;s find your OpenClaw installation to connect everything
                </p>
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center gap-4 py-8">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                  <span className="text-slate-600 dark:text-slate-300">Scanning for OpenClaw installation...</span>
                </div>
              ) : detected ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-center gap-3 text-green-700 dark:text-green-400 mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-semibold text-lg">OpenClaw detected successfully!</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Installation found at: <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded font-mono">{openclawPath}</code>
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
                    <Monitor className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Click &quot;Next&quot; to automatically detect your OpenClaw installation.
                  </p>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Agent Preferences</h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Customize how your agents behave. These settings can be changed anytime.
                </p>
              </div>
              
              <div className="space-y-3">
                {agentPreferences.map((pref) => (
                  <label
                    key={pref.id}
                    className="flex items-start gap-4 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={preferences[pref.id as keyof typeof preferences]}
                      onChange={(e) => setPreferences({ ...preferences, [pref.id]: e.target.checked })}
                      className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 dark:text-slate-100">{pref.label}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">{pref.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Default Project</h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Choose which page to open when you start OpenClaw OS
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'dashboard', name: 'Dashboard', description: 'Overview of all activity' },
                  { id: 'agents', name: 'Agents', description: 'Manage your AI agents' },
                  { id: 'tasks', name: 'Tasks', description: 'View and create tasks' },
                  { id: 'settings', name: 'Settings', description: 'Configure OpenClaw OS' },
                ].map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setDefaultProject(project.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      defaultProject === project.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="font-semibold text-slate-800 dark:text-slate-100">{project.name}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">{project.description}</div>
                    {defaultProject === project.id && (
                      <CheckCircle2 className="w-5 h-5 text-blue-500 mt-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white mb-4 animate-bounce">
                <Sparkles className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">You&apos;re All Set! 🎉</h1>
                <p className="text-xl text-slate-600 dark:text-slate-300">
                  OpenClaw OS is ready to supercharge your workflow
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <div className="text-2xl font-bold text-blue-500">{theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Theme</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <div className="text-2xl font-bold text-green-500">{Object.values(preferences).filter(Boolean).length}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Preferences</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <div className="text-2xl font-bold text-purple-500 capitalize">{defaultProject}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Default View</div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div>
              {currentStep === 0 && (
                <button
                  onClick={handleSkip}
                  className="px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  Skip setup →
                </button>
              )}
              {currentStep > 0 && currentStep < 5 && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  ← Back
                </button>
              )}
            </div>
            
            <button
              onClick={handleNext}
              disabled={loading}
              className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition-all hover:scale-105 active:scale-95"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {currentStep === 5 ? 'Launch OpenClaw OS' : 'Continue'}
              {!loading && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </div>
  )
}
