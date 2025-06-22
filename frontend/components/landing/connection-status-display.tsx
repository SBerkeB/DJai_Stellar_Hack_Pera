import type { ConnectionState } from "@/types"

interface ConnectionStatusDisplayProps {
  connections: ConnectionState
}

export function ConnectionStatusDisplay({ connections }: ConnectionStatusDisplayProps) {
  const isReady = connections.freighterConnected && connections.spotifyConnected

  if (isReady) {
    return (
      <div className="bg-green-900/30 border border-green-700 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-green-400 font-semibold mb-2">Ready to Chat!</h3>
        <p className="text-gray-300 text-sm">Redirecting to chat interface...</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 max-w-md mx-auto">
      <h3 className="text-gray-400 font-semibold mb-2">
        {connections.freighterConnected || connections.spotifyConnected ? "Almost there!" : "Get Started"}
      </h3>
      <p className="text-gray-500 text-sm">Connect both services to access the AI chat interface</p>
    </div>
  )
}
