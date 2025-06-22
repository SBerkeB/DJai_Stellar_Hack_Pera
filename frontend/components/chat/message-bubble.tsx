import type { Message } from "@/types"
import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
          isUser ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100",
        )}
      >
        <div className="flex items-center mb-1">
          {isUser ? <User className="h-4 w-4 mr-2" /> : <Bot className="h-4 w-4 mr-2" />}
          <span className="text-xs opacity-75">{message.timestamp.toLocaleTimeString()}</span>
        </div>
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  )
}
