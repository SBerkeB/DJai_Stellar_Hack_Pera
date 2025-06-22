"use client"

import { useEffect, useState } from "react"

export function MusicVisualizer({isPlaying}: any) {
  const [bars, setBars] = useState<number[]>(Array(12).fill(0))

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => Math.random() * 100))
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
    <div className="flex flex-col items-center justify-center space-y-2 h-48">
      <div className="flex items-end justify-center space-x-1 h-32 opacity-30">
        {bars.map((height, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-blue-500 via-purple-500 to-pink-500 rounded-t transition-all duration-150 ease-out"
            style={{
              width: "16px",
              height: `${isPlaying ? Math.max(height, 10) : 15}%`,
              animationDelay: `${index * 50}ms`,
            }}
          />
        ))}
      </div>
    </div>
    </>
  )
}
