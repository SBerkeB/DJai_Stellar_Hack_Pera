import type React from "react"
import { cn } from "@/lib/utils"

interface GradientBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function GradientBackground({ children, className }: GradientBackgroundProps) {
  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900", className)}>
      {children}
    </div>
  )
}
