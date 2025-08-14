"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Heart, Brain, Dumbbell, Apple } from "lucide-react"

const infoCards = [
  {
    title: "Daily Wellness Tip",
    content:
      "Start your morning with 10 minutes of sunlight exposure to regulate your circadian rhythm and boost vitamin D production.",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    link: "https://www.healthline.com/health/benefits-of-morning-sunlight",
  },
  {
    title: "Mental Health Update",
    content:
      "Research shows that practicing gratitude for just 5 minutes daily can significantly improve mood and reduce stress levels.",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    link: "https://www.psychologytoday.com/us/blog/what-mentally-strong-people-dont-do/201504/7-scientifically-proven-benefits-gratitude",
  },
  {
    title: "Fitness Focus",
    content:
      "High-intensity interval training (HIIT) for just 15 minutes can be as effective as 45 minutes of moderate exercise.",
    icon: Dumbbell,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    link: "https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/high-intensity-interval-training/art-20044588",
  },
  {
    title: "Nutrition News",
    content:
      "Eating a handful of nuts daily can reduce the risk of heart disease by up to 30% and provide essential healthy fats.",
    icon: Apple,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    link: "https://www.harvard.edu/news/nuts-for-nuts/",
  },
]

export function InfoCards() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">Wellness Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoCards.map((card, index) => (
          <Card
            key={index}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/30"
            onClick={() => window.open(card.link, "_blank")}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <card.icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  {card.title}
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                {card.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
