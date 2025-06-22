import { GoogleGenAI } from '@google/genai';

let GoogleGenAIClient: GoogleGenAI;

export const runGoogleGenAIClient = async () => {
    GoogleGenAIClient = new GoogleGenAI({
        apiKey: process.env.GOOGLE_AI_API_KEY, // Do not store your API client-side!
        apiVersion: 'v1alpha',
    });
}

export const getGoogleGenAIClient = async () => GoogleGenAIClient;