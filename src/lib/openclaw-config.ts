import fs from 'fs'
import path from 'path'
import os from 'os'

const CONFIG_FILE = path.join(os.homedir(), '.openclaw', 'os-config.json')

export interface OpenClawConfig {
  configured: boolean
  openclawPath?: string
  gatewayUrl?: string
  createdAt?: string
}

export async function getOpenClawConfig(): Promise<OpenClawConfig> {
  try {
    if (!fs.existsSync(CONFIG_FILE)) {
      return { configured: false }
    }

    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
    return {
      configured: true,
      ...config,
    }
  } catch {
    return { configured: false }
  }
}

export async function saveOpenClawConfig(config: Partial<OpenClawConfig>): Promise<void> {
  const configDir = path.dirname(CONFIG_FILE)
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true })
  }

  const existingConfig = await getOpenClawConfig()
  const newConfig = {
    ...existingConfig,
    ...config,
    updatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(CONFIG_FILE, JSON.stringify(newConfig, null, 2))
}
