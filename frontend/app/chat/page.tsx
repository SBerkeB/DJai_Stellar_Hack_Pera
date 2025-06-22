"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
import path from "path";

import { useApp } from "../providers";
import { useAudioStream } from "@/hooks/useAudioStream";
import { validateConnections } from "@/utils/connections";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { ChatHeader } from "@/components/chat/chat-header";
import { MessageBubble } from "@/components/chat/message-bubble";
import { EmptyChatState } from "@/components/chat/empty-chat-state";
import { ChatInput } from "@/components/chat/chat-input";
import { MusicControls } from "@/components/chat/music-controls";
import { MusicNodesList } from "@/components/chat/music-nodes-list";

import { ChatGuideModal } from "@/components/chat/chat-guide";

import type { Message } from "@/types";
import { WeightedPrompts } from "@/types";
import { set } from "zod";
// import { makePayment } from "@/utils/make-payment";

export default function ChatPage() {
  const { connections, disconnect } = useApp();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const socketIdRef = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const musicWSRef = useRef<WebSocket | null>(null);
  const weightedPrompts = useRef<WeightedPrompts>({});
  const [showGuide, setShowGuide] = useState(true);
  const [chatStarted, setChatStarted] = useState(false);

  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:5050";
  const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || "http://localhost:5050";

  // const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)(
  //   {sampleRate: 48000},
  // );
  // WebSocket hooks

  // Audio hook
  const { isMuted, isPlaying, toggleMute, togglePlayback } = useAudioStream();

  useEffect(() => {
    // Only create the connection if it doesn't exist
    if (!musicWSRef.current && chatStarted) {
      musicWSRef.current = new WebSocket(SOCKET_URL + "/lyria_stream");

      musicWSRef.current.onmessage = (event: any) => {
        // TBD: type this properly
        const data = JSON.parse(event.data);
        if (data.chatIntro) {
          setMessages([
            {
              id: Date.now().toString(),
              role: "assistant",
              content: data.chatIntro,
              timestamp: new Date(),
            },
          ]);
          console.log("Intro message received:", data.introMessage);
        }
        if (data.connectionId) {
          socketIdRef.current = data.connectionId;
          weightedPrompts.current = data.weightedPrompts || {};
          console.log(
            "WebSocket connection established with propmpts:",
            weightedPrompts.current
          );
        }

        console.log("Music WebSocket data:", data);
        if (data.serverContent?.audioChunks) {
          // processAudioData(data.serverContent.audioChunks[0].data);
        }
      };
    }

    // Cleanup on unmount
    return () => {
      if (
        musicWSRef.current &&
        musicWSRef.current.readyState === 1 &&
        chatStarted
      ) {
        musicWSRef.current.close();
        musicWSRef.current = null;
      }
    };
  }, [chatStarted]);

  const handleStartChat = () => {
    setShowGuide(false);
    setChatStarted(true);
  };

  const handleCloseGuide = () => {
    setShowGuide(false);
    setChatStarted(true);
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    console.log("Sending user message:", userMessage);
    // try {
    //   const paymentResult = await makePayment();
    //   // if (!paymentResult?.success) {
    //     // Optional: show error in UI
    //     console.error("Payment failed or not confirmed:", paymentResult);
    //     setMessages((prev) => [
    //       ...prev,
    //       {
    //         id: Date.now().toString(),
    //         role: "assistant",
    //         content: "⚠️ Payment failed. Please try again.",
    //         timestamp: new Date(),
    //       },
    //     ]);
    //     return;
    //   // }
    // } catch (err) {
    //   console.error("Error making payment:", err);
    // }

    await fetch(CHAT_URL + "/send_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: content,
        socketId: socketIdRef.current,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const botMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };
        weightedPrompts.current = data.weightedPrompts;
        console.log("Received weighted prompts:", weightedPrompts.current);
        setMessages((prev) => [...prev, botMessage]);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const handleToggleMusic = () => {
    togglePlayback();
    // musicWS.send({
    //   action: isPlaying ? "pause" : "play",
    // })
  };

  const handleDisconnect = () => {
    disconnect();
    router.push("/");
  };

  // if (!validateConnections(connections)) {
  //   return null
  // }

  return (
    <>
      {/* Chat Guide Modal */}
      <ChatGuideModal
        isOpen={showGuide}
        onClose={handleCloseGuide}
        onStartChat={handleStartChat}
      />
      <SidebarProvider>
        <div className="w-full flex h-screen bg-gray-900">
          {/* Sidebar */}
          <Sidebar className="border-r border-gray-800">
            <SidebarHeader className="p-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-white text-center">
                Connected
              </h2>
              <h2 className="text-lg font-semibold text-white text-center">
                &
              </h2>
              <h2 className="text-lg font-semibold text-white text-center">
                Ready to Vibe
              </h2>
            </SidebarHeader>
            <SidebarContent className="p-4">
              <div className="space-y-4">
                <MusicNodesList weightedPrompts={weightedPrompts.current} />
                <MusicControls
                  isPlaying={isPlaying}
                  isMuted={isMuted}
                  onToggleMusic={handleToggleMusic}
                  onToggleMute={toggleMute}
                />

                <Button
                  onClick={handleDisconnect}
                  variant="destructive"
                  size="sm"
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            </SidebarContent>
          </Sidebar>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* <ChatHeader isConnected={chatWS.isConnected} isMusicPlaying={isPlaying} /> */}
            <ChatHeader isConnected={true} isMusicPlaying={isPlaying} />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* {messages.length === 0 ? (
              <EmptyChatState />
            ) : (
              messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))
            )} */}
              {!chatStarted ? (
                <div className="text-center text-gray-500 mt-8">
                  <div className="text-lg mb-2">Welcome to AI Chat Hub!</div>
                  <p>
                    Complete the guide to start your AI-powered music
                    conversation experience.
                  </p>
                </div>
              ) : messages.length === 0 ? (
                <EmptyChatState />
              ) : (
                messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* TBD */}
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={messages.length == 0 ? true : false}
            />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
