"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Shield, AlertTriangle, CheckCircle2, X, Upload, Eye, Timer, Ban } from "lucide-react"

interface VerificationData {
  taskId: string
  startTime: number
  endTime?: number
  minDuration: number
  proofRequired: boolean
  proofSubmitted?: string
  photoProof?: string
  locationProof?: { lat: number; lng: number }
  deviceMotion?: boolean
  suspiciousActivity: string[]
  verificationScore: number
}

interface TaskVerificationProps {
  taskId: string
  taskTitle: string
  taskCategory: string
  onVerificationComplete: (verified: boolean, penalties?: string[]) => void
  onVerificationStart: () => void
}

export function TaskVerification({
  taskId,
  taskTitle,
  taskCategory,
  onVerificationComplete,
  onVerificationStart,
}: TaskVerificationProps) {
  const [verification, setVerification] = useState<VerificationData>({
    taskId,
    startTime: 0,
    minDuration: getMinDuration(taskCategory, taskTitle),
    proofRequired: requiresProof(taskCategory, taskTitle),
    suspiciousActivity: [],
    verificationScore: 100,
  })
  const [isActive, setIsActive] = useState(false)
  const [showProofDialog, setShowProofDialog] = useState(false)
  const [proofText, setProofText] = useState("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [penalties, setPenalties] = useState<string[]>([])
  const [userHistory, setUserHistory] = useState<any[]>([])

  useEffect(() => {
    // Load user's task completion history for pattern analysis
    const history = localStorage.getItem("task_completion_history") || "[]"
    setUserHistory(JSON.parse(history))
  }, [])

  useEffect(() => {
    if (isActive) {
      // Monitor for suspicious patterns
      const interval = setInterval(() => {
        detectSuspiciousActivity()
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isActive])

  function getMinDuration(category: string, title: string): number {
    // Define minimum realistic durations for different tasks (in seconds)
    const durations: Record<string, number> = {
      fitness: 600, // 10 minutes minimum for fitness tasks
      mindfulness: 300, // 5 minutes for meditation/mindfulness
      nutrition: 120, // 2 minutes for nutrition tasks
      productivity: 900, // 15 minutes for productivity tasks
      team: 180, // 3 minutes for team tasks
    }

    // Special cases based on task title
    if (title.includes("45-minute") || title.includes("45 minute")) return 2700 // 45 minutes
    if (title.includes("30-minute") || title.includes("30 minute")) return 1800 // 30 minutes
    if (title.includes("15-minute") || title.includes("15 minute")) return 900 // 15 minutes
    if (title.includes("2 hours") || title.includes("2-hour")) return 7200 // 2 hours

    return durations[category] || 300 // Default 5 minutes
  }

  function requiresProof(category: string, title: string): boolean {
    // Tasks that require additional proof beyond time verification
    const proofRequired = [
      "workout",
      "exercise",
      "meal prep",
      "cook at home",
      "nature walk",
      "meditation",
      "gratitude journal",
      "learn something new",
    ]

    return proofRequired.some((keyword) => title.toLowerCase().includes(keyword))
  }

  function detectSuspiciousActivity() {
    const suspicious: string[] = []

    // Check if user is completing tasks too quickly
    const currentTime = Date.now()
    const elapsed = (currentTime - verification.startTime) / 1000

    if (elapsed < verification.minDuration * 0.3) {
      // Completing less than 30% of minimum time
      suspicious.push("Task completed too quickly")
    }

    // Check for rapid consecutive completions
    const recentCompletions = userHistory.filter(
      (h) => currentTime - h.timestamp < 300000, // Last 5 minutes
    )
    if (recentCompletions.length > 3) {
      suspicious.push("Multiple rapid task completions")
    }

    // Check for identical completion times (bot-like behavior)
    const completionTimes = userHistory.map((h) => h.duration).slice(-5)
    if (completionTimes.length >= 3 && new Set(completionTimes).size === 1) {
      suspicious.push("Identical completion times detected")
    }

    // Check for unrealistic patterns
    const todayCompletions = userHistory.filter(
      (h) => new Date(h.timestamp).toDateString() === new Date().toDateString(),
    )
    if (todayCompletions.length > 20) {
      suspicious.push("Unusually high daily task completion")
    }

    if (suspicious.length > 0) {
      setVerification((prev) => ({
        ...prev,
        suspiciousActivity: [...prev.suspiciousActivity, ...suspicious],
        verificationScore: Math.max(0, prev.verificationScore - suspicious.length * 20),
      }))
    }
  }

  const startVerification = () => {
    setVerification((prev) => ({
      ...prev,
      startTime: Date.now(),
    }))
    setIsActive(true)
    onVerificationStart()

    // Request location for location-based tasks
    if (taskTitle.toLowerCase().includes("nature") || taskTitle.toLowerCase().includes("walk")) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setVerification((prev) => ({
            ...prev,
            locationProof: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }))
        },
        () => {
          setVerification((prev) => ({
            ...prev,
            suspiciousActivity: [...prev.suspiciousActivity, "Location access denied for outdoor task"],
            verificationScore: prev.verificationScore - 15,
          }))
        },
      )
    }

    // Monitor device motion for fitness tasks
    if (taskCategory === "fitness" && "DeviceMotionEvent" in window) {
      const handleMotion = (event: DeviceMotionEvent) => {
        const acceleration = event.accelerationIncludingGravity
        if (acceleration && (Math.abs(acceleration.x || 0) > 2 || Math.abs(acceleration.y || 0) > 2)) {
          setVerification((prev) => ({ ...prev, deviceMotion: true }))
        }
      }

      window.addEventListener("devicemotion", handleMotion)
      setTimeout(() => window.removeEventListener("devicemotion", handleMotion), verification.minDuration * 1000)
    }
  }

  const completeVerification = () => {
    const endTime = Date.now()
    const duration = (endTime - verification.startTime) / 1000
    const newPenalties: string[] = []

    setVerification((prev) => ({ ...prev, endTime }))
    setIsActive(false)

    // Time-based verification
    if (duration < verification.minDuration) {
      newPenalties.push(
        `Task completed too quickly (${Math.round(duration)}s vs required ${verification.minDuration}s)`,
      )
      setVerification((prev) => ({ ...prev, verificationScore: prev.verificationScore - 30 }))
    }

    // Motion verification for fitness tasks
    if (taskCategory === "fitness" && !verification.deviceMotion && duration > 300) {
      newPenalties.push("No device motion detected during fitness activity")
      setVerification((prev) => ({ ...prev, verificationScore: prev.verificationScore - 25 }))
    }

    // Proof requirement check
    if (verification.proofRequired && !verification.proofSubmitted && !verification.photoProof) {
      setShowProofDialog(true)
      return
    }

    // Calculate final verification result
    const finalScore = verification.verificationScore - newPenalties.length * 10
    const verified = finalScore >= 60 && newPenalties.length < 3

    // Save completion to history
    const completionRecord = {
      taskId,
      timestamp: endTime,
      duration: Math.round(duration),
      verified,
      score: finalScore,
      penalties: [...verification.suspiciousActivity, ...newPenalties],
    }

    const updatedHistory = [completionRecord, ...userHistory.slice(0, 49)] // Keep last 50
    localStorage.setItem("task_completion_history", JSON.stringify(updatedHistory))

    // Apply penalties if verification failed
    if (!verified) {
      applyPenalties([...verification.suspiciousActivity, ...newPenalties])
    }

    setPenalties([...verification.suspiciousActivity, ...newPenalties])
    onVerificationComplete(verified, verified ? [] : [...verification.suspiciousActivity, ...newPenalties])
  }

  const submitProof = () => {
    if (!proofText.trim() && !photoFile) {
      alert("Please provide either text description or photo proof")
      return
    }

    setVerification((prev) => ({
      ...prev,
      proofSubmitted: proofText,
      photoProof: photoFile ? URL.createObjectURL(photoFile) : undefined,
    }))

    setShowProofDialog(false)
    completeVerification()
  }

  const applyPenalties = (penaltyList: string[]) => {
    const userData = localStorage.getItem("shineup_user")
    if (userData) {
      const user = JSON.parse(userData)

      // Deduct coins for cheating attempts
      const coinPenalty = Math.min(user.coins || 0, penaltyList.length * 5)
      user.coins = (user.coins || 0) - coinPenalty

      // Add strike system
      user.strikes = (user.strikes || 0) + 1
      user.lastStrike = Date.now()

      // Temporary restrictions for repeated violations
      if (user.strikes >= 3) {
        user.restricted = true
        user.restrictionEnd = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      }

      localStorage.setItem("shineup_user", JSON.stringify(user))
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentDuration = isActive ? (Date.now() - verification.startTime) / 1000 : 0

  return (
    <>
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Shield className="w-5 h-5" />
            Task Verification System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-800">{taskTitle}</h4>
              <p className="text-sm text-blue-600">
                Minimum duration: {formatTime(verification.minDuration)}
                {verification.proofRequired && " • Proof required"}
              </p>
            </div>
            <Badge
              variant="outline"
              className={`${
                verification.verificationScore >= 80
                  ? "text-green-600 border-green-300 bg-green-50"
                  : verification.verificationScore >= 60
                    ? "text-yellow-600 border-yellow-300 bg-yellow-50"
                    : "text-red-600 border-red-300 bg-red-50"
              }`}
            >
              Score: {verification.verificationScore}%
            </Badge>
          </div>

          {isActive && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-700">
                <Timer className="w-4 h-4 animate-pulse" />
                <span className="font-mono text-lg">{formatTime(currentDuration)}</span>
                <span className="text-sm">/ {formatTime(verification.minDuration)} required</span>
              </div>

              <div className="bg-blue-100 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Active Monitoring</span>
                </div>
                <div className="text-xs text-blue-600 space-y-1">
                  <div>✓ Time tracking active</div>
                  {taskCategory === "fitness" && <div>✓ Motion detection enabled</div>}
                  {verification.locationProof && <div>✓ Location verified</div>}
                  {verification.proofRequired && <div>⏳ Proof will be requested</div>}
                </div>
              </div>
            </div>
          )}

          {verification.suspiciousActivity.length > 0 && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">Suspicious Activity Detected</span>
              </div>
              <ul className="text-xs text-red-600 space-y-1">
                {verification.suspiciousActivity.map((activity, index) => (
                  <li key={index}>• {activity}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2">
            {!isActive && !verification.endTime && (
              <Button onClick={startVerification} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                <Shield className="w-4 h-4 mr-2" />
                Start Verified Task
              </Button>
            )}

            {isActive && (
              <Button
                onClick={completeVerification}
                disabled={currentDuration < verification.minDuration}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Complete Task
                {currentDuration < verification.minDuration && (
                  <span className="ml-2 text-xs">
                    ({formatTime(verification.minDuration - currentDuration)} remaining)
                  </span>
                )}
              </Button>
            )}
          </div>

          {penalties.length > 0 && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Ban className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">Verification Failed - Penalties Applied</span>
              </div>
              <ul className="text-xs text-red-600 space-y-1">
                {penalties.map((penalty, index) => (
                  <li key={index}>• {penalty}</li>
                ))}
              </ul>
              <p className="text-xs text-red-500 mt-2">
                Coins deducted: -{penalties.length * 5} | Strike added to account
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Proof Submission Dialog */}
      <Dialog open={showProofDialog} onOpenChange={setShowProofDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Submit Task Proof
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This task requires proof of completion. Please provide a description or photo evidence.
            </p>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description of what you did:</label>
              <Textarea
                value={proofText}
                onChange={(e) => setProofText(e.target.value)}
                placeholder="Describe how you completed this task..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Photo proof (optional):</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                className="cursor-pointer"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={submitProof} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Submit Proof
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowProofDialog(false)}
                className="border-gray-300 text-gray-600"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
