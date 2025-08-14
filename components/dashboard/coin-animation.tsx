"use client"

import { useEffect, useState } from "react"
import { Coins } from "lucide-react"

interface CoinAnimationProps {
  amount: number
  onComplete?: () => void
}

export function CoinAnimation({ amount, onComplete }: CoinAnimationProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!visible) return null

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="animate-bounce bg-accent text-accent-foreground px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
        <Coins className="h-6 w-6" />
        <span className="font-bold text-lg">+{amount} coins!</span>
      </div>
    </div>
  )
}
