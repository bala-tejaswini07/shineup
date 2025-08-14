"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Star,
  Sparkles,
  TrendingUp,
  Target,
  Calendar,
  Award,
  Lightbulb,
  Coffee,
  Sunrise,
  RefreshCw,
} from "lucide-react"

const motivationalQuotes = [
  {
    text: "Every small step you take today builds the foundation for tomorrow's success.",
    author: "Your Wellness Journey",
    category: "progress",
  },
  {
    text: "Consistency isn't about perfection. It's about showing up, even when it's hard.",
    author: "Wellness Wisdom",
    category: "consistency",
  },
  {
    text: "Your future self is cheering you on right now. Keep going!",
    author: "Self-Care Philosophy",
    category: "encouragement",
  },
  {
    text: "Rest is not a reward for work completed, but a requirement for work to continue.",
    author: "Balance Principles",
    category: "balance",
  },
  {
    text: "Progress, not perfection. Every effort counts towards your wellness goals.",
    author: "Growth Mindset",
    category: "progress",
  },
  {
    text: "You don't have to be great to get started, but you have to get started to be great.",
    author: "Action Philosophy",
    category: "action",
  },
]

const milestones = [
  { days: 3, title: "Building Momentum", message: "You're creating positive habits!" },
  { days: 7, title: "One Week Strong", message: "Your consistency is showing!" },
  { days: 14, title: "Two Week Warrior", message: "You're building real momentum!" },
  { days: 30, title: "Monthly Master", message: "You've created lasting change!" },
  { days: 60, title: "Consistency Champion", message: "Your dedication is inspiring!" },
  { days: 100, title: "Hundred Day Hero", message: "You're a true wellness warrior!" },
]

export function DailyMotivation() {
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0])
  const [userStats, setUserStats] = useState({
    streak: 0,
    totalTasks: 0,
    coins: 0,
    daysActive: 0,
  })
  const [nextMilestone, setNextMilestone] = useState<any>(null)
  const [recentAchievement, setRecentAchievement] = useState<string | null>(null)

  useEffect(() => {
    // Load user stats
    const userData = localStorage.getItem("shineup_user")
    if (userData) {
      const user = JSON.parse(userData)
      const stats = {
        streak: user.streak || 0,
        totalTasks: user.totalTasksCompleted || 0,
        coins: user.coins || 0,
        daysActive: user.daysActive || Math.max(1, user.streak || 1),
      }
      setUserStats(stats)

      // Find next milestone
      const next = milestones.find((m) => m.days > stats.streak)
      setNextMilestone(next)

      // Check for recent achievements
      const lastMilestone = milestones.filter((m) => m.days <= stats.streak).sort((a, b) => b.days - a.days)[0]
      if (lastMilestone && stats.streak === lastMilestone.days) {
        setRecentAchievement(lastMilestone.title)
      }
    }

    // Set daily quote based on date
    const today = new Date().getDate()
    const quoteIndex = today % motivationalQuotes.length
    setCurrentQuote(motivationalQuotes[quoteIndex])
  }, [])

  const refreshQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
    setCurrentQuote(motivationalQuotes[randomIndex])
  }

  const getMotivationalMessage = () => {
    if (userStats.streak === 0) {
      return "Today is the perfect day to start your wellness journey!"
    } else if (userStats.streak < 3) {
      return "You're building something amazing. Keep the momentum going!"
    } else if (userStats.streak < 7) {
      return "Your consistency is paying off. You're doing great!"
    } else {
      return "You're a true wellness champion. Your dedication inspires others!"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      progress: "text-blue-600 bg-blue-50 border-blue-200",
      consistency: "text-green-600 bg-green-50 border-green-200",
      encouragement: "text-purple-600 bg-purple-50 border-purple-200",
      balance: "text-orange-600 bg-orange-50 border-orange-200",
      action: "text-red-600 bg-red-50 border-red-200",
    }
    return colors[category as keyof typeof colors] || "text-gray-600 bg-gray-50 border-gray-200"
  }

  return (
    <div className="space-y-6">
      {/* Recent Achievement Celebration */}
      {recentAchievement && (
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-yellow-800 dark:text-yellow-200">Milestone Achieved!</h3>
                <p className="text-yellow-700 dark:text-yellow-300">Congratulations on reaching: {recentAchievement}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily Quote */}
      <Card className="border-2 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sunrise className="h-6 w-6 text-accent" />
              Daily Inspiration
            </div>
            <Button variant="ghost" size="sm" onClick={refreshQuote}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl border border-accent/20">
            <blockquote className="text-lg font-medium text-foreground mb-3 leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            <div className="flex items-center justify-between">
              <cite className="text-sm text-muted-foreground">— {currentQuote.author}</cite>
              <Badge variant="outline" className={`text-xs ${getCategoryColor(currentQuote.category)}`}>
                {currentQuote.category}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Motivation */}
      <Card className="border-2 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-500" />
            Your Progress Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Motivational Message */}
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-green-600 mt-0.5" />
              <p className="text-green-700 dark:text-green-300 font-medium">{getMotivationalMessage()}</p>
            </div>
          </div>

          {/* Next Milestone */}
          {nextMilestone && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">Next Milestone: {nextMilestone.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {nextMilestone.days - userStats.streak} days to go
                </Badge>
              </div>
              <Progress value={(userStats.streak / nextMilestone.days) * 100} className="h-3" />
              <p className="text-sm text-muted-foreground">{nextMilestone.message}</p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Tasks Completed</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{userStats.totalTasks}</p>
            </div>
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Days Active</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{userStats.daysActive}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gentle Encouragement */}
      <Card className="border-2 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-purple-500" />
            Wellness Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <Coffee className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-700 dark:text-purple-300">Start Small</h4>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Even 5 minutes of wellness activity can make a difference in your day.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <Star className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-300">Celebrate Progress</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Acknowledge every step forward, no matter how small it seems.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
              <Sparkles className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-700 dark:text-green-300">Be Patient</h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Real change takes time. Trust the process and be kind to yourself.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
