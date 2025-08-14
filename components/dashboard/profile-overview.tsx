import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Coins, Flame, Calendar, Trophy } from "lucide-react"

interface ProfileOverviewProps {
  user: any
}

export function ProfileOverview({ user }: ProfileOverviewProps) {
  return (
    <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/20">
      <CardContent className="p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Profile Picture */}
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-accent shadow-lg">
              <AvatarImage src={`/placeholder.svg?height=96&width=96&query=profile-avatar`} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full p-2">
              <Trophy className="h-4 w-4" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-foreground mb-2">{user.username}</h2>
            <p className="text-muted-foreground mb-4">
              {user.portalType === "team" ? "Team Warrior" : "Solo Champion"} • Age {user.age}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Coins className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{user.coins || 0}</div>
                  <div className="text-xs text-muted-foreground">Coins</div>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Flame className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{user.streak || 0}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">12</div>
                  <div className="text-xs text-muted-foreground">Days Active</div>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Trophy className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">#247</div>
                  <div className="text-xs text-muted-foreground">Global Rank</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center sm:justify-start">
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
            Early Adopter
          </Badge>
          <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">
            Consistency King
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 border-blue-500/30">
            Focus Master
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
