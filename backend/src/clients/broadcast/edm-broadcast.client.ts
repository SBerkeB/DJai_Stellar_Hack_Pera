import { LiveMusicSession, CountTokensParameters } from "@google/genai";

import { broadcastClients } from "./broadcast.clients";
import { getGoogleGenAIClient } from "../google-genai.client";

let edmBroadcast: LiveMusicSession | null = null;

const createEdmBroadcast = async () => {
    const client = await getGoogleGenAIClient();

    edmBroadcast = await client.live.music.connect({
        model: 'models/lyria-realtime-exp',
        callbacks: {
        onmessage: (message) => {
            // 🎯 Broadcast audio chunk to all connected clients
            broadcastClients.forEach((ws) => {
            if (ws.readyState === ws.OPEN && (ws as any).channel == "edm") {
                ws.send(JSON.stringify(message));
            }
            })
        },
        onerror: (err) => console.error('Lyria error:', err),
        onclose: (event) => {
            console.log('EDM broadcast session stopped: ', JSON.stringify(event));
            broadcastClients.forEach((ws) => {
                ws.send(JSON.stringify({
                    message: 'Lyria stream closed. Attempting to reconnect...',
                    connectionId: (ws as any).id || null,
                    action: 'reconnect'
                }));
            })
            edmBroadcast = null; // Reset session
            setTimeout(createEdmBroadcast, 3000);
        }
        }
    });

    
    await edmBroadcast.setWeightedPrompts({
        weightedPrompts: [
            { text: 'electro house', weight: Math.random() },
            { text: 'festival edm', weight: Math.random() },
            { text: 'big room', weight: Math.random() },
            { text: 'progressive trance', weight: Math.random() }
        ]
    });

    await edmBroadcast.setMusicGenerationConfig({
        musicGenerationConfig: { bpm: 80, temperature: 1.0 }
    });
    
    edmBroadcast.play();

}

export const getLofiBroadcast = async () => edmBroadcast;

export default createEdmBroadcast;