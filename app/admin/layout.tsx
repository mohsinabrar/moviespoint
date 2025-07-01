import type React from "react"
import { Navigation } from "@/components/admin/admin-navigation"
import { Sidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </div>
  )
}
