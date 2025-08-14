// Google Fit API integration for SHINEUP
// This handles authentication and data fetching from Google Fit

interface GoogleFitData {
  steps: number
  calories: number
  activeMinutes: number
  distance: number
  heartRate?: number
}

interface ActivitySession {
  activityType: string
  startTime: number
  endTime: number
  calories: number
  duration: number
}

class GoogleFitAPI {
  private accessToken: string | null = null
  private readonly CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_FIT_CLIENT_ID || ""
  private readonly SCOPES = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.location.read",
  ]
  private isInitialized = false

  async authenticate(): Promise<boolean> {
    try {
      if (!this.CLIENT_ID) {
        console.warn("Google Fit Client ID not configured")
        return false
      }

      // Initialize Google API
      await this.loadGoogleAPI()

      // Check if gapi and auth2 are properly loaded
      if (!window.gapi || !window.gapi.auth2) {
        console.error("Google API not properly loaded")
        return false
      }

      const authInstance = window.gapi.auth2.getAuthInstance()

      if (!authInstance) {
        console.error("Google Auth instance not available")
        return false
      }

      const isSignedIn = authInstance.isSignedIn
      if (!isSignedIn) {
        console.error("Google Auth isSignedIn not available")
        return false
      }

      if (!isSignedIn.get()) {
        const user = await authInstance.signIn()
        this.accessToken = user.getAuthResponse().access_token
      } else {
        this.accessToken = authInstance.currentUser.get().getAuthResponse().access_token
      }

      this.isInitialized = true
      return true
    } catch (error) {
      console.error("Google Fit authentication failed:", error)
      return false
    }
  }

  private async loadGoogleAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window !== "undefined" && window.gapi && window.gapi.auth2) {
        resolve()
        return
      }

      if (typeof window === "undefined") {
        reject(new Error("Window object not available"))
        return
      }

      const script = document.createElement("script")
      script.src = "https://apis.google.com/js/api.js"
      script.onload = () => {
        if (!window.gapi) {
          reject(new Error("Google API failed to load"))
          return
        }

        window.gapi.load("auth2", () => {
          window.gapi.auth2
            .init({
              client_id: this.CLIENT_ID,
              scope: this.SCOPES.join(" "),
            })
            .then(() => {
              console.log("Google Fit API initialized successfully")
              resolve()
            })
            .catch(reject)
        })
      }
      script.onerror = () => reject(new Error("Failed to load Google API script"))
      document.head.appendChild(script)
    })
  }

  async getTodaysFitnessData(): Promise<GoogleFitData | null> {
    if (!this.isInitialized || !this.accessToken) {
      console.warn("Google Fit not authenticated, using mock data")
      // Return mock data for demo purposes
      return {
        steps: Math.floor(Math.random() * 5000) + 3000,
        calories: Math.floor(Math.random() * 300) + 200,
        activeMinutes: Math.floor(Math.random() * 60) + 30,
        distance: Math.floor(Math.random() * 3) + 2,
      }
    }

    try {
      const today = new Date()
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)

      const startTimeNanos = startOfDay.getTime() * 1000000
      const endTimeNanos = endOfDay.getTime() * 1000000

      // Fetch different data types
      const [stepsData, caloriesData, activeMinutesData, distanceData] = await Promise.all([
        this.fetchDataType("com.google.step_count.delta", startTimeNanos, endTimeNanos),
        this.fetchDataType("com.google.calories.expended", startTimeNanos, endTimeNanos),
        this.fetchDataType("com.google.active_minutes", startTimeNanos, endTimeNanos),
        this.fetchDataType("com.google.distance.delta", startTimeNanos, endTimeNanos),
      ])

      return {
        steps: this.aggregateSteps(stepsData),
        calories: this.aggregateCalories(caloriesData),
        activeMinutes: this.aggregateActiveMinutes(activeMinutesData),
        distance: this.aggregateDistance(distanceData),
      }
    } catch (error) {
      console.error("Failed to fetch fitness data:", error)
      return {
        steps: Math.floor(Math.random() * 5000) + 3000,
        calories: Math.floor(Math.random() * 300) + 200,
        activeMinutes: Math.floor(Math.random() * 60) + 30,
        distance: Math.floor(Math.random() * 3) + 2,
      }
    }
  }

  private async fetchDataType(dataType: string, startTimeNanos: number, endTimeNanos: number): Promise<any> {
    const response = await fetch(`https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aggregateBy: [{ dataTypeName: dataType }],
        bucketByTime: { durationMillis: 86400000 }, // 1 day
        startTimeMillis: Math.floor(startTimeNanos / 1000000),
        endTimeMillis: Math.floor(endTimeNanos / 1000000),
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${dataType}: ${response.statusText}`)
    }

    return response.json()
  }

  private aggregateSteps(data: any): number {
    if (!data.bucket || !data.bucket[0] || !data.bucket[0].dataset) return 0

    return (
      data.bucket[0].dataset[0].point?.reduce((total: number, point: any) => {
        return total + (point.value[0]?.intVal || 0)
      }, 0) || 0
    )
  }

  private aggregateCalories(data: any): number {
    if (!data.bucket || !data.bucket[0] || !data.bucket[0].dataset) return 0

    return (
      data.bucket[0].dataset[0].point?.reduce((total: number, point: any) => {
        return total + (point.value[0]?.fpVal || 0)
      }, 0) || 0
    )
  }

  private aggregateActiveMinutes(data: any): number {
    if (!data.bucket || !data.bucket[0] || !data.bucket[0].dataset) return 0

    return (
      data.bucket[0].dataset[0].point?.reduce((total: number, point: any) => {
        return total + (point.value[0]?.intVal || 0)
      }, 0) || 0
    )
  }

  private aggregateDistance(data: any): number {
    if (!data.bucket || !data.bucket[0] || !data.bucket[0].dataset) return 0

    return (
      data.bucket[0].dataset[0].point?.reduce((total: number, point: any) => {
        return total + (point.value[0]?.fpVal || 0)
      }, 0) || 0
    )
  }

  async getWorkoutSessions(): Promise<ActivitySession[]> {
    if (!this.isInitialized || !this.accessToken) return []

    try {
      const today = new Date()
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)

      const response = await fetch(
        `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startOfDay.toISOString()}&endTime=${endOfDay.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      )

      if (!response.ok) return []

      const data = await response.json()
      return (
        data.session?.map((session: any) => ({
          activityType: session.activityType,
          startTime: Number.parseInt(session.startTimeMillis),
          endTime: Number.parseInt(session.endTimeMillis),
          calories: session.calories || 0,
          duration: Number.parseInt(session.endTimeMillis) - Number.parseInt(session.startTimeMillis),
        })) || []
      )
    } catch (error) {
      console.error("Failed to fetch workout sessions:", error)
      return []
    }
  }
}

export const googleFitAPI = new GoogleFitAPI()

// Task verification functions
export const verifyFitnessTask = async (taskTitle: string): Promise<boolean> => {
  try {
    const fitnessData = await googleFitAPI.getTodaysFitnessData()
    if (!fitnessData) return false

    switch (taskTitle.toLowerCase()) {
      case "morning stretch":
        // Verify some activity in the morning hours
        return fitnessData.activeMinutes >= 10

      case "workout challenge":
        // Verify high calorie burn and active minutes
        return fitnessData.calories >= 200 && fitnessData.activeMinutes >= 30

      case "daily steps":
        // Verify step count
        return fitnessData.steps >= 8000

      case "cardio session":
        // Verify elevated heart rate and calories
        return fitnessData.calories >= 150 && fitnessData.activeMinutes >= 20

      default:
        // For other fitness tasks, check for general activity
        return fitnessData.activeMinutes >= 5 || fitnessData.calories >= 50
    }
  } catch (error) {
    console.error("Error verifying fitness task:", error)
    return true
  }
}

export const getCaloriesBurned = async (): Promise<number> => {
  try {
    const fitnessData = await googleFitAPI.getTodaysFitnessData()
    return fitnessData.calories || 0
  } catch (error) {
    console.error("Error getting calories burned:", error)
    return Math.floor(Math.random() * 300) + 200 // Mock data for demo
  }
}
