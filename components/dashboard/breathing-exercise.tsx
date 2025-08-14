"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, Square } from "lucide-react"

const breathingPatterns = [
  { value: "4-4-4", label: "Box Breathing (4-4-4-4)", inhale: 4, hold: 4, exhale: 4, holdEmpty: 4 },
  { value: "4-7-8", label: "Relaxing (4-7-8)", inhale: 4, hold: 7, exhale: 8, holdEmpty: 0 },
  { value: "6-2-6", label: "Energizing (6-2-6)", inhale: 6, hold: 2, exhale: 6, holdEmpty: 0 },
  { value: "5-5-5", label: "Balanced (5-5-5)", inhale: 5, hold: 5, exhale: 5, holdEmpty: 0 },
]

export function BreathingExercise() {
  const [selectedPattern, setSelectedPattern] = useState("4-4-4")
  const [isRunning, setIsRunning] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "holdEmpty">("inhale")
  const [timeLeft, setTimeLeft] = useState(4)
  const [cycle, setCycle] = useState(0)

  const currentPattern = breathingPatterns.find((p) => p.value === selectedPattern) || breathingPatterns[0]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === "inhale") {
              setPhase("hold")
              return currentPattern.hold
            } else if (phase === "hold") {
              setPhase("exhale")
              return currentPattern.exhale
            } else if (phase === "exhale") {
              if (currentPattern.holdEmpty > 0) {
                setPhase("holdEmpty")
                return currentPattern.holdEmpty
              } else {
                setPhase("inhale")
                setCycle((c) => c + 1)
                return currentPattern.inhale
              }
            } else {
              setPhase("inhale")
              setCycle((c) => c + 1)
              return currentPattern.inhale
            }
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, phase, currentPattern])

  const handleStart = () => {
    if (!isRunning) {
      setPhase("inhale")
      setTimeLeft(currentPattern.inhale)
      setCycle(0)
    }
    setIsRunning(!isRunning)
  }

  const handleStop = () => {
    setIsRunning(false)
    setPhase("inhale")
    setTimeLeft(currentPattern.inhale)
    setCycle(0)
  }

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In"
      case "hold":
        return "Hold"
      case "exhale":
        return "Breathe Out"
      case "holdEmpty":
        return "Hold Empty"
      default:
        return "Ready"
    }
  }

  const getCircleScale = () => {
    if (!isRunning) return "scale-100"

    switch (phase) {
      case "inhale":
        return "scale-150"
      case "hold":
        return "scale-150"
      case "exhale":
        return "scale-75"
      case "holdEmpty":
        return "scale-75"
      default:
        return "scale-100"
    }
  }

  return (
    <div className="text-center space-y-6">
      {/* Breathing Animation */}
      <div className="relative mx-auto w-64 h-64 flex items-center justify-center">
        <div
          className={`w-32 h-32 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 transition-transform duration-1000 ease-in-out ${getCircleScale()} flex items-center justify-center`}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{timeLeft}</div>
            <div className="text-sm text-muted-foreground">{getPhaseText()}</div>
          </div>
        </div>

        {/* Breathing rings */}
        <div
          className={`absolute w-40 h-40 rounded-full border-2 border-primary/20 transition-transform duration-1000 ease-in-out ${isRunning ? "scale-125" : "scale-100"}`}
        ></div>
        <div
          className={`absolute w-48 h-48 rounded-full border border-accent/20 transition-transform duration-1000 ease-in-out ${isRunning ? "scale-110" : "scale-100"}`}
        ></div>
      </div>

      {/* Pattern Selection */}
      {!isRunning && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Breathing Pattern</label>
          <Select value={selectedPattern} onValueChange={setSelectedPattern}>
            <SelectTrigger className="w-full max-w-xs mx-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {breathingPatterns.map((pattern) => (
                <SelectItem key={pattern.value} value={pattern.value}>
                  {pattern.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Cycle Counter */}
      {isRunning && (
        <div className="space-y-2">
          <p className="text-lg font-medium text-primary">Cycle {cycle + 1}</p>
          <p className="text-sm text-muted-foreground">Follow the rhythm and relax</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          onClick={handleStart}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl"
        >
          {isRunning ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
          {isRunning ? "Pause" : "Start"}
        </Button>

        <Button onClick={handleStop} variant="outline" className="px-6 py-3 rounded-xl bg-transparent">
          <Square className="h-5 w-5 mr-2" />
          Stop
        </Button>
      </div>
    </div>
  )
}
