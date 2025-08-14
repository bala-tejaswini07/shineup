"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dumbbell,
  Clock,
  Target,
  TrendingUp,
  Star,
  Calendar,
  Zap,
  Award,
  ChevronRight,
  Play,
  CheckCircle2,
} from "lucide-react"

interface WorkoutPlan {
  id: string
  name: string
  trainer: string
  trainerBio: string
  image: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  focus: string[]
  description: string
  results: string
  dailyPlan: DailyWorkout[]
  weeklySchedule: WeeklySchedule
}

interface DailyWorkout {
  day: string
  focus: string
  duration: number
  exercises: Exercise[]
}

interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
  tips: string
}

interface WeeklySchedule {
  week1: string
  week2: string
  week3: string
  week4: string
}

const workoutPlans: WorkoutPlan[] = [
  {
    id: "mass-builder",
    name: "Mass Builder Pro",
    trainer: "Marcus Steel",
    trainerBio:
      "IFBB Pro Bodybuilder with 15+ years of competitive experience. Specializes in muscle hypertrophy and strength building.",
    image: "/bodybuilder-mass.png",
    difficulty: "Advanced",
    duration: "12 weeks",
    focus: ["Muscle Mass", "Strength", "Power"],
    description:
      "Intense muscle-building program designed for serious lifters ready to pack on serious size and strength.",
    results: "Gain 8-15 lbs of lean muscle mass, increase strength by 25-40%, transform your physique completely",
    dailyPlan: [
      {
        day: "Monday - Chest & Triceps",
        focus: "Upper Body Push",
        duration: 90,
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: "6-8", rest: "3 min", tips: "Focus on controlled negative" },
          { name: "Incline Dumbbell Press", sets: 4, reps: "8-10", rest: "2.5 min", tips: "45-degree angle optimal" },
          { name: "Dips", sets: 3, reps: "10-12", rest: "2 min", tips: "Lean forward for chest emphasis" },
          { name: "Cable Flyes", sets: 3, reps: "12-15", rest: "90 sec", tips: "Squeeze at peak contraction" },
          {
            name: "Close-Grip Bench Press",
            sets: 4,
            reps: "8-10",
            rest: "2.5 min",
            tips: "Hands shoulder-width apart",
          },
          { name: "Tricep Dips", sets: 3, reps: "12-15", rest: "90 sec", tips: "Keep elbows close to body" },
        ],
      },
      {
        day: "Tuesday - Back & Biceps",
        focus: "Upper Body Pull",
        duration: 85,
        exercises: [
          { name: "Deadlifts", sets: 4, reps: "5-6", rest: "3 min", tips: "Keep bar close to body" },
          { name: "Pull-ups", sets: 4, reps: "8-12", rest: "2.5 min", tips: "Full range of motion" },
          { name: "Barbell Rows", sets: 4, reps: "8-10", rest: "2.5 min", tips: "Pull to lower chest" },
          { name: "T-Bar Rows", sets: 3, reps: "10-12", rest: "2 min", tips: "Squeeze shoulder blades" },
          { name: "Barbell Curls", sets: 4, reps: "10-12", rest: "2 min", tips: "No swinging motion" },
          { name: "Hammer Curls", sets: 3, reps: "12-15", rest: "90 sec", tips: "Neutral grip throughout" },
        ],
      },
      {
        day: "Wednesday - Legs",
        focus: "Lower Body Power",
        duration: 95,
        exercises: [
          { name: "Squats", sets: 5, reps: "6-8", rest: "3 min", tips: "Go below parallel" },
          { name: "Romanian Deadlifts", sets: 4, reps: "8-10", rest: "2.5 min", tips: "Feel hamstring stretch" },
          { name: "Leg Press", sets: 4, reps: "12-15", rest: "2 min", tips: "Full range of motion" },
          { name: "Walking Lunges", sets: 3, reps: "12 each leg", rest: "2 min", tips: "Step out far enough" },
          { name: "Leg Curls", sets: 4, reps: "12-15", rest: "90 sec", tips: "Slow negative phase" },
          { name: "Calf Raises", sets: 5, reps: "15-20", rest: "60 sec", tips: "Full stretch and contraction" },
        ],
      },
    ],
    weeklySchedule: {
      week1: "Foundation - Focus on form and establishing mind-muscle connection",
      week2: "Intensity - Increase weights by 5-10%, maintain perfect form",
      week3: "Volume - Add extra sets to compound movements",
      week4: "Peak - Maximum intensity week, test your limits safely",
    },
  },
  {
    id: "lean-shred",
    name: "Lean Shred System",
    trainer: "Sophia Fit",
    trainerBio:
      "Fitness model and certified trainer with expertise in body recomposition. Featured in top fitness magazines.",
    image: "/bodybuilder-lean.png",
    difficulty: "Intermediate",
    duration: "8 weeks",
    focus: ["Fat Loss", "Muscle Definition", "Conditioning"],
    description:
      "High-intensity program combining strength training with metabolic conditioning for rapid fat loss while preserving muscle.",
    results: "Lose 12-20 lbs of fat, reveal muscle definition, improve cardiovascular fitness by 30%",
    dailyPlan: [
      {
        day: "Monday - Upper Body Circuit",
        focus: "Strength + Cardio",
        duration: 60,
        exercises: [
          { name: "Push-up to T", sets: 3, reps: "10-12", rest: "45 sec", tips: "Rotate fully to each side" },
          { name: "Dumbbell Thrusters", sets: 3, reps: "12-15", rest: "45 sec", tips: "Explosive upward movement" },
          { name: "Renegade Rows", sets: 3, reps: "8 each arm", rest: "60 sec", tips: "Keep core tight" },
          { name: "Burpee Pull-ups", sets: 3, reps: "6-8", rest: "90 sec", tips: "Explosive movement" },
          { name: "Mountain Climbers", sets: 3, reps: "20 each leg", rest: "30 sec", tips: "Fast pace, stay low" },
          { name: "Plank to Pike", sets: 3, reps: "12-15", rest: "45 sec", tips: "Control the movement" },
        ],
      },
      {
        day: "Tuesday - Lower Body Power",
        focus: "Legs + Glutes",
        duration: 55,
        exercises: [
          { name: "Jump Squats", sets: 4, reps: "15-20", rest: "60 sec", tips: "Land softly" },
          {
            name: "Bulgarian Split Squats",
            sets: 3,
            reps: "12 each leg",
            rest: "60 sec",
            tips: "Keep front knee aligned",
          },
          { name: "Deadlift to High Pull", sets: 3, reps: "10-12", rest: "90 sec", tips: "Explosive hip drive" },
          { name: "Lateral Lunges", sets: 3, reps: "10 each side", rest: "45 sec", tips: "Push hips back" },
          {
            name: "Single-Leg Glute Bridges",
            sets: 3,
            reps: "12 each leg",
            rest: "45 sec",
            tips: "Squeeze glutes hard",
          },
          { name: "Wall Sit", sets: 3, reps: "30-45 sec", rest: "60 sec", tips: "Thighs parallel to floor" },
        ],
      },
      {
        day: "Wednesday - HIIT Cardio",
        focus: "Fat Burning",
        duration: 45,
        exercises: [
          {
            name: "Sprint Intervals",
            sets: 8,
            reps: "30 sec on/30 sec off",
            rest: "Complete rest between",
            tips: "All-out effort",
          },
          {
            name: "Battle Ropes",
            sets: 4,
            reps: "20 sec on/40 sec off",
            rest: "Complete rest",
            tips: "Full body waves",
          },
          { name: "Box Jumps", sets: 4, reps: "10-12", rest: "60 sec", tips: "Step down safely" },
          { name: "Kettlebell Swings", sets: 4, reps: "20-25", rest: "60 sec", tips: "Hip hinge movement" },
          { name: "High Knees", sets: 3, reps: "30 sec", rest: "30 sec", tips: "Drive knees up high" },
          { name: "Cool Down Walk", sets: 1, reps: "5 min", rest: "N/A", tips: "Gradual heart rate reduction" },
        ],
      },
    ],
    weeklySchedule: {
      week1: "Adaptation - Learn movement patterns, moderate intensity",
      week2: "Progression - Increase intensity and reduce rest periods",
      week3: "Acceleration - Peak intensity, maximum fat burning",
      week4: "Refinement - Perfect form while maintaining high intensity",
    },
  },
  {
    id: "strength-foundation",
    name: "Strength Foundation",
    trainer: "Jake Power",
    trainerBio:
      "Powerlifting champion and strength coach. Holds multiple state records and has coached hundreds to their first competition.",
    image: "/bodybuilder-strength.png",
    difficulty: "Beginner",
    duration: "6 weeks",
    focus: ["Basic Strength", "Form", "Confidence"],
    description:
      "Perfect starting point for beginners. Master fundamental movements and build a solid strength foundation safely.",
    results: "Master proper form, increase strength by 40-60%, build confidence in the gym",
    dailyPlan: [
      {
        day: "Monday - Upper Body Basics",
        focus: "Push Movements",
        duration: 45,
        exercises: [
          { name: "Push-ups (Modified if needed)", sets: 3, reps: "8-12", rest: "90 sec", tips: "Keep body straight" },
          { name: "Dumbbell Bench Press", sets: 3, reps: "10-12", rest: "2 min", tips: "Control the weight" },
          { name: "Seated Dumbbell Press", sets: 3, reps: "10-12", rest: "90 sec", tips: "Press straight up" },
          { name: "Tricep Extensions", sets: 2, reps: "12-15", rest: "60 sec", tips: "Keep elbows still" },
          { name: "Lateral Raises", sets: 2, reps: "12-15", rest: "60 sec", tips: "Slight bend in elbows" },
          { name: "Plank Hold", sets: 3, reps: "20-30 sec", rest: "60 sec", tips: "Straight line from head to heels" },
        ],
      },
      {
        day: "Tuesday - Lower Body Basics",
        focus: "Leg Strength",
        duration: 40,
        exercises: [
          { name: "Bodyweight Squats", sets: 3, reps: "12-15", rest: "90 sec", tips: "Sit back into squat" },
          { name: "Goblet Squats", sets: 3, reps: "10-12", rest: "2 min", tips: "Hold weight at chest" },
          { name: "Lunges", sets: 2, reps: "8 each leg", rest: "90 sec", tips: "Step forward, not down" },
          { name: "Glute Bridges", sets: 3, reps: "15-20", rest: "60 sec", tips: "Squeeze glutes at top" },
          { name: "Calf Raises", sets: 3, reps: "15-20", rest: "45 sec", tips: "Rise up on toes" },
          { name: "Wall Sit", sets: 2, reps: "15-25 sec", rest: "90 sec", tips: "Back flat against wall" },
        ],
      },
      {
        day: "Wednesday - Pull Movements",
        focus: "Back & Arms",
        duration: 40,
        exercises: [
          { name: "Assisted Pull-ups", sets: 3, reps: "5-8", rest: "2 min", tips: "Use assistance as needed" },
          { name: "Dumbbell Rows", sets: 3, reps: "10-12", rest: "90 sec", tips: "Pull to hip, not chest" },
          { name: "Lat Pulldowns", sets: 3, reps: "10-12", rest: "90 sec", tips: "Pull to upper chest" },
          { name: "Bicep Curls", sets: 2, reps: "12-15", rest: "60 sec", tips: "No swinging" },
          { name: "Face Pulls", sets: 2, reps: "15-20", rest: "60 sec", tips: "Pull to face level" },
          { name: "Dead Bug", sets: 2, reps: "8 each side", rest: "45 sec", tips: "Keep lower back pressed down" },
        ],
      },
    ],
    weeklySchedule: {
      week1: "Learning - Focus entirely on proper form and technique",
      week2: "Building - Slight weight increases, maintain perfect form",
      week3: "Strengthening - Noticeable strength gains, add complexity",
      week4: "Confidence - You'll feel strong and capable in the gym",
    },
  },
]

