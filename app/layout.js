'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar 
              collapsed={isSidebarCollapsed} 
              setCollapsed={setIsSidebarCollapsed} 
            />
            <main className={`flex-1 p-4 lg:p-6 transition-all duration-300 ${
              isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
            }`}>
              {children}
            </main>
          </div>
          <MobileNav />
        </div>
      </body>
    </html>
  )
}