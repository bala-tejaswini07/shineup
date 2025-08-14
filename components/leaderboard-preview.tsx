import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Crown } from "lucide-react"

const topUsers = [
  {
    rank: 1,
    username: "DragonSlayer99",
    coins: 2847,
    streak: 45,
    icon: Crown,
  },
  {
    rank: 2,
    username: "ZenMaster",
    coins: 2634,
    streak: 38,
    icon: Trophy,
  },
  {
    rank: 3,
    username: "FitnessNinja",
    coins: 2521,
    streak: 42,
    icon: Medal,
  },
]

export function LeaderboardPreview() {
  return (
    <section id="leaderboard" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Team Up for Success</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our global community of wellness warriors. Compete, collaborate, and celebrate achievements together.
          </p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-2 border-accent/20 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6 text-accent" />
              Global Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topUsers.map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                  user.rank === 1
                    ? "bg-gradient-to-r from-accent/20 to-accent/10 border-2 border-accent/30"
                    : "bg-muted/50 hover:bg-muted/70"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${
                      user.rank === 1 ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <user.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-card-foreground">{user.username}</h3>
                    <p className="text-muted-foreground">{user.streak} day streak</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent">{user.coins}</div>
                  <div className="text-sm text-muted-foreground">coins</div>
                </div>
              </div>
            ))}

            <div className="pt-6 text-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105"
              >
                View Full Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
