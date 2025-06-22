import { LiveMusicSession, CountTokensParameters } from "@google/genai";

import { getGoogleGenAIClient } from "../google-genai.client";

import createLofiBroadcast from "./lofi-broadcast.clients";
import createEdmBroadcast from "./edm-broadcast.client";
import createJazzBroadcast from "./jazz-broadcast.client";
import createStellarBroadcast from "./stellar-broadcast.client";




async function initLyria() {
    createStellarBroadcast();
    createLofiBroadcast();
    createEdmBroadcast();
    createJazzBroadcast();
}



export const broadcastClients = new Map<
string,
WebSocket
>();


export default initLyria;