export function WorkoutPlans() {
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openPlanDetails = (plan: WorkoutPlan) => {
    setSelectedPlan(plan)
    setIsDialogOpen(true)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Advanced":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {workoutPlans.map((plan) => (
          <Card
            key={plan.id}
            className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/30 overflow-hidden"
          >
            <div className="relative">
              <img
                src={plan.image || "/placeholder.svg"}
                alt={plan.trainer}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className={`mb-2 ${getDifficultyColor(plan.difficulty)}`}>{plan.difficulty}</Badge>
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-white/90 text-sm">by {plan.trainer}</p>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {plan.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {plan.focus.length} focuses
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">{plan.description}</p>

                <div className="flex flex-wrap gap-1">
                  {plan.focus.map((focus, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {focus}
                    </Badge>
                  ))}
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => openPlanDetails(plan)}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    View Full Plan
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Plan Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedPlan && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <Dumbbell className="w-8 h-8 text-primary" />
                  {selectedPlan.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Trainer Info */}
                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <img
                    src={selectedPlan.image || "/placeholder.svg"}
                    alt={selectedPlan.trainer}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-primary">{selectedPlan.trainer}</h3>
                    <p className="text-sm text-muted-foreground">{selectedPlan.trainerBio}</p>
                  </div>
                  <Badge className={getDifficultyColor(selectedPlan.difficulty)}>{selectedPlan.difficulty}</Badge>
                </div>

                {/* Plan Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 text-center">
                      <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="font-bold text-primary">{selectedPlan.duration}</div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-accent/5 border-accent/20">
                    <CardContent className="p-4 text-center">
                      <Target className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="font-bold text-accent">{selectedPlan.focus.length} Areas</div>
                      <div className="text-sm text-muted-foreground">Focus Points</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-500/5 border-green-500/20">
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-bold text-green-600">Proven</div>
                      <div className="text-sm text-muted-foreground">Results</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Expected Results */}
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                      <Award className="w-5 h-5" />
                      Expected Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-700 dark:text-green-300">{selectedPlan.results}</p>
                  </CardContent>
                </Card>

                {/* Detailed Plan Tabs */}
                <Tabs defaultValue="daily" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="daily">Daily Workouts</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly Progression</TabsTrigger>
                  </TabsList>

                  <TabsContent value="daily" className="space-y-4">
                    {selectedPlan.dailyPlan.map((day, index) => (
                      <Card key={index} className="border-2 border-primary/10">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Zap className="w-5 h-5 text-primary" />
                              {day.day}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {day.duration} min
                            </div>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">{day.focus}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {day.exercises.map((exercise, exerciseIndex) => (
                              <div key={exerciseIndex} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="font-medium">{exercise.name}</div>
                                  <div className="text-sm text-muted-foreground mb-1">
                                    {exercise.sets} sets × {exercise.reps} reps • Rest: {exercise.rest}
                                  </div>
                                  <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                                    💡 {exercise.tips}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="weekly" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(selectedPlan.weeklySchedule).map(([week, description], index) => (
                        <Card key={week} className="border-2 border-accent/20">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Calendar className="w-5 h-5 text-accent" />
                              Week {index + 1}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Start Plan Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold px-8 py-3"
                  >
                    <Star className="w-5 h-5 mr-2" />
                    Start This Plan
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
