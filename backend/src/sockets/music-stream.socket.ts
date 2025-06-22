import { GoogleGenAI, LiveMusicSession, LiveMusicGenerationConfig } from '@google/genai';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import getIntroMessage from '../components/ollama/get-intro-message.service';
import { getGoogleGenAIClient, activeSessions } from '../clients';
import getIntroSystemPrompt from '../constants/intro-system-prompt';

const envPath = path.resolve(__dirname, '../../.env');

dotenv.config({ path: envPath });

let lyriaSession: LiveMusicSession;

const musicStreamSocket = (app: any) => {
    app.ws('/lyria_stream', async (ws: any, req: Request, res: Response) => {
        ws.isAlive = true;

        const connectionId = uuidv4();  // generate unique ID
        (ws as any).id = connectionId;

        try{
            const systemPrompt = getIntroSystemPrompt();
            const chatAnswer = await getIntroMessage("Hello DJai please start our conversation in a friendly manner.", ws.id);

            ws.send(JSON.stringify({
                chatIntro: chatAnswer,
                connectionId: connectionId,
            }));

        } catch (error: any) {
            console.error('Error during initial chat submission:', error);
            ws.send(JSON.stringify({
                message: 'Error during initial chat submission',
                error: error.message,
                connectionId: connectionId,
            }));
            ws.close();
        }
        
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

        
        activeSessions.set(connectionId, {
            lyriaSession: lyriaSession,
            createdAt: new Date(),
            weightedPrompts: {},
            configs: {}
        });

        lyriaSession.play();

        console.log(connectionId);
        console.log(activeSessions)
        
        ws.send(JSON.stringify({
            message: 'Lyria RealTime session started',
            connectionId: connectionId,
        }));
        
        ws.on('message', (msg: any) => {
            console.log(msg);
            ws.send(msg);
        });

        ws.on('close', () => {
            console.log("ws closed")
            ws.isAlive = false;
            activeSessions.delete(connectionId);
            lyriaSession.close();
        });
    });
};

export {
    musicStreamSocket
};