'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  AlertCircle,
  BarChart3,
  FileText,
  Map,
  Users,
  Settings,
  UserCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function Sidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname()

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: AlertCircle, label: 'Alerts', href: '/alerts' },
    { icon: BarChart3, label: 'Data Analysis', href: '/data-analysis' },
    { icon: FileText, label: 'Reports', href: '/reports' },
    { icon: Map, label: 'Zone Management', href: '/zones' },
    { icon: Users, label: 'Teams', href: '/teams' },
  ]

  const secondaryItems = [
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: UserCircle, label: 'About', href: '/about' },
  ]

  return (
    <aside className={`hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50 z-50"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center ${collapsed ? 'justify-center' : ''} ${collapsed ? 'px-2 py-2' : 'px-3 py-2'} rounded-lg transition ${
                    isActive
                      ? 'bg-blue-300 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon
                    className={`flex-shrink-0 h-5 w-5 ${
                      !collapsed ? 'mr-3' : ''
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
                
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md 
                                  opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity 
                                  whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Secondary Items */}
        <div className="space-y-1">
          {secondaryItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center ${collapsed ? 'justify-center' : ''} ${collapsed ? 'px-2 py-2' : 'px-3 py-2'} rounded-lg transition ${
                    isActive
                      ? 'bg-blue-300 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon
                    className={`flex-shrink-0 h-5 w-5 ${
                      !collapsed ? 'mr-3' : ''
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
                
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md 
                                  opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity 
                                  whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {/* User Role Info */}
      <div className={`p-4 border-t border-gray-200 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed ? (
          <div className="text-sm">
            <p className="font-medium">Emergency Response</p>
            <p className="text-gray-600">Admin Access</p>
          </div>
        ) : (
          <div className="relative group">
            <UserCircle className="flex-shrink-0 h-6 w-6 text-gray-600" />
            {/* Tooltip for user info in collapsed state */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md 
                            opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity 
                            whitespace-nowrap z-50 bottom-0">
              Emergency Response - Admin
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}