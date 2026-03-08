import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Building2, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CompaniesPage() {
  const companies = await prisma.company.findMany({
    include: {
      _count: {
        select: { agents: true, tasks: true, goals: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Companies</h1>
          <Link
            href="/companies/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            New Company
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {companies.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-4">No companies yet</p>
            <Link
              href="/companies/new"
              className="text-blue-500 hover:underline"
            >
              Create your first company
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companies.map(company => (
              <Link
                key={company.id}
                href={`/dashboard?company=${company.id}`}
                className="block p-6 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{company.name}</h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Created {new Date(company.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Building2 className="w-8 h-8 text-slate-400" />
                </div>
                
                <div className="flex gap-4 mt-4 text-sm text-slate-600">
                  <span>{company._count.agents} agents</span>
                  <span>{company._count.tasks} tasks</span>
                  <span>{company._count.goals} goals</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
