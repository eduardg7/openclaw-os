import { redirect } from 'next/navigation'
import { checkOnboardingStatus } from '@/lib/onboarding'

export default async function Home() {
  const isConfigured = await checkOnboardingStatus()

  if (!isConfigured) {
    redirect('/onboarding')
  }

  redirect('/dashboard')
}
