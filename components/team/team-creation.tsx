"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, Plus, Target } from "lucide-react"

interface TeamCreationProps {
  user: any
}

export function TeamCreation({ user }: TeamCreationProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    motto: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const createTeam = async () => {
    if (!formData.name.trim()) return

    setLoading(true)

    // Generate team ID and invite code
    const teamId = `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const inviteCode = Math.random().toString(36).substr(2, 8).toUpperCase()

    const newTeam = {
      id: teamId,
      name: formData.name,
      description: formData.description,
      motto: formData.motto,
      createdBy: user.username,
      createdAt: new Date().toISOString(),
      inviteCode,
      members: [
        {
          username: user.username,
          email: user.email,
          coins: user.coins || 0,
          streak: user.streak || 0,
          role: "leader",
          joinedAt: new Date().toISOString(),
        },
      ],
      totalCoins: user.coins || 0,
    }

    // Save team data
    const existingTeams = JSON.parse(localStorage.getItem("shineup_teams") || "[]")
    existingTeams.push(newTeam)
    localStorage.setItem("shineup_teams", JSON.stringify(existingTeams))

    // Update user data
    const updatedUser = { ...user, teamId, teamRole: "leader" }
    localStorage.setItem("shineup_user", JSON.stringify(updatedUser))

    setLoading(false)
    router.push("/team")
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Plus className="h-6 w-6 text-primary" />
          Create New Team
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Team Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your team name"
              maxLength={30}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your team's goals and values"
              maxLength={200}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motto">Team Motto</Label>
            <Input
              id="motto"
              name="motto"
              value={formData.motto}
              onChange={handleChange}
              placeholder="A motivational phrase for your team"
              maxLength={50}
            />
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg space-y-2">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Team Features
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Maximum 10 team members</li>
            <li>• Shared team leaderboard</li>
            <li>• Collaborative challenges</li>
            <li>• Team progress tracking</li>
            <li>• Invite friends with unique code</li>
          </ul>
        </div>

        <Button
          onClick={createTeam}
          disabled={!formData.name.trim() || loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
              Creating Team...
            </div>
          ) : (
            <>
              <Users className="h-5 w-5 mr-2" />
              Create Team
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
