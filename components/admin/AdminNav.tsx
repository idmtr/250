'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { FileText, Plus, List } from 'lucide-react'

interface AdminNavProps {
  lang: string
}

export function AdminNav({ lang }: AdminNavProps) {
  const pathname = usePathname()
  
  const navItems = [
    {
      href: `/${lang}/admin/articles`,
      label: 'All Articles',
      icon: List
    },
    {
      href: `/${lang}/admin/articles/new`,
      label: 'New Article',
      icon: Plus
    }
  ]

  return (
    <nav className="mb-8 border-b py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 -mb-px">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 h-full border-b-2 text-sm font-medium",
                  "hover:text-primary transition-colors",
                  isActive 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}