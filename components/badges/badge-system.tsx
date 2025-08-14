"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Target,
  Calendar,
  Flame,
  Star,
  Crown,
  Shield,
  Zap,
  Heart,
  Award,
  Medal,
  Gem,
  Sparkles,
  Clock,
  CheckCircle2,
} from "lucide-react"

export interface UserBadge {
  id: string
  name: string
  description: string
  icon: string
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond"
  category: "streak" | "tasks" | "consistency" | "focus" | "wellness" | "special"
  earnedAt: string
  progress?: number
  maxProgress?: number
}

interface BadgeDefinition {
  id: string
  name: string
  description: string
  icon: any
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond"
  category: "streak" | "tasks" | "consistency" | "focus" | "wellness" | "special"
  requirement: {
    type: "streak" | "totalTasks" | "dailyComplete" | "focusTime" | "coins" | "comeback"
    value: number
  }
}

const badgeDefinitions: BadgeDefinition[] = [
  // Streak Badges
  {
    id: "first_steps",
    name: "First Steps",
    description: "Started your wellness journey",
    icon: Target,
    tier: "bronze",
    category: "streak",
    requirement: { type: "streak", value: 1 },
  },
  {
    id: "week_warrior",
    name: "Week Warrior",
    description: "Maintained a 7-day streak",
    icon: Calendar,
    tier: "silver",
    category: "streak",
    requirement: { type: "streak", value: 7 },
  },
  {
    id: "month_master",
    name: "Month Master",
    description: "Achieved a 30-day streak",
    icon: Crown,
    tier: "gold",
    category: "streak",
    requirement: { type: "streak", value: 30 },
  },
  {
    id: "streak_legend",
    name: "Streak Legend",
    description: "Incredible 100-day streak",
    icon: Flame,
    tier: "platinum",
    category: "streak",
    requirement: { type: "streak", value: 100 },
  },

  // Task Completion Badges
  {
    id: "task_starter",
    name: "Task Starter",
    description: "Completed your first 10 tasks",
    icon: CheckCircle2,
    tier: "bronze",
    category: "tasks",
    requirement: { type: "totalTasks", value: 10 },
  },
  {
    id: "task_crusher",
    name: "Task Crusher",
    description: "Completed 100 tasks total",
    icon: Target,
    tier: "silver",
    category: "tasks",
    requirement: { type: "totalTasks", value: 100 },
  },
  {
    id: "task_master",
    name: "Task Master",
    description: "Completed 500 tasks total",
    icon: Trophy,
    tier: "gold",
    category: "tasks",
    requirement: { type: "totalTasks", value: 500 },
  },

  // Consistency Badges
  {
    id: "daily_hero",
    name: "Daily Hero",
    description: "Completed all daily tasks 10 times",
    icon: Star,
    tier: "silver",
    category: "consistency",
    requirement: { type: "dailyComplete", value: 10 },
  },
  {
    id: "consistency_king",
    name: "Consistency King",
    description: "Completed all daily tasks 50 times",
    icon: Crown,
    tier: "gold",
    category: "consistency",
    requirement: { type: "dailyComplete", value: 50 },
  },

  // Focus Badges
  {
    id: "focus_novice",
    name: "Focus Novice",
    description: "Completed 10 hours of focus time",
    icon: Clock,
    tier: "bronze",
    category: "focus",
    requirement: { type: "focusTime", value: 600 }, // 10 hours in minutes
  },
  {
    id: "focus_master",
    name: "Focus Master",
    description: "Completed 100 hours of focus time",
    icon: Zap,
    tier: "gold",
    category: "focus",
    requirement: { type: "focusTime", value: 6000 }, // 100 hours in minutes
  },

  // Wellness Badges
  {
    id: "wellness_warrior",
    name: "Wellness Warrior",
    description: "Earned 1000 wellness coins",
    icon: Heart,
    tier: "silver",
    category: "wellness",
    requirement: { type: "coins", value: 1000 },
  },
  {
    id: "wellness_champion",
    name: "Wellness Champion",
    description: "Earned 5000 wellness coins",
    icon: Medal,
    tier: "gold",
    category: "wellness",
    requirement: { type: "coins", value: 5000 },
  },

  // Special Badges
  {
    id: "comeback_hero",
    name: "Comeback Hero",
    description: "Returned after a break and rebuilt your streak",
    icon: Shield,
    tier: "gold",
    category: "special",
    requirement: { type: "comeback", value: 1 },
  },
  {
    id: "diamond_elite",
    name: "Diamond Elite",
    description: "Ultimate wellness achievement - 365-day streak",
    icon: Gem,
    tier: "diamond",
    category: "special",
    requirement: { type: "streak", value: 365 },
  },
]

