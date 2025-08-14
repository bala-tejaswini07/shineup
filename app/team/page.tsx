"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TeamOverview } from "@/components/team/team-overview"
import { TeamCreation } from "@/components/team/team-creation"
import { JoinTeam } from "@/components/team/join-team"
import { TeamLeaderboard } from "@/components/team/team-leaderboard"

export default function TeamPage() {
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

  const hasTeam = user.teamId && user.teamId !== ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Team Portal</h1>
            <p className="text-xl text-muted-foreground">
              {hasTeam ? "Manage your team and compete together" : "Create or join a team to start collaborating"}
            </p>
          </div>

          {hasTeam ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TeamOverview user={user} />
              </div>
              <div>
                <TeamLeaderboard />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <TeamCreation user={user} />
              <JoinTeam user={user} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
