import { GoogleGenAI, LiveMusicSession, LiveMusicGenerationConfig } from '@google/genai';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import getIntroMessage from '../components/ollama/get-intro-message.service';
import { getGoogleGenAIClient, activeSessions, broadcastClients } from '../clients';
import getIntroSystemPrompt from '../constants/intro-system-prompt';

const envPath = path.resolve(__dirname, '../../.env');

dotenv.config({ path: envPath });

let lyriaSession: LiveMusicSession;

const broadcastSocket = (app: any) => {
    app.ws('/broadcast/:channel', async (ws: any, req: Request, res: Response) => {
        
        ws.isAlive = true;

        const connectionId = uuidv4();  // generate unique ID
        (ws as any).id = connectionId;
        (ws as any).channel = req.params.channel;
        
        broadcastClients.set(ws.id, ws);
        
        ws.send(JSON.stringify({
            message: ws.channel.toUpperCase() + ' session started',
            status: 'connected',
            connectionId: connectionId,
        }));
        
        ws.on('message', (msg: any) => {
            console.log(msg);
            ws.send(msg);
        });

        ws.on('close', () => {
            console.log("ws closed")
            ws.isAlive = false;
            broadcastClients.delete(connectionId);
        });
    });
};

export {
    broadcastSocket,
};