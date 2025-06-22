"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectionStatus } from "@/components/ui/connection-status"
import type { LucideIcon } from "lucide-react"

interface ConnectionCardProps {
  title: string
  description: string
  icon: LucideIcon
  isConnected: boolean
  connectionInfo?: string
  onConnect: () => void
  buttonText: string
  buttonColor: string
  iconColor: string
}

export function ConnectionCard({
  title,
  description,
  icon: Icon,
  isConnected,
  connectionInfo,
  onConnect,
  buttonText,
  buttonColor,
  iconColor,
}: ConnectionCardProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Icon className={`h-6 w-6 mr-3 ${iconColor}`} />
          {title}
        </CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-3">
            <ConnectionStatus isConnected={true} label="Connected" />
            {connectionInfo && <p className="text-sm text-gray-400 font-mono break-all">{connectionInfo}</p>}
          </div>
        ) : (
          <Button onClick={onConnect} className={`w-full ${buttonColor} text-white`}>
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
