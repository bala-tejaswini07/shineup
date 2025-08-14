import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Crown, Star, TrendingUp, Users } from "lucide-react"

const topUsers = [
  {
    rank: 1,
    username: "DragonSlayer99",
    coins: 2847,
    streak: 45,
    icon: Crown,
    gradient: "from-yellow-400 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50",
    borderColor: "border-yellow-300/50",
  },
  {
    rank: 2,
    username: "ZenMaster",
    coins: 2634,
    streak: 38,
    icon: Trophy,
    gradient: "from-gray-400 to-gray-600",
    bgGradient: "from-gray-50 to-slate-50",
    borderColor: "border-gray-300/50",
  },
  {
    rank: 3,
    username: "FitnessNinja",
    coins: 2521,
    streak: 42,
    icon: Medal,
    gradient: "from-amber-600 to-orange-700",
    bgGradient: "from-amber-50 to-orange-50",
    borderColor: "border-amber-300/50",
  },
]

export function LeaderboardPreview() {
  return (
    <section id="leaderboard" className="py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/50 via-white to-lime-50/50"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-200/20 to-lime-200/20 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-lime-200/20 to-cyan-200/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-lime-100 px-6 py-3 rounded-full mb-8 border border-cyan-200/50">
            <Users className="w-5 h-5 text-cyan-600" />
            <span className="text-cyan-700 font-semibold text-sm tracking-wide uppercase">Community</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-700 via-slate-700 to-lime-600 bg-clip-text text-transparent mb-8 leading-tight">
            Team Up for Success
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Join our global community of wellness warriors. Compete, collaborate, and celebrate achievements together on
            your journey to better health.
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-xl border-2 border-cyan-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up overflow-hidden">
          <CardHeader className="text-center pb-8 bg-gradient-to-r from-cyan-50/50 to-lime-50/50">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-700 to-lime-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-2xl">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              Global Leaderboard
            </CardTitle>
            <p className="text-slate-600 mt-4 text-lg">Top wellness champions this month</p>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            {topUsers.map((user, index) => (
              <div
                key={index}
                className={`group relative flex items-center justify-between p-8 rounded-2xl transition-all duration-500 hover-lift ${
                  user.rank === 1
                    ? `bg-gradient-to-r ${user.bgGradient} border-2 ${user.borderColor} shadow-lg`
                    : `bg-gradient-to-r ${user.bgGradient} border ${user.borderColor} hover:shadow-lg`
                } animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${user.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <user.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {user.rank}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-slate-800 group-hover:text-cyan-700 transition-colors">
                      {user.username}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      <p className="text-slate-600 font-medium">{user.streak} day streak</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-lime-600" />
                    <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-lime-600 bg-clip-text text-transparent">
                      {user.coins.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">coins earned</div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-lime-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            ))}

            <div className="pt-8 text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-lime-500 hover:from-cyan-600 hover:to-lime-600 text-white font-bold px-12 py-6 text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                View Full Leaderboard
                <Trophy className="w-6 h-6 ml-3" />
              </Button>
              <p className="text-slate-500 mt-4 text-sm">Join thousands of users building healthier habits together</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
