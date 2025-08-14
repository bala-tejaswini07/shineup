"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, Square } from "lucide-react"

const meditationSessions = [
  { value: "5", label: "5 minutes - Quick Reset" },
  { value: "10", label: "10 minutes - Daily Practice" },
  { value: "15", label: "15 minutes - Deep Focus" },
  { value: "20", label: "20 minutes - Extended Session" },
  { value: "30", label: "30 minutes - Master Level" },
]

export function MeditationTimer() {
  const [selectedDuration, setSelectedDuration] = useState("10")
  const [timeLeft, setTimeLeft] = useState(10 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(10 * 60)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft])

  const handleDurationChange = (value: string) => {
    setSelectedDuration(value)
    const seconds = Number.parseInt(value) * 60
    setTotalSeconds(seconds)
    setTimeLeft(seconds)
    setIsRunning(false)
  }

  const handleStart = () => {
    setIsRunning(!isRunning)
  }

  const handleStop = () => {
    setIsRunning(false)
    setTimeLeft(totalSeconds)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0

  return (
    <div className="text-center space-y-6">
      {/* Meditation Animation */}
      <div className="relative mx-auto w-64 h-64 flex items-center justify-center">
        <div
          className={`w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 ${isRunning ? "animate-pulse" : ""} flex items-center justify-center`}
        >
          <div
            className={`w-24 h-24 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 ${isRunning ? "animate-ping" : ""} flex items-center justify-center`}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <div className="text-white text-2xl font-bold">{formatTime(timeLeft)}</div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        {isRunning && (
          <>
            <div className="absolute top-8 left-8 w-2 h-2 bg-accent rounded-full animate-float opacity-60"></div>
            <div
              className="absolute top-12 right-12 w-1.5 h-1.5 bg-primary rounded-full animate-float opacity-40"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-16 left-16 w-1 h-1 bg-accent rounded-full animate-float opacity-50"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-8 right-8 w-2 h-2 bg-primary rounded-full animate-float opacity-30"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </>
        )}
      </div>

      {/* Duration Selection */}
      {!isRunning && timeLeft === totalSeconds && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Choose Duration</label>
          <Select value={selectedDuration} onValueChange={handleDurationChange}>
            <SelectTrigger className="w-full max-w-xs mx-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {meditationSessions.map((session) => (
                <SelectItem key={session.value} value={session.value}>
                  {session.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Meditation Guidance */}
      {isRunning && (
        <div className="space-y-2">
          <p className="text-lg font-medium text-primary">Find your center</p>
          <p className="text-sm text-muted-foreground">Breathe deeply and let your mind settle</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          onClick={handleStart}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl"
        >
          {isRunning ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
          {isRunning ? "Pause" : "Begin"}
        </Button>

        <Button onClick={handleStop} variant="outline" className="px-6 py-3 rounded-xl bg-transparent">
          <Square className="h-5 w-5 mr-2" />
          Stop
        </Button>
      </div>
    </div>
  )
}
