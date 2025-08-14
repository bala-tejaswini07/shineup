"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, Coins, Target, Zap } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  difficulty: "easy" | "hard"
  coins: number
  completed: boolean
  category: "fitness" | "mindfulness" | "nutrition" | "productivity"
}

const taskTemplates: Omit<Task, "id" | "completed">[] = [
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
]

const categoryIcons = {
  fitness: Target,
  mindfulness: Circle,
  nutrition: Zap,
  productivity: CheckCircle2,
}

const categoryColors = {
  fitness: "text-green-500 bg-green-500/10 border-green-500/20",
  mindfulness: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  nutrition: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  productivity: "text-blue-500 bg-blue-500/10 border-blue-500/20",
}

export function DailyTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [totalCoinsEarned, setTotalCoinsEarned] = useState(0)

  useEffect(() => {
    // Generate daily tasks (in a real app, this would be server-side)
    const today = new Date().toDateString()
    const savedTasks = localStorage.getItem(`daily_tasks_${today}`)

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks)
      setTasks(parsedTasks)
      setTotalCoinsEarned(
        parsedTasks.filter((t: Task) => t.completed).reduce((sum: number, t: Task) => sum + t.coins, 0),
      )
    } else {
      // Generate 5 random tasks for today
      const shuffled = [...taskTemplates].sort(() => 0.5 - Math.random())
      const dailyTasks = shuffled.slice(0, 5).map((template, index) => ({
        ...template,
        id: `task_${index}`,
        completed: false,
      }))
      setTasks(dailyTasks)
      localStorage.setItem(`daily_tasks_${today}`, JSON.stringify(dailyTasks))
    }
  }, [])

  const completeTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId && !task.completed) {
        // Update user coins
        const userData = localStorage.getItem("shineup_user")
        if (userData) {
          const user = JSON.parse(userData)
          user.coins = (user.coins || 0) + task.coins
          localStorage.setItem("shineup_user", JSON.stringify(user))
        }

        setTotalCoinsEarned((prev) => prev + task.coins)
        return { ...task, completed: true }
      }
      return task
    })

    setTasks(updatedTasks)

    // Save to localStorage
    const today = new Date().toDateString()
    localStorage.setItem(`daily_tasks_${today}`, JSON.stringify(updatedTasks))
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const progressPercentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0

  return (
    <Card className="border-2 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-accent" />
            Daily Tasks
          </div>
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
            <Coins className="h-4 w-4 mr-1" />
            {totalCoinsEarned} earned today
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Daily Progress</span>
            <span className="text-muted-foreground">
              {completedTasks} / {tasks.length} completed
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => {
            const CategoryIcon = categoryIcons[task.category]
            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  task.completed
                    ? "bg-accent/10 border-accent/30 opacity-75"
                    : "bg-card hover:bg-muted/30 border-border hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <button
                      onClick={() => !task.completed && completeTask(task.id)}
                      className={`mt-1 transition-colors ${
                        task.completed ? "text-accent" : "text-muted-foreground hover:text-accent"
                      }`}
                      disabled={task.completed}
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
                      </div>
                      <p className={`text-sm ${task.completed ? "text-muted-foreground" : "text-muted-foreground"}`}>
                        {task.description}
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
                      onClick={() => completeTask(task.id)}
                      size="sm"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      Complete Task
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Completion Reward */}
        {completedTasks === tasks.length && tasks.length > 0 && (
          <div className="p-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl border-2 border-accent/30 text-center">
            <h3 className="font-bold text-lg text-foreground mb-2">🎉 All Tasks Complete!</h3>
            <p className="text-muted-foreground mb-3">
              Amazing work! You've earned a bonus for completing all daily tasks.
            </p>
            <Badge className="bg-accent text-accent-foreground">
              <Coins className="h-4 w-4 mr-1" />
              +5 Bonus Coins
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
