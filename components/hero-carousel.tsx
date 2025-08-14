"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const motivationalQuotes = [
  {
    quote: "Progress, not perfection. Every small step forward is a victory worth celebrating.",
    author: "Maya Angelou",
    image: "/motivational-mountain-peak.png",
  },
  {
    quote: "Wellness is not a destination, but a way of traveling through life with intention.",
    author: "Thich Nhat Hanh",
    image: "/motivational-runner-sunrise.png",
  },
  {
    quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    image: "/motivational-achievement.png",
  },
  {
    quote: "Breathe in peace, breathe out stress. Find your center in the present moment.",
    author: "Jon Kabat-Zinn",
    image: "/motivational-fitness.png",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % motivationalQuotes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % motivationalQuotes.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + motivationalQuotes.length) % motivationalQuotes.length)
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={motivationalQuotes[currentSlide].image || "/placeholder.svg"}
          alt="Motivational background"
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-float">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Unlock Your <span className="text-accent">Potential</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Your journey to wellness starts here - where motivation meets gamification.
          </p>
        </div>

        {/* Quote Display */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
          <blockquote className="text-lg md:text-xl text-white italic mb-4 leading-relaxed">
            "{motivationalQuotes[currentSlide].quote}"
          </blockquote>
          <cite className="text-accent font-semibold text-lg">— {motivationalQuotes[currentSlide].author}</cite>
        </div>

        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4 text-lg rounded-xl transition-all duration-200 hover:scale-105 animate-pulse-glow"
        >
          Join the Challenge
        </Button>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-accent bg-white/10 hover:bg-white/20 backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-accent bg-white/10 hover:bg-white/20 backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {motivationalQuotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? "bg-accent scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
