export interface ConnectionState {
  freighterConnected: boolean
  spotifyConnected: boolean
  freighterAddress: string | null
  spotifyUser: string | null
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface WebSocketMessage {
  message: string
  userId?: string
  action?: string
}

export interface WeightedPrompts {
  [key: string]: number
}

export interface AudioStreamData {
  data: ArrayBuffer
  timestamp: number
}

export interface WhitelistEntry {
  email: string
  timestamp: number
  dateAdded: Date
  musicExperience: "beginner" | "intermediate" | "advanced"
  artificialIntelligenceExperience: "beginner" | "intermediate" | "advanced"
}