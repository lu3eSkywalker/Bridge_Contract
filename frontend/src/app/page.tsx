"use client"
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { sepoliaConfig } from "../config";
import ConnectToWallet from "../components/ConnectToWallet";

const client = new QueryClient();

const page = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return null;
    }
    return (
      <WagmiProvider config={sepoliaConfig}>
        <QueryClientProvider client={client}>
          <ConnectToWallet />
        </QueryClientProvider>
      </WagmiProvider>
    );
};

export default page;