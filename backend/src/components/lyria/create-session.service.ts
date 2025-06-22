import { LiveMusicSession } from "@google/genai";

import { getGoogleGenAIClient } from "../../clients";

export let lyriaSession: LiveMusicSession | null = null;

const createLyriaSession = async (ws: WebSocket) => {
    const client = await getGoogleGenAIClient();
    
    lyriaSession = await client.live.music.connect({
        model: 'models/lyria-realtime-exp',
        callbacks: {
            onmessage: (message: any) => {
                ws.send(JSON.stringify(message))
            // console.log('music session message:', message);
            },
            onerror: (error: any) => {
                console.error('music session error:', JSON.stringify(error.data));
            },
            onclose: (event: any) => {
                console.log('Lyria RealTime stream closed:', JSON.stringify(event));
                console.log('Lyria RealTime stream closed.');
                ws.send(JSON.stringify(event));
            }
        }
    });
}

export default createLyriaSession;