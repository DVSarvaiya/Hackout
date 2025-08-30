'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  AlertCircle,
  BarChart3,
  FileText,
  Menu
} from 'lucide-react'

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: AlertCircle, label: 'Alerts', href: '/alerts' },
    { icon: BarChart3, label: 'Analysis', href: '/data-analysis' },
    { icon: FileText, label: 'Reports', href: '/reports' },
    { icon: Menu, label: 'More', href: '/menu' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-info' : 'text-gray-600'
              }`}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}