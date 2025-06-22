"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Music, Headphones, Lightbulb, Volume2, Zap, CheckCircle, CircleOffIcon, X, ArrowRight } from "lucide-react"

interface ChatGuideModalProps {
  isOpen: boolean
  onClose: () => void
  onStartChat: () => void
}

export function ChatGuideModal({ isOpen, onClose, onStartChat }: ChatGuideModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!isOpen) return null

  const steps = [
    {
      title: "Welcome to AI Chat Hub",
      icon: <MessageCircle className="h-8 w-8 text-blue-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-lg leading-relaxed">
            You're about to experience the future of AI conversations with real-time music generation. Let's show you
            how to get the most out of your chat experience.
          </p>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Headphones className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Important</span>
            </div>
            <p className="text-gray-300 text-sm">
              Make sure your headphones are connected for the best audio experience. Music will start automatically
              during conversations.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "How Music Generation Works",
      icon: <Music className="h-8 w-8 text-purple-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Our AI creates unique music in real-time based on your conversation context and mood.
          </p>
          <div className="grid gap-3">
            <div className="flex items-start space-x-3 bg-gray-800/50 p-3 rounded-lg">
              <Volume2 className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Automatic Audio</h4>
                <p className="text-gray-400 text-sm">
                  Music starts shortly after your first message and continues throughout the session.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-gray-800/50 p-3 rounded-lg">
              <Zap className="h-5 w-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Context-Aware</h4>
                <p className="text-gray-400 text-sm">Music adapts to your conversation topics and emotional tone</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Best Practices for Chatting",
      icon: <Lightbulb className="h-8 w-8 text-yellow-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">Follow these tips to have the most engaging conversations:</p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium">Be Descriptive</h4>
                <p className="text-gray-400 text-sm">Use vivid language to help the AI understand the mood you want</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium">Mention Music Preferences</h4>
                <p className="text-gray-400 text-sm">Tell the AI about genres, instruments, or styles you enjoy</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium">Set the Scene</h4>
                <p className="text-gray-400 text-sm">Describe your environment, activity, or desired atmosphere</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium">Give Feedback</h4>
                <p className="text-gray-400 text-sm">
                  Let the AI know if you like the music or want something different
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Best Practices for Chatting",
      icon: <Lightbulb className="h-8 w-8 text-yellow-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">Follow these tips to have the most engaging conversations:</p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CircleOffIcon className="h-5 w-5 text-red-700 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium">Don't Use Special Names</h4>
                <p className="text-gray-400 text-sm">Since our model, currently, has no context over real world examples.</p>
                <p className="text-gray-400 text-sm">eg. Daft Punk</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CircleOffIcon className="h-5 w-5 text-red-700 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium">Dont Request Vocals</h4>
                <p className="text-gray-400 text-sm">Due to copyright issues vocals are disabled.</p>
                <p className="text-gray-400 text-sm flex items-center space-x-2">
                  It may surprise you sometimes, don't tell anyone!
                  <span className="font-medium text-xl">🤫</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Example Conversation Starters",
      icon: <MessageCircle className="h-8 w-8 text-blue-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">Here are some great ways to start your conversation:</p>
          <div className="space-y-3">
            <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-gray-300 italic">
                "I'm working late tonight and need some ambient electronic music to help me focus. Can you create
                something with soft synths and minimal beats?"
              </p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-purple-400">
              <p className="text-gray-300 italic">
                "I'm feeling nostalgic today. Could you make some warm, acoustic music that reminds me of summer
                evenings?"
              </p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-green-400">
              <p className="text-gray-300 italic">
                "I want to get energized for my workout. Create some high-energy music with strong drums and motivating
                melodies."
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Music Controls & Features",
      icon: <Volume2 className="h-8 w-8 text-green-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">You have full control over your audio experience:</p>
          <div className="grid gap-3">
            <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <Music className="h-4 w-4 text-white" />
                </div>
                <span className="text-white">Play/Pause Music</span>
              </div>
              <Badge variant="secondary">Sidebar</Badge>
            </div>
            <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <Volume2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-white">Mute/Unmute</span>
              </div>
              <Badge variant="secondary">Sidebar</Badge>
            </div>
            <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-white">Music Nodes</span>
              </div>
              <Badge variant="secondary">Live View</Badge>
            </div>
          </div>
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
            <h4 className="text-purple-400 font-medium mb-2">Music Nodes</h4>
            <p className="text-gray-300 text-sm">
              Watch the sidebar to see live music generation parameters. These show what elements the AI is currently
              using to create your music.
            </p>
          </div>
        </div>
      ),
    },
  ]

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onStartChat()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-700 shadow-2xl">
        <CardHeader className="relative">
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            {currentStepData.icon}
            <div>
              <CardTitle className="text-xl text-white">{currentStepData.title}</CardTitle>
              <CardDescription className="text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </CardDescription>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStepData.content}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Previous
            </Button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-blue-600" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isLastStep ? (
                <>
                  Start Chatting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Next"
              )}
            </Button>
          </div>

          {/* Skip option */}
          <div className="text-center pt-2">
            <button onClick={onStartChat} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Skip guide and start chatting
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
