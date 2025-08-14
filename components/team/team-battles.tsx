"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Swords, Trophy, Coins, Clock, Target, Zap, Shield, Flame, Crown } from "lucide-react"

interface Battle {
  id: string
  challengerTeam: string
  challengedTeam: string
  battleType: "steps" | "tasks" | "coins" | "focus"
  wager: number
  duration: number // hours
  status: "pending" | "active" | "completed"
  startTime?: number
  endTime?: number
  challengerScore: number
  challengedScore: number
  winner?: string
  description: string
}

interface TeamBattlesProps {
  user: any
  teamData: any
}

const battleTypes = [
  {
    id: "steps",
    name: "Step Challenge",
    description: "Most steps accumulated by team members",
    icon: Target,
    color: "text-green-500 bg-green-500/10 border-green-500/20",
    minWager: 50,
  },
  {
    id: "tasks",
    name: "Task Completion",
    description: "Most daily tasks completed by team",
    icon: Zap,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    minWager: 75,
  },
  {
    id: "coins",
    name: "Coin Collection",
    description: "Most coins earned during battle period",
    icon: Coins,
    color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    minWager: 100,
  },
  {
    id: "focus",
    name: "Focus Time",
    description: "Most focus/meditation time logged",
    icon: Shield,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    minWager: 60,
  },
]

