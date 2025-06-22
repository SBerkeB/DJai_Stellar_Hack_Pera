"use client"

import { Music, Volume2, Headphones } from "lucide-react"

export function FloatingMusicElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Floating music icons */}
      <div
        className="absolute top-20 left-10 animate-bounce opacity-15"
        style={{ animationDelay: "0s", animationDuration: "6s" }}
      >
        <Music className="w-6 h-6 text-blue-400" />
      </div>

      <div
        className="absolute bottom-32 right-20 animate-bounce opacity-15"
        style={{ animationDelay: "2s", animationDuration: "8s" }}
      >
        <Headphones className="w-5 h-5 text-purple-400" />
      </div>

      <div
        className="absolute top-1/2 right-10 animate-bounce opacity-15"
        style={{ animationDelay: "4s", animationDuration: "7s" }}
      >
        <Volume2 className="w-5 h-5 text-green-400" />
      </div>

      {/* Audio visualizer bars */}
      <div className="absolute top-1/3 left-1/4">
        <div className="flex space-x-1 items-end">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-t from-blue-500 to-purple-500 opacity-30 rounded-t"
              style={{
                width: "3px",
                height: `${15 + Math.sin(Date.now() * 0.001 + i) * 20}px`,
                animation: `pulse ${1 + i * 0.1}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="absolute top-2/3 right-1/3">
        <div className="flex space-x-1 items-end">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-t from-green-500 to-blue-500 opacity-25 rounded-t"
              style={{
                width: "2px",
                height: `${10 + Math.cos(Date.now() * 0.001 + i) * 15}px`,
                animation: `pulse ${1.2 + i * 0.15}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Waveform visualization */}
      {/* <div className="absolute bottom-1/3 left-1/3">
        <svg width="100" height="40" className="opacity-20">
          <path
            d="M0,20 Q25,5 50,20 T100,20"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div> */}

      {/* Circular sound ripples */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-blue-400 rounded-full opacity-10"
              style={{
                width: `${60 + i * 40}px`,
                height: `${60 + i * 40}px`,
                top: `${-30 - i * 20}px`,
                left: `${-30 - i * 20}px`,
                animation: `ping ${2 + i * 0.5}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
