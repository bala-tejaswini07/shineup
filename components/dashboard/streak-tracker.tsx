"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Calendar, Trophy, Target } from "lucide-react"

interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActiveDate: string
  streakHistory: string[]
}

export function StreakTracker() {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: "",
    streakHistory: [],
  })

  useEffect(() => {
    const savedStreak = localStorage.getItem("shineup_streak")
    const today = new Date().toDateString()

    if (savedStreak) {
      const parsed = JSON.parse(savedStreak)

      // Check if user was active yesterday to maintain streak
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toDateString()

      if (parsed.lastActiveDate === yesterdayStr || parsed.lastActiveDate === today) {
        setStreakData(parsed)
      } else {
        // Streak broken, reset
        const resetStreak = {
          ...parsed,
          currentStreak: 0,
          streakHistory: [...parsed.streakHistory, today],
        }
        setStreakData(resetStreak)
        localStorage.setItem("shineup_streak", JSON.stringify(resetStreak))
      }
    } else {
      // Initialize streak data
      const initialStreak = {
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: today,
        streakHistory: [today],
      }
      setStreakData(initialStreak)
      localStorage.setItem("shineup_streak", JSON.stringify(initialStreak))
    }
  }, [])

  const updateStreak = () => {
    const today = new Date().toDateString()

    if (streakData.lastActiveDate !== today) {
      const newStreak = {
        ...streakData,
        currentStreak: streakData.currentStreak + 1,
        longestStreak: Math.max(streakData.longestStreak, streakData.currentStreak + 1),
        lastActiveDate: today,
        streakHistory: [...streakData.streakHistory, today],
      }

      setStreakData(newStreak)
      localStorage.setItem("shineup_streak", JSON.stringify(newStreak))

      // Update user data
      const userData = localStorage.getItem("shineup_user")
      if (userData) {
        const user = JSON.parse(userData)
        user.streak = newStreak.currentStreak
        user.coins = (user.coins || 0) + 1 // Daily login bonus
        localStorage.setItem("shineup_user", JSON.stringify(user))
      }
    }
  }

  // Auto-update streak on component mount (simulating daily login)
  useEffect(() => {
    updateStreak()
  }, [])

  const getStreakMessage = () => {
    if (streakData.currentStreak === 0) return "Start your streak today!"
    if (streakData.currentStreak === 1) return "Great start! Keep it going!"
    if (streakData.currentStreak < 7) return "Building momentum!"
    if (streakData.currentStreak < 30) return "You're on fire!"
    return "Legendary consistency!"
  }

  const getStreakColor = () => {
    if (streakData.currentStreak === 0) return "text-muted-foreground"
    if (streakData.currentStreak < 7) return "text-orange-500"
    if (streakData.currentStreak < 30) return "text-red-500"
    return "text-purple-500"
  }

  const getRecentDays = () => {
    const days = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toDateString()
      const isActive = streakData.streakHistory.includes(dateStr)

      days.push({
        date: date.getDate(),
        day: date.toLocaleDateString("en", { weekday: "short" }),
        isActive,
        isToday: i === 0,
      })
    }

    return days
  }

  return (
    <Card className="border-2 border-orange-500/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className={`h-6 w-6 ${getStreakColor()}`} />
            Streak Tracker
          </div>
          <Badge variant="secondary" className="bg-orange-500/20 text-orange-600 border-orange-500/30">
            +1 coin daily
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Streak Display */}
        <div className="text-center space-y-2">
          <div className={`text-6xl font-bold ${getStreakColor()}`}>{streakData.currentStreak}</div>
          <div className="text-lg font-medium text-foreground">{streakData.currentStreak === 1 ? "Day" : "Days"}</div>
          <p className="text-muted-foreground">{getStreakMessage()}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-5 w-5 text-accent" />
            </div>
            <div className="text-2xl font-bold text-foreground">{streakData.longestStreak}</div>
            <div className="text-sm text-muted-foreground">Longest Streak</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{streakData.streakHistory.length}</div>
            <div className="text-sm text-muted-foreground">Total Active Days</div>
          </div>
        </div>

        {/* Weekly View */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">This Week</h4>
          <div className="grid grid-cols-7 gap-2">
            {getRecentDays().map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    day.isActive
                      ? "bg-orange-500 text-white"
                      : day.isToday
                        ? "bg-muted border-2 border-orange-500 text-foreground"
                        : "bg-muted/50 text-muted-foreground"
                  }`}
                >
                  {day.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Milestones */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Upcoming Milestones</h4>
          <div className="space-y-2">
            {[
              { days: 7, reward: "Week Warrior Badge", unlocked: streakData.currentStreak >= 7 },
              { days: 30, reward: "Month Master Badge", unlocked: streakData.currentStreak >= 30 },
              { days: 100, reward: "Century Champion Badge", unlocked: streakData.currentStreak >= 100 },
            ].map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  milestone.unlocked ? "bg-accent/10 border border-accent/20" : "bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Target className={`h-4 w-4 ${milestone.unlocked ? "text-accent" : "text-muted-foreground"}`} />
                  <span className={`text-sm ${milestone.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                    {milestone.days} days - {milestone.reward}
                  </span>
                </div>
                <Badge variant={milestone.unlocked ? "default" : "secondary"} className="text-xs">
                  {milestone.unlocked ? "Unlocked" : `${milestone.days - streakData.currentStreak} to go`}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