export function TeamBattles({ user, teamData }: TeamBattlesProps) {
  const [battles, setBattles] = useState<Battle[]>([])
  const [showCreateBattle, setShowCreateBattle] = useState(false)
  const [availableTeams, setAvailableTeams] = useState<any[]>([])
  const [newBattle, setNewBattle] = useState({
    challengedTeam: "",
    battleType: "steps",
    wager: 50,
    duration: 24,
    description: "",
  })

  useEffect(() => {
    loadBattles()
    loadAvailableTeams()
  }, [])

  const loadBattles = () => {
    const savedBattles = localStorage.getItem("team_battles")
    if (savedBattles) {
      setBattles(JSON.parse(savedBattles))
    }
  }

  const loadAvailableTeams = () => {
    const allTeams = JSON.parse(localStorage.getItem("all_teams") || "[]")
    const otherTeams = allTeams.filter((team: any) => team.id !== teamData.id)
    setAvailableTeams(otherTeams)
  }

  const createBattle = () => {
    const battle: Battle = {
      id: `battle_${Date.now()}`,
      challengerTeam: teamData.id,
      challengedTeam: newBattle.challengedTeam,
      battleType: newBattle.battleType as any,
      wager: newBattle.wager,
      duration: newBattle.duration,
      status: "pending",
      challengerScore: 0,
      challengedScore: 0,
      description: newBattle.description,
    }

    // Deduct wager from team coins
    const updatedUser = { ...user }
    updatedUser.coins = (updatedUser.coins || 0) - newBattle.wager
    localStorage.setItem("shineup_user", JSON.stringify(updatedUser))

    const updatedBattles = [...battles, battle]
    setBattles(updatedBattles)
    localStorage.setItem("team_battles", JSON.stringify(updatedBattles))

    setShowCreateBattle(false)
    setNewBattle({
      challengedTeam: "",
      battleType: "steps",
      wager: 50,
      duration: 24,
      description: "",
    })
  }

  const acceptBattle = (battleId: string) => {
    const updatedBattles = battles.map((battle) => {
      if (battle.id === battleId) {
        return {
          ...battle,
          status: "active" as const,
          startTime: Date.now(),
          endTime: Date.now() + battle.duration * 60 * 60 * 1000,
        }
      }
      return battle
    })

    setBattles(updatedBattles)
    localStorage.setItem("team_battles", JSON.stringify(updatedBattles))

    // Deduct wager from accepting team
    const updatedUser = { ...user }
    updatedUser.coins = (updatedUser.coins || 0) - battles.find((b) => b.id === battleId)?.wager || 0
    localStorage.setItem("shineup_user", JSON.stringify(updatedUser))
  }

  const declineBattle = (battleId: string) => {
    const updatedBattles = battles.filter((battle) => battle.id !== battleId)
    setBattles(updatedBattles)
    localStorage.setItem("team_battles", JSON.stringify(updatedBattles))
  }

  const getTimeRemaining = (endTime: number) => {
    const now = Date.now()
    const remaining = endTime - now
    if (remaining <= 0) return "Ended"

    const hours = Math.floor(remaining / (1000 * 60 * 60))
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const getBattleProgress = (battle: Battle) => {
    if (!battle.startTime || !battle.endTime) return 0
    const now = Date.now()
    const total = battle.endTime - battle.startTime
    const elapsed = now - battle.startTime
    return Math.min((elapsed / total) * 100, 100)
  }

  const activeBattles = battles.filter((b) => b.status === "active")
  const pendingBattles = battles.filter(
    (b) => b.status === "pending" && (b.challengerTeam === teamData.id || b.challengedTeam === teamData.id),
  )
  const completedBattles = battles.filter((b) => b.status === "completed").slice(0, 5)

  return (
    <div className="space-y-6">
      <Card className="border-2 border-red-500/20 bg-gradient-to-br from-red-500/5 to-orange-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Swords className="h-6 w-6 text-red-500" />
            Team Battles
            <Badge variant="outline" className="text-xs bg-red-50 text-red-600 border-red-200">
              <Flame className="h-3 w-3 mr-1" />
              Competitive
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Challenge other teams to wellness battles and compete for coins and glory!
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Create Battle Button */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">Available Coins: {user.coins || 0}</span>
            </div>
            <Button
              onClick={() => setShowCreateBattle(true)}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={showCreateBattle}
            >
              <Swords className="h-4 w-4 mr-2" />
              Challenge Team
            </Button>
          </div>

          {/* Create Battle Form */}
          {showCreateBattle && (
            <Card className="border-2 border-orange-200 bg-orange-50/50">
              <CardHeader>
                <CardTitle className="text-lg">Create New Battle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="challengedTeam">Challenge Team</Label>
                  <select
                    id="challengedTeam"
                    value={newBattle.challengedTeam}
                    onChange={(e) => setNewBattle({ ...newBattle, challengedTeam: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select a team to challenge</option>
                    {availableTeams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name} ({team.members?.length || 0} members)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="battleType">Battle Type</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {battleTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.id}
                          onClick={() => setNewBattle({ ...newBattle, battleType: type.id, wager: type.minWager })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            newBattle.battleType === type.id
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-red-300"
                          }`}
                        >
                          <Icon className="h-5 w-5 mx-auto mb-1" />
                          <div className="text-sm font-medium">{type.name}</div>
                          <div className="text-xs text-muted-foreground">{type.minWager}+ coins</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wager">Coin Wager</Label>
                    <Input
                      id="wager"
                      type="number"
                      value={newBattle.wager}
                      onChange={(e) => setNewBattle({ ...newBattle, wager: Number.parseInt(e.target.value) })}
                      min={battleTypes.find((t) => t.id === newBattle.battleType)?.minWager || 50}
                      max={user.coins || 0}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <select
                      id="duration"
                      value={newBattle.duration}
                      onChange={(e) => setNewBattle({ ...newBattle, duration: Number.parseInt(e.target.value) })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value={6}>6 hours</option>
                      <option value={12}>12 hours</option>
                      <option value={24}>24 hours</option>
                      <option value={48}>48 hours</option>
                      <option value={72}>72 hours</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Battle Message (Optional)</Label>
                  <Textarea
                    id="description"
                    value={newBattle.description}
                    onChange={(e) => setNewBattle({ ...newBattle, description: e.target.value })}
                    placeholder="Add a motivational message or challenge..."
                    rows={2}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={createBattle}
                    className="bg-red-500 hover:bg-red-600 text-white"
                    disabled={!newBattle.challengedTeam || newBattle.wager > (user.coins || 0)}
                  >
                    Create Battle
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateBattle(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Battles */}
          {activeBattles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-500" />
                Active Battles
              </h3>
              <div className="space-y-3">
                {activeBattles.map((battle) => {
                  const battleType = battleTypes.find((t) => t.id === battle.battleType)
                  const Icon = battleType?.icon || Swords
                  const isChallenger = battle.challengerTeam === teamData.id
                  const progress = getBattleProgress(battle)

                  return (
                    <Card key={battle.id} className="border-2 border-red-200 bg-red-50/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-red-500" />
                            <div>
                              <h4 className="font-semibold">{battleType?.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {isChallenger ? "You" : "Opponent"} vs {isChallenger ? "Opponent" : "You"}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                              <Coins className="h-4 w-4" />
                              {battle.wager * 2}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {battle.endTime && getTimeRemaining(battle.endTime)}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Battle Progress</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-semibold text-blue-600">{battle.challengerScore}</div>
                            <div className="text-xs text-muted-foreground">Your Team</div>
                          </div>
                          <div className="text-center p-2 bg-red-50 rounded">
                            <div className="font-semibold text-red-600">{battle.challengedScore}</div>
                            <div className="text-xs text-muted-foreground">Opponent</div>
                          </div>
                        </div>

                        {battle.description && (
                          <p className="text-sm text-muted-foreground mt-2 italic">"{battle.description}"</p>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Pending Battles */}
          {pendingBattles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                Pending Battles
              </h3>
              <div className="space-y-3">
                {pendingBattles.map((battle) => {
                  const battleType = battleTypes.find((t) => t.id === battle.battleType)
                  const Icon = battleType?.icon || Swords
                  const isChallenger = battle.challengerTeam === teamData.id

                  return (
                    <Card key={battle.id} className="border-2 border-orange-200 bg-orange-50/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-orange-500" />
                            <div>
                              <h4 className="font-semibold">{battleType?.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {isChallenger ? "Challenge sent" : "Challenge received"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right mr-4">
                              <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                                <Coins className="h-4 w-4" />
                                {battle.wager * 2}
                              </div>
                              <div className="text-sm text-muted-foreground">{battle.duration}h duration</div>
                            </div>
                            {!isChallenger && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => acceptBattle(battle.id)}
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  disabled={battle.wager > (user.coins || 0)}
                                >
                                  Accept
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => declineBattle(battle.id)}>
                                  Decline
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>

                        {battle.description && (
                          <p className="text-sm text-muted-foreground mt-2 italic">"{battle.description}"</p>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Recent Battles */}
          {completedBattles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Recent Battle Results
              </h3>
              <div className="space-y-2">
                {completedBattles.map((battle) => {
                  const battleType = battleTypes.find((t) => t.id === battle.battleType)
                  const Icon = battleType?.icon || Swords
                  const isChallenger = battle.challengerTeam === teamData.id
                  const won = battle.winner === teamData.id

                  return (
                    <Card
                      key={battle.id}
                      className={`border-2 ${
                        won ? "border-green-200 bg-green-50/30" : "border-gray-200 bg-gray-50/30"
                      }`}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5" />
                            <div>
                              <h4 className="font-medium text-sm">{battleType?.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {isChallenger ? battle.challengerScore : battle.challengedScore} vs{" "}
                                {isChallenger ? battle.challengedScore : battle.challengerScore}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {won ? (
                              <Badge className="bg-green-500 text-white">
                                <Crown className="h-3 w-3 mr-1" />
                                Won
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-gray-600">
                                Lost
                              </Badge>
                            )}
                            <div className="flex items-center gap-1 text-yellow-600 text-sm">
                              <Coins className="h-3 w-3" />
                              {won ? `+${battle.wager * 2}` : `-${battle.wager}`}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Battle Types Info */}
          <Card className="border-2 border-blue-200 bg-blue-50/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Battle Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {battleTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <div key={type.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/50">
                      <Icon className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium text-sm">{type.name}</h4>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                        <p className="text-xs text-blue-600">Min wager: {type.minWager} coins</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
