'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}>
          {/* Fixed Header */}
          <Header />
          
          {/* Main Content Area with padding-top to account for fixed header */}
          <div className="flex flex-1 pt-16">
            <Sidebar 
              collapsed={isSidebarCollapsed} 
              setCollapsed={setIsSidebarCollapsed} 
            />
            <main className={`flex-1 p-4 lg:p-6 transition-all duration-300 ${
              isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
            }`}>
              <div className="animate-fadeIn">
                {children}
              </div>
            </main>
          </div>
          <MobileNav />
        </div>
      </body>
    </html>
  )
}