"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/components/auth-provider"
import { AdminDashboard } from "@/components/admin/dashboard"
import { AdminHeader } from "@/components/admin/header"
import { SiteFooter } from "@/components/site-footer"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (!user || !user.isAdmin) {
      router.push("/login")
    }
  }, [user, router])

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="flex-1 container py-10">
        <AdminDashboard />
      </main>
      <SiteFooter />
    </div>
  )
}

