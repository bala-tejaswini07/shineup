"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Heart, Target, Calendar, TrendingUp, Lightbulb, Coffee, Smile, ArrowRight } from "lucide-react"

interface InconsistencySettings {
  flexibleGoals: boolean
  gentleReminders: boolean
  microHabits: boolean
  comebackMode: boolean
}

export function InconsistencySupport() {
  const [settings, setSettings] = useState<InconsistencySettings>({
    flexibleGoals: false,
    gentleReminders: true,
    microHabits: false,
    comebackMode: false,
  })
  const [lastLoginDate, setLastLoginDate] = useState<string>("")
  const [daysSinceLastLogin, setDaysSinceLastLogin] = useState(0)
  const [showComebackMessage, setShowComebackMessage] = useState(false)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("inconsistency_settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }

    // Check last login date
    const userData = localStorage.getItem("shineup_user")
    if (userData) {
      const user = JSON.parse(userData)
      const lastLogin = user.lastLoginDate || new Date().toDateString()
      const today = new Date().toDateString()

      if (lastLogin !== today) {
        const lastDate = new Date(lastLogin)
        const todayDate = new Date(today)
        const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        setDaysSinceLastLogin(diffDays)
        setLastLoginDate(lastLogin)

        // Show comeback message if away for 2+ days
        if (diffDays >= 2) {
          setShowComebackMessage(true)
          setSettings((prev) => ({ ...prev, comebackMode: true }))
        }

        // Update last login date
        user.lastLoginDate = today
        localStorage.setItem("shineup_user", JSON.stringify(user))
      }
    }
  }, [])

  const updateSetting = (key: keyof InconsistencySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem("inconsistency_settings", JSON.stringify(newSettings))
  }

  const dismissComebackMessage = () => {
    setShowComebackMessage(false)
    updateSetting("comebackMode", false)
  }

  const microHabits = [
    { icon: Coffee, text: "Drink one glass of water", coins: 2 },
    { icon: Smile, text: "Take 3 deep breaths", coins: 2 },
    { icon: Heart, text: "Write one thing you're grateful for", coins: 2 },
    { icon: Target, text: "Do 5 jumping jacks", coins: 2 },
  ]

  return (
    <div className="space-y-6">
      {/* Comeback Welcome Message */}
      {showComebackMessage && (
        <Card className="border-2 border-green-500/30 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-green-500" />
                  <h3 className="text-xl font-bold text-green-700 dark:text-green-400">Welcome Back! 🌟</h3>
                </div>
                <p className="text-green-600 dark:text-green-300">
                  It's been {daysSinceLastLogin} days since your last visit. That's totally okay! Every day is a fresh
                  start, and we're here to support your journey.
                </p>
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <Lightbulb className="h-4 w-4" />
                  <span>We've enabled gentle mode to help you ease back in</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={dismissComebackMessage}
                className="text-green-600 hover:text-green-700"
              >
                Got it!
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inconsistency Support Settings */}
      <Card className="border-2 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-purple-500" />
            Consistency Support
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Customize your experience to build sustainable habits at your own pace
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Flexible Goals */}
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Flexible Goals</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Set minimum viable goals that are easier to achieve consistently
              </p>
            </div>
            <Switch
              checked={settings.flexibleGoals}
              onCheckedChange={(checked) => updateSetting("flexibleGoals", checked)}
            />
          </div>

          {/* Gentle Reminders */}
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-500" />
                <h4 className="font-medium">Gentle Reminders</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Receive supportive, non-judgmental reminders instead of pressure
              </p>
            </div>
            <Switch
              checked={settings.gentleReminders}
              onCheckedChange={(checked) => updateSetting("gentleReminders", checked)}
            />
          </div>

          {/* Micro Habits */}
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <h4 className="font-medium">Micro Habits</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Show tiny, 30-second habits that are almost impossible to skip
              </p>
            </div>
            <Switch
              checked={settings.microHabits}
              onCheckedChange={(checked) => updateSetting("microHabits", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Micro Habits Section */}
      {settings.microHabits && (
        <Card className="border-2 border-orange-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-6 w-6 text-orange-500" />
              Micro Habits (30 seconds each)
            </CardTitle>
            <p className="text-sm text-muted-foreground">Tiny actions that build momentum. Start with just one!</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {microHabits.map((habit, index) => {
                const Icon = habit.icon
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-orange-500" />
                      <span className="text-sm font-medium">{habit.text}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      +{habit.coins} coins
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Recovery Tips */}
      {settings.comebackMode && (
        <Card className="border-2 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-blue-500" />
              Getting Back on Track
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">Start Small</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Pick just one easy task today. Building momentum is more important than perfection.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <ArrowRight className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-700 dark:text-green-300">Be Kind to Yourself</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Every expert was once a beginner. Your journey is unique and valuable.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                <ArrowRight className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-700 dark:text-purple-300">Focus on Today</h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Don't worry about yesterday or tomorrow. Just focus on what you can do right now.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
