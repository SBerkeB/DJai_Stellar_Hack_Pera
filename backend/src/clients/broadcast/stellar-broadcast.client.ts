import { LiveMusicSession, CountTokensParameters } from "@google/genai";

import { broadcastClients } from "./broadcast.clients";
import { getGoogleGenAIClient } from "../google-genai.client";
import { createStellarWeights, Weights } from "../stellar.data";

let stellarBroadcast: LiveMusicSession | null = null;

const createStellarBroadcast = async () => {
  const client = await getGoogleGenAIClient();
  const weights: Weights = await createStellarWeights();

  stellarBroadcast = await client.live.music.connect({
    model: "models/lyria-realtime-exp",
    callbacks: {
      onmessage: (message) => {
        // 🎯 Broadcast audio chunk to all connected clients
        console.log("Lyria message:", message);
        broadcastClients.forEach((ws) => {
          if (ws.readyState === ws.OPEN && (ws as any).channel == "stellar") {
            ws.send(JSON.stringify(message));
          }
        });
      },
      onerror: (err) => console.error("Lyria error:", err),
      onclose: (event) => {
        console.log(
          "Stellar broadcast session stopped: ",
          JSON.stringify(event)
        );
        broadcastClients.forEach((ws) => {
          ws.send(
            JSON.stringify({
              message: "Lyria stream closed. Attempting to reconnect...",
              connectionId: (ws as any).id || null,
              action: "reconnect",
            })
          );
        });
        stellarBroadcast = null; // Reset session
        setTimeout(createStellarBroadcast, 3000);
      },
    },
  });

  await stellarBroadcast.setWeightedPrompts({
    weightedPrompts: [
      { text: "mood energetic", weight: weights.mood_energetic ?? 0.0 },
      { text: "mood chill", weight: weights.mood_chill ?? 0.0 },
      { text: "genre synthwave", weight: weights.genre_synthwave ?? 0.0 },
      { text: "genre lofi ambient", weight: weights.genre_lofi_ambient ?? 0.0 },
      { text: "tech energy", weight: weights.tech_energy ?? 0.0 },
      { text: "tech tempo", weight: weights.tech_tempo ?? 0.0 },
      { text: "tech bass", weight: weights.tech_bass ?? 0.0 },
      { text: "instr ambient pads", weight: weights.instr_ambient_pads ?? 0.0 },
      { text: "instr drums focus", weight: weights.instr_drums_focus ?? 0.0 },
      // Optionally keep the original random ones if you still want variety:
      { text: "festival edm", weight: Math.random() },
      { text: "big room", weight: Math.random() },
      { text: "progressive trance", weight: Math.random() },
    ],
  });

  await stellarBroadcast.setMusicGenerationConfig({
    musicGenerationConfig: { bpm: 80, temperature: 1.0 },
  });

  stellarBroadcast.play();
};

export const getStellarBroadcast = async () => stellarBroadcast;

export default createStellarBroadcast;
