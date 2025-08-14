"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/password-input"

export function SignUpForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
    phone: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple client-side auth simulation
    localStorage.setItem(
      "shineup_user",
      JSON.stringify({
        ...formData,
        isAuthenticated: true,
        coins: 0,
        streak: 0,
      }),
    )
    router.push("/portal-selection")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-white font-medium">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          required
          value={formData.username}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-accent focus:ring-accent"
          placeholder="Choose a username"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age" className="text-white font-medium">
          Age
        </Label>
        <Input
          id="age"
          name="age"
          type="number"
          required
          min="13"
          max="120"
          value={formData.age}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-accent focus:ring-accent"
          placeholder="Your age"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white font-medium">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-accent focus:ring-accent"
          placeholder="Enter your email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white font-medium">
          Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-accent focus:ring-accent"
          placeholder="Your phone number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white font-medium">
          Password
        </Label>
        <PasswordInput id="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105 mt-6"
      >
        Create Account
      </Button>
    </form>
  )
}
