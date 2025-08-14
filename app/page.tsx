import { Navbar } from "@/components/navbar"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeatureCards } from "@/components/feature-cards"
import { LeaderboardPreview } from "@/components/leaderboard-preview"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navbar />
      <main>
        <HeroCarousel />
        <FeatureCards />
        <LeaderboardPreview />
      </main>
    </div>
  )
}
