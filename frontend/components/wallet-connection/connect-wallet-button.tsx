"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAddress, setAllowed } from "@stellar/freighter-api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export interface ConnectWalletButtonProps {
  mounted: boolean;
  account: any;
  isLoading: boolean;
  acceptTerms: boolean;
  displayName: string;
}

export function ConnectWalletButton({
  mounted,
  account,
  isLoading,
  acceptTerms,
  displayName,
}: ConnectWalletButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    if (mounted && account) {
      router.push("/chat");
    } else {
      if (displayName && acceptTerms) {
        setAllowed();

        await fetch("http://localhost:5050/wallet-connect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletAddress: account,
            displayName: displayName,
          }),
        }).then((res) => {
          console.log(res);
        });
        window.location.reload();
      }
    }
  };

  return (
    <Button
      type="submit"
      className="w-full h-12 bg-white text-black hover:bg-gray-200 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
      disabled={
        isLoading ||
        (!acceptTerms && !(mounted && account)) ||
        (!displayName && !(mounted && account))
      }
      onClick={handleClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Connecting to wallet...
        </>
      ) : mounted && account ? (
        "Let's try DJai"
      ) : (
        "Launch App"
      )}
    </Button>
  );
}
