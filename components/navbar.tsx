"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer">SHINEUP</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#focus"
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                FOCUS MODE
              </a>
              <Link href="/leaderboard">
                <span className="text-foreground hover:text-primary transition-colors duration-200 font-medium cursor-pointer">
                  LEADERBOARD
                </span>
              </Link>
              <a href="#team" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                TEAM
              </a>
              <Link href="/auth">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 animate-pulse-glow">
                  SIGN IN
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              <a
                href="#focus"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                FOCUS MODE
              </a>
              <Link href="/leaderboard">
                <span className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium cursor-pointer">
                  LEADERBOARD
                </span>
              </Link>
              <a
                href="#team"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                TEAM
              </a>
              <div className="px-3 py-2">
                <Link href="/auth">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
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
