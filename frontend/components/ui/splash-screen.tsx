"use client"

import { useEffect, useState } from "react"
import { Headphones } from "lucide-react"

interface SplashScreenProps {
  onComplete: () => void
  duration?: number
}

export function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    // Slower fade in
    const fadeInTimer = setTimeout(() => {
      setOpacity(1)
    }, 100)

    // Start fade out earlier to allow for longer fade out duration
    const fadeOutTimer = setTimeout(() => {
      setOpacity(0)
    }, duration - 800)

    // Complete after longer fade out
    const completeTimer = setTimeout(() => {
      onComplete()
    }, duration)

    return () => {
      clearTimeout(fadeInTimer)
      clearTimeout(fadeOutTimer)
      clearTimeout(completeTimer)
    }
  }, [duration, onComplete])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      style={{
        opacity,
        transition: "opacity 0.8s ease-in-out",
      }}
    >
      <div className="text-center space-y-8">
        {/* Headphones Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center">
            <Headphones className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <p className="text-white text-sm font-medium tracking-widest">LOADING...</p>
          <p className="text-white text-lg font-medium tracking-wide">USE HEADPHONES FOR THE BEST EXPERIENCE</p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "400ms" }} />
        </div>
      </div>
    </div>
  )
}
