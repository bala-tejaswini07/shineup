"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Users, Coins } from "lucide-react"

const rankIcons = {
  1: Crown,
  2: Trophy,
  3: Medal,
}

function Crown({ className }: { className?: string }) {
  return <Trophy className={className} />
}

export function TeamLeaderboard() {
  const [teams, setTeams] = useState<any[]>([])

  useEffect(() => {
    const allTeams = JSON.parse(localStorage.getItem("shineup_teams") || "[]")

    // Sort teams by total coins and add rank
    const rankedTeams = allTeams
      .sort((a: any, b: any) => (b.totalCoins || 0) - (a.totalCoins || 0))
      .map((team: any, index: number) => ({
        ...team,
        rank: index + 1,
      }))
      .slice(0, 10) // Top 10 teams

    setTeams(rankedTeams)
  }, [])

  return (
    <Card className="border-2 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-accent" />
          Team Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {teams.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No teams yet</p>
            <p className="text-sm text-muted-foreground">Be the first to create a team!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {teams.map((team) => {
              const RankIcon = rankIcons[team.rank as keyof typeof rankIcons] || Award

              return (
                <div
                  key={team.id}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                    team.rank <= 3
                      ? "bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent/30"
                      : "bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10">
                      {team.rank <= 3 ? (
                        <RankIcon
                          className={`h-6 w-6 ${
                            team.rank === 1 ? "text-yellow-500" : team.rank === 2 ? "text-gray-400" : "text-amber-600"
                          }`}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                          {team.rank}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{team.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{team.members.length} members</span>
                        {team.motto && (
                          <>
                            <span>•</span>
                            <span className="italic">"{team.motto}"</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-accent font-bold text-lg">
                      <Coins className="h-5 w-5" />
                      {team.totalCoins || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((team.totalCoins || 0) / team.members.length)} avg
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {teams.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Showing top {teams.length} teams</p>
              <Badge variant="secondary" className="bg-accent/20 text-accent">
                Updated in real-time
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
