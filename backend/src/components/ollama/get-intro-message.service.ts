import fetch from "node-fetch";

import { activeSessions } from '../../clients';

import { getIntroSystemPrompt } from "../../constants";
// TBD: RAG context handling
const getIntroMessage = async (starterMessage: string, socketId: string): Promise<string> => {
  console.log("step 1.1");
  const systemPrompt = getIntroSystemPrompt();
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
              role: 'user', content: `${starterMessage}` 
            }
          ],
          stream: false,
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

export default getIntroMessage;