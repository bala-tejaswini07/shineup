"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Trophy, Coins, TrendingUp, Target, Flame } from "lucide-react"

export function LeaderboardStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTeams: 0,
    totalCoins: 0,
    avgCoinsPerUser: 0,
    topStreak: 0,
    activeToday: 0,
  })

  useEffect(() => {
    // Calculate stats from localStorage data
    const teams = JSON.parse(localStorage.getItem("shineup_teams") || "[]")
    const totalTeams = teams.length

    // Mock data for demonstration (in a real app, this would come from server)
    const mockStats = {
      totalUsers: 1247,
      totalTeams: totalTeams + 156, // Add actual teams to mock count
      totalCoins: 2847650,
      avgCoinsPerUser: 2284,
      topStreak: 127,
      activeToday: 892,
    }

    setStats(mockStats)
  }, [])

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Teams",
      value: stats.totalTeams.toLocaleString(),
      icon: Trophy,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Total Coins Earned",
      value: stats.totalCoins.toLocaleString(),
      icon: Coins,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Average Coins",
      value: stats.avgCoinsPerUser.toLocaleString(),
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Longest Streak",
      value: `${stats.topStreak} days`,
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Active Today",
      value: stats.activeToday.toLocaleString(),
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="border-2 border-muted hover:border-primary/30 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
