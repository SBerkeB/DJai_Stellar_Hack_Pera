"use client";

import type React from "react";
import { useEffect } from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, AlertCircle, Shield, User } from "lucide-react";
import { isConnected, getAddress, setAllowed } from "@stellar/freighter-api";

import { useRouter } from "next/navigation";
export function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    console.log("useEffect triggered");
    const loadWallet = async () => {
      try {
        const connected = await isConnected();
        if (connected.isConnected) {
          const result = await getAddress();
          if (result.address) {
            setWalletAddress(result.address);
          }
        }
      } catch (err) {
        console.error("Error checking wallet connection", err);
      }
    };

    loadWallet();
  }, []);

  const handleClick = async () => {
    setMessage(null);
    console.log("handleClick triggered");

    try {
      console.log("walletAddress", walletAddress);
      if (!walletAddress) {
        if (!displayName || !acceptTerms) {
          setMessage({
            type: "error",
            text: "Please provide a name and accept terms",
          });
          return;
        }

        await setAllowed();

        const result = await getAddress();
        if (!result || !result.address) {
          setMessage({
            type: "error",
            text: "Could not retrieve wallet address. Please ensure Freighter is installed and connected.",
          });
          return;
        }
        console.log("result", result);
        console.log("displayName", displayName);
        console.log("acceptTerms", acceptTerms);
        console.log("walletAddress", result.address);

        const walletAddr = result.address;
        setWalletAddress(walletAddr);

        await fetch("http://localhost:5050/wallet-connect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletAddress: walletAddr,
            displayName,
          }),
        });

        setMessage({
          type: "success",
          text: "🎉 Connected successfully!",
        });
      } else {
        router.push("/chat");
      }
    } catch (err) {
      console.error("Wallet connection error:", err);
      setMessage({
        type: "error",
        text: "Something went wrong while connecting.",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 rounded-2xl blur-xl animate-pulse" />
        <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-2xl mt-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClick();
            }}
            className="space-y-4"
          >
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

            {!walletAddress ? (
              <>
                <div className="relative group">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors duration-200" />
                  <Input
                    type="text"
                    placeholder="Enter your name to join"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="pl-12 h-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 text-lg focus:border-white focus:ring-white focus:bg-gray-800 transition-all duration-200"
                    required
                  />
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                    className="mt-1 border-gray-600 data-[state=checked]:bg-white data-[state=checked]:border-white"
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
              </>
            ) : (
              <div>
                <span className="text-white text-lg">Welcome Back!</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-white text-black hover:bg-gray-200 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              disabled={!walletAddress && (!acceptTerms || !displayName)}
            >
              {walletAddress ? "Let's try DJai" : "Launch App"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
