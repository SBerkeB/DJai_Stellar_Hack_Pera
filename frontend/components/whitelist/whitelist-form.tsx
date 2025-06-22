// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Loader2, Mail, CheckCircle, AlertCircle } from "lucide-react"
// import { addToWhitelist } from "../../utils/firestore"

// export function WhitelistForm() {
//   const [email, setEmail] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!email.trim()) {
//       setMessage({ type: "error", text: "Please enter your email address" })
//       return
//     }

//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(email)) {
//       setMessage({ type: "error", text: "Please enter a valid email address" })
//       return
//     }

//     setIsLoading(true)
//     setMessage(null)

//     try {
//       const result = await addToWhitelist(email)

//       if (result.success) {
//         setMessage({ type: "success", text: result.message })
//         setEmail("") // Clear form on success
//       } else {
//         setMessage({ type: "error", text: result.message })
//       }
//     } catch (error) {
//       setMessage({ type: "error", text: "An unexpected error occurred. Please try again." })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {message && (
//           <Alert
//             variant={message.type === "error" ? "destructive" : "default"}
//             className={
//               message.type === "error"
//                 ? "bg-red-900/50 border-red-700 text-red-100"
//                 : "bg-green-900/50 border-green-700 text-green-100"
//             }
//           >
//             {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
//             <AlertDescription>{message.text}</AlertDescription>
//           </Alert>
//         )}

//         <div className="relative">
//           <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//           <Input
//             type="email"
//             placeholder="Enter your email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="pl-12 h-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 text-lg focus:border-white focus:ring-white"
//             disabled={isLoading}
//             required
//           />
//         </div>

//         <Button
//           type="submit"
//           className="w-full h-12 bg-white text-black hover:bg-gray-200 text-lg font-medium"
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//               Joining Whitelist...
//             </>
//           ) : (
//             "Join Whitelist"
//           )}
//         </Button>
//       </form>
//     </div>
//   )
// }

"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, CheckCircle, AlertCircle, Shield } from "lucide-react";

export function WhitelistForm() {
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter your email address" });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    if (!acceptTerms) {
      setMessage({
        type: "error",
        text: "Please accept the terms and conditions",
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    // Simulate API call
    setTimeout(() => {
      setMessage({
        type: "success",
        text: "🎉 Welcome to the whitelist! You'll be notified when we launch.",
      });
      setEmail("");
      setAcceptTerms(false);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Glow effect container */}
      <div className="relative">
        {/* Ambient glow - animated */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 rounded-2xl blur-xl animate-pulse" />

        <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {message && (
              <Alert
                variant={message.type === "error" ? "destructive" : "default"}
                className={
                  message.type === "error"
                    ? "bg-red-900/50 border-red-700 text-red-100 animate-in slide-in-from-top-2"
                    : "bg-green-900/50 border-green-700 text-green-100 animate-in slide-in-from-top-2"
                }
              >
                {message.type === "error" ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            <div className="relative group">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors duration-200" />
              <Input
                type="email"
                placeholder="Enter your email to join"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 text-lg focus:border-white focus:ring-white focus:bg-gray-800 transition-all duration-200"
                disabled={isLoading}
                required
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  setAcceptTerms(checked as boolean)
                }
                className="mt-1 border-gray-600 data-[state=checked]:bg-white data-[state=checked]:border-white"
                disabled={isLoading}
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-300 leading-relaxed cursor-pointer"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                >
                  Terms of Use
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-white text-black hover:bg-gray-200 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              disabled={isLoading || !acceptTerms}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Joining Whitelist...
                </>
              ) : (
                "Join Whitelist"
              )}
            </Button>

            {/* Consent disclaimer */}
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <Shield className="h-3 w-3" />
              <span>We'll only email you about early access. No spam.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
