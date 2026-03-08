import fs from 'fs'
import path from 'path'
import os from 'os'

const CONFIG_FILE = path.join(os.homedir(), '.openclaw', 'os-config.json')

export async function checkOnboardingStatus(): Promise<boolean> {
  try {
    return fs.existsSync(CONFIG_FILE)
  } catch {
    return false
  }
}

export async function getOpenClawPath(): Promise<string | null> {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
    return config.openclawPath || null
  } catch {
    return null
  }
}

export async function saveConfig(config: { openclawPath: string; agentsPath: string }): Promise<void> {
  const configDir = path.dirname(CONFIG_FILE)
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true })
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2))
}
