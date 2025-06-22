import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectionStatus } from "@/components/ui/connection-status"

interface SidebarConnectionsProps {
  isFreighterConnected: boolean
  isSpotifyConnected: boolean
  isBackendConnected: boolean
}

export function SidebarConnections({
  isFreighterConnected,
  isSpotifyConnected,
  isBackendConnected,
}: SidebarConnectionsProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-300">Connections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <ConnectionStatus isConnected={isFreighterConnected} label="Freighter Wallet" />
        <ConnectionStatus isConnected={isSpotifyConnected} label="Spotify" />
        <ConnectionStatus isConnected={isBackendConnected} label="AI Backend" />
      </CardContent>
    </Card>
  )
}
