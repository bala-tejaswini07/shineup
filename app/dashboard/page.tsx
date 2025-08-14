"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProfileOverview } from "@/components/dashboard/profile-overview"
import { FocusMode } from "@/components/dashboard/focus-mode"
import { InfoCards } from "@/components/dashboard/info-cards"
import { QuickStats } from "@/components/dashboard/quick-stats"
import { DailyTasks } from "@/components/dashboard/daily-tasks"
import { StreakTracker } from "@/components/dashboard/streak-tracker"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("shineup_user")
    if (!userData) {
      router.push("/auth")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (!parsedUser.isAuthenticated) {
      router.push("/auth")
      return
    }

    setUser(parsedUser)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <ProfileOverview user={user} />
            <DailyTasks />
            <FocusMode />
            <InfoCards />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <QuickStats user={user} />
            <StreakTracker />
          </div>
        </div>
      </main>
    </div>
  )
}
