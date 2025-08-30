
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Coastal Threat Alert System',
  description: 'Real-time coastal monitoring and alert system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-6">
              {children}
            </main>
          </div>
          <MobileNav />
        </div>
      </body>
    </html>
  )
}