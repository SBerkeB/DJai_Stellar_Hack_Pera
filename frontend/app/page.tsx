"use client";

import { useEffect, useRef, useState } from "react";

import { useAudioStream } from "@/hooks/useAudioStream";

import { WhitelistForm } from "@/components/whitelist/whitelist-form";
import { CountdownTimer } from "@/components/whitelist/countdown-timer";
import { SocialProof } from "@/components/whitelist/social-proof";
import { MusicVisualizer } from "@/components/broadcasts/music-visualizer";
import { PulsingLogo } from "@/components/whitelist/pulsing-logo";
import {
  MessageCircle,
  Headphones,
  Zap,
  DiscIcon as Discord,
  Twitter,
} from "lucide-react";

import { writeNewUser } from "@/utils/contract/auth-logic";

import { ConnectWallet } from "../components/wallet-connection/connect-wallet";
import { crossfadeAudio } from "../utils/audio-fade";
import { cleanupAudio } from "@/utils/audio";
import { Button } from "@/components/ui/button";
import { signup } from "@/utils/contract/passkeys";

export default function LandingPage() {
  const musicWSRef = useRef<WebSocket | null>(null);
  // const { isMuted, isPlaying, toggleMute, togglePlayback, processAudioData } = useAudioStream();
  const {
    isMuted,
    isPlaying,
    isStreamActive,
    toggleMute,
    togglePlayback,
    processAudio,
    startMusicStream,
    stopMusicStream,
    getAudioState,
  } = useAudioStream();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);



  const socketOptions = [
    { label: "Stellar", path: "/broadcast/stellar" },
    { label: "🎛️ EDM", path: "/broadcast/edm" },
    { label: "🎧 LoFi", path: "/broadcast/lofi" },
    { label: "🎷 Jazz", path: "/broadcast/jazz" },
  ];

  const [selectedSocketPath, setSelectedSocketPath] =
    useState("/broadcast/stellar");

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prev: any) =>
      prev.includes(option)
        ? prev.filter((o: any) => o !== option)
        : [...prev, option]
    );
  };
  const options = [
    "🎹 Music Production",
    "🎧 Music Enjoyer",
    "🤖 AI / ML",
    "💻 Software Dev",
    "🧠 Prompt Eng",
    "🎨 Gen Art",
    "🎚️ Sound Design",
    "🎼 Generative Music",
    "🚀 Startup Culture",
    "🎨 Frontend Wizardry",
    "🔧 Backend Architect",
  ];

  const SOCKET_URL =
    process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:5050";

  useEffect(() => {
    // Only create the connection if it doesn't exist
    if (!musicWSRef.current) {
      if (!selectedSocketPath) return;
      musicWSRef.current = new WebSocket(SOCKET_URL + selectedSocketPath);

      musicWSRef.current.onmessage = (event: any) => {
        // TBD: type this properly
        const data = JSON.parse(event.data);
        console.log("Music WebSocket data:", data);
        if (data.serverContent?.audioChunks) {
          console.log(
            "Processing audio chunk:",
            data.serverContent.audioChunks[0].data
          );
          processAudio(data.serverContent.audioChunks[0].data);
        }
        // Handle stream start message
        if (data.status === "connected") {
          console.log("Received stream start message");
          startMusicStream();
        }
        // Handle first chunk message

        // Handle stream stop message
        if (data.status === "closed") {
          console.log("Received stream stop message");
          stopMusicStream();
        }
      };
    }

    // Cleanup on unmount
    return () => {
      if (musicWSRef.current && musicWSRef.current.readyState === 1) {
        musicWSRef.current.close();
        musicWSRef.current = null;
      }
    };
  }, [selectedSocketPath]);
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div
        className="container mx-auto px-4 py-16 relative"
        style={{ zIndex: 10 }}
      >
        {/* <Button onClick={() => signup()}>TestButton</Button> */}
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex-shrink-0">
              <PulsingLogo />
            </div>
          </div>

          {/* Simple music visualizer */}
          <div className="mb-6">
            <MusicVisualizer isPlaying={isPlaying} />
          </div>
          <div className="mb-4 text-center">
            <label className="text-lg font-medium block mb-2">
              Hear my Music!
            </label>
            <div className="flex justify-center flex-wrap gap-4 mb-8">
              {socketOptions.map((option) => {
                const isActive = selectedSocketPath === option.path;

                if (option.label !== "Stellar") {
                  return;
                } else {
                  return (
                    <button
                      key={option.path}
                      type="button"
                      onClick={async () => {
                        if (selectedSocketPath === option.path) {
                          setSelectedSocketPath("");
                          stopMusicStream();
                          return;
                        }
                        await stopMusicStream(); // TBD Fade out
                        cleanupAudio(); // TBD Clean context

                        setSelectedSocketPath(option.path);
                        await startMusicStream();
                      }}
                      className={`w-60 px-6 py-4 rounded-2xl font-semibold text-center transition

                        ${
                          isActive
                            ? "text-white bg-gradient-to-r from-pink-500 to-blue-500 shadow-lg shadow-pink-500/40 ring-2 ring-white"
                            : "bg-white/10 hover:bg-white/20 text-gray-500"
                        }`}
                    >
                      {option.label}
                    </button>
                  );
                }
              })}
            </div>
            <div className="flex justify-center flex-wrap gap-4 mb-8">
              {socketOptions.map((option) => {
                const isActive = selectedSocketPath === option.path;

                if (option.label === "Stellar") {
                  return;
                } else {
                  return (
                    <button
                      key={option.path}
                      type="button"
                      onClick={async () => {
                        if (selectedSocketPath === option.path) {
                          setSelectedSocketPath("");
                          stopMusicStream();
                          return;
                        }
                        await stopMusicStream(); // TBD Fade out
                        cleanupAudio(); // TBD Clean context
                        setTimeout(() => {
                          setSelectedSocketPath(option.path);
                          startMusicStream();
                        }, 1000); // Delay to ensure stream stops before changing path
                      }}
                      className={`w-40 px-4 py-3 rounded-2xl  font-semibold text-center transition
                        ${
                          isActive
                            ? "text-white bg-gradient-to-r from-pink-500 to-blue-500 shadow-lg shadow-pink-500/40 ring-2 ring-white"
                            : "bg-white/10 hover:bg-white/20 text-gray-500"
                        }`}
                    >
                      {option.label}
                    </button>
                  );
                }
              })}
            </div>
          </div>
          <div className="mb-4 text-center">
            <label className="text-lg font-medium block mb-2">Hear my Sounds!</label>
            <div className="flex justify-center flex-wrap gap-4 mb-8">
              {socketOptions.map((option) => {
                const isActive = selectedSocketPath === option.path;
                return (
                  <button
                    key={option.path}
                    type="button"
                    onClick={() => setSelectedSocketPath(option.path)}
                    className={`w-40 px-4 py-3 rounded-2xl  font-semibold text-center transition
                      ${isActive
                        ? "text-white bg-gradient-to-r from-pink-500 to-blue-500 shadow-lg shadow-pink-500/40 ring-2 ring-white"
                        : "bg-white/10 hover:bg-white/20 text-gray-500"
                      }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed px-4">
            World's first realtime DJ chat bot!
          </p>

          {/* Countdown Timer */}
          <div className="mb-6">
            <CountdownTimer daysLeft={12} />
          </div>

          <div className="text-base sm:text-lg text-gray-400 mb-8">
            Coming Soon • Request your limited spot at Whitelist for Early
            Access
          </div>

          {/* Social Proof */}
          <div>
            <SocialProof />
          </div>
        </div>


        {/* Features Section - removed complex animations */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-gray-700 group-hover:border-blue-500 transition-colors duration-300">
              <MessageCircle className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Conversations</h3>
            <p className="text-gray-400">
              Engage in intelligent conversations powered by advanced AI
              technology
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-gray-700 group-hover:border-purple-500 transition-colors duration-300">
              <Headphones className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Live Music Generation
            </h3>
            <p className="text-gray-400">
              AI creates unique music in real-time based on your conversation
              context
            </p>
          </div>

          {/* <div className="text-center group">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-gray-700 group-hover:border-green-500 transition-colors duration-300">
              <Zap className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Crypto Integration</h3>
            <p className="text-gray-400">
              Seamless integration with Stellar blockchain and Spotify for enhanced experiences
            </p>
          </div> */}
        </div>

        <div className="text-center max-w-2xl mx-auto mt-12 p-6 bg-black text-white rounded-2xl shadow-xl border border-white/10 mb-16">
          <h2 className="text-4xl font-extrabold mb-4">
            🎶 Join the Waitlist 🎶
          </h2>
          <p className="text-lg mb-6 text-gray-400">
            Be the first to access the AI DJ experience.
          </p>
          <p className="text-lg mb-6 text-gray-400">
            Select your vibe & flex your style.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-bold">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-xl bg-white/10 border border-white/20 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-lg font-bold mb-2">
                Which worlds do you vibe with?
              </label>
              <div className="flex flex-wrap gap-2 items-center justify-center">
                {options.map((option) => (
                  <label
                    key={option}
                    className={`px-3 py-1 rounded-full  text-sm cursor-pointer hover:bg-pink-500/20
                      ${
                        selectedOptions.includes(option)
                          ? "bg-blue-900 text-white"
                          : "bg-white/10 text-white"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      className="mr-2 sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="flex" className="block text-sm font-medium">
                Flex your style (optional)
              </label>
              <textarea
                id="flex"
                name="flex"
                rows={3}
                className="mt-1 block w-full rounded-xl bg-white/10 border border-white/20 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Drop a playlist, GitHub link, Social Media or your AI-DJ collab idea..."
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold py-3 rounded-xl shadow hover:opacity-90 transition"
              >
                Join the Waitlist
              </button>
            </div>
          </form>
        </div>

        <div className="text-center max-w-2xl mx-auto mt-12 p-6 bg-black text-white rounded-2xl shadow-xl border border-white/10 mb-16">
          <h2 className="text-4xl font-extrabold mb-4">🔓🎵 Join via Wallet</h2>
          <p className="text-lg mb-6 text-gray-400">
            Connect your wallet to secure your spot and access exclusive
            features.{" "}
          </p>
          // Connect Wallet Form
          <form className="space-y-6">
            <div>
              <label className="block text-lg font-bold">Select Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="mt-1 block w-full rounded-xl bg-white/10 border border-white/20 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="What should we call you?"
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2">
                🌀 Which sonic realms call you?
              </label>
              <div className="flex flex-wrap gap-2 items-center justify-center">
                
              </div>
            </div>

            <div>
              <label htmlFor="flex" className="block text-sm font-medium">
                Share us your favorite musicians and bands (optional)
              </label>
              <textarea
                id="flex"
                name="flex"
                rows={3}
                className="mt-1 block w-full rounded-xl bg-white/10 border border-white/20 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your favorite artists, or share your music inspirations..."
              ></textarea>
            </div>

                <ConnectWallet />
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold py-3 rounded-xl shadow hover:opacity-90 transition"
              
              >
                Join with your wallet!
              </button>
              <button
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold py-3 rounded-xl shadow hover:opacity-90 transition"
              >
                🎧 Already vibing? Let’s go!
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto border border-gray-700">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              What to Expect
            </h3>
            <ul className="text-left space-y-3 text-sm sm:text-base text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">♪</span>
                Real-time AI music generation based on conversation
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">♫</span>
                Seamless crypto wallet integration
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">♪</span>
                Spotify connectivity for enhanced audio experiences
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">♫</span>
                Advanced AI chat capabilities
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">♪</span>
                Early access to cutting-edge features
              </li>
            </ul>
          </div>
        </div>

        {/* Community Links */}
        <div className="text-center mb-8">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-300">
            Join Our Community
          </h3>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <Discord className="h-5 w-5" />
              <span className="text-sm sm:text-base">Discord</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <Twitter className="h-5 w-5" />
              <span className="text-sm sm:text-base">Twitter</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 mb-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-200"
            >
              Terms of Use
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
