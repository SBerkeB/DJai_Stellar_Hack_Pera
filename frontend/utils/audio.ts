// "use client"

// import { decode, decodeAudioData } from './lyria.utils'

export type PlaybackState = "stopped" | "playing" | "loading" | "paused";

// export class AudioStreamManager {
//   private audioContext: AudioContext | null = null
//   private gainNode: GainNode | null = null
//   private isMuted = false
//   private nextStartTime = 0
//   private readonly bufferTime = 5
//   private playbackState: PlaybackState = 'stopped';

//   async initialize() {
//     try {
//       this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
//       this.gainNode = this.audioContext.createGain()
//       this.gainNode.connect(this.audioContext.destination)
//     } catch (error) {
//       console.error("Failed to initialize audio context:", error)
//     }
//   }

//   async processAudioData(audioData: any) {
//     // console.log("Processing audio data:", audioData)
//     if (!this.audioContext || !this.gainNode) {
//       await this.initialize()
//     }

//     try {
//       const audioBuffer = await decodeAudioData(
//               decode(audioData),
//               this.audioContext!,
//               48000,
//               2,
//             );
//       const source = this.audioContext!.createBufferSource()
//       source.buffer = audioBuffer
//       source.connect(this.gainNode!)
//       if (this.nextStartTime === 0) {
//               this.nextStartTime = (this.audioContext?.currentTime ?? 0) + this.bufferTime;
//               setTimeout(() => {
//                 this.playbackState = 'playing';
//               }, this.bufferTime * 1000);
//       }

//       // if (this.audioContext && this.nextStartTime < this.audioContext.currentTime) {
//       //         this.playbackState = 'loading';
//       //         this.nextStartTime = 0;
//       //         // return;
//       // }
//             console.log("Starting audio source at time:", this.nextStartTime);
//             source.start(this.nextStartTime);
//             this.nextStartTime += audioBuffer.duration;
//     } catch (error) {
//       console.error("Failed to process audio data:", error)
//     }
//   }

//   setMuted(muted: boolean) {
//     this.isMuted = muted
//     if (this.gainNode) {
//       this.gainNode.gain.value = muted ? 0 : 1
//     }
//   }

//   getMuted(): boolean {
//     return this.isMuted
//   }

//   cleanup() {
//     if (this.audioContext) {
//       this.audioContext.close()
//       this.audioContext = null
//       this.gainNode = null
//     }
//   }
// }

// Audio context and gain node management

import { decodeAudioData, decode } from "./lyria.utils";

let audioContext: AudioContext | null = null;
let gainNode: GainNode | null = null;
let isMuted = false;
let nextStartTime = 0;
let bufferTime = 3;
let playbackState: PlaybackState = "stopped";

/**
 * Initialize audio context and gain node
 */
export const initializeAudio = async (): Promise<
  { audioContext: AudioContext; gainNode: GainNode } | undefined
> => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);

      // Start with volume at 0 for fade-in capability
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    }
    if (gainNode) {
      return { audioContext, gainNode };
    }
  } catch (error) {
    console.error("Failed to initialize audio context:", error);
    return;
  }
};

/**
 * Process audio data and play it through the gain node
 */
export const processAudioData = async (
  audioData: ArrayBuffer
): Promise<void> => {
  const nodes = await initializeAudio();
  if (!nodes) return;

  try {
    const audioBuffer = await decodeAudioData(
      decode(audioData),
      nodes.audioContext!,
      48000,
      2
    );
    const source = nodes.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(nodes.gainNode);
    if (nextStartTime === 0) {
      nextStartTime = (nodes.audioContext?.currentTime ?? 0) + bufferTime;
      setTimeout(() => {
        playbackState = "playing";
      }, bufferTime * 1000);
    }
    source.start(nextStartTime);
    nextStartTime += audioBuffer.duration;
  } catch (error) {
    console.error("Failed to process audio data:", error);
  }
};

/**
 * Set muted state
 */
export const setAudioMuted = (muted: boolean): void => {
  isMuted = muted;
  if (gainNode) {
    gainNode.gain.setValueAtTime(muted ? 0 : 1, audioContext?.currentTime || 0);
  }
};

/**
 * Get muted state
 */
export const getAudioMuted = (): boolean => {
  return isMuted;
};

/**
 * Get current audio nodes
 */
export const getAudioNodes = (): {
  gainNode: GainNode | null;
  audioContext: AudioContext | null;
} => {
  return { gainNode, audioContext };
};

/**
 * Cleanup audio resources
 */
export const cleanupAudio = (): void => {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
    gainNode = null;
    isMuted = false;
  }
};

/**
 * Handle music stream start - wait 3 seconds then fade in over 1 second
 */
export const handleMusicStreamStart = async (): Promise<void> => {
  const nodes = await initializeAudio();
  if (!nodes) return;

  console.log("Music stream starting - waiting 3 seconds before fade in...");

  // Ensure we start from 0 volume
  nextStartTime = 0; // Reset timing
  nodes.gainNode.gain.setValueAtTime(0, nodes.audioContext.currentTime);

  // Wait 3 seconds
  await new Promise((res) => setTimeout(res, 3000));

  console.log("Starting 1 second fade in...");

  const currentTime = nodes.audioContext.currentTime;

  nodes.gainNode.gain.cancelScheduledValues(currentTime);
  nodes.gainNode.gain.setValueAtTime(0.001, currentTime);
  nodes.gainNode.gain.exponentialRampToValueAtTime(1.0, currentTime + 1);

  isMuted = false;

  console.log("Fade in complete!");
};

/**
 * Handle music stream stop - fade out over 2 seconds and prepare for restart
 */
export const handleMusicStreamStop = async (): Promise<void> => {
  const nodes = getAudioNodes();
  if (!nodes.gainNode || !nodes.audioContext) return;

  console.log("Music stream stopping - starting 2 second fade out...");

  const currentTime = nodes.audioContext.currentTime;
  const currentGain = nodes.gainNode.gain.value;

  nodes.gainNode.gain.cancelScheduledValues(currentTime);
  nodes.gainNode.gain.setValueAtTime(currentGain, currentTime);
  nodes.gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 2);

  await new Promise((res) => setTimeout(res, 2000)); // wait 2 seconds

  nodes.gainNode.gain.setValueAtTime(0, nodes.audioContext.currentTime);
  console.log("Fade out complete - ready for stream restart");
};

/**
 * Get current volume level
 */
export const getCurrentAudioVolume = (): number => {
  return gainNode?.gain.value || 0;
};

/**
 * Check if audio is currently fading
 */
export const isAudioFading = (): boolean => {
  if (!gainNode) return false;

  try {
    const currentGain = gainNode.gain.value;
    // If gain is between 0.001 and 0.999, likely fading
    return currentGain > 0.001 && currentGain < 0.999;
  } catch {
    return false;
  }
};
