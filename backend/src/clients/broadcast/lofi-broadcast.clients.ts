import { LiveMusicSession, CountTokensParameters } from "@google/genai";

import { broadcastClients } from "./broadcast.clients";
import { getGoogleGenAIClient } from "../google-genai.client";

let lofiBroadcast: LiveMusicSession | null = null;

const createLofiBroadcast = async () => {
    const client = await getGoogleGenAIClient();

    lofiBroadcast = await client.live.music.connect({
        model: 'models/lyria-realtime-exp',
        callbacks: {
        onmessage: (message) => {
            // 🎯 Broadcast audio chunk to all connected clients
            broadcastClients.forEach((ws) => {
            if (ws.readyState === ws.OPEN && (ws as any).channel == "lofi") {
                ws.send(JSON.stringify(message));
            }
            })
        },
        onerror: (err) => console.error('Lyria error:', err),
        onclose: () => {
            console.log('LOFI broadcast session stopped');
            broadcastClients.forEach((ws) => {
            ws.send(JSON.stringify({
                message: 'Lyria stream closed. Attempting to reconnect...',
                connectionId: (ws as any).id || null,
                action: 'reconnect',
                status: 'closed'
            }));
            })
            lofiBroadcast = null;
            setTimeout(createLofiBroadcast, 3000); // Attempt to reconnect after 1 second
        }
        }
    });

  
    await lofiBroadcast.setWeightedPrompts({
        weightedPrompts: [
        { text: 'ambient trance', weight: Math.random() },
        { text: 'chill beats', weight: Math.random() },
        { text: 'lofi', weight: Math.random() },
        { text: 'chillwave', weight: Math.random() }
        ]
    });

    await lofiBroadcast.setMusicGenerationConfig({
        musicGenerationConfig: { bpm: 80, temperature: 1.0 }
    });
    
    lofiBroadcast.play();

}

export const getLofiBroadcast = async () => lofiBroadcast;

export default createLofiBroadcast;