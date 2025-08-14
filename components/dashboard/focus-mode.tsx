"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timer, Brain, Wind } from "lucide-react"
import { FocusTimer } from "@/components/dashboard/focus-timer"
import { MeditationTimer } from "@/components/dashboard/meditation-timer"
import { BreathingExercise } from "@/components/dashboard/breathing-exercise"

export function FocusMode() {
  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Brain className="h-6 w-6 text-primary" />
          Focus Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="timer" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="timer" className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Focus Timer
            </TabsTrigger>
            <TabsTrigger value="meditation" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Meditation
            </TabsTrigger>
            <TabsTrigger value="breathing" className="flex items-center gap-2">
              <Wind className="h-4 w-4" />
              Breathing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timer" className="mt-6">
            <FocusTimer />
          </TabsContent>

          <TabsContent value="meditation" className="mt-6">
            <MeditationTimer />
          </TabsContent>

          <TabsContent value="breathing" className="mt-6">
            <BreathingExercise />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
