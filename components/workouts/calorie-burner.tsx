"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Flame,
  Target,
  Trophy,
  TrendingUp,
  Clock,
  Award,
  CheckCircle2,
  Plus,
  Minus,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react"

interface CalorieSession {
  id: string
  date: string
  targetCalories: number
  burnedCalories: number
  duration: number
  activity: string
  coinsEarned: number
  completed: boolean
}

interface CalorieBurnerProps {
  onCoinsEarned?: (coins: number) => void
}

export function CalorieBurner({ onCoinsEarned }: CalorieBurnerProps) {
  const [targetCalories, setTargetCalories] = useState(300)
  const [burnedCalories, setBurnedCalories] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [duration, setDuration] = useState(0)
  const [selectedActivity, setSelectedActivity] = useState("General Workout")
  const [sessions, setSessions] = useState<CalorieSession[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [todayCoins, setTodayCoins] = useState(0)

  useEffect(() => {
    const savedSessions = localStorage.getItem("shineup_calorie_sessions")
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions))
    }

    const savedTodayCoins = localStorage.getItem("shineup_today_calorie_coins")
    if (savedTodayCoins) {
      setTodayCoins(Number.parseInt(savedTodayCoins))
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1)
        // Simulate calorie burn based on activity and time
        const caloriesPerSecond = getCaloriesPerSecond(selectedActivity)
        setBurnedCalories((prev) => Math.min(prev + caloriesPerSecond, targetCalories + 50))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, selectedActivity, targetCalories])

  const activities = [
    { name: "General Workout", caloriesPerMinute: 8 },
    { name: "Running", caloriesPerMinute: 12 },
    { name: "Cycling", caloriesPerMinute: 10 },
    { name: "Swimming", caloriesPerMinute: 11 },
    { name: "Weight Training", caloriesPerMinute: 6 },
    { name: "Yoga", caloriesPerMinute: 3 },
    { name: "HIIT", caloriesPerMinute: 15 },
    { name: "Walking", caloriesPerMinute: 4 },
  ]

  const getCaloriesPerSecond = (activity: string) => {
    const activityData = activities.find((a) => a.name === activity)
    return activityData ? activityData.caloriesPerMinute / 60 : 8 / 60
  }

  const startWorkout = () => {
    setIsActive(true)
    setBurnedCalories(0)
    setDuration(0)
  }

  const pauseWorkout = () => {
    setIsActive(false)
  }

  const resetWorkout = () => {
    setIsActive(false)
    setBurnedCalories(0)
    setDuration(0)
  }

  const completeWorkout = () => {
    setIsActive(false)

    const progressPercentage = (burnedCalories / targetCalories) * 100
    let coinsEarned = 0

    // Award coins based on achievement level
    if (progressPercentage >= 100) {
      coinsEarned = 15 // Target achieved
    } else if (progressPercentage >= 80) {
      coinsEarned = 12 // Close to target
    } else if (progressPercentage >= 60) {
      coinsEarned = 8 // Good effort
    } else if (progressPercentage >= 40) {
      coinsEarned = 5 // Some progress
    }

    // Bonus coins for exceeding target
    if (burnedCalories > targetCalories) {
      const bonusCoins = Math.floor((burnedCalories - targetCalories) / 25)
      coinsEarned += bonusCoins
    }

    const newSession: CalorieSession = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      targetCalories,
      burnedCalories: Math.round(burnedCalories),
      duration,
      activity: selectedActivity,
      coinsEarned,
      completed: progressPercentage >= 60, // Consider 60%+ as completed
    }

    const updatedSessions = [newSession, ...sessions.slice(0, 9)] // Keep last 10 sessions
    setSessions(updatedSessions)
    localStorage.setItem("shineup_calorie_sessions", JSON.stringify(updatedSessions))

    // Update today's coins
    const newTodayCoins = todayCoins + coinsEarned
    setTodayCoins(newTodayCoins)
    localStorage.setItem("shineup_today_calorie_coins", newTodayCoins.toString())

    // Update user's total coins
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("shineup_user")
      if (userData) {
        const user = JSON.parse(userData)
        user.coins = (user.coins || 0) + coinsEarned
        localStorage.setItem("shineup_user", JSON.stringify(user))
      }
    }

    if (onCoinsEarned) {
      onCoinsEarned(coinsEarned)
    }

    if (coinsEarned > 0) {
      setShowCelebration(true)
    }

    // Reset for next session
    setBurnedCalories(0)
    setDuration(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = Math.min((burnedCalories / targetCalories) * 100, 100)
  const isTargetReached = burnedCalories >= targetCalories

  return (
    <>
      <div className="space-y-6">
        {/* Calorie Goal Setting */}
        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-orange-700">
              <Flame className="w-6 h-6" />
              Calorie Burner Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Target Setting */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-orange-700">Calorie Target</label>
                <Badge variant="outline" className="text-orange-600 border-orange-300">
                  Today's Coins: {todayCoins}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTargetCalories(Math.max(50, targetCalories - 50))}
                  disabled={isActive}
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="flex-1">
                  <Input
                    type="number"
                    value={targetCalories}
                    onChange={(e) => setTargetCalories(Math.max(50, Number.parseInt(e.target.value) || 50))}
                    disabled={isActive}
                    className="text-center text-lg font-bold border-orange-300 focus:border-orange-500"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTargetCalories(Math.min(1000, targetCalories + 50))}
                  disabled={isActive}
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Activity Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-orange-700">Activity Type</label>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                disabled={isActive}
                className="w-full p-2 border border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                {activities.map((activity) => (
                  <option key={activity.name} value={activity.name}>
                    {activity.name} (~{activity.caloriesPerMinute} cal/min)
                  </option>
                ))}
              </select>
            </div>

            {/* Progress Display */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-700">Progress</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-700">
                    {Math.round(burnedCalories)} / {targetCalories}
                  </div>
                  <div className="text-sm text-orange-600">calories</div>
                </div>
              </div>

              <Progress value={progressPercentage} className="h-4 bg-orange-100" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-orange-600">{Math.round(progressPercentage)}% Complete</span>
                <div className="flex items-center gap-2 text-orange-700">
                  <Clock className="w-4 h-4" />
                  {formatTime(duration)}
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-3">
              {!isActive && burnedCalories === 0 && (
                <Button
                  onClick={startWorkout}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Workout
                </Button>
              )}

              {isActive && (
                <Button
                  onClick={pauseWorkout}
                  variant="outline"
                  className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              )}

              {!isActive && (burnedCalories > 0 || duration > 0) && (
                <>
                  <Button
                    onClick={startWorkout}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                  <Button
                    onClick={completeWorkout}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Complete
                  </Button>
                </>
              )}

              {(burnedCalories > 0 || duration > 0) && (
                <Button
                  onClick={resetWorkout}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Achievement Indicator */}
            {isTargetReached && (
              <div className="flex items-center gap-2 p-3 bg-green-100 border border-green-300 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Target Achieved! Complete workout to earn coins.</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        {sessions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.slice(0, 5).map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${session.completed ? "bg-green-500" : "bg-yellow-500"}`} />
                      <div>
                        <div className="font-medium">{session.activity}</div>
                        <div className="text-sm text-muted-foreground">
                          {session.burnedCalories}/{session.targetCalories} cal • {formatTime(session.duration)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                        +{session.coinsEarned} coins
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Celebration Dialog */}
      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                <Trophy className="w-8 h-8" />
                Workout Complete!
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="text-6xl">🔥</div>
            <div className="space-y-2">
              <div className="text-lg font-medium">Amazing work!</div>
              <div className="text-sm text-muted-foreground">
                You burned {Math.round(burnedCalories)} calories in {formatTime(duration)}
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-yellow-700">
                <Award className="w-5 h-5" />
                <span className="font-bold">+{sessions[0]?.coinsEarned || 0} Coins Earned!</span>
              </div>
            </div>
            <Button
              onClick={() => setShowCelebration(false)}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
