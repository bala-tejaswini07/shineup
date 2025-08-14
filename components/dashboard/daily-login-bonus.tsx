"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Coins, Calendar } from "lucide-react"

export function DailyLoginBonus() {
  const [showBonus, setShowBonus] = useState(false)
  const [claimed, setClaimed] = useState(false)

  useEffect(() => {
    const today = new Date().toDateString()
    const lastLogin = localStorage.getItem("last_login_bonus")

    if (lastLogin !== today) {
      setShowBonus(true)
    } else {
      setClaimed(true)
    }
  }, [])

  const claimBonus = () => {
    const today = new Date().toDateString()
    localStorage.setItem("last_login_bonus", today)

    // Update user coins
    const userData = localStorage.getItem("shineup_user")
    if (userData) {
      const user = JSON.parse(userData)
      user.coins = (user.coins || 0) + 1
      localStorage.setItem("shineup_user", JSON.stringify(user))
    }

    setShowBonus(false)
    setClaimed(true)
  }

  if (!showBonus && !claimed) return null

  return (
    <Card className={`border-2 ${showBonus ? "border-accent/50 bg-accent/5" : "border-muted"}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Gift className={`h-5 w-5 ${showBonus ? "text-accent" : "text-muted-foreground"}`} />
          Daily Login Bonus
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Today's reward</span>
          </div>
          <Badge variant={showBonus ? "default" : "secondary"} className="bg-accent/20 text-accent">
            <Coins className="h-3 w-3 mr-1" />
            +1 coin
          </Badge>
        </div>

        {showBonus ? (
          <Button onClick={claimBonus} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Gift className="h-4 w-4 mr-2" />
            Claim Daily Bonus
          </Button>
        ) : (
          <div className="text-center py-2">
            <span className="text-sm text-muted-foreground">✓ Already claimed today</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
