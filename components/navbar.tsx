"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap, Target, Users, Trophy, Dumbbell } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-cyan-200/50 shadow-lg shadow-cyan-100/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-lime-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-200/50 group-hover:shadow-xl group-hover:shadow-cyan-300/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Zap className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-lime-400 rounded-full animate-bounce opacity-80"></div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-700 to-lime-600 bg-clip-text text-transparent group-hover:from-cyan-600 group-hover:to-lime-500 transition-all duration-300">
                SHINEUP
              </h1>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-slate-700 hover:text-cyan-600 transition-colors duration-200 font-semibold group"
              >
                <Target className="w-4 h-4 group-hover:animate-pulse" />
                <span>FOCUS MODE</span>
              </Link>
              <Link
                href="/leaderboard"
                className="flex items-center gap-2 text-slate-700 hover:text-cyan-600 transition-colors duration-200 font-semibold group"
              >
                <Trophy className="w-4 h-4 group-hover:animate-pulse" />
                <span>LEADERBOARD</span>
              </Link>
              <Link
                href="/team"
                className="flex items-center gap-2 text-slate-700 hover:text-cyan-600 transition-colors duration-200 font-semibold group"
              >
                <Users className="w-4 h-4 group-hover:animate-pulse" />
                <span>TEAMS</span>
              </Link>
              <Link
                href="/workouts"
                className="flex items-center gap-2 text-slate-700 hover:text-cyan-600 transition-colors duration-200 font-semibold group"
              >
                <Dumbbell className="w-4 h-4 group-hover:animate-pulse" />
                <span>WORKOUTS</span>
              </Link>
              <div className="flex items-center space-x-4 ml-6">
                <Link href="/guest-dashboard">
                  <Button
                    variant="outline"
                    className="border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white font-bold px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 bg-transparent hover:shadow-lg hover:shadow-cyan-200/50"
                  >
                    TRY FREE
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="bg-gradient-to-r from-cyan-500 to-lime-500 hover:from-cyan-600 hover:to-lime-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-200/50 hover:shadow-xl hover:shadow-cyan-300/50">
                    SIGN IN
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-4 bg-white/95 backdrop-blur-xl border-t border-cyan-200/50 rounded-b-2xl shadow-xl shadow-cyan-100/20">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200 font-semibold rounded-xl"
              >
                <Target className="w-5 h-5" />
                <span>FOCUS MODE</span>
              </Link>
              <Link
                href="/leaderboard"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200 font-semibold rounded-xl"
              >
                <Trophy className="w-5 h-5" />
                <span>LEADERBOARD</span>
              </Link>
              <Link
                href="/team"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200 font-semibold rounded-xl"
              >
                <Users className="w-5 h-5" />
                <span>TEAMS</span>
              </Link>
              <Link
                href="/workouts"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200 font-semibold rounded-xl"
              >
                <Dumbbell className="w-5 h-5" />
                <span>WORKOUTS</span>
              </Link>
              <div className="px-4 pt-4 space-y-3 border-t border-cyan-200/50">
                <Link href="/guest-dashboard">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white font-bold py-3 rounded-xl bg-transparent"
                  >
                    TRY FREE
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-lime-500 hover:from-cyan-600 hover:to-lime-600 text-white font-bold py-3 rounded-xl">
                    SIGN IN
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
