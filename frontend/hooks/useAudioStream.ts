"use client";

import { useEffect, useRef, useState } from "react";
import {
  initializeAudio,
  processAudioData,
  setAudioMuted,
  getAudioMuted,
  cleanupAudio,
  handleMusicStreamStart,
  handleMusicStreamStop,
  getCurrentAudioVolume,
  isAudioFading,
} from "@/utils/audio";

export function useAudioStream() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const initializeRef = useRef(false);

  useEffect(() => {
    // Initialize audio on mount
    if (!initializeRef.current) {
      initializeAudio();
      initializeRef.current = true;
    }

    return () => {
      cleanupAudio();
    };
  }, []);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    setAudioMuted(newMutedState);
  };

  const processAudio = (audioData: ArrayBuffer) => {
    if (!getAudioMuted()) {
      processAudioData(audioData);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle stream start - automatic fade in after 3 seconds
  const startMusicStream = async () => {
    console.log("Starting music stream...");
    setIsStreamActive(true);

    await handleMusicStreamStart();
    setIsPlaying(true);
  };

  // Handle stream stop - automatic fade out over 2 seconds
  const stopMusicStream = async () => {
    console.log("Stopping music stream...");
    setIsStreamActive(false);
    setIsPlaying(false);
    await handleMusicStreamStop();
  };

  // Get current audio state
  const getAudioState = () => ({
    volume: getCurrentAudioVolume(),
    isFading: isAudioFading(),
    isMuted: getAudioMuted(),
    isStreamActive,
  });

  return {
    isMuted,
    isPlaying,
    isStreamActive,
    toggleMute,
    togglePlayback,
    processAudio,
    startMusicStream,
    stopMusicStream,
    getAudioState,
  };
}
