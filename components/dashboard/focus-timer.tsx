"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Pause, Square, RotateCcw } from "lucide-react"

export function FocusTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            // Timer completed - could add notification here
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning]) // Removed timeLeft dependency to prevent constant interval recreation

  useEffect(() => {
    if (!isRunning) {
      const newTotal = minutes * 60 + seconds
      setTotalSeconds(newTotal)
      setTimeLeft(newTotal)
    }
  }, [minutes, seconds, isRunning])

  const handleStart = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    const newTotal = minutes * 60 + seconds
    setTotalSeconds(newTotal)
    setTimeLeft(newTotal)
  }

  const handleStop = () => {
    setIsRunning(false)
    const newTotal = minutes * 60 + seconds
    setTotalSeconds(newTotal)
    setTimeLeft(newTotal)
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = Math.min(180, Math.max(1, Number.parseInt(e.target.value) || 1))
    setMinutes(newMinutes)
  }

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeconds = Math.min(59, Math.max(0, Number.parseInt(e.target.value) || 0))
    setSeconds(newSeconds)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0
  const circumference = 2 * Math.PI * 120
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="text-center space-y-6">
      {/* Circular Progress */}
      <div className="relative mx-auto w-64 h-64">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-muted"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-primary transition-all duration-1000 ease-in-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground">{formatTime(timeLeft)}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {isRunning ? "Focus Time" : timeLeft === 0 ? "Time's Up!" : "Ready to Focus"}
            </div>
          </div>
        </div>
      </div>

      {/* Time Input - Show inputs even when running for better UX */}
      {!isRunning && (
        <div className="flex items-center justify-center space-x-4">
          <div className="space-y-2">
            <Label htmlFor="minutes" className="text-sm">
              Minutes
            </Label>
            <Input
              id="minutes"
              type="number"
              min="1"
              max="180"
              value={minutes}
              onChange={handleMinutesChange}
              className="w-20 text-center"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seconds" className="text-sm">
              Seconds
            </Label>
            <Input
              id="seconds"
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={handleSecondsChange}
              className="w-20 text-center"
            />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          onClick={handleStart}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl"
          disabled={timeLeft === 0 && !isRunning}
        >
          {isRunning ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
          {isRunning ? "Pause" : "Start"}
        </Button>

        <Button onClick={handleReset} variant="outline" className="px-6 py-3 rounded-xl bg-transparent">
          <RotateCcw className="h-5 w-5 mr-2" />
          Reset
        </Button>

        <Button onClick={handleStop} variant="destructive" className="px-6 py-3 rounded-xl">
          <Square className="h-5 w-5 mr-2" />
          Stop
        </Button>
      </div>
    </div>
  )
}
