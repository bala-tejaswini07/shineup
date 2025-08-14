"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Crown,
  Users,
  Trophy,
  Shield,
  Zap,
  Heart,
  TrendingUp,
  X,
  ArrowRight,
  CheckCircle2,
  Clock,
  Gift,
} from "lucide-react"
import Link from "next/link"

interface ConversionModalProps {
  isOpen: boolean
  onClose: () => void
  trigger: "task_completion" | "focus_session" | "time_limit" | "feature_lock" | "progress_risk"
  guestData: {
    coins: number
    tasksCompleted: number
    focusTime: number
    streak: number
  }
}

const conversionReasons = {
  task_completion: {
    title: "Don't Lose Your Amazing Progress!",
    subtitle: "You're building incredible momentum",
    urgency: "Your progress will be lost when you close this browser",
    icon: Trophy,
    color: "text-yellow-500",
    bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20",
  },
  focus_session: {
    title: "Unlock Advanced Focus Tools",
    subtitle: "Take your productivity to the next level",
    urgency: "Premium focus features are just one click away",
    icon: Zap,
    color: "text-blue-500",
    bgGradient: "from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20",
  },
  time_limit: {
    title: "Your Free Trial is Almost Over",
    subtitle: "Save your progress before it's gone",
    urgency: "Only 5 minutes left in your trial session",
    icon: Clock,
    color: "text-red-500",
    bgGradient: "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
  },
  feature_lock: {
    title: "Unlock the Full SHINEUP Experience",
    subtitle: "Access premium features and team collaboration",
    urgency: "Join thousands of users transforming their lives",
    icon: Crown,
    color: "text-purple-500",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
  },
  progress_risk: {
    title: "Secure Your Wellness Journey",
    subtitle: "Don't start over - save your achievements",
    urgency: "Your coins, streak, and progress are at risk",
    icon: Shield,
    color: "text-green-500",
    bgGradient: "from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20",
  },
}

const premiumFeatures = [
  {
    icon: Users,
    title: "Join Teams & Compete",
    description: "Create or join teams, compete in challenges, and motivate each other",
    badge: "Social",
  },
  {
    icon: Trophy,
    title: "Permanent Badges & Achievements",
    description: "Earn prestigious badges that showcase your wellness journey",
    badge: "Prestige",
  },
  {
    icon: TrendingUp,
    title: "Advanced Analytics",
    description: "Track your progress with detailed insights and personalized recommendations",
    badge: "Insights",
  },
  {
    icon: Crown,
    title: "Global Leaderboards",
    description: "See how you rank against users worldwide and climb the rankings",
    badge: "Competition",
  },
  {
    icon: Heart,
    title: "Unlimited Focus Sessions",
    description: "Access all focus tools, meditation guides, and breathing exercises",
    badge: "Wellness",
  },
  {
    icon: Shield,
    title: "Progress Protection",
    description: "Your data is safely stored and synced across all your devices",
    badge: "Security",
  },
]

export function GuestConversionModal({ isOpen, onClose, trigger, guestData }: ConversionModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const conversionData = conversionReasons[trigger]
  const Icon = conversionData.icon

  if (!isOpen) return null

  const getProgressValue = () => {
    const maxCoins = 50
    const maxTasks = 10
    const maxFocus = 120

    const coinProgress = Math.min((guestData.coins / maxCoins) * 100, 100)
    const taskProgress = Math.min((guestData.tasksCompleted / maxTasks) * 100, 100)
    const focusProgress = Math.min((guestData.focusTime / maxFocus) * 100, 100)

    return Math.round((coinProgress + taskProgress + focusProgress) / 3)
  }

  const steps = [
    {
      title: "Your Amazing Progress",
      content: (
        <div className="space-y-6">
          <div className={`p-6 rounded-xl bg-gradient-to-br ${conversionData.bgGradient} border`}>
            <div className="flex items-center gap-3 mb-4">
              <Icon className={`w-8 h-8 ${conversionData.color}`} />
              <div>
                <h3 className="text-xl font-bold text-foreground">{conversionData.title}</h3>
                <p className="text-muted-foreground">{conversionData.subtitle}</p>
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-700 dark:text-red-300 font-medium">⚠️ {conversionData.urgency}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-2xl font-bold text-primary">{guestData.coins}</div>
              <div className="text-xs text-muted-foreground">Coins Earned</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-2xl font-bold text-accent">{guestData.tasksCompleted}</div>
              <div className="text-xs text-muted-foreground">Tasks Done</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{guestData.focusTime}</div>
              <div className="text-xs text-muted-foreground">Focus Minutes</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your Progress</span>
              <span>{getProgressValue()}% Complete</span>
            </div>
            <Progress value={getProgressValue()} className="h-3" />
            <p className="text-xs text-muted-foreground text-center">
              Don't lose this progress! Sign up to save everything permanently.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "What You'll Unlock",
      content: (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2">
              <Gift className="w-4 h-4 mr-2" />
              100% Free Forever
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
            {premiumFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-card rounded-lg border hover:border-accent/50 transition-colors"
                >
                  <FeatureIcon className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{feature.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                </div>
              )
            })}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-hidden border-2 border-primary/30 shadow-2xl">
        <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-primary">Save Your Progress</CardTitle>
              <CardDescription>Join SHINEUP and continue your wellness journey</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Step Indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${index < currentStep ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center">{steps[currentStep].title}</h3>
            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
                Maybe Later
              </Button>
            </div>

            <div className="flex gap-2">
              {currentStep < steps.length - 1 ? (
                <Button onClick={() => setCurrentStep(currentStep + 1)} className="bg-primary hover:bg-primary/90">
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Link href="/auth">
                    <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-6">
                      <Star className="w-4 h-4 mr-2" />
                      Save My Progress
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-center items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>50K+ Users</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
