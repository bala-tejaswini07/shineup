"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IndividualLeaderboard } from "@/components/leaderboard/individual-leaderboard"
import { TeamLeaderboard } from "@/components/leaderboard/team-leaderboard-full"
import { LeaderboardStats } from "@/components/leaderboard/leaderboard-stats"
import { Trophy, Users } from "lucide-react"

export default function LeaderboardPage() {
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

      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="space-y-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-lime-600 bg-clip-text text-transparent mb-8 leading-tight">
              Global Leaderboards
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              See how you and your team rank against the SHINEUP community
            </p>
          </div>

          <LeaderboardStats />

          <Tabs defaultValue="individual" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-14 text-lg">
              <TabsTrigger value="individual" className="flex items-center gap-3 text-base">
                <Trophy className="h-5 w-5" />
                Individual
              </TabsTrigger>
              <TabsTrigger value="teams" className="flex items-center gap-3 text-base">
                <Users className="h-5 w-5" />
                Teams
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="mt-16">
              <IndividualLeaderboard currentUser={user} />
            </TabsContent>

            <TabsContent value="teams" className="mt-16">
              <TeamLeaderboard currentUser={user} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
