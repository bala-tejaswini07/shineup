import { Card, CardContent } from "@/components/ui/card"
import { Activity, Droplets, CheckSquare, Zap } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "Step Tracker",
    description: "Monitor your daily steps and build healthy movement habits with gamified rewards.",
    color: "text-green-500",
  },
  {
    icon: Droplets,
    title: "Hydration Tracker",
    description: "Stay hydrated throughout the day with gentle reminders and progress tracking.",
    color: "text-blue-500",
  },
  {
    icon: CheckSquare,
    title: "Daily Tasks",
    description: "Complete personalized wellness tasks and earn coins to climb the leaderboard.",
    color: "text-purple-500",
  },
  {
    icon: Zap,
    title: "Streak Tracker",
    description: "Build consistency with streak tracking that motivates you to keep going every day.",
    color: "text-accent",
  },
]

export function FeatureCards() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Inspire Yourself Daily</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Focus tools tailored for you - track your progress, build habits, and unlock your potential with our
            gamified wellness platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-accent/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-2xl bg-muted/50 group-hover:bg-accent/10 transition-colors duration-300">
                    <feature.icon
                      className={`h-8 w-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
