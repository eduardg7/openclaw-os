import { prisma } from '@/lib/db'
import { OrgChart } from '@/components/org-chart'

// Force dynamic rendering (Prisma can't run at build time)
export const dynamic = 'force-dynamic'

export default async function OrgChartPage() {
  // TODO: Get company from context/cookie
  const company = await prisma.company.findFirst()
  
  if (!company) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-300">
          No company found. Create one first.
        </p>
      </div>
    )
  }

  const agents = await prisma.agent.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: 'asc' }
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Org Chart</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {company.name} · {agents.length} agents
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <OrgChart 
          agents={agents.map(a => ({
            id: a.id,
            name: a.name,
            title: a.title || undefined,
            role: a.role,
            reportsToId: a.reportsToId || undefined,
            enabled: a.enabled
          }))}
          onAgentClick={(agent) => {
            console.log('Clicked agent:', agent)
            // TODO: Open agent detail modal
          }}
        />
      </main>
    </div>
  )
}
