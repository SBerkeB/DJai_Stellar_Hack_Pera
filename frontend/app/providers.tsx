"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { FreighterWalletManager, SpotifyManager } from "@/utils/connections"
import type { ConnectionState } from "@/types"
import { SplashScreen } from "@/components/ui/splash-screen"

interface AppContextType {
  connections: ConnectionState
  connectFreighter: () => Promise<void>
  connectSpotify: () => Promise<void>
  disconnect: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function Providers({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [connections, setConnections] = useState<ConnectionState>({
    freighterConnected: false,
    spotifyConnected: false,
    freighterAddress: null,
    spotifyUser: null,
  })

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const connectFreighter = async () => {
    try {
      const address = await FreighterWalletManager.connect()
      setConnections((prev) => ({
        ...prev,
        freighterConnected: true,
        freighterAddress: address,
      }))
    } catch (error) {
      console.error("Failed to connect Freighter wallet:", error)
    }
  }

  const connectSpotify = async () => {
    try {
      const user = await SpotifyManager.connect()
      setConnections((prev) => ({
        ...prev,
        spotifyConnected: true,
        spotifyUser: user,
      }))
    } catch (error) {
      console.error("Failed to connect Spotify:", error)
    }
  }

  const disconnect = () => {
    setConnections({
      freighterConnected: false,
      spotifyConnected: false,
      freighterAddress: null,
      spotifyUser: null,
    })
  }

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return <div className="fixed inset-0 bg-black">{/* Empty black screen during SSR */}</div>
  }

  return (
    <AppContext.Provider
      value={{
        connections,
        connectFreighter,
        connectSpotify,
        disconnect,
      }}
    >
      {showSplash ? <SplashScreen onComplete={handleSplashComplete} duration={4000} /> : children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within a Providers")
  }
  return context
}
