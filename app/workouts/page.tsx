"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WorkoutPlans } from "@/components/workouts/workout-plans"
import { CalorieBurner } from "@/components/workouts/calorie-burner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flame, Dumbbell } from "lucide-react"

export default function WorkoutsPage() {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("shineup_user")
      return userData ? JSON.parse(userData) : { username: "Guest", coins: 0 }
    }
    return { username: "Guest", coins: 0 }
  })

  const handleCoinsEarned = (coins: number) => {
    setUser((prev) => ({
      ...prev,
      coins: (prev.coins || 0) + coins,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-2 h-2 bg-lime-400 rounded-full animate-pulse opacity-60"></div>
        <div
          className="absolute top-40 right-20 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-lime-300 rounded-full animate-pulse opacity-40"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-16 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="space-y-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-lime-600 bg-clip-text text-transparent mb-8 leading-tight">
              Fitness & Workouts
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Track your calorie burn, follow expert workout plans, and earn coins for your fitness achievements
            </p>
          </div>

          <Tabs defaultValue="calorie-burner" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-14 text-lg">
              <TabsTrigger value="calorie-burner" className="flex items-center gap-3 text-base">
                <Flame className="w-5 h-5" />
                Calorie Burner
              </TabsTrigger>
              <TabsTrigger value="workout-plans" className="flex items-center gap-3 text-base">
                <Dumbbell className="w-5 h-5" />
                Workout Plans
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calorie-burner" className="mt-16">
              <CalorieBurner onCoinsEarned={handleCoinsEarned} />
            </TabsContent>

            <TabsContent value="workout-plans" className="mt-16">
              <WorkoutPlans />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
