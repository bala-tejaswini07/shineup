"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserPlus, Search, AlertCircle } from "lucide-react"

interface JoinTeamProps {
  user: any
}

export function JoinTeam({ user }: JoinTeamProps) {
  const router = useRouter()
  const [inviteCode, setInviteCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [teamPreview, setTeamPreview] = useState<any>(null)

  const searchTeam = () => {
    if (!inviteCode.trim()) return

    const teams = JSON.parse(localStorage.getItem("shineup_teams") || "[]")
    const team = teams.find((t: any) => t.inviteCode === inviteCode.toUpperCase())

    if (team) {
      if (team.members.length >= 10) {
        setError("This team is full (maximum 10 members)")
        setTeamPreview(null)
      } else if (team.members.some((m: any) => m.username === user.username)) {
        setError("You are already a member of this team")
        setTeamPreview(null)
      } else {
        setTeamPreview(team)
        setError("")
      }
    } else {
      setError("Invalid invite code. Please check and try again.")
      setTeamPreview(null)
    }
  }

  const joinTeam = async () => {
    if (!teamPreview) return

    setLoading(true)

    // Add user to team
    const teams = JSON.parse(localStorage.getItem("shineup_teams") || "[]")
    const teamIndex = teams.findIndex((t: any) => t.id === teamPreview.id)

    if (teamIndex !== -1) {
      teams[teamIndex].members.push({
        username: user.username,
        email: user.email,
        coins: user.coins || 0,
        streak: user.streak || 0,
        role: "member",
        joinedAt: new Date().toISOString(),
      })

      teams[teamIndex].totalCoins = teams[teamIndex].members.reduce(
        (sum: number, member: any) => sum + (member.coins || 0),
        0,
      )

      localStorage.setItem("shineup_teams", JSON.stringify(teams))

      // Update user data
      const updatedUser = { ...user, teamId: teamPreview.id, teamRole: "member" }
      localStorage.setItem("shineup_user", JSON.stringify(updatedUser))

      setLoading(false)
      router.push("/team")
    }
  }

  return (
    <Card className="border-2 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <UserPlus className="h-6 w-6 text-accent" />
          Join Existing Team
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inviteCode">Team Invite Code</Label>
            <div className="flex gap-2">
              <Input
                id="inviteCode"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="Enter 8-character code"
                maxLength={8}
                className="uppercase"
              />
              <Button onClick={searchTeam} variant="outline" className="px-4 bg-transparent">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {teamPreview && (
            <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg space-y-3">
              <h4 className="font-bold text-lg text-foreground">{teamPreview.name}</h4>
              {teamPreview.description && <p className="text-sm text-muted-foreground">{teamPreview.description}</p>}
              {teamPreview.motto && <p className="text-sm italic text-accent">"{teamPreview.motto}"</p>}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Members: {teamPreview.members.length}/10</span>
                <span className="text-muted-foreground">Total Coins: {teamPreview.totalCoins}</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Team Leader:</p>
                <p className="text-sm font-medium">{teamPreview.createdBy}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-muted/30 p-4 rounded-lg space-y-2">
          <h4 className="font-medium text-foreground">How to get an invite code:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Ask a team member for their invite code</li>
            <li>• Team leaders can share codes from team settings</li>
            <li>• Codes are unique to each team</li>
          </ul>
        </div>

        <Button
          onClick={joinTeam}
          disabled={!teamPreview || loading}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 rounded-xl"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-foreground"></div>
              Joining Team...
            </div>
          ) : (
            <>
              <UserPlus className="h-5 w-5 mr-2" />
              Join Team
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
