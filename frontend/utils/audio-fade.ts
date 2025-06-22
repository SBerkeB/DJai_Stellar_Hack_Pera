/**
 * Smoothly fades out audio over a specified duration
 * @param gainNode - The Web Audio API GainNode to control
 * @param audioContext - The Web Audio API AudioContext
 * @param duration - Duration in milliseconds for the fade out (default: 2000ms)
 * @param onComplete - Optional callback when fade out is complete
 */
export const fadeOutAudio = async (
  gainNode: GainNode,
  audioContext: AudioContext,
  duration = 2000,
  onComplete?: () => void,
): Promise<void> => {
  if (!gainNode || !audioContext) {
    console.warn("Invalid audio nodes provided")
    return
  }

  const currentTime = audioContext.currentTime
  const currentGain = gainNode.gain.value

  // Cancel any existing scheduled changes
  gainNode.gain.cancelScheduledValues(currentTime)

  // Set current value and schedule fade to 0
  gainNode.gain.setValueAtTime(currentGain, currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + duration / 1000)

  // Set timeout to call completion callback and set final value
  setTimeout(() => {
    if (gainNode && audioContext) {
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    }
    onComplete?.()
  }, duration)
}

/**
 * Smoothly fades in audio over a specified duration (faster than fade out)
 * @param gainNode - The Web Audio API GainNode to control
 * @param audioContext - The Web Audio API AudioContext
 * @param duration - Duration in milliseconds for the fade in (default: 1000ms)
 * @param targetVolume - Target volume level (default: 1.0)
 * @param onComplete - Optional callback when fade in is complete
 */
export const fadeInAudio = async (
  gainNode: GainNode,
  audioContext: AudioContext,
  duration = 1000,
  targetVolume = 1.0,
  onComplete?: () => void,
): Promise<void> => {
  if (!gainNode || !audioContext) {
    console.warn("Invalid audio nodes provided")
    return
  }

  const currentTime = audioContext.currentTime

  // Cancel any existing scheduled changes
  gainNode.gain.cancelScheduledValues(currentTime)

  // Start from 0 and fade to target volume
  gainNode.gain.setValueAtTime(0.001, currentTime)
  gainNode.gain.exponentialRampToValueAtTime(targetVolume, currentTime + duration / 1000)

  // Set timeout to call completion callback
  setTimeout(() => {
    onComplete?.()
  }, duration)
}


/**
 * Crossfade between two audio sources
 * @param fromGainNode - Source to fade out
 * @param toGainNode - Source to fade in
 * @param audioContext - The Web Audio API AudioContext
 * @param duration - Duration for the crossfade (default: 1500ms)
 * @param onComplete - Optional callback when crossfade is complete
 */
export const crossfadeAudio = async (
  fromGainNode: GainNode,
  toGainNode: GainNode,
  audioContext: AudioContext,
  duration = 1500,
  onComplete?: () => void,
): Promise<void> => {
  if (!fromGainNode || !toGainNode || !audioContext) {
    console.warn("Invalid audio nodes provided for crossfade")
    return
  }

  // Start both fades simultaneously
  const fadeOutPromise = fadeOutAudio(fromGainNode, audioContext, duration)
  const fadeInPromise = fadeInAudio(toGainNode, audioContext, duration)

  // Wait for both to complete
  await Promise.all([fadeOutPromise, fadeInPromise])

  onComplete?.()
}