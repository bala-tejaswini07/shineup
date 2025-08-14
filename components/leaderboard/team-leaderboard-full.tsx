"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, Coins, Users, Search, Filter, TrendingUp } from "lucide-react"

interface TeamLeaderboardFullProps {
  currentUser: any
}

const rankIcons = {
  1: Crown,
  2: Trophy,
  3: Medal,
}

function Crown({ className }: { className?: string }) {
  return <Trophy className={className} />
}

export function TeamLeaderboard({ currentUser }: TeamLeaderboardFullProps) {
  const [teams, setTeams] = useState<any[]>([])
  const [filteredTeams, setFilteredTeams] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("coins")

  useEffect(() => {
    // Get actual teams from localStorage and add mock data for demonstration
    const actualTeams = JSON.parse(localStorage.getItem("shineup_teams") || "[]")

    const mockTeams = [
      {
        id: "mock1",
        name: "Wellness Warriors",
        totalCoins: 15420,
        members: [
          { username: "Leader1", coins: 2847 },
          { username: "Member1", coins: 2634 },
          { username: "Member2", coins: 2521 },
          { username: "Member3", coins: 2398 },
          { username: "Member4", coins: 2156 },
          { username: "Member5", coins: 1987 },
          { username: "Member6", coins: 877 },
        ],
        motto: "Together we rise",
        createdBy: "Leader1",
      },
      {
        id: "mock2",
        name: "Focus Force",
        totalCoins: 12890,
        members: [
          { username: "FocusLeader", coins: 2156 },
          { username: "FocusMember1", coins: 1987 },
          { username: "FocusMember2", coins: 1876 },
          { username: "FocusMember3", coins: 1743 },
          { username: "FocusMember4", coins: 1654 },
          { username: "FocusMember5", coins: 1532 },
          { username: "FocusMember6", coins: 1432 },
          { username: "FocusMember7", coins: 510 },
        ],
        motto: "Deep work, deep results",
        createdBy: "FocusLeader",
      },
      {
        id: "mock3",
        name: "Mindful Masters",
        totalCoins: 9876,
        members: [
          { username: "ZenLeader", coins: 1876 },
          { username: "ZenMember1", coins: 1743 },
          { username: "ZenMember2", coins: 1654 },
          { username: "ZenMember3", coins: 1532 },
          { username: "ZenMember4", coins: 1432 },
          { username: "ZenMember5", coins: 1639 },
        ],
        motto: "Peace through practice",
        createdBy: "ZenLeader",
      },
    ]

    const allTeams = [...actualTeams, ...mockTeams]
      .sort((a, b) => (b.totalCoins || 0) - (a.totalCoins || 0))
      .map((team, index) => ({
        ...team,
        rank: index + 1,
        avgCoins: Math.round((team.totalCoins || 0) / team.members.length),
      }))

    setTeams(allTeams)
    setFilteredTeams(allTeams)
  }, [])

  useEffect(() => {
    let filtered = teams.filter((team) => team.name.toLowerCase().includes(searchTerm.toLowerCase()))

    if (sortBy === "coins") {
      filtered = filtered.sort((a, b) => (b.totalCoins || 0) - (a.totalCoins || 0))
    } else if (sortBy === "members") {
      filtered = filtered.sort((a, b) => b.members.length - a.members.length)
    } else if (sortBy === "average") {
      filtered = filtered.sort((a, b) => b.avgCoins - a.avgCoins)
    }

    setFilteredTeams(filtered)
  }, [teams, searchTerm, sortBy])

  const currentUserTeam = teams.find((team) => team.id === currentUser.teamId)

  return (
    <div className="space-y-6">
      {/* Current Team Highlight */}
      {currentUserTeam && (
        <Card className="border-2 border-accent/30 bg-gradient-to-r from-accent/10 to-primary/10">
          <CardHeader>
            <CardTitle className="text-center">Your Team Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-primary">{currentUserTeam.name}</h3>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">#{currentUserTeam.rank}</div>
                  <div className="text-sm text-muted-foreground">Team Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">{currentUserTeam.totalCoins}</div>
                  <div className="text-sm text-muted-foreground">Total Coins</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">{currentUserTeam.members.length}</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coins">Sort by Total Coins</SelectItem>
                  <SelectItem value="members">Sort by Members</SelectItem>
                  <SelectItem value="average">Sort by Average</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-accent" />
            Team Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTeams.slice(0, 25).map((team) => {
              const RankIcon = rankIcons[team.rank as keyof typeof rankIcons] || Award
              const isCurrentUserTeam = team.id === currentUser.teamId

              return (
                <div
                  key={team.id}
                  className={`p-6 rounded-lg transition-all ${
                    isCurrentUserTeam
                      ? "bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent/50"
                      : team.rank <= 3
                        ? "bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20"
                        : "bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-14 h-14">
                        {team.rank <= 3 ? (
                          <RankIcon
                            className={`h-10 w-10 ${
                              team.rank === 1 ? "text-yellow-500" : team.rank === 2 ? "text-gray-400" : "text-amber-600"
                            }`}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground">
                            {team.rank}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xl text-foreground">{team.name}</h4>
                          {isCurrentUserTeam && (
                            <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                              Your Team
                            </Badge>
                          )}
                          {team.rank <= 5 && (
                            <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                              Top 5
                            </Badge>
                          )}
                        </div>
                        {team.motto && <p className="text-sm italic text-muted-foreground">"{team.motto}"</p>}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Leader: {team.createdBy}</span>
                          <span>•</span>
                          <span>{team.members.length}/10 members</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-1 text-accent font-bold text-2xl">
                        <Coins className="h-6 w-6" />
                        {team.totalCoins || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Coins</div>
                      <div className="flex items-center gap-1 text-green-500 font-semibold">
                        <TrendingUp className="h-4 w-4" />
                        {team.avgCoins} avg
                      </div>
                    </div>
                  </div>

                  {/* Team Members Preview */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Top Contributors:</span>
                      <div className="flex -space-x-2">
                        {team.members
                          .sort((a: any, b: any) => (b.coins || 0) - (a.coins || 0))
                          .slice(0, 5)
                          .map((member: any, index: number) => (
                            <div
                              key={member.username}
                              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold border-2 border-background"
                              title={`${member.username}: ${member.coins} coins`}
                            >
                              {member.username.charAt(0).toUpperCase()}
                            </div>
                          ))}
                        {team.members.length > 5 && (
                          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold border-2 border-background">
                            +{team.members.length - 5}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredTeams.length === 0 && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No teams found matching your search</p>
            </div>
          )}

          {filteredTeams.length > 25 && (
            <div className="text-center pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing top 25 results. Use search to find specific teams.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
