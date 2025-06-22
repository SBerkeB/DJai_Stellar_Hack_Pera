"use client"

import { useState, useEffect } from "react"
import { TrendingUp } from "lucide-react"

export function SocialProof() {
  const [count, setCount] = useState(1200)

  useEffect(() => {
    // Simulate real-time counter updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance to increment
        setCount((prev) => prev + Math.floor(Math.random() * 3) + 1)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center space-x-6 text-gray-400">
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-4 w-4 text-green-400" />
        <span className="text-sm text-green-400">Growing fast</span>
      </div>
    </div>
  )
}
