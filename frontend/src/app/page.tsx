"use client";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { sepoliaConfig } from "../config";
import { ConnectKitProvider } from "connectkit";
import { config } from "../config2";

const client = new QueryClient();

const Page = ({ children }: any) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Page;
