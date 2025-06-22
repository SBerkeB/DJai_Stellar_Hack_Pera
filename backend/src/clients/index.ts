import {
  runMongoClient,
  getUserCollection,
  getChatsCollection,
  getUserWithWalletCollection,
} from "./mongo.client";
// import { runOllamaModel, getOllamaModel, getOllamaChat } from "./ollama-client.service";
import { runChromaClient, getVectorCollection } from "./chroma.client";
import {
  runGoogleGenAIClient,
  getGoogleGenAIClient,
} from "./google-genai.client";
import { activeSessions } from "./lyria-sessions.client";
import initLyria, { broadcastClients } from "./broadcast/broadcast.clients";

const init = async () => {
  try {
    await runMongoClient();
    // await runOllamaModel();
    // await runChromaClient();
    await runGoogleGenAIClient();
    await initLyria();
  } catch (err) {
    throw err;
  }
};

export {
  init,
  getUserCollection,
  getChatsCollection,
  getGoogleGenAIClient,
  getUserWithWalletCollection,
  activeSessions,
  broadcastClients
};
