"use client"

import { useEffect, useRef, useState } from "react"
import { WebSocketManager } from "@/utils/websocket"

export function useWebSocket(url: string) {
  const [isConnected, setIsConnected] = useState(false)
  const wsManagerRef = useRef<WebSocketManager | null>(null)

  useEffect(() => {
    wsManagerRef.current = new WebSocketManager(url)
    return () => {
      wsManagerRef.current?.disconnect()
    }
  }, [url])

  const connect = (onMessage?: (data: any) => void, onError?: (error: Event) => void) => {
    if (wsManagerRef.current) {
      wsManagerRef.current.connect(
        () => setIsConnected(true),
        onMessage,
        () => setIsConnected(false),
        onError,
      )
    }
  }

  const send = (data: any) => {
    wsManagerRef.current?.send(data)
  }

  const disconnect = () => {
    wsManagerRef.current?.disconnect()
    setIsConnected(false)
  }

  return {
    isConnected,
    connect,
    send,
    disconnect,
  }
}
