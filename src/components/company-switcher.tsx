'use client'

/**
 * Company Switcher Component
 * Multi-company navigation
 */

import { useState, useEffect } from 'react'
import { Building2, ChevronDown, Check } from 'lucide-react'

interface Company {
  id: string
  name: string
}

interface CompanySwitcherProps {
  currentCompanyId?: string
  onSwitch?: (companyId: string) => void
}

export function CompanySwitcher({ currentCompanyId, onSwitch }: CompanySwitcherProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<Company | null>(null)

  useEffect(() => {
    fetch('/api/companies')
      .then(res => res.json())
      .then(data => {
        setCompanies(data.companies || [])
        if (currentCompanyId) {
          const current = data.companies?.find((c: Company) => c.id === currentCompanyId)
          setSelected(current || data.companies?.[0] || null)
        } else if (data.companies?.length > 0) {
          setSelected(data.companies[0])
        }
      })
      .catch(console.error)
  }, [currentCompanyId])

  const handleSelect = (company: Company) => {
    setSelected(company)
    setIsOpen(false)
    
    // Store in localStorage
    localStorage.setItem('selectedCompanyId', company.id)
    
    // Callback
    onSwitch?.(company.id)
    
    // Reload to apply company context
    window.location.reload()
  }

  if (!selected) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
      >
        <Building2 className="w-4 h-4" />
        <span className="font-medium">{selected.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border z-50">
          {companies.map(company => (
            <button
              key={company.id}
              onClick={() => handleSelect(company)}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg"
            >
              <span>{company.name}</span>
              {selected.id === company.id && (
                <Check className="w-4 h-4 text-green-500" />
              )}
            </button>
          ))}
          
          <div className="border-t px-4 py-2">
            <a
              href="/companies"
              className="text-sm text-blue-500 hover:underline"
            >
              Manage companies
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
