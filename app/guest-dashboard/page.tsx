"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Clock, Target, TrendingUp, ArrowRight, Star, Timer, Users, Crown } from "lucide-react"
import Link from "next/link"
import { DailyTasks } from "@/components/dashboard/daily-tasks"
import { FocusMode } from "@/components/dashboard/focus-mode"
import { TaskCompletionCelebration } from "@/components/dashboard/task-completion-celebration"
import { GuestConversionModal } from "@/components/conversion/guest-conversion-modal"

export default function GuestDashboard() {
  const [guestData, setGuestData] = useState({
    coins: 0,
    tasksCompleted: 0,
    focusTime: 0,
    streak: 1,
    joinedToday: true,
    sessionStartTime: Date.now(),
  })
  const [showCelebration, setShowCelebration] = useState(false)
  const [showBenefits, setShowBenefits] = useState(false)
  const [showConversion, setShowConversion] = useState(false)
  const [conversionTrigger, setConversionTrigger] = useState<
    "task_completion" | "focus_session" | "time_limit" | "feature_lock" | "progress_risk"
  >("task_completion")
  const [sessionTime, setSessionTime] = useState(0)

  // Load guest data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("shineup-guest-data")
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setGuestData({ ...parsed, sessionStartTime: parsed.sessionStartTime || Date.now() })
    }
  }, [])

  // Track session time and show conversion prompts
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now()
      const elapsed = Math.floor((currentTime - guestData.sessionStartTime) / 1000 / 60) // minutes
      setSessionTime(elapsed)

      // Show time-based conversion after 15 minutes
      if (elapsed >= 15 && !showConversion) {
        setConversionTrigger("time_limit")
        setShowConversion(true)
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [guestData.sessionStartTime, showConversion])

  // Save guest data to localStorage
  const updateGuestData = (newData: Partial<typeof guestData>) => {
    const updated = { ...guestData, ...newData }
    setGuestData(updated)
    localStorage.setItem("shineup-guest-data", JSON.stringify(updated))
  }

  const handleTaskComplete = (coins: number) => {
    const newCoins = guestData.coins + coins
    const newTasksCompleted = guestData.tasksCompleted + 1

    updateGuestData({
      coins: newCoins,
      tasksCompleted: newTasksCompleted,
    })

    // Show conversion after 3 tasks or 25 coins
    if ((newTasksCompleted >= 3 || newCoins >= 25) && !showConversion) {
      setTimeout(() => {
        setConversionTrigger("task_completion")
        setShowConversion(true)
      }, 2000)
    }
  }

  const handleAllTasksComplete = () => {
    setShowCelebration(true)
  }

  const handleCelebrationClose = () => {
    setShowCelebration(false)
    setShowBenefits(true)
  }

  const handleFocusComplete = (minutes: number) => {
    const newFocusTime = guestData.focusTime + minutes
    updateGuestData({ focusTime: newFocusTime })

    // Show conversion after 30 minutes of focus time
    if (newFocusTime >= 30 && !showConversion) {
      setTimeout(() => {
        setConversionTrigger("focus_session")
        setShowConversion(true)
      }, 1000)
    }
  }

  const handleFeatureLock = (feature: string) => {
    setConversionTrigger("feature_lock")
    setShowConversion(true)
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

      {/* Guest Header */}
      <div className="bg-gradient-to-r from-cyan-100/50 via-white/80 to-lime-100/50 border-b border-cyan-200/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-lime-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-lime-600 bg-clip-text text-transparent">
                  Welcome, Guest!
                </h1>
                <p className="text-lg text-slate-600 mt-1">Experience SHINEUP for free - no sign up required</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-700 border-cyan-300 px-4 py-2 text-base">
                <Timer className="w-4 h-4 mr-2" />
                {sessionTime}m trial
              </Badge>
              <Badge variant="secondary" className="bg-lime-100 text-lime-700 border-lime-300 px-4 py-2 text-base">
                Free Trial
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-16">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-cyan-700">{guestData.coins}</div>
                    <div className="text-sm text-cyan-600 mt-1">Coins Earned</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-lime-700">{guestData.tasksCompleted}</div>
                    <div className="text-sm text-lime-600 mt-1">Tasks Done</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-700">{guestData.focusTime}</div>
                    <div className="text-sm text-green-600 mt-1">Focus Minutes</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-orange-700">{guestData.streak}</div>
                    <div className="text-sm text-orange-600 mt-1">Day Streak</div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Risk Warning */}
              {(guestData.coins > 15 || guestData.tasksCompleted > 2) && (
                <Card className="border-2 border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Star className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                            Don't Lose Your Progress!
                          </h3>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            You've earned {guestData.coins} coins and completed {guestData.tasksCompleted} tasks. Save
                            your progress before it's gone!
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setConversionTrigger("progress_risk")
                          setShowConversion(true)
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Save Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Daily Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Today's Wellness Tasks
                  </CardTitle>
                  <CardDescription>Complete these tasks to earn coins and build healthy habits</CardDescription>
                </CardHeader>
                <CardContent>
                  <DailyTasks
                    onTaskComplete={handleTaskComplete}
                    onAllTasksComplete={handleAllTasksComplete}
                    isGuest={true}
                  />
                </CardContent>
              </Card>

              {/* Focus Mode */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Focus & Wellness Tools
                  </CardTitle>
                  <CardDescription>Try our focus timer, meditation, and breathing exercises</CardDescription>
                </CardHeader>
                <CardContent>
                  <FocusMode onFocusComplete={handleFocusComplete} isGuest={true} />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Upgrade Prompt */}
              <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Star className="w-5 h-5" />
                    Unlock Full Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Save your progress forever</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Join teams & compete</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Earn permanent badges</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Access leaderboards</span>
                    </div>
                  </div>
                  <Link href="/auth">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Sign Up Free
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Locked Features Teasers */}
              <Card className="border-2 border-dashed border-muted-foreground/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-5 h-5" />
                    Team Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Join teams, compete with friends, and climb leaderboards together.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => handleFeatureLock("teams")}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Unlock Teams
                  </Button>
                </CardContent>
              </Card>

              {/* Today's Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Your Progress Today
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Daily Goals</span>
                      <span>{Math.min(guestData.tasksCompleted, 3)}/3</span>
                    </div>
                    <Progress value={(guestData.tasksCompleted / 3) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Coins Earned</span>
                      <span>{guestData.coins}</span>
                    </div>
                    <Progress value={Math.min((guestData.coins / 25) * 100, 100)} className="h-2" />
                  </div>
                  {guestData.coins >= 20 && (
                    <div className="text-xs text-center text-muted-foreground bg-muted/50 p-2 rounded">
                      Amazing progress! Sign up to keep your {guestData.coins} coins forever.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Celebration Modal */}
      {showCelebration && (
        <TaskCompletionCelebration
          isOpen={showCelebration}
          onClose={handleCelebrationClose}
          userData={{
            username: "Guest",
            coins: guestData.coins,
            streak: guestData.streak,
            tasksCompletedToday: guestData.tasksCompleted,
            isConsistent: false,
          }}
          isGuest={true}
        />
      )}

      {/* Benefits Explanation Modal */}
      {showBenefits && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Amazing Work Today!</CardTitle>
              <CardDescription>Here's what you accomplished and what's next</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Today's Benefits */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Benefits You Gained Today
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="font-medium text-green-800 dark:text-green-200">Mental Clarity</div>
                    <div className="text-sm text-green-600 dark:text-green-300">Improved focus and decision-making</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="font-medium text-blue-800 dark:text-blue-200">Stress Reduction</div>
                    <div className="text-sm text-blue-600 dark:text-blue-300">Lower cortisol and anxiety levels</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="font-medium text-purple-800 dark:text-purple-200">Energy Boost</div>
                    <div className="text-sm text-purple-600 dark:text-purple-300">Natural endorphin release</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="font-medium text-orange-800 dark:text-orange-200">Better Sleep</div>
                    <div className="text-sm text-orange-600 dark:text-orange-300">Improved sleep quality tonight</div>
                  </div>
                </div>
              </div>

              {/* Tomorrow's Potential */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  What Tomorrow Brings
                </h3>
                <div className="space-y-3">
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <div className="font-medium text-primary mb-2">Build Your Streak</div>
                    <div className="text-sm text-muted-foreground">
                      Come back tomorrow to start a 2-day streak and unlock bonus rewards!
                    </div>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                    <div className="font-medium text-accent mb-2">Compound Benefits</div>
                    <div className="text-sm text-muted-foreground">
                      Each day builds on the last - better mood, sharper focus, and increased motivation.
                    </div>
                  </div>
                </div>
              </div>

              {/* Future Goals */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Your Wellness Journey Ahead</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                      7
                    </div>
                    <span>Week 1: Establish daily habits and see mood improvements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-xs font-bold text-accent">
                      30
                    </div>
                    <span>Month 1: Build lasting routines and notice significant stress reduction</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs font-bold text-green-600">
                      90
                    </div>
                    <span>3 Months: Transform your lifestyle with sustained energy and focus</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={() => setShowBenefits(false)} variant="outline" className="flex-1">
                  Continue as Guest
                </Button>
                <Link href="/auth" className="flex-1">
                  <Button className="w-full bg-primary hover:bg-primary/90">Save My Progress</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Conversion Modal */}
      <GuestConversionModal
        isOpen={showConversion}
        onClose={() => setShowConversion(false)}
        trigger={conversionTrigger}
        guestData={guestData}
      />
    </div>
  )
}
