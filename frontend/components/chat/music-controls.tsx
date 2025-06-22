"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, Volume2, VolumeX } from "lucide-react"

interface MusicControlsProps {
  isPlaying: boolean
  isMuted: boolean
  onToggleMusic: () => void
  onToggleMute: () => void
}

export function MusicControls({ isPlaying, isMuted, onToggleMusic, onToggleMute }: MusicControlsProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-300">Music Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          onClick={onToggleMusic}
          variant="outline"
          size="sm"
          className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
        >
          <Music className="h-4 w-4 mr-2" />
          {isPlaying ? "Pause" : "Play"} Music
        </Button>
        <Button
          onClick={onToggleMute}
          variant="outline"
          size="sm"
          className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
        >
          {isMuted ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
          {isMuted ? "Unmute" : "Mute"}
        </Button>
      </CardContent>
    </Card>
  )
}
