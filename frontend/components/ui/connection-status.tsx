import { cn } from "@/lib/utils"

interface ConnectionStatusProps {
  isConnected: boolean
  label: string
  className?: string
}

export function ConnectionStatus({ isConnected, label, className }: ConnectionStatusProps) {
  return (
    <div className={cn("flex items-center text-xs", className)}>
      <div className={cn("w-2 h-2 rounded-full mr-2", isConnected ? "bg-green-400" : "bg-red-400")} />
      <span className={isConnected ? "text-green-400" : "text-red-400"}>{label}</span>
    </div>
  )
}
