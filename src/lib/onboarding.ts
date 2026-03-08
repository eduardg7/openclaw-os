import fs from 'fs'
import path from 'path'
import os from 'os'

const CONFIG_FILE = path.join(os.homedir(), '.openclaw', 'os-config.json')

export interface Config {
  openclawPath: string
  agentsPath?: string
  theme?: 'light' | 'dark' | 'system'
  preferences?: {
    'auto-start': boolean
    'notifications': boolean
    'sound': boolean
  }
  defaultProject?: string
  onboardingComplete?: boolean
  createdAt?: string
  updatedAt?: string
}

export async function checkOnboardingStatus(): Promise<boolean> {
  try {
    if (!fs.existsSync(CONFIG_FILE)) return false
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
    return config.onboardingComplete === true
  } catch {
    return false
  }
}

export async function getConfig(): Promise<Config | null> {
  try {
    if (!fs.existsSync(CONFIG_FILE)) return null
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
  } catch {
    return null
  }
}

export async function getOpenClawPath(): Promise<string | null> {
  try {
    const config = await getConfig()
    return config?.openclawPath || null
  } catch {
    return null
  }
}

export async function saveConfig(config: Partial<Config>): Promise<Config> {
  const configDir = path.dirname(CONFIG_FILE)
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true })
  }
  
  // Read existing config if it exists
  let existingConfig: Config = {
    openclawPath: '~/.openclaw',
    agentsPath: '~/.openclaw/agents',
    theme: 'system',
    preferences: {
      'auto-start': true,
      'notifications': true,
      'sound': false,
    },
    defaultProject: 'dashboard',
    onboardingComplete: false,
  }
  
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      existingConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
    } catch (error) {
      // Use defaults if file is corrupted
    }
  }
  
  // Merge configs
  const newConfig: Config = {
    ...existingConfig,
    ...config,
    updatedAt: new Date().toISOString(),
  }
  
  // Set createdAt if this is a new config
  if (!existingConfig.createdAt) {
    newConfig.createdAt = new Date().toISOString()
  }
  
  // Ensure agentsPath is set if openclawPath is provided
  if (config.openclawPath && !config.agentsPath) {
    newConfig.agentsPath = path.join(config.openclawPath, 'agents')
  }
  
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(newConfig, null, 2))
  return newConfig
}
