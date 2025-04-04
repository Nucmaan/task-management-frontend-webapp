'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { icon: '📊', label: 'Dashboard', href: '/Admin' },
  { icon: '👤', label: 'User Management', href: '/Admin/users' },
  { icon: '📋', label: 'Task Management', href: '/Admin/tasks' },
  { icon: '📑', label: 'Reports & Analytics', href: '/Admin/reports' },
  { icon: '🔔', label: 'Notifications', href: '/Admin/notifications' },
  { icon: '💰', label: 'Payroll & Commissions', href: '/Admin/payroll' },
  { icon: '⚙️', label: 'Settings', href: '/Admin/settings' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                  isActive ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
