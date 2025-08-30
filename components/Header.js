'use client'
import { Bell, Search, Settings, User, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-info mr-3" />
            <span className="text-xl font-bold">Coastal Alert System</span>
          </div>

          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts, locations, or data..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-info"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* System Status Indicator */}
            <div className="hidden sm:flex items-center">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-danger rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Recent Alerts</h3>
                    <div className="space-y-2">
                      <div className="p-2 bg-red-50 rounded border-l-4 border-danger">
                        <p className="font-medium text-sm">Storm Surge Warning</p>
                        <p className="text-xs text-gray-600">Zone A - 5 min ago</p>
                      </div>
                      <div className="p-2 bg-orange-50 rounded border-l-4 border-warning">
                        <p className="font-medium text-sm">High Tide Alert</p>
                        <p className="text-xs text-gray-600">North Beach - 15 min ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:text-gray-900 transition">
              <Settings className="h-6 w-6" />
            </button>

            {/* User Profile */}
            <button className="p-2 text-gray-600 hover:text-gray-900 transition">
              <User className="h-6 w-6" />
            </button>

            {/* Emergency Button */}
            <button className="ml-2 px-4 py-2 text-white rounded-lg  bg-red-700 transition font-medium">
              Emergency
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}