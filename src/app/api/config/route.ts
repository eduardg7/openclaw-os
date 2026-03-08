import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import os from 'os'

const CONFIG_FILE = path.join(os.homedir(), '.openclaw', 'os-config.json')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { openclawPath } = body

    const configDir = path.dirname(CONFIG_FILE)
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true })
    }

    fs.writeFileSync(CONFIG_FILE, JSON.stringify({
      openclawPath,
      agentsPath: path.join(openclawPath, 'agents'),
      createdAt: new Date().toISOString(),
    }, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save configuration' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(CONFIG_FILE)) {
      return NextResponse.json({ configured: false })
    }

    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
    return NextResponse.json({ configured: true, ...config })
  } catch {
    return NextResponse.json({ configured: false })
  }
}
