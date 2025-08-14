"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

const inspirationalQuotes = [
  {
    quote: "Elevate Your Wellbeing",
    subtext: "Join a community dedicated to nurturing your mind, body, and spirit",
    author: "SHINEUP Community",
    image: "/comic-daily-steps.png",
    category: "Wellness Journey",
    color: "from-cyan-600 to-cyan-800",
  },
  {
    quote: "Your Path to Wellness Begins Here",
    subtext: "Transform daily habits into lasting achievements through gamified wellness",
    author: "Wellness Experts",
    image: "/comic-breakthrough.png",
    category: "Transformation",
    color: "from-emerald-600 to-cyan-700",
  },
  {
    quote: "Build Consistency, Build Success",
    subtext: "Small daily actions create extraordinary long-term results",
    author: "Success Principles",
    image: "/comic-consistency.png",
    category: "Growth",
    color: "from-cyan-700 to-emerald-600",
  },
  {
    quote: "Progress Over Perfection",
    subtext: "Every step forward is a victory worth celebrating",
    author: "Mindful Living",
    image: "/comic-progress.png",
    category: "Mindset",
    color: "from-cyan-800 to-slate-700",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % inspirationalQuotes.length)
      }, 6000)
      return () => clearInterval(timer)
    }
  }, [isHovered])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % inspirationalQuotes.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + inspirationalQuotes.length) % inspirationalQuotes.length)
  }

  const currentQuote = inspirationalQuotes[currentSlide]

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={currentQuote.image || "/placeholder.svg"}
          alt="Wellness inspiration"
          className="w-full h-full object-cover transition-all duration-1000 ease-out transform hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentQuote.color} opacity-85 transition-all duration-1000`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20" />
      </div>

      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-16 w-2 h-2 bg-lime-400 rounded-full animate-pulse opacity-60"></div>
        <div
          className="absolute top-40 right-20 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-lime-300 rounded-full animate-pulse opacity-40"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-16 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 mb-12 border border-white/20 shadow-2xl">
          <Sparkles className="w-5 h-5 text-lime-400" />
          <span className="text-white font-semibold text-sm tracking-wider uppercase">{currentQuote.category}</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-8 mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
            {currentQuote.quote}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
            {currentQuote.subtext}
          </p>
        </div>

        {/* Author Attribution */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-lime-400"></div>
            <cite className="text-lime-400 font-medium text-lg tracking-wide">{currentQuote.author}</cite>
            <div className="w-12 h-px bg-lime-400"></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <Link href="/guest-dashboard">
            <Button
              size="lg"
              className="bg-lime-500 hover:bg-lime-400 text-slate-900 font-bold px-10 py-6 text-xl rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group border-2 border-lime-400 min-w-[240px]"
            >
              <Play className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Get Started on Your Journey
            </Button>
          </Link>
          <Link href="/auth">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/60 text-white hover:bg-white hover:text-slate-900 font-semibold px-10 py-6 text-xl rounded-2xl transition-all duration-300 hover:scale-105 backdrop-blur-xl bg-white/5 min-w-[240px] group"
            >
              Join Community
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-3 text-white/70">
          <span className="text-sm font-medium tracking-wide">
            {currentSlide + 1} / {inspirationalQuotes.length}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-lime-400 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full w-14 h-14 transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <ChevronLeft className="h-7 w-7" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-lime-400 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full w-14 h-14 transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <ChevronRight className="h-7 w-7" />
      </Button>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        {inspirationalQuotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide
                ? "w-12 h-3 bg-lime-400 shadow-lg shadow-lime-400/50"
                : "w-3 h-3 bg-white/40 hover:bg-white/60 hover:scale-125"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
