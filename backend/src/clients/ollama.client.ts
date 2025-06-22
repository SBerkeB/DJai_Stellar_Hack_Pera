// import dotenv from "dotenv";
// import path from "path";

// import { ChatOllama } from '@langchain/ollama';

// import fetch from "node-fetch";

// import ollama, { Ollama } from "ollama"

// import { DEFAULT_SYSTEM_PROMPT } from "../constants/default-system-prompt";

// const envPath = path.resolve(__dirname, '../../.env');

// dotenv.config({ path: envPath });

// let model: any;
// let chat: any;

// const runOllamaModel = async () => {
    

//     const modelfile = 
    
//     // `
//     //     FROM llama3
//     //     SYSTEM "RETURN ONLY THE REQUESTED JSON! You are a news analyzer. You are to define the crypto-economic sentiment and importance level of given example articles. Further instructions are as follows. Crypto-Economic sentiment, between -10 (Highly negative) and 10 (Highly positive). Importance level, between 0 (Unrelated to current market structure) and 10 (High effect on current market structure).
//     //     You also are required to return a JSON Object like this: '{"sentiment": number,"importance": number}'"."
//     //     PARAMETER temperature 0
//     // `   

//     `
//         FROM llama3:latest
//         SYSTEM ${DEFAULT_SYSTEM_PROMPT}
//     `   
    

//     try {
        
//         const result = await fetch("http://localhost:11434/api/generate",{
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//                 model: "llama3:latest",
//                 modelfile: modelfile,
//                 stream: false
//             }),
//         });
//         console.log(result)


//     } catch (error) {
//         console.log(error)
//     }

    
// };

// const getOllamaModel = async (): Promise<Ollama>=> model;
// const getOllamaChat = async (): Promise<ChatOllama> => chat;



// export { runOllamaModel, getOllamaModel, getOllamaChat };