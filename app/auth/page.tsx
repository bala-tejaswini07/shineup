"use client"

import { useState } from "react"
import { SignInForm } from "@/components/auth/sign-in-form"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { Navbar } from "@/components/navbar"

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-white/40 shadow-2xl">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-lime-600 bg-clip-text text-transparent mb-6 leading-tight">
                  {isSignIn ? "Welcome Back" : "Join SHINEUP"}
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {isSignIn
                    ? "Continue your wellness journey with us"
                    : "Start your transformation today and shine brighter"}
                </p>
              </div>

              <div className="space-y-8">{isSignIn ? <SignInForm /> : <SignUpForm />}</div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="text-slate-600 hover:text-cyan-600 transition-colors duration-300 text-lg font-medium"
                >
                  {isSignIn ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
