/**
 * Goals hierarchy page - Tree view
 */

import { prisma } from '@/lib/db'
import Link from 'next/link'
import { ChevronRight, Target, Flag, Milestone, Circle } from 'lucide-react'

export const dynamic = 'force-dynamic'

const levelIcons: Record<string, any> = {
  initiative: Target,
  project: Flag,
  milestone: Milestone,
  issue: Circle
}

const levelColors: Record<string, string> = {
  initiative: 'text-purple-600 bg-purple-50',
  project: 'text-blue-600 bg-blue-50',
  milestone: 'text-green-600 bg-green-50',
  issue: 'text-orange-600 bg-orange-50'
}

async function getGoalsTree(companyId: string) {
  const goals = await prisma.goal.findMany({
    where: { companyId },
    include: {
      children: {
        include: { _count: { select: { tasks: true } } }
      },
      _count: { select: { tasks: true, children: true } }
    },
    orderBy: { createdAt: 'asc' }
  })
  
  // Build tree
  const rootGoals = goals.filter(g => !g.parentId)
  return rootGoals
}

function GoalNode({ goal, depth = 0 }: { goal: any; depth?: number }) {
  const Icon = levelIcons[goal.level] || Circle
  const colorClass = levelColors[goal.level] || 'text-slate-600 bg-slate-50'
  
  return (
    <div className="mb-2">
      <div 
        className={`flex items-center gap-2 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer`}
        style={{ marginLeft: `${depth * 24}px` }}
      >
        <div className={`p-1.5 rounded ${colorClass}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="font-medium">{goal.title}</div>
          {goal.description && (
            <div className="text-sm text-slate-500 truncate">{goal.description}</div>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{goal._count.tasks} tasks</span>
          {goal._count.children > 0 && (
            <span>{goal._count.children} children</span>
          )}
          <span className={`px-2 py-0.5 rounded ${colorClass}`}>{goal.level}</span>
        </div>
      </div>
      
      {goal.children?.map((child: any) => (
        <GoalNode key={child.id} goal={child} depth={depth + 1} />
      ))}
    </div>
  )
}

export default async function GoalsPage() {
  const company = await prisma.company.findFirst()
  
  if (!company) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <p className="text-slate-600">No company found</p>
      </div>
    )
  }
  
  const goals = await getGoalsTree(company.id)
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Goals</h1>
            <p className="text-sm text-slate-600">{company.name}</p>
          </div>
          <Link
            href="/goals/new"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            New Goal
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-4">No goals yet</p>
            <Link
              href="/goals/new"
              className="text-blue-500 hover:underline"
            >
              Create your first goal
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
            {goals.map(goal => (
              <GoalNode key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
