"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PasswordInputProps {
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

export function PasswordInput({ id, name, value, onChange, required }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const handleFocus = () => {
    setIsTyping(true)
  }

  const handleBlur = () => {
    setIsTyping(false)
  }

  return (
    <div className="relative">
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-accent focus:ring-accent pr-20"
          placeholder="Enter your password"
        />

        {/* Monkey Animation */}
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
          <div className="w-8 h-8 bg-amber-400 rounded-full relative">
            {/* Monkey face */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Eyes */}
              <div className="flex space-x-1">
                <div
                  className={`w-1.5 h-1.5 bg-black rounded-full transition-all duration-200 ${
                    isTyping && !showPassword ? "scale-y-0" : "scale-y-100"
                  }`}
                />
                <div
                  className={`w-1.5 h-1.5 bg-black rounded-full transition-all duration-200 ${
                    isTyping && !showPassword ? "scale-y-0" : "scale-y-100"
                  }`}
                />
              </div>
              {/* Closed eyes when typing */}
              {isTyping && !showPassword && (
                <div className="absolute flex space-x-1">
                  <div className="w-1.5 h-0.5 bg-black rounded-full" />
                  <div className="w-1.5 h-0.5 bg-black rounded-full" />
                </div>
              )}
            </div>
            {/* Mouth */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white hover:bg-white/10"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
