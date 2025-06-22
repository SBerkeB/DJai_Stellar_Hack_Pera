"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  targetDate?: Date
  daysLeft?: number
}

export function CountdownTimer({ targetDate, daysLeft = 12 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // If no target date provided, calculate from daysLeft
    const target = targetDate || new Date(Date.now() + daysLeft * 24 * 60 * 60 * 1000)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = target.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, daysLeft])

  return (
      <div className="flex items-center justify-center w-1/2 mx-auto space-x-2 text-white bg-purple-900/20 px-4 py-2 rounded-full border border-purple-800/30">
        <Clock className="h-4 w-4" />
        <span className="text-sm font-medium">
          {timeLeft.days > 0 ? (
            <>
              <span className="font-bold">{timeLeft.days}</span> days left to join!
            </>
          ) : (
            <>
              <span className="font-bold">
                {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>{" "}
              left!
            </>
          )}
        </span>
      </div>
  )
}
