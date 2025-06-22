import fetch from "node-fetch";

import { activeSessions } from '../../clients';

import { getSystemPrompt } from "../../constants";
// TBD: RAG context handling
const submitChat = async (userMessage: string, socketId: string): Promise<string> => {
  console.log("step 1.1");
  const systemPrompt = getSystemPrompt({
    weightedPrompts: activeSessions.get(socketId)?.weightedPrompts,
    musicConfig: activeSessions.get(socketId)?.configs
  });
  console.log("step 1.2");
  try {

    const response = await fetch(process.env.LLAMA_URL as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "mistral",
          messages: [
            {
              role: "system",
              content: systemPrompt
            }, 
            {
              role: 'user', content: `${userMessage}` 
            }
          ],
          stream: false,
          format: {
            "type": "object",
            "properties": {
              "chatResponse": { "type": "string" },
              "weightedPrompts": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "text": { "type": "string" },
                    "weight": {
                      "type": "number",
                      "minimum": 0.0,
                      "maximum": 1.0
                    }
                  },
                  "required": ["text", "weight"]
                }
              },
              "musicConfig": {
                "type": "object",
                "properties": {
                  "bpm": {
                    "type": "number",
                    "minimum": 60,
                    "maximum": 200
                  },
                  "temperature": {
                    "type": "number",
                    "minimum": 0.0,
                    "maximum": 3.0
                  },
                  "density": {
                    "type": "number",
                    "minimum": 0.0,
                    "maximum": 1.0
                  },
                  "brightness": {
                    "type": "number",
                    "minimum": 0.0,
                    "maximum": 1.0
                  },
                  "muteBass": { "type": "boolean" },
                  "muteDrums": { "type": "boolean" },
                  "onlyBassAndDrums": { "type": "boolean" },
                  "musicGenerationMode": {
                    "type": "string",
                    "enum": ["DIVERSITY", "QUALITY"]
                  }
                }
              }
            },
            "required": ["chatResponse"]
          }
      })
    });

    console.log("step 1.3");

            
    const result = await response?.json();

    return result.message.content;

  } catch (error) {
    console.error("Error submitting chat:", error);
    throw new Error("Failed to submit chat. Please try again later.");
  }
}

export default submitChat;