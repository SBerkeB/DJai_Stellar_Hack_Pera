import { LiveMusicSession, CountTokensParameters } from "@google/genai";

import { broadcastClients } from "./broadcast.clients";
import { getGoogleGenAIClient } from "../google-genai.client";

let jazzBroadcast: LiveMusicSession | null = null;

const createJazzBroadcast = async () => {
    const client = await getGoogleGenAIClient();

    jazzBroadcast = await client.live.music.connect({
        model: 'models/lyria-realtime-exp',
        callbacks: {
        onmessage: (message) => {
            // 🎯 Broadcast audio chunk to all connected clients
            broadcastClients.forEach((ws) => {
            if (ws.readyState === ws.OPEN && (ws as any).channel == "jazz") {
                ws.send(JSON.stringify(message));
            }
            })
        },
        onerror: (err) => console.error('Lyria error:', err),
        onclose: () => {
            console.log('Jazz broadcast session stopped');
            broadcastClients.forEach((ws) => {
            ws.send(JSON.stringify({
                message: 'Lyria stream closed. Attempting to reconnect...',
                connectionId: (ws as any).id || null,
                action: 'reconnect'
            }));
            })
            jazzBroadcast = null; // Reset session
            setTimeout(createJazzBroadcast, 3000);
        }
        }
    });

    
    await jazzBroadcast.setWeightedPrompts({
        weightedPrompts: [
            { text: 'jazz lounge', weight: Math.random() },
            { text: 'bossa nova', weight: Math.random() },
            { text: 'midnight jazz', weight: Math.random() },
            { text: 'chillhop jazz', weight: Math.random() }
        ]
    });

    await jazzBroadcast.setMusicGenerationConfig({
        musicGenerationConfig: { bpm: 80, temperature: 1.0 }
    });
    
    jazzBroadcast.play();

}

export const getLofiBroadcast = async () => jazzBroadcast;

export default createJazzBroadcast;