"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, Coins, Flame, Search, Filter } from "lucide-react"

interface IndividualLeaderboardProps {
  currentUser: any
}

const rankIcons = {
  1: Trophy,
  2: Trophy,
  3: Medal,
}

export function IndividualLeaderboard({ currentUser }: IndividualLeaderboardProps) {
  const [users, setUsers] = useState<any[]>([])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("coins")

  useEffect(() => {
    // Generate mock users for demonstration (in a real app, this would come from a server)
    const mockUsers = [
      { username: "DragonSlayer99", coins: 2847, streak: 45, rank: 1 },
      { username: "ZenMaster", coins: 2634, streak: 38, rank: 2 },
      { username: "FitnessNinja", coins: 2521, streak: 42, rank: 3 },
      { username: "MindfulWarrior", coins: 2398, streak: 28, rank: 4 },
      { username: "HealthHero", coins: 2156, streak: 35, rank: 5 },
      { username: "WellnessWizard", coins: 1987, streak: 22, rank: 6 },
      { username: "FocusPhoenix", coins: 1876, streak: 31, rank: 7 },
      { username: "StreakSeeker", coins: 1743, streak: 67, rank: 8 },
      { username: "CalmCrusader", coins: 1654, streak: 19, rank: 9 },
      { username: "MotivationMaster", coins: 1532, streak: 25, rank: 10 },
    ]

    // Add current user if not in mock data
    const currentUserData = {
      username: currentUser.username,
      coins: currentUser.coins || 0,
      streak: currentUser.streak || 0,
      rank: 247, // Mock rank
    }

    const allUsers = [...mockUsers, currentUserData]
      .sort((a, b) => b.coins - a.coins)
      .map((user, index) => ({ ...user, rank: index + 1 }))

    setUsers(allUsers)
    setFilteredUsers(allUsers)
  }, [currentUser])

  useEffect(() => {
    let filtered = users.filter(
      (user) => user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (sortBy === "coins") {
      filtered = filtered.sort((a, b) => (b.coins || 0) - (a.coins || 0))
    } else if (sortBy === "streak") {
      filtered = filtered.sort((a, b) => (b.streak || 0) - (a.streak || 0))
    }

    setFilteredUsers(filtered)
  }, [users, searchTerm, sortBy])

  const currentUserRank = users.find((user) => user.username === currentUser?.username)?.rank || 0

  return (
    <div className="space-y-6">
      {/* Current User Highlight */}
      <Card className="border-2 border-accent/30 bg-gradient-to-r from-accent/10 to-primary/10">
        <CardHeader>
          <CardTitle className="text-center">Your Ranking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">#{currentUserRank}</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{currentUser.coins || 0}</div>
              <div className="text-sm text-muted-foreground">Total Coins</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{currentUser.streak || 0}</div>
              <div className="text-sm text-muted-foreground">Current Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coins">Sort by Coins</SelectItem>
                  <SelectItem value="streak">Sort by Streak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-accent" />
            Individual Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredUsers.slice(0, 50).map((user) => {
              const RankIcon = rankIcons[user.rank as keyof typeof rankIcons] || Award
              const isCurrentUser = user.username === currentUser.username

              return (
                <div
                  key={user.username || `user-${user.rank}`}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                    isCurrentUser
                      ? "bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent/50"
                      : user.rank <= 3
                        ? "bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20"
                        : "bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {user.rank <= 3 ? (
                        <RankIcon
                          className={`h-8 w-8 ${
                            user.rank === 1 ? "text-yellow-500" : user.rank === 2 ? "text-gray-400" : "text-amber-600"
                          }`}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                          {user.rank}
                        </div>
                      )}
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/placeholder.svg?height=48&width=48&query=avatar`} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.username ? user.username.charAt(0).toUpperCase() : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg text-foreground">{user.username || "Unknown User"}</h4>
                        {isCurrentUser && currentUser?.username && (
                          <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                            You
                          </Badge>
                        )}
                        {user.rank <= 10 && (
                          <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                            Top 10
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Rank #{user.rank}</span>
                        {user.streak > 30 && <span className="text-orange-500">🔥 Hot Streak!</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-accent font-bold text-xl">
                          <Coins className="h-5 w-5" />
                          {user.coins}
                        </div>
                        <div className="text-xs text-muted-foreground">Coins</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-orange-500 font-bold text-xl">
                          <Flame className="h-5 w-5" />
                          {user.streak}
                        </div>
                        <div className="text-xs text-muted-foreground">Streak</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No users found matching your search</p>
            </div>
          )}

          {filteredUsers.length > 50 && (
            <div className="text-center pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing top 50 results. Use search to find specific users.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
