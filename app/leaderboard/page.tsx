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
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Global Leaderboards</h1>
            <p className="text-xl text-muted-foreground">
              See how you and your team rank against the SHINEUP community
            </p>
          </div>

          <LeaderboardStats />

          <Tabs defaultValue="individual" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="individual" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Individual
              </TabsTrigger>
              <TabsTrigger value="teams" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Teams
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="mt-8">
              <IndividualLeaderboard currentUser={user} />
            </TabsContent>

            <TabsContent value="teams" className="mt-8">
              <TeamLeaderboard currentUser={user} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
