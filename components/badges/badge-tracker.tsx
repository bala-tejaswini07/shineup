"use client"

import { useEffect } from "react"

// This component runs badge tracking logic in the background
export function BadgeTracker() {
  useEffect(() => {
    // Update user stats when tasks are completed
    const updateUserStats = () => {
      const userData = localStorage.getItem("shineup_user")
      if (!userData) return

      const user = JSON.parse(userData)

      // Count total completed tasks from all days
      let totalTasks = 0
      let dailyCompletes = 0

      // Check localStorage for all daily task completions
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith("daily_tasks_")) {
          const tasks = JSON.parse(localStorage.getItem(key) || "[]")
          const completedTasks = tasks.filter((t: any) => t.completed)
          totalTasks += completedTasks.length

          // If all tasks completed for that day
          if (completedTasks.length === tasks.length && tasks.length > 0) {
            dailyCompletes++
          }
        }
      }

      // Update user stats
      user.totalTasksCompleted = totalTasks
      user.dailyCompletes = dailyCompletes
      user.maxStreak = Math.max(user.maxStreak || 0, user.streak || 0)

      localStorage.setItem("shineup_user", JSON.stringify(user))
    }

    // Run stats update
    updateUserStats()

    // Set up interval to check periodically
    const interval = setInterval(updateUserStats, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return null // This component doesn't render anything
}
