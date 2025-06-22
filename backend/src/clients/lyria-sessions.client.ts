import { LiveMusicSession } from "@google/genai";
export const activeSessions = new Map<
  string, // userId or socket.id
  {
    lyriaSession: LiveMusicSession;  // The session returned from client.live.music.connect
    createdAt: Date;
    weightedPrompts: { [key: string]: number }; // Map of prompt text to weight
    configs: object;
  }
>();
