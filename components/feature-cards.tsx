import { Card, CardContent } from "@/components/ui/card"
import { Activity, Droplets, CheckSquare, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Activity,
    title: "Step Tracker",
    description: "Monitor your daily steps and build healthy movement habits with gamified rewards.",
    color: "text-emerald-500",
    gradient: "from-emerald-500/10 to-teal-500/10",
    borderColor: "border-emerald-200/50",
  },
  {
    icon: Droplets,
    title: "Hydration Tracker",
    description: "Stay hydrated throughout the day with gentle reminders and progress tracking.",
    color: "text-cyan-500",
    gradient: "from-cyan-500/10 to-blue-500/10",
    borderColor: "border-cyan-200/50",
  },
  {
    icon: CheckSquare,
    title: "Daily Tasks",
    description: "Complete personalized wellness tasks and earn coins to climb the leaderboard.",
    color: "text-violet-500",
    gradient: "from-violet-500/10 to-purple-500/10",
    borderColor: "border-violet-200/50",
  },
  {
    icon: Zap,
    title: "Streak Tracker",
    description: "Build consistency with streak tracking that motivates you to keep going every day.",
    color: "text-amber-500",
    gradient: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-200/50",
  },
]

export function FeatureCards() {
  return (
    <section className="py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-50/30 to-transparent"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-200/20 to-lime-200/20 rounded-full blur-2xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-lime-200/20 to-cyan-200/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-8xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-lime-100 px-6 py-3 rounded-full mb-8 border border-cyan-200/50">
            <Zap className="w-5 h-5 text-cyan-600" />
            <span className="text-cyan-700 font-semibold text-sm tracking-wide uppercase">Wellness Tools</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-700 via-slate-700 to-lime-600 bg-clip-text text-transparent mb-8 leading-tight">
            Inspire Yourself Daily
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Focus tools tailored for you - track your progress, build habits, and unlock your potential with our
            gamified wellness platform designed for lasting transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group hover-lift bg-white/80 backdrop-blur-xl border-2 ${feature.borderColor} hover:border-cyan-300/50 transition-all duration-500 animate-slide-up overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-10 text-center relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  <div className="mb-8 flex justify-center">
                    <div
                      className={`p-6 rounded-3xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl`}
                    >
                      <feature.icon className={`h-10 w-10 ${feature.color} group-hover:animate-pulse`} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-6 group-hover:text-cyan-700 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed mb-8 text-lg">{feature.description}</p>

                  <Button
                    variant="ghost"
                    className="group/btn text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-20 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-lime-500 hover:from-cyan-600 hover:to-lime-600 text-white font-bold px-12 py-6 text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start Your Wellness Journey
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </div>
    </section>
  )
}
