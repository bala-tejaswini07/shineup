"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Crown, Copy, UserMinus, Settings, Coins, Flame, Trophy, Share2, AlertCircle } from "lucide-react"

interface TeamOverviewProps {
  user: any
}

export function TeamOverview({ user }: TeamOverviewProps) {
  const router = useRouter()
  const [team, setTeam] = useState<any>(null)
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)

  useEffect(() => {
    if (user.teamId) {
      const teams = JSON.parse(localStorage.getItem("shineup_teams") || "[]")
      const userTeam = teams.find((t: any) => t.id === user.teamId)
      setTeam(userTeam)
    }
  }, [user.teamId])

  const copyInviteCode = () => {
    if (team?.inviteCode) {
      navigator.clipboard.writeText(team.inviteCode)
      // You could add a toast notification here
    }
  }

  const leaveTeam = () => {
    if (!team) return

    const teams = JSON.parse(localStorage.getItem("shineup_teams") || "[]")
    const teamIndex = teams.findIndex((t: any) => t.id === team.id)

    if (teamIndex !== -1) {
      // Remove user from team
      teams[teamIndex].members = teams[teamIndex].members.filter((m: any) => m.username !== user.username)

      // Recalculate total coins
      teams[teamIndex].totalCoins = teams[teamIndex].members.reduce(
        (sum: number, member: any) => sum + (member.coins || 0),
        0,
      )

      // If team is empty, remove it
      if (teams[teamIndex].members.length === 0) {
        teams.splice(teamIndex, 1)
      }

      localStorage.setItem("shineup_teams", JSON.stringify(teams))

      // Update user data
      const updatedUser = { ...user, teamId: "", teamRole: "" }
      localStorage.setItem("shineup_user", JSON.stringify(updatedUser))

      router.push("/team")
    }
  }

  if (!team) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Team not found</p>
        </CardContent>
      </Card>
    )
  }

  const isLeader = user.teamRole === "leader"
  const sortedMembers = [...team.members].sort((a, b) => (b.coins || 0) - (a.coins || 0))

  return (
    <div className="space-y-6">
      {/* Team Header */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl text-primary">{team.name}</CardTitle>
              {team.motto && <p className="text-lg italic text-accent">"{team.motto}"</p>}
              {team.description && <p className="text-muted-foreground">{team.description}</p>}
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Users className="h-4 w-4 mr-1" />
              {team.members.length}/10 members
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Team Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Coins className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">{team.totalCoins}</div>
              <div className="text-sm text-muted-foreground">Total Coins</div>
            </div>
            <div className="text-center p-4 bg-orange-500/10 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Flame className="h-6 w-6 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {Math.max(...team.members.map((m: any) => m.streak || 0))}
              </div>
              <div className="text-sm text-muted-foreground">Best Streak</div>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-foreground">#12</div>
              <div className="text-sm text-muted-foreground">Team Rank</div>
            </div>
          </div>

          {/* Invite Code */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Team Invite Code</h4>
                <p className="text-sm text-muted-foreground">Share this code to invite new members</p>
              </div>
              <div className="flex items-center gap-2">
                <code className="bg-background px-3 py-2 rounded border text-lg font-mono">{team.inviteCode}</code>
                <Button onClick={copyInviteCode} variant="outline" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedMembers.map((member: any, index: number) => (
              <div key={member.username} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/placeholder.svg?height=48&width=48&query=avatar`} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {member.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {member.role === "leader" && <Crown className="absolute -top-1 -right-1 h-5 w-5 text-accent" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{member.username}</h4>
                      {member.role === "leader" && (
                        <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                          Leader
                        </Badge>
                      )}
                      {index === 0 && (
                        <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                          Top Contributor
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Joined {new Date(member.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">{member.coins || 0}</div>
                      <div className="text-xs text-muted-foreground">Coins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-500">{member.streak || 0}</div>
                      <div className="text-xs text-muted-foreground">Streak</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Team Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share Team
            </Button>
            {isLeader && (
              <Button variant="outline" className="justify-start bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Team Settings
              </Button>
            )}
          </div>

          {!showLeaveConfirm ? (
            <Button onClick={() => setShowLeaveConfirm(true)} variant="destructive" className="w-full">
              <UserMinus className="h-4 w-4 mr-2" />
              Leave Team
            </Button>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Are you sure you want to leave this team?</span>
                <div className="flex gap-2 ml-4">
                  <Button onClick={leaveTeam} variant="destructive" size="sm">
                    Yes, Leave
                  </Button>
                  <Button onClick={() => setShowLeaveConfirm(false)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
