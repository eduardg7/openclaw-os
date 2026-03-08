import { NextRequest, NextResponse } from 'next/server'
import { saveConfig, getConfig } from '@/lib/onboarding'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const config = await saveConfig({
      openclawPath: body.openclawPath,
      theme: body.theme,
      preferences: body.preferences,
      defaultProject: body.defaultProject,
      onboardingComplete: body.onboardingComplete,
    })

    return NextResponse.json({ success: true, config })
  } catch (error) {
    console.error('Failed to save configuration:', error)
    return NextResponse.json(
      { error: 'Failed to save configuration' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const config = await getConfig()
    
    if (!config) {
      return NextResponse.json({ configured: false })
    }

    return NextResponse.json({ 
      configured: true,
      ...config 
    })
  } catch (error) {
    console.error('Failed to get configuration:', error)
    return NextResponse.json({ configured: false })
  }
}