const tierColors = {
  bronze: {
    bg: "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-700 dark:text-amber-300",
    icon: "text-amber-600",
  },
  silver: {
    bg: "from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20",
    border: "border-slate-200 dark:border-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    icon: "text-slate-600",
  },
  gold: {
    bg: "from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20",
    border: "border-yellow-200 dark:border-yellow-800",
    text: "text-yellow-700 dark:text-yellow-300",
    icon: "text-yellow-600",
  },
  platinum: {
    bg: "from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-700 dark:text-purple-300",
    icon: "text-purple-600",
  },
  diamond: {
    bg: "from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20",
    border: "border-cyan-200 dark:border-cyan-800",
    text: "text-cyan-700 dark:text-cyan-300",
    icon: "text-cyan-600",
  },
}

export function BadgeSystem() {
  const [userBadges, setUserBadges] = useState<UserBadge[]>([])
  const [availableBadges, setAvailableBadges] = useState<BadgeDefinition[]>([])
  const [userStats, setUserStats] = useState({
    currentStreak: 0,
    maxStreak: 0,
    totalTasks: 0,
    dailyCompletes: 0,
    focusTime: 0,
    totalCoins: 0,
    comebacks: 0,
  })

  useEffect(() => {
    loadUserBadges()
    loadUserStats()
    checkForNewBadges()
  }, [])

  const loadUserBadges = () => {
    const savedBadges = localStorage.getItem("user_badges")
    if (savedBadges) {
      setUserBadges(JSON.parse(savedBadges))
    }
  }

  const loadUserStats = () => {
    const userData = localStorage.getItem("shineup_user")
    if (userData) {
      const user = JSON.parse(userData)
      const stats = {
        currentStreak: user.streak || 0,
        maxStreak: user.maxStreak || user.streak || 0,
        totalTasks: user.totalTasksCompleted || 0,
        dailyCompletes: user.dailyCompletes || 0,
        focusTime: user.totalFocusTime || 0,
        totalCoins: user.coins || 0,
        comebacks: user.comebacks || 0,
      }
      setUserStats(stats)
    }
  }

  const checkForNewBadges = () => {
    const userData = localStorage.getItem("shineup_user")
    if (!userData) return

    const user = JSON.parse(userData)
    const currentBadges = JSON.parse(localStorage.getItem("user_badges") || "[]")
    const currentBadgeIds = currentBadges.map((b: UserBadge) => b.id)

    const stats = {
      currentStreak: user.streak || 0,
      maxStreak: user.maxStreak || user.streak || 0,
      totalTasks: user.totalTasksCompleted || 0,
      dailyCompletes: user.dailyCompletes || 0,
      focusTime: user.totalFocusTime || 0,
      totalCoins: user.coins || 0,
      comebacks: user.comebacks || 0,
    }

    const newBadges: UserBadge[] = []

    badgeDefinitions.forEach((badge) => {
      if (currentBadgeIds.includes(badge.id)) return

      let earned = false
      const value = badge.requirement.value

      switch (badge.requirement.type) {
        case "streak":
          earned = Math.max(stats.currentStreak, stats.maxStreak) >= value
          break
        case "totalTasks":
          earned = stats.totalTasks >= value
          break
        case "dailyComplete":
          earned = stats.dailyCompletes >= value
          break
        case "focusTime":
          earned = stats.focusTime >= value
          break
        case "coins":
          earned = stats.totalCoins >= value
          break
        case "comeback":
          earned = stats.comebacks >= value
          break
      }

      if (earned) {
        newBadges.push({
          id: badge.id,
          name: badge.name,
          description: badge.description,
          icon: badge.icon.name,
          tier: badge.tier,
          category: badge.category,
          earnedAt: new Date().toISOString(),
        })
      }
    })

    if (newBadges.length > 0) {
      const updatedBadges = [...currentBadges, ...newBadges]
      localStorage.setItem("user_badges", JSON.stringify(updatedBadges))
      setUserBadges(updatedBadges)
    }

    // Set available badges (not yet earned)
    const unearned = badgeDefinitions.filter(
      (badge) => !currentBadgeIds.includes(badge.id) && !newBadges.some((nb) => nb.id === badge.id),
    )
    setAvailableBadges(unearned)
  }

  const getBadgeProgress = (badge: BadgeDefinition) => {
    const value = badge.requirement.value
    let current = 0

    switch (badge.requirement.type) {
      case "streak":
        current = Math.max(userStats.currentStreak, userStats.maxStreak)
        break
      case "totalTasks":
        current = userStats.totalTasks
        break
      case "dailyComplete":
        current = userStats.dailyCompletes
        break
      case "focusTime":
        current = userStats.focusTime
        break
      case "coins":
        current = userStats.totalCoins
        break
      case "comeback":
        current = userStats.comebacks
        break
    }

    return Math.min(current, value)
  }

  const groupedBadges = userBadges.reduce(
    (acc, badge) => {
      if (!acc[badge.category]) acc[badge.category] = []
      acc[badge.category].push(badge)
      return acc
    },
    {} as Record<string, UserBadge[]>,
  )

  return (
    <div className="space-y-6">
      {/* Earned Badges */}
      <Card className="border-2 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-accent" />
            Your Badges ({userBadges.length})
          </CardTitle>
          <p className="text-sm text-muted-foreground">Permanent achievements that showcase your wellness journey</p>
        </CardHeader>
        <CardContent>
          {userBadges.length === 0 ? (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No badges earned yet. Complete tasks and build streaks to earn your first badge!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedBadges).map(([category, badges]) => (
                <div key={category}>
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                    {category} Badges
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {badges.map((badge) => {
                      const badgeDef = badgeDefinitions.find((b) => b.id === badge.id)
                      const Icon = badgeDef?.icon || Trophy
                      const colors = tierColors[badge.tier]

                      return (
                        <div
                          key={badge.id}
                          className={`p-4 rounded-xl border-2 bg-gradient-to-br ${colors.bg} ${colors.border}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-white/50 dark:bg-black/20`}>
                              <Icon className={`h-6 w-6 ${colors.icon}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className={`font-semibold ${colors.text}`}>{badge.name}</h5>
                                <Badge variant="outline" className={`text-xs ${colors.text} ${colors.border}`}>
                                  {badge.tier}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                              <p className="text-xs text-muted-foreground">
                                Earned {new Date(badge.earnedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Badges */}
      <Card className="border-2 border-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-muted-foreground" />
            Available Badges
          </CardTitle>
          <p className="text-sm text-muted-foreground">Badges you can earn by continuing your wellness journey</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableBadges.slice(0, 6).map((badge) => {
              const Icon = badge.icon
              const colors = tierColors[badge.tier]
              const progress = getBadgeProgress(badge)
              const progressPercent = (progress / badge.requirement.value) * 100

              return (
                <div
                  key={badge.id}
                  className="p-4 rounded-xl border-2 border-muted/20 bg-muted/5 opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted/20">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-muted-foreground">{badge.name}</h5>
                        <Badge variant="outline" className="text-xs">
                          {badge.tier}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{badge.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>
                            {progress} / {badge.requirement.value}
                          </span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
