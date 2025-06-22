import { Request, Response } from 'express';

import submitChat from "./submit-chat.service";

import { activeSessions } from '../../clients';

const handleChat = async (req: Request, res: Response): Promise<void> => {
  const message = (req.body?.message || req.query?.message) as any;
  const socketId = (req.body?.socketId || req.query?.socketId || 'user-abc') as string;
    console.log(req.body, req.query);
  if (!message) {
     res.status(400).json({ error: 'No message provided' });
    return;
  }

  try {
    console.log("step 1")
    console.log(message);
    const aiResponse = await submitChat(message, socketId);
    console.log("step 2");
    let parsed: any;
    let  weightedPrompts: { [key: string]: number };
    try {
        parsed = JSON.parse(aiResponse);
        console.log("step 3");
        const chatOutput = parsed.chatResponse;

        
        const weightedPromptsFromModel = parsed.weightedPrompts || [];
        const musicConfig = parsed.musicConfig || {};

        console.log(weightedPromptsFromModel, musicConfig);
        
        if (activeSessions.has(socketId)) {
          const session = activeSessions.get(socketId)?.lyriaSession;
          weightedPrompts = activeSessions.get(socketId)?.weightedPrompts || {};

          if (session) {
            weightedPromptsFromModel.forEach((prompt: any) => {
                weightedPrompts[prompt.text] = prompt.weight;
            });

            const weightedPromptsArray = Object.entries(weightedPrompts || {}).map(
                ([text, weight]) => ({ text, weight })
            );
            console.log(weightedPromptsArray)
            session.setWeightedPrompts({
                weightedPrompts: weightedPromptsArray
            });

            if(musicConfig.bpm || musicConfig.temperature || musicConfig.musicGenerationMode ||
                musicConfig.topK || musicConfig.guidance || musicConfig.density || 
                musicConfig.brightness || 
                ('muteBass' in musicConfig) ||
                ('muteDrums' in musicConfig) ||
                ('onlyBassAndDrums' in musicConfig)
            ) {
                session.setMusicGenerationConfig( {
                    musicGenerationConfig: musicConfig,
                });
            }
            console.log("Step 3.1");
            activeSessions.set(socketId, {
              lyriaSession: session,
              createdAt: new Date(),
              weightedPrompts: weightedPrompts || {},
              configs: musicConfig
            });
            console.log(activeSessions.get(socketId));
          }
        } else {
          throw new Error(`No active session found for socketId: ${socketId}`);
        }
        console.log("step 5");
        res.send({
            message: chatOutput,
            weightedPrompts: weightedPrompts,
        });
        console.log("step 6");
        return;

    } catch (err) {
      console.error('Failed to parse AI response:', aiResponse);
      console.error(err);
      res.status(500).json({ error: 'Invalid AI response' });
      return;
    }

  } catch (error) {
    console.error('Chat controller ERROR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handleChat;