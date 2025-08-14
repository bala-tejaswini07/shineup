"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Sparkles, Heart, Target, Calendar, TrendingUp, Coins, X, ArrowRight } from "lucide-react"
import { BenefitsExplanation } from "../benefits/benefits-explanation"

interface CelebrationProps {
  isOpen: boolean
  onClose: () => void
  userData: {
    username: string
    coins: number
    streak: number
    tasksCompletedToday: number
    isConsistent: boolean
  }
  isGuest?: boolean
}

export function TaskCompletionCelebration({ isOpen, onClose, userData, isGuest = false }: CelebrationProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showBenefits, setShowBenefits] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  const celebrationMessages = [
    {
      icon: Trophy,
      title: "Outstanding Achievement!",
      message: userData.isConsistent
        ? "Your consistency is truly inspiring! You've completed all your daily tasks again."
        : "What an incredible comeback! You've shown real determination today.",
      color: "text-yellow-500",
      bgColor: "from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20",
    },
    {
      icon: Star,
      title: "You're Building Something Amazing",
      message: `${userData.tasksCompletedToday} tasks completed means ${userData.tasksCompletedToday} steps closer to your best self. Every action you took today matters.`,
      color: "text-purple-500",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
    },
    {
      icon: Heart,
      title: "Tomorrow Awaits Your Greatness",
      message:
        userData.streak > 0
          ? `Your ${userData.streak}-day streak shows your commitment. Rest well, and let's continue this journey tomorrow!`
          : "Every expert was once a beginner. Tomorrow is another opportunity to shine!",
      color: "text-red-500",
      bgColor: "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
    },
  ]

  const currentMessage = celebrationMessages[currentSlide]
  const Icon = currentMessage.icon

  const nextSlide = () => {
    if (currentSlide < celebrationMessages.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setShowBenefits(true)
    }
  }

  const skipToEnd = () => {
    onClose()
  }

  const handleBenefitsClose = () => {
    setShowBenefits(false)
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </div>
            ))}
          </div>
        )}

        <Card className="w-full max-w-lg mx-auto border-2 border-accent/30 shadow-2xl">
          <CardContent className="p-0">
            {/* Header with close button */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                <span className="font-semibold text-sm">Daily Achievement</span>
              </div>
              <Button variant="ghost" size="sm" onClick={skipToEnd}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Main celebration content */}
            <div className={`p-8 bg-gradient-to-br ${currentMessage.bgColor} text-center space-y-6`}>
              {/* Icon with animation */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping">
                    <Icon className={`h-16 w-16 ${currentMessage.color} opacity-20`} />
                  </div>
                  <Icon className={`h-16 w-16 ${currentMessage.color} relative z-10`} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-foreground">{currentMessage.title}</h2>

              {/* Message */}
              <p className="text-muted-foreground text-lg leading-relaxed">{currentMessage.message}</p>

              {/* Stats */}
              <div className="flex justify-center gap-6 py-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-accent font-bold text-xl">
                    <Target className="h-5 w-5" />
                    {userData.tasksCompletedToday}
                  </div>
                  <p className="text-xs text-muted-foreground">Tasks Done</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-accent font-bold text-xl">
                    <Coins className="h-5 w-5" />
                    {userData.coins}
                  </div>
                  <p className="text-xs text-muted-foreground">Coins Earned</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-accent font-bold text-xl">
                    <TrendingUp className="h-5 w-5" />
                    {userData.streak}
                  </div>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>

              {/* Special badges for achievements */}
              <div className="flex justify-center gap-2">
                {userData.streak >= 7 && (
                  <Badge className="bg-purple-500 text-white">
                    <Calendar className="h-3 w-3 mr-1" />
                    Week Warrior
                  </Badge>
                )}
                {userData.tasksCompletedToday >= 5 && (
                  <Badge className="bg-green-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Task Master
                  </Badge>
                )}
                {userData.coins >= 50 && (
                  <Badge className="bg-yellow-500 text-white">
                    <Coins className="h-3 w-3 mr-1" />
                    Coin Collector
                  </Badge>
                )}
              </div>
            </div>

            {/* Footer with navigation */}
            <div className="p-4 bg-card border-t">
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {celebrationMessages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-accent" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  {currentSlide < celebrationMessages.length - 1 ? (
                    <>
                      <Button variant="ghost" size="sm" onClick={skipToEnd}>
                        Skip
                      </Button>
                      <Button onClick={nextSlide} size="sm" className="bg-accent hover:bg-accent/90">
                        Next
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </>
                  ) : (
                    <Button onClick={nextSlide} size="sm" className="bg-accent hover:bg-accent/90">
                      See Your Benefits
                      <Sparkles className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BenefitsExplanation
        isOpen={showBenefits}
        onClose={handleBenefitsClose}
        tasksCompleted={userData.tasksCompletedToday}
        coinsEarned={userData.coins}
        isGuest={isGuest}
        streakCount={userData.streak}
      />
    </>
  )
}
