import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import BurnTokens from "@/components/BaseBlockchain/BurnTokens";
import SwitchChain from "./switchchain";
import { config } from "@/config2";

const client = new QueryClient();

const burnBUSDT = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <SwitchChain />
          <BurnTokens />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default burnBUSDT;