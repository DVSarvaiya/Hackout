'use client'
import { Bell, Search, Settings, User, AlertTriangle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Add scroll effect for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notification-dropdown')) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showNotifications])

  return (
    <header className={`bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center animate-fadeIn">
          <img src="image.png" width={50} height={50}/>
            <span className="text-xl font-bold text-gray-800">Blue Alert</span>
          </div>

          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 animate-fadeIn animation-delay-100">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts, locations, or data..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* System Status Indicator */}
            <div className="hidden sm:flex items-center animate-fadeIn animation-delay-200">
            </div>

            {/* Notifications */}
            <div className="relative notification-dropdown animate-fadeIn animation-delay-300">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowNotifications(!showNotifications)
                }}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-bounce"></span>
              </button>
              
              <div className={`absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 transform origin-top-right ${
                showNotifications 
                  ? 'opacity-100 scale-100 visible' 
                  : 'opacity-0 scale-95 invisible'
              }`}>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-gray-800">Recent Alerts</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500 animate-slideIn">
                      <p className="font-medium text-sm text-gray-800">Storm Surge Warning</p>
                      <p className="text-xs text-gray-600">Zone A - 5 min ago</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500 animate-slideIn animation-delay-100">
                      <p className="font-medium text-sm text-gray-800">High Tide Alert</p>
                      <p className="text-xs text-gray-600">North Beach - 15 min ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 animate-fadeIn animation-delay-400">
              <Settings className="h-6 w-6" />
            </button>

            {/* User Profile */}
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 animate-fadeIn animation-delay-500">
              <User className="h-6 w-6" />
            </button>

            {/* Emergency Button */}
            <button className="ml-2 px-4 py-2 text-white rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200 font-medium transform hover:scale-105 animate-fadeIn animation-delay-600">
              Emergency
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}