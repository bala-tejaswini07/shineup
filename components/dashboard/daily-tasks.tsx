"use client"

import type React from "react"
import { googleFitAPI } from "@/lib/google-fit-api"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, Coins, Target, Zap, Gift, Star } from "lucide-react"
import { TaskCompletionCelebration } from "./task-completion-celebration"
import { CoinAnimation } from "./coin-animation"
import { TaskVerification } from "@/components/verification/task-verification"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface Task {
  id: string
  title: string
  description: string
  difficulty: "easy" | "hard"
  coins: number
  completed: boolean
  category: "fitness" | "mindfulness" | "nutrition" | "productivity" | "team"
}

interface DailyTasksProps {
  onTaskComplete?: (coins: number) => void
  onAllTasksComplete?: () => void
  isGuest?: boolean
}

const taskTemplates: Omit<Task, "id" | "completed">[] = [
  {
    title: "Healthy Breakfast",
    description: "Start your day with a nutritious breakfast including protein and fiber",
    difficulty: "easy",
    coins: 8,
    category: "nutrition",
  },
  {
    title: "5 Servings of Fruits & Veggies",
    description: "Consume at least 5 servings of fruits and vegetables today",
    difficulty: "hard",
    coins: 9,
    category: "nutrition",
  },
  {
    title: "No Processed Foods",
    description: "Avoid processed and packaged foods for the entire day",
    difficulty: "hard",
    coins: 9,
    category: "nutrition",
  },
  {
    title: "Healthy Snack Choice",
    description: "Choose nuts, fruits, or yogurt instead of junk food for snacks",
    difficulty: "easy",
    coins: 8,
    category: "nutrition",
  },
  {
    title: "Cook at Home",
    description: "Prepare at least one healthy meal at home today",
    difficulty: "easy",
    coins: 8,
    category: "nutrition",
  },
  {
    title: "Team Step Challenge",
    description: "Contribute 10,000 steps to your team's daily step goal",
    difficulty: "hard",
    coins: 12,
    category: "team",
  },
  {
    title: "Team Motivation Post",
    description: "Share an encouraging message with your team members",
    difficulty: "easy",
    coins: 10,
    category: "team",
  },
  {
    title: "Help a Teammate",
    description: "Support a team member by commenting on their progress",
    difficulty: "easy",
    coins: 10,
    category: "team",
  },
  {
    title: "Team Workout Session",
    description: "Complete a workout and log it for your team's fitness goal",
    difficulty: "hard",
    coins: 12,
    category: "team",
  },
  {
    title: "Team Mindfulness",
    description: "Join or organize a group meditation session with teammates",
    difficulty: "easy",
    coins: 10,
    category: "team",
  },
  {
    title: "Morning Stretch",
    description: "Complete a 10-minute morning stretching routine",
    difficulty: "easy",
    coins: 8,
    category: "fitness",
  },
  {
    title: "Hydration Goal",
    description: "Drink 8 glasses of water throughout the day",
    difficulty: "easy",
    coins: 8,
    category: "nutrition",
  },
  {
    title: "Meditation Session",
    description: "Complete a 15-minute meditation session",
    difficulty: "easy",
    coins: 8,
    category: "mindfulness",
  },
  {
    title: "Focus Deep Work",
    description: "Complete 2 hours of focused work without distractions",
    difficulty: "hard",
    coins: 9,
    category: "productivity",
  },
  {
    title: "Workout Challenge",
    description: "Complete a 45-minute high-intensity workout",
    difficulty: "hard",
    coins: 9,
    category: "fitness",
  },
  {
    title: "Mindful Eating",
    description: "Practice mindful eating for all three meals today",
    difficulty: "hard",
    coins: 9,
    category: "nutrition",
  },
  {
    title: "Gratitude Journal",
    description: "Write down 5 things you're grateful for today",
    difficulty: "easy",
    coins: 8,
    category: "mindfulness",
  },
  {
    title: "Digital Detox",
    description: "Stay off social media for 4 consecutive hours",
    difficulty: "hard",
    coins: 9,
    category: "productivity",
  },
  {
    title: "Nature Walk",
    description: "Take a 30-minute walk outdoors in nature",
    difficulty: "easy",
    coins: 8,
    category: "fitness",
  },
  {
    title: "Meal Prep Sunday",
    description: "Prepare healthy meals for the upcoming week",
    difficulty: "hard",
    coins: 9,
    category: "nutrition",
  },
  {
    title: "Sleep Hygiene",
    description: "Go to bed at a consistent time and get 7-8 hours of sleep",
    difficulty: "easy",
    coins: 8,
    category: "mindfulness",
  },
  {
    title: "Learn Something New",
    description: "Spend 30 minutes learning a new skill or reading",
    difficulty: "easy",
    coins: 8,
    category: "productivity",
  },
]

