import { Navbar } from "@/components/navbar"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeatureCards } from "@/components/feature-cards"
import { LeaderboardPreview } from "@/components/leaderboard-preview"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50">
      <Navbar />
      <main className="space-y-32">
        <HeroCarousel />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          <FeatureCards />
          <LeaderboardPreview />
        </div>
      </main>
    </div>
  )
}
