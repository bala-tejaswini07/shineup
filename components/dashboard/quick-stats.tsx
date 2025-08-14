import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Calendar, Award } from "lucide-react"
import { DailyLoginBonus } from "@/components/dashboard/daily-login-bonus"

interface QuickStatsProps {
  user: any
}

export function QuickStats({ user }: QuickStatsProps) {
  const dailyGoals = [
    { name: "Steps", current: 7500, target: 10000, unit: "steps" },
    { name: "Water", current: 6, target: 8, unit: "glasses" },
    { name: "Focus Time", current: 45, target: 60, unit: "minutes" },
    { name: "Sleep", current: 7.5, target: 8, unit: "hours" },
  ]

  const achievements = [
    { name: "Week Warrior", description: "7 day streak", earned: true },
    { name: "Focus Master", description: "60 min focus session", earned: true },
    { name: "Hydration Hero", description: "Daily water goal", earned: false },
    { name: "Step Champion", description: "10k steps daily", earned: false },
  ]

  return (
    <div className="space-y-6">
      <DailyLoginBonus />

      {/* Daily Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Today's Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dailyGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{goal.name}</span>
                <span className="text-muted-foreground">
                  {goal.current} / {goal.target} {goal.unit}
                </span>
              </div>
              <Progress value={(goal.current / goal.target) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">85%</div>
              <div className="text-xs text-muted-foreground">Goal Completion</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-accent">+12</div>
              <div className="text-xs text-muted-foreground">Rank Improvement</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>This Week</span>
              <span className="text-muted-foreground">6/7 days active</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-accent" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${achievement.earned ? "bg-accent/10 border border-accent/20" : "bg-muted/30"}`}
            >
              <div className="space-y-1">
                <div
                  className={`font-medium text-sm ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {achievement.name}
                </div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
              <Badge variant={achievement.earned ? "default" : "secondary"} className="text-xs">
                {achievement.earned ? "Earned" : "Locked"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors text-sm">
            Log today's water intake
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors text-sm">
            Record workout session
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors text-sm">
            Update sleep hours
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors text-sm">
            View team progress
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
