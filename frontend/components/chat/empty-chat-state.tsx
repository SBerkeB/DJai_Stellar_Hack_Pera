import { Bot } from "lucide-react"

export function EmptyChatState() {
  return (
    <div className="text-center text-gray-500 mt-8">
      <Bot className="h-12 w-12 mx-auto mb-4 text-gray-600" />
      <p>Start a conversation with your lovely DJ</p>
    </div>
  )
}
