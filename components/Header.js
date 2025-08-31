'use client'
import { Bell, Settings, User } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <header
      className={`bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/image.png" width={50} height={50} alt="Blue Alert" />
            <span className="text-xl font-bold text-gray-800 ml-2">Blue Alert</span>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative notification-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowNotifications(!showNotifications)
                }}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-gray-800">Recent Alerts</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                        <p className="font-medium text-sm text-gray-800">Storm Surge Warning</p>
                        <p className="text-xs text-gray-600">Zone A - 5 min ago</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                        <p className="font-medium text-sm text-gray-800">High Tide Alert</p>
                        <p className="text-xs text-gray-600">North Beach - 15 min ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <Settings className="h-6 w-6" />
            </button>

            {/* User */}
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <User className="h-6 w-6" />
            </button>

            {/* Emergency */}
            <button className="ml-2 px-4 py-2 text-white rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200 font-medium transform hover:scale-105">
              Emergency
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
