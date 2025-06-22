import { Music } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface ChatHeaderProps {
  isConnected: boolean
  isMusicPlaying: boolean
}

export function ChatHeader({ isConnected, isMusicPlaying }: ChatHeaderProps) {
  return (
    <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between w-full">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4" />
        <h1 className="text-xl font-bold text-white font-serif font">DJæ'</h1>
        <div className="ml-2 text-sm text-gray-300"></div>
        <h1> Your Personal DJ Assistant </h1>
        <div className={`ml-3 w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`} />
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        {isMusicPlaying && (
          <div className="flex items-center">
            <Music className="h-4 w-4 mr-1" />
            <span>Music Playing</span>
          </div>
        )}
      </div>
    </div>
  )
}
