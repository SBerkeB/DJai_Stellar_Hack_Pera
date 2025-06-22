"use client"

import { MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import "../../public/black_background_logo.jpg"

export function PulsingLogo() {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev)
    }, 1200) // Slower pulse

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      {/* Single pulse ring */}
      <div
        className={`absolute inset-0 rounded-full border-2 md:border-4 border-white transition-all duration-1000 ${
          pulse ? "scale-125 opacity-0" : "scale-100 opacity-20"
        }`}
      />

      {/* Main logo */}
      <div
        className={`bg-black rounded-full shadow-2xl transition-transform duration-300 p-3 sm:p-4 md:p-6 lg:p-8 ${
          pulse ? "scale-105" : "scale-100"
        }`}
      >
        <div className="relative w-36 h-36 sm:w-36 sm:h-36 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
          <Image 
              src="/black_background_logo.jpg"
              alt="Logo"
              fill
              className="object-contain rounded-full"
              priority
              sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 80px, (max-width: 1280px) 96px, 112px"
          />
        </div>
      </div>
    </div>
  )
}
