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
import { InconsistencySupport } from "@/components/dashboard/inconsistency-support"
import { BadgeSystem } from "@/components/badges/badge-system"
import { BadgeTracker } from "@/components/badges/badge-tracker"
import { DailyMotivation } from "@/components/motivation/daily-motivation"
import { AchievementNotifications } from "@/components/motivation/achievement-notifications"

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-cyan-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-cyan-200"></div>
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-cyan-600 absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-2 h-2 bg-lime-400 rounded-full animate-pulse opacity-60"></div>
        <div
          className="absolute top-40 right-20 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-lime-300 rounded-full animate-pulse opacity-40"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-16 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <BadgeTracker />
      <AchievementNotifications />
      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="space-y-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              <div className="animate-slide-up">
                <ProfileOverview user={user} />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <InconsistencySupport />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <DailyTasks />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <BadgeSystem />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <FocusMode />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <InfoCards />
              </div>
            </div>

            <div className="space-y-16">
              <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <QuickStats user={user} />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <DailyMotivation />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <StreakTracker />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
