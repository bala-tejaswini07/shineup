"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Heart,
  Zap,
  Moon,
  TrendingUp,
  Target,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Award,
  X,
} from "lucide-react"

interface BenefitsExplanationProps {
  isOpen: boolean
  onClose: () => void
  tasksCompleted: number
  coinsEarned: number
  focusMinutes?: number
  isGuest?: boolean
  streakCount?: number
}

const immediateBenefits = [
  {
    icon: Brain,
    title: "Mental Clarity",
    description: "Improved focus and decision-making",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
    benefit: "Your brain is now more focused and ready for complex tasks",
  },
  {
    icon: Heart,
    title: "Stress Reduction",
    description: "Lower cortisol and anxiety levels",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    benefit: "Your stress hormones have decreased, promoting calm",
  },
  {
    icon: Zap,
    title: "Energy Boost",
    description: "Natural endorphin release",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
    benefit: "Endorphins are flowing, giving you natural energy",
  },
  {
    icon: Moon,
    title: "Better Sleep",
    description: "Improved sleep quality tonight",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800",
    benefit: "Your body is prepared for deeper, more restorative sleep",
  },
]

const futureBenefits = [
  {
    timeframe: "Tomorrow",
    icon: Target,
    title: "Build Your Streak",
    description: "Come back tomorrow to continue your momentum and unlock bonus rewards",
    color: "text-primary",
  },
  {
    timeframe: "This Week",
    icon: TrendingUp,
    title: "Compound Benefits",
    description: "Each day builds on the last - better mood, sharper focus, increased motivation",
    color: "text-accent",
  },
  {
    timeframe: "This Month",
    icon: Award,
    title: "Lasting Transformation",
    description: "Sustainable habits formed, significant improvements in overall wellbeing",
    color: "text-green-600",
  },
]

const longTermGoals = [
  { days: 7, title: "Establish daily habits", benefit: "See mood improvements and increased energy" },
  { days: 30, title: "Build lasting routines", benefit: "Notice significant stress reduction and better focus" },
  { days: 90, title: "Transform your lifestyle", benefit: "Sustained energy, mental clarity, and overall wellness" },
]

export function BenefitsExplanation({
  isOpen,
  onClose,
  tasksCompleted,
  coinsEarned,
  focusMinutes = 0,
  isGuest = false,
  streakCount = 1,
}: BenefitsExplanationProps) {
  const [currentView, setCurrentView] = useState<"immediate" | "future" | "longterm">("immediate")

  if (!isOpen) return null

  const getPersonalizedMessage = () => {
    if (tasksCompleted >= 4) {
      return "Outstanding dedication! You've completed most of your wellness tasks today."
    } else if (tasksCompleted >= 2) {
      return "Great progress! You're building healthy momentum."
    } else {
      return "Every step counts! You've started your wellness journey today."
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              <CardTitle className="text-2xl text-primary">Your Wellness Impact Today</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-lg">{getPersonalizedMessage()}</CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-6">
            <div className="bg-muted p-1 rounded-lg flex gap-1">
              <Button
                variant={currentView === "immediate" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("immediate")}
                className="text-xs"
              >
                Today's Benefits
              </Button>
              <Button
                variant={currentView === "future" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("future")}
                className="text-xs"
              >
                What's Next
              </Button>
              <Button
                variant={currentView === "longterm" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("longterm")}
                className="text-xs"
              >
                Your Journey
              </Button>
            </div>
          </div>

          {/* Today's Achievements Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  {tasksCompleted}
                </div>
                <div className="text-sm text-muted-foreground">Tasks Completed</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  {coinsEarned}
                </div>
                <div className="text-sm text-muted-foreground">Coins Earned</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-2">
                  <Clock className="w-6 h-6" />
                  {focusMinutes}
                </div>
                <div className="text-sm text-muted-foreground">Focus Minutes</div>
              </CardContent>
            </Card>
          </div>

          {/* Content based on current view */}
          {currentView === "immediate" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Benefits You're Experiencing Right Now
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {immediateBenefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    return (
                      <div key={index} className={`p-4 rounded-lg border ${benefit.bgColor}`}>
                        <div className="flex items-start gap-3">
                          <Icon className={`w-6 h-6 ${benefit.color} mt-1`} />
                          <div>
                            <div className={`font-medium ${benefit.color}`}>{benefit.title}</div>
                            <div className="text-sm text-muted-foreground mb-2">{benefit.description}</div>
                            <div className="text-xs text-foreground font-medium">{benefit.benefit}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {tasksCompleted > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Science-Backed Results</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Research shows that completing wellness tasks releases dopamine and endorphins, improving mood
                    within minutes. Your brain is already adapting to these positive changes!
                  </p>
                </div>
              )}
            </div>
          )}

          {currentView === "future" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  What Tomorrow and Beyond Brings
                </h3>
                <div className="space-y-4">
                  {futureBenefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    return (
                      <div
                        key={index}
                        className="bg-card p-4 rounded-lg border border-border hover:border-accent/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <Icon className={`w-6 h-6 ${benefit.color}`} />
                            <Badge variant="outline" className="text-xs mt-2">
                              {benefit.timeframe}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <div className={`font-medium ${benefit.color} mb-1`}>{benefit.title}</div>
                            <div className="text-sm text-muted-foreground">{benefit.description}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">The Compound Effect</h4>
                <p className="text-sm text-muted-foreground">
                  Each day you return, your benefits multiply. Consistency is the key to transformation - small daily
                  actions create remarkable long-term results.
                </p>
              </div>
            </div>
          )}

          {currentView === "longterm" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  Your Wellness Journey Ahead
                </h3>
                <div className="space-y-4">
                  {longTermGoals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                            goal.days <= streakCount ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {goal.days}
                        </div>
                        {index < longTermGoals.length - 1 && <div className="w-0.5 h-8 bg-border mt-2"></div>}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="font-medium text-foreground">{goal.title}</div>
                        <div className="text-sm text-muted-foreground">{goal.benefit}</div>
                        {goal.days <= streakCount && (
                          <Badge className="mt-2 bg-green-500 text-white text-xs">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Achieved!
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Your Potential</h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Studies show that people who maintain wellness habits for 90+ days experience lasting changes in brain
                  structure, stress response, and overall life satisfaction. You're building something incredible!
                </p>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {isGuest ? (
                <>
                  <Button onClick={onClose} variant="outline" className="flex-1 sm:flex-none bg-transparent">
                    Continue Exploring
                  </Button>
                  <Button className="flex-1 sm:flex-none bg-primary hover:bg-primary/90">
                    Save My Progress
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              ) : (
                <Button onClick={onClose} className="flex-1 sm:flex-none bg-accent hover:bg-accent/90">
                  Continue My Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
