"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeightedPrompts } from "@/types"

interface MusicNodesListProps {
  weightedPrompts: WeightedPrompts
}

interface PromptItemProps {
  prompt: string
  weight: number
}

function PromptItem({ prompt, weight }: PromptItemProps) {
  const percentage = Math.min(weight * 100, 100)

  // Color based on weight level
  const getColorClass = (weight: number) => {
    if (weight >= 0.8) return "bg-yellow-400"
    if (weight >= 0.5) return "bg-green-400"
    if (weight >= 0.2) return "bg-blue-400"
    return "bg-gray-500"
  }

  return (
    <div className="flex items-center justify-between p-2 bg-gray-900/30 rounded border border-gray-700">
      <div className="flex-1 mr-3">
        <div className="text-sm text-gray-300 mb-1">{prompt}</div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getColorClass(weight)}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <div className="text-xs text-gray-400 font-mono min-w-[3rem] text-right">{weight.toFixed(2)}</div>
    </div>
  )
}

export function MusicNodesList({ weightedPrompts }: MusicNodesListProps) {
    let promptEntries: [string, number][] = []

    if (weightedPrompts) {
        promptEntries = Object.entries(weightedPrompts)
    }

  if (promptEntries.length === 0) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-300">Music Nodes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-500 text-center py-4">No running music nodes</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-300">Running Music Nodes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-80 overflow-y-auto">
        {promptEntries.map(([prompt, weight]) => (
          <PromptItem key={prompt} prompt={prompt} weight={weight} />
        ))}
      </CardContent>
    </Card>
  )
}
