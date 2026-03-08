import { prisma } from '@/lib/db'
import { DollarSign, TrendingUp, AlertTriangle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CostsPage() {
  const company = await prisma.company.findFirst()
  
  if (!company) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">No company found</p>
      </div>
    )
  }
  
  const agents = await prisma.agent.findMany({
    where: { companyId: company.id },
    select: {
      id: true,
      name: true,
      title: true,
      monthlyBudgetUsd: true,
      spentUsd: true,
      tasks: {
        select: {
          id: true,
          title: true,
          costUsd: true,
          inputTokens: true,
          outputTokens: true
        },
        where: { costUsd: { gt: 0 } },
        orderBy: { costUsd: 'desc' },
        take: 5
      }
    }
  })
  
  const totalBudget = agents.reduce((sum, a) => sum + (a.monthlyBudgetUsd || 0), 0)
  const totalSpent = agents.reduce((sum, a) => sum + a.spentUsd, 0)
  const utilization = totalBudget > 0 ? (totalSpent / totalBudget * 100) : 0
  
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Costs</h1>
          <p className="text-sm text-slate-600">{company.name}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Budget</p>
                <p className="text-3xl font-bold">${totalBudget.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Spent</p>
                <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Utilization</p>
                <p className="text-3xl font-bold">{utilization.toFixed(1)}%</p>
              </div>
              {utilization > 80 ? (
                <AlertTriangle className="w-8 h-8 text-red-500" />
              ) : (
                <TrendingUp className="w-8 h-8 text-blue-500" />
              )}
            </div>
          </div>
        </div>

        {/* Agents Cost Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Agent Costs</h2>
          </div>
          
          {agents.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No agents with cost data
            </div>
          ) : (
            <div className="divide-y">
              {agents.map(agent => {
                const budgetPercent = agent.monthlyBudgetUsd 
                  ? (agent.spentUsd / agent.monthlyBudgetUsd * 100)
                  : 0
                
                return (
                  <div key={agent.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        {agent.title && (
                          <div className="text-sm text-slate-500">{agent.title}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${agent.spentUsd.toFixed(2)}</div>
                        {agent.monthlyBudgetUsd && (
                          <div className="text-sm text-slate-500">
                            of ${agent.monthlyBudgetUsd.toFixed(2)} budget
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    {agent.monthlyBudgetUsd && (
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            budgetPercent > 80 ? 'bg-red-500' : 
                            budgetPercent > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(budgetPercent, 100)}%` }}
                        />
                      </div>
                    )}
                    
                    {/* Top tasks */}
                    {agent.tasks.length > 0 && (
                      <div className="mt-3 pl-4 border-l-2 border-slate-200">
                        <div className="text-xs text-slate-500 mb-1">Top tasks by cost:</div>
                        {agent.tasks.map(task => (
                          <div key={task.id} className="text-sm flex justify-between">
                            <span className="truncate">{task.title}</span>
                            <span className="text-slate-500 ml-2">${task.costUsd.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
