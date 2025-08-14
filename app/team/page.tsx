"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TeamOverview } from "@/components/team/team-overview"
import { TeamCreation } from "@/components/team/team-creation"
import { JoinTeam } from "@/components/team/join-team"
import { TeamLeaderboard } from "@/components/team/team-leaderboard"
import { TeamBattles } from "@/components/team/team-battles"

export default function TeamPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [teamData, setTeamData] = useState<any>(null)

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

    // Load team data if user has a team
    if (parsedUser.teamId) {
      const allTeams = JSON.parse(localStorage.getItem("all_teams") || "[]")
      const userTeam = allTeams.find((team: any) => team.id === parsedUser.teamId)
      setTeamData(userTeam)
    }

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

  const hasTeam = user.teamId && user.teamId !== ""

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

      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="space-y-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-lime-600 bg-clip-text text-transparent mb-8 leading-tight">
              Team Portal
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              {hasTeam ? "Manage your team and compete together" : "Create or join a team to start collaborating"}
            </p>
          </div>

          {hasTeam ? (
            <div className="space-y-32">
              <TeamBattles user={user} teamData={teamData} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                  <TeamOverview user={user} />
                </div>
                <div>
                  <TeamLeaderboard />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              <TeamCreation user={user} />
              <JoinTeam user={user} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