const categoryIcons = {
  fitness: Target,
  mindfulness: Circle,
  nutrition: Zap,
  productivity: CheckCircle2,
  team: Star,
}

const categoryColors = {
  fitness: "text-green-500 bg-green-500/10 border-green-500/20",
  mindfulness: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  nutrition: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  productivity: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  team: "text-pink-500 bg-pink-500/10 border-pink-500/20",
}

export function DailyTasks({ onTaskComplete, onAllTasksComplete, isGuest = false }: DailyTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [totalCoinsEarned, setTotalCoinsEarned] = useState(0)
  const [inconsistencySettings, setInconsistencySettings] = useState({
    flexibleGoals: false,
    gentleReminders: true,
    microHabits: false,
    comebackMode: false,
  })
  const [showCelebration, setShowCelebration] = useState(false)
  const [streakCount, setStreakCount] = useState(0)
  const [isConsistentUser, setIsConsistentUser] = useState(false)
  const [animatingCoins, setAnimatingCoins] = useState<{ id: string; coins: number; x: number; y: number }[]>([])
  const [isGoogleFitConnected, setIsGoogleFitConnected] = useState(false)
  const [isVerifyingTask, setIsVerifyingTask] = useState<string | null>(null)
  const [showVerification, setShowVerification] = useState<string | null>(null)
  const [verificationResults, setVerificationResults] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const storageKey = isGuest ? "shineup-guest-data" : "shineup_user"
    const taskStorageKey = isGuest ? "guest_daily_tasks" : "daily_tasks"

    if (!isGuest) {
      const savedSettings = localStorage.getItem("inconsistency_settings")
      if (savedSettings) {
        setInconsistencySettings(JSON.parse(savedSettings))
      }
    }

    const userData = localStorage.getItem(storageKey)
    if (userData) {
      const user = JSON.parse(userData)
      setStreakCount(user.streak || (isGuest ? 1 : 0))
      setIsConsistentUser(user.streak >= 7 || false)
    }

    const today = new Date().toDateString()
    const savedTasks = localStorage.getItem(`${taskStorageKey}_${today}`)

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks)
      setTasks(parsedTasks)
      setTotalCoinsEarned(
        parsedTasks.filter((t: Task) => t.completed).reduce((sum: number, t: Task) => sum + t.coins, 0),
      )
    } else {
      const shuffled = [...taskTemplates].sort(() => 0.5 - Math.random())
      let taskCount = isGuest ? 4 : 5

      if (!isGuest && (inconsistencySettings.flexibleGoals || inconsistencySettings.comebackMode)) {
        taskCount = 3
      }

      const dailyTasks = shuffled.slice(0, taskCount).map((template, index) => ({
        ...template,
        id: `task_${index}`,
        completed: false,
        ...(isGuest &&
          template.difficulty === "hard" && {
            difficulty: "easy" as const,
            coins: 8,
            description: template.description.replace(/\d+/g, (match) =>
              Math.max(1, Math.floor(Number.parseInt(match) * 0.7)).toString(),
            ),
          }),
        ...(!isGuest &&
          inconsistencySettings.comebackMode &&
          template.difficulty === "hard" && {
            difficulty: "easy" as const,
            coins: 8,
            description: template.description.replace(/\d+/g, (match) =>
              Math.max(1, Math.floor(Number.parseInt(match) * 0.6)).toString(),
            ),
          }),
      }))
      setTasks(dailyTasks)
      localStorage.setItem(`${taskStorageKey}_${today}`, JSON.stringify(dailyTasks))
    }

    if (!isGuest) {
      checkGoogleFitConnection()
    }
  }, [isGuest])

  const checkGoogleFitConnection = async () => {
    try {
      const connected = await googleFitAPI.authenticate()
      setIsGoogleFitConnected(connected)
    } catch (error) {
      console.error("Google Fit connection failed:", error)
      setIsGoogleFitConnected(false)
    }
  }

  const completeTask = async (taskId: string, event?: React.MouseEvent) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task || task.completed) return

    if (!isGuest && (task.category === "fitness" || task.difficulty === "hard" || task.coins >= 9)) {
      setShowVerification(taskId)
      return
    }

    if (event && isGuest) {
      const rect = (event.target as HTMLElement).getBoundingClientRect()
      const newCoinAnimation = {
        id: `coin_${Date.now()}`,
        coins: task.coins,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }
      setAnimatingCoins((prev) => [...prev, newCoinAnimation])

      setTimeout(() => {
        setAnimatingCoins((prev) => prev.filter((coin) => coin.id !== newCoinAnimation.id))
      }, 2000)
    }

    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId && !t.completed) {
        const storageKey = isGuest ? "shineup-guest-data" : "shineup_user"
        const userData = localStorage.getItem(storageKey)
        if (userData) {
          const user = JSON.parse(userData)
          user.coins = (user.coins || 0) + t.coins
          localStorage.setItem(storageKey, JSON.stringify(user))
        }

        setTotalCoinsEarned((prev) => prev + t.coins)

        if (onTaskComplete) {
          onTaskComplete(t.coins)
        }

        return { ...t, completed: true }
      }
      return t
    })

    setTasks(updatedTasks)

    const today = new Date().toDateString()
    const taskStorageKey = isGuest ? "guest_daily_tasks" : "daily_tasks"
    localStorage.setItem(`${taskStorageKey}_${today}`, JSON.stringify(updatedTasks))

    const completedCount = updatedTasks.filter((t) => t.completed).length
    if (completedCount === updatedTasks.length && updatedTasks.length > 0) {
      setTimeout(() => {
        if (isGuest && onAllTasksComplete) {
          onAllTasksComplete()
        } else {
          setShowCelebration(true)
        }
      }, 500)
    }
  }

  const handleVerificationComplete = (taskId: string, verified: boolean, penalties?: string[]) => {
    setShowVerification(null)
    setVerificationResults((prev) => ({ ...prev, [taskId]: verified }))

    if (verified) {
      completeTask(taskId)
    } else {
      alert(`Task verification failed. Penalties applied: ${penalties?.join(", ") || "Multiple violations detected"}`)
    }
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const progressPercentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0

  return (
    <>
      <Card
        className={`border-2 ${isGuest ? "border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5" : "border-accent/20"}`}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-accent" />
              {isGuest
                ? "Try These Wellness Tasks"
                : inconsistencySettings.flexibleGoals
                  ? "Flexible Daily Goals"
                  : "Daily Tasks"}
              {isGuest && (
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                  <Gift className="h-3 w-3 mr-1" />
                  Free Trial
                </Badge>
              )}
              {!isGuest && (
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    isGoogleFitConnected
                      ? "bg-green-50 text-green-600 border-green-200"
                      : "bg-orange-50 text-orange-600 border-orange-200"
                  }`}
                >
                  {isGoogleFitConnected ? "✓ Fitness Verified" : "⚠ Connect Fitness"}
                </Badge>
              )}
              {!isGuest && inconsistencySettings.comebackMode && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
                  Gentle Mode
                </Badge>
              )}
            </div>
            <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
              <Coins className="h-4 w-4 mr-1" />
              {totalCoinsEarned} earned today
            </Badge>
          </CardTitle>
          {!isGuest && !isGoogleFitConnected && (
            <p className="text-sm text-orange-600 dark:text-orange-400">
              Connect Google Fit to verify fitness activities and earn coins for real workouts!
            </p>
          )}
          {isGuest && (
            <p className="text-sm text-muted-foreground">
              Complete these tasks to experience how SHINEUP helps build healthy habits. No account required!
            </p>
          )}
          {!isGuest && (inconsistencySettings.flexibleGoals || inconsistencySettings.comebackMode) && (
            <p className="text-sm text-muted-foreground">
              {inconsistencySettings.comebackMode
                ? "Welcome back! These gentler goals will help you build momentum."
                : "Flexible goals designed to build sustainable habits at your pace."}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {!isGuest && !isGoogleFitConnected && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200">Connect Google Fit</h4>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    Verify real fitness activities to earn coins and build authentic habits
                  </p>
                </div>
                <Button onClick={checkGoogleFitConnection} className="bg-orange-600 hover:bg-orange-700 text-white">
                  Connect Now
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">
                {isGuest
                  ? "Trial Progress"
                  : inconsistencySettings.flexibleGoals
                    ? "Today's Progress"
                    : "Daily Progress"}
              </span>
              <span className="text-muted-foreground">
                {completedTasks} / {tasks.length} completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            {completedTasks > 0 && completedTasks < tasks.length && (
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <Star className="h-3 w-3" />
                {isGuest
                  ? "Excellent! You're experiencing the power of consistent habits."
                  : inconsistencySettings.gentleReminders
                    ? "Great start! Every step counts towards building your habits."
                    : "Keep going! You're building amazing momentum."}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {tasks.map((task) => {
              const CategoryIcon = categoryIcons[task.category]
              const isVerifying = isVerifyingTask === task.id

              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    task.completed
                      ? "bg-accent/10 border-accent/30 opacity-75"
                      : `bg-card hover:bg-muted/30 border-border hover:border-accent/50 ${
                          isGuest ? "hover:shadow-lg hover:scale-[1.02]" : ""
                        }`
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <button
                        onClick={(e) => !task.completed && !isVerifying && completeTask(task.id, e)}
                        className={`mt-1 transition-all duration-200 ${
                          task.completed ? "text-accent" : "text-muted-foreground hover:text-accent hover:scale-110"
                        }`}
                        disabled={task.completed || isVerifying}
                      >
                        {task.completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                      </button>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`font-medium ${
                              task.completed ? "line-through text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {task.title}
                          </h4>
                          <Badge variant="outline" className={`text-xs ${categoryColors[task.category]}`}>
                            <CategoryIcon className="h-3 w-3 mr-1" />
                            {task.category}
                          </Badge>
                          {!isGuest && task.category === "fitness" && isGoogleFitConnected && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                              📱 Verified
                            </Badge>
                          )}
                        </div>
                        <p className={`text-sm ${task.completed ? "text-muted-foreground" : "text-muted-foreground"}`}>
                          {task.description}
                          {!isGuest && task.category === "fitness" && isGoogleFitConnected && (
                            <span className="block text-xs text-blue-600 mt-1">
                              ✓ Activity will be verified with Google Fit data
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Badge
                        variant={task.difficulty === "hard" ? "default" : "secondary"}
                        className={
                          task.difficulty === "hard"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {task.difficulty}
                      </Badge>
                      <div className="flex items-center text-accent font-semibold">
                        <Coins className="h-4 w-4 mr-1" />
                        {task.coins}
                      </div>
                    </div>
                  </div>

                  {!task.completed && (
                    <div className="mt-3 flex justify-end">
                      <Button
                        onClick={(e) => completeTask(task.id, e)}
                        size="sm"
                        disabled={isVerifying}
                        className={`transition-all duration-200 ${
                          isGuest
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105"
                            : "bg-accent hover:bg-accent/90 text-accent-foreground"
                        }`}
                      >
                        {isVerifying ? "Verifying..." : isGuest ? "Try This Task" : "Complete Task"}
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {isGuest && completedTasks > 0 && (
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">You're doing amazing!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                You've completed {completedTasks} task{completedTasks > 1 ? "s" : ""} and earned {totalCoinsEarned}{" "}
                coins. This is how SHINEUP helps you build lasting wellness habits through positive reinforcement.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {animatingCoins.map((coin) => (
        <CoinAnimation key={coin.id} coins={coin.coins} startX={coin.x} startY={coin.y} onComplete={() => {}} />
      ))}

      {!isGuest && (
        <TaskCompletionCelebration
          isOpen={showCelebration}
          onClose={() => setShowCelebration(false)}
          userData={{
            username: "User",
            coins: totalCoinsEarned,
            streak: streakCount,
            tasksCompletedToday: completedTasks,
            isConsistent: isConsistentUser,
          }}
        />
      )}

      {showVerification && (
        <Dialog open={!!showVerification} onOpenChange={() => setShowVerification(null)}>
          <DialogContent className="max-w-2xl">
            <TaskVerification
              taskId={showVerification}
              taskTitle={tasks.find((t) => t.id === showVerification)?.title || ""}
              taskCategory={tasks.find((t) => t.id === showVerification)?.category || ""}
              onVerificationComplete={(verified, penalties) =>
                handleVerificationComplete(showVerification, verified, penalties)
              }
              onVerificationStart={() => {}}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
