import React, { useEffect, useState } from "react";
import { useSwitchChain } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "../config2";

const client = new QueryClient();

const SwitchChain = () => {
  const { chains, switchChain } = useSwitchChain();
  
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
          <div>
            {chains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => switchChain({ chainId: chain.id })}
              >
                Switch to {chain.name}
              </button>
            ))}
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default SwitchChain;