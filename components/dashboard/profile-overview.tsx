"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Coins,
  Flame,
  Calendar,
  Trophy,
  Crown,
  Star,
  Target,
  Shield,
  Gem,
  Award,
  ChevronRight,
  Medal,
} from "lucide-react"
import type { UserBadge } from "@/components/badges/badge-system"

interface ProfileOverviewProps {
  user: any
}

const badgeIcons: Record<string, any> = {
  Trophy,
  Target,
  Calendar,
  Flame,
  Star,
  Crown,
  Shield,
  Award,
  Medal,
  Gem,
}

const tierColors = {
  bronze: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-700 dark:text-amber-300",
    icon: "text-amber-600",
  },
  silver: {
    bg: "bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20",
    border: "border-slate-200 dark:border-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    icon: "text-slate-600",
  },
  gold: {
    bg: "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20",
    border: "border-yellow-200 dark:border-yellow-800",
    text: "text-yellow-700 dark:text-yellow-300",
    icon: "text-yellow-600",
  },
  platinum: {
    bg: "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-700 dark:text-purple-300",
    icon: "text-purple-600",
  },
  diamond: {
    bg: "bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20",
    border: "border-cyan-200 dark:border-cyan-800",
    text: "text-cyan-700 dark:text-cyan-300",
    icon: "text-cyan-600",
  },
}

export function ProfileOverview({ user }: ProfileOverviewProps) {
  const [userBadges, setUserBadges] = useState<UserBadge[]>([])
  const [showAllBadges, setShowAllBadges] = useState(false)

  useEffect(() => {
    // Load user badges
    const savedBadges = localStorage.getItem("user_badges")
    if (savedBadges) {
      const badges = JSON.parse(savedBadges)
      // Sort badges by tier priority (diamond > platinum > gold > silver > bronze)
      const tierPriority = { diamond: 5, platinum: 4, gold: 3, silver: 2, bronze: 1 }
      badges.sort((a: UserBadge, b: UserBadge) => tierPriority[b.tier] - tierPriority[a.tier])
      setUserBadges(badges)
    }
  }, [])

  // Get the most prestigious badges to display (top 3)
  const topBadges = userBadges.slice(0, 3)
  const remainingBadgesCount = Math.max(0, userBadges.length - 3)

  // Get highest tier badge for profile decoration
  const highestTierBadge = userBadges[0]
  const profileTierColor = highestTierBadge ? tierColors[highestTierBadge.tier].icon : "text-accent"

  return (
    <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/20">
      <CardContent className="p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Profile Picture */}
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-accent shadow-lg">
              <AvatarImage src={`/placeholder.svg?height=96&width=96&query=profile-avatar`} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full p-2 ${highestTierBadge ? "ring-2 ring-offset-2" : ""}`}
            >
              <Trophy className={`h-4 w-4 ${profileTierColor}`} />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <h2 className="text-3xl font-bold text-foreground">{user.username}</h2>
              {highestTierBadge && (
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${tierColors[highestTierBadge.tier].bg} ${tierColors[highestTierBadge.tier].text} ${tierColors[highestTierBadge.tier].border} border`}
                >
                  {highestTierBadge.tier.toUpperCase()}
                </div>
              )}
            </div>
            <p className="text-muted-foreground mb-4">
              {user.portalType === "team" ? "Team Warrior" : "Solo Champion"} • Age {user.age}
              {userBadges.length > 0 && (
                <span className="ml-2">
                  • {userBadges.length} Badge{userBadges.length !== 1 ? "s" : ""}
                </span>
              )}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Coins className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{user.coins || 0}</div>
                  <div className="text-xs text-muted-foreground">Coins</div>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Flame className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{user.streak || 0}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{user.totalTasksCompleted || 0}</div>
                  <div className="text-xs text-muted-foreground">Tasks Done</div>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Trophy className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">#{Math.floor(Math.random() * 500) + 1}</div>
                  <div className="text-xs text-muted-foreground">Global Rank</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {userBadges.length > 0 ? (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Achievement Badges
              </h3>
              {userBadges.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllBadges(!showAllBadges)}
                  className="text-accent hover:text-accent/80"
                >
                  {showAllBadges ? "Show Less" : `View All ${userBadges.length}`}
                  <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${showAllBadges ? "rotate-90" : ""}`} />
                </Button>
              )}
            </div>

            {/* Top Badges Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(showAllBadges ? userBadges : topBadges).map((badge) => {
                const IconComponent = badgeIcons[badge.icon] || Trophy
                const colors = tierColors[badge.tier]

                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-xl border-2 ${colors.bg} ${colors.border} hover:scale-105 transition-transform cursor-pointer`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                        <IconComponent className={`h-6 w-6 ${colors.icon}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-semibold text-sm ${colors.text}`}>{badge.name}</h4>
                          <Badge variant="outline" className={`text-xs ${colors.text} ${colors.border}`}>
                            {badge.tier}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{badge.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(badge.earnedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Badge Summary for collapsed view */}
            {!showAllBadges && remainingBadgesCount > 0 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  + {remainingBadgesCount} more badge{remainingBadgesCount !== 1 ? "s" : ""} earned
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Updated empty state to encourage badge earning */
          <div className="mt-8 p-6 border-2 border-dashed border-muted/30 rounded-xl text-center">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Start Earning Badges</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete tasks, build streaks, and achieve milestones to earn prestigious badges that showcase your
              wellness journey.
            </p>
            <div className="flex justify-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Trophy className="h-3 w-3 mr-1" />
                First Steps
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                Week Warrior
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Crown className="h-3 w-3 mr-1" />
                Task Master
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
