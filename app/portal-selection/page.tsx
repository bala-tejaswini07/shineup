"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, User, Trophy, Target } from "lucide-react"

export default function PortalSelectionPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("shineup_user")
    if (!userData) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const selectPortal = (type: "team" | "individual") => {
    if (user) {
      const updatedUser = { ...user, portalType: type }
      localStorage.setItem("shineup_user", JSON.stringify(updatedUser))
      router.push("/dashboard")
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/mystical-forest-paths.png"
          alt="Portal selection background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome, {user.username}!</h1>
          <p className="text-xl text-white/80">Choose your path to wellness and start your journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team Portal */}
          <Card className="bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-accent/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 bg-accent/20 rounded-full w-fit group-hover:bg-accent/30 transition-colors duration-300">
                <Users className="h-12 w-12 text-accent" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Team Portal</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-white/80 leading-relaxed">
                Join forces with friends and compete as a team. Share motivation, track collective progress, and climb
                the team leaderboards together.
              </p>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span>Team leaderboards</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Up to 10 members</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>Shared challenges</span>
                </div>
              </div>
              <Button
                onClick={() => selectPortal("team")}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105 mt-6"
              >
                Choose Team Portal
              </Button>
            </CardContent>
          </Card>

          {/* Individual Portal */}
          <Card className="bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 bg-primary/20 rounded-full w-fit group-hover:bg-primary/30 transition-colors duration-300">
                <User className="h-12 w-12 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Individual Portal</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-white/80 leading-relaxed">
                Focus on your personal wellness journey. Track your individual progress, compete globally, and achieve
                your personal best.
              </p>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span>Global leaderboard</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Personal tracking</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>Individual goals</span>
                </div>
              </div>
              <Button
                onClick={() => selectPortal("individual")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105 mt-6"
              >
                Choose Individual Portal
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            Don't worry, you can always switch between portals later in your settings
          </p>
        </div>
      </div>
    </div>
  )
}
