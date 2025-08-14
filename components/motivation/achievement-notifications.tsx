"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Target, Flame, X, Sparkles } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  color: string
  timestamp: number
}

export function AchievementNotifications() {
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    // Check for new achievements periodically
    const checkAchievements = () => {
      const userData = localStorage.getItem("shineup_user")
      if (!userData) return

      const user = JSON.parse(userData)
      const newAchievements: Achievement[] = []

      // Check for streak milestones
      const streak = user.streak || 0
      if (streak === 3 && !hasShownAchievement("streak_3")) {
        newAchievements.push({
          id: "streak_3",
          title: "3-Day Streak!",
          description: "You're building momentum!",
          icon: Flame,
          color: "text-orange-500",
          timestamp: Date.now(),
        })
      }

      if (streak === 7 && !hasShownAchievement("streak_7")) {
        newAchievements.push({
          id: "streak_7",
          title: "Week Warrior!",
          description: "One full week of consistency!",
          icon: Trophy,
          color: "text-yellow-500",
          timestamp: Date.now(),
        })
      }

      // Check for task completion milestones
      const totalTasks = user.totalTasksCompleted || 0
      if (totalTasks === 10 && !hasShownAchievement("tasks_10")) {
        newAchievements.push({
          id: "tasks_10",
          title: "Task Master!",
          description: "10 tasks completed!",
          icon: Target,
          color: "text-blue-500",
          timestamp: Date.now(),
        })
      }

      if (totalTasks === 50 && !hasShownAchievement("tasks_50")) {
        newAchievements.push({
          id: "tasks_50",
          title: "Consistency Champion!",
          description: "50 tasks completed!",
          icon: Star,
          color: "text-purple-500",
          timestamp: Date.now(),
        })
      }

      if (newAchievements.length > 0) {
        setAchievements((prev) => [...prev, ...newAchievements])
        // Mark achievements as shown
        newAchievements.forEach((achievement) => {
          localStorage.setItem(`achievement_shown_${achievement.id}`, "true")
        })
      }
    }

    const hasShownAchievement = (id: string) => {
      return localStorage.getItem(`achievement_shown_${id}`) === "true"
    }

    checkAchievements()
    const interval = setInterval(checkAchievements, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const dismissAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((achievement) => achievement.id !== id))
  }

  if (achievements.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {achievements.map((achievement) => {
        const Icon = achievement.icon
        return (
          <Card
            key={achievement.id}
            className="border-2 border-accent/30 bg-gradient-to-r from-accent/10 to-primary/10 shadow-lg animate-in slide-in-from-right duration-500"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <Icon className={`h-5 w-5 ${achievement.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      {achievement.title}
                      <Sparkles className="h-4 w-4 text-accent" />
                    </h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Achievement Unlocked!
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAchievement(achievement.id)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